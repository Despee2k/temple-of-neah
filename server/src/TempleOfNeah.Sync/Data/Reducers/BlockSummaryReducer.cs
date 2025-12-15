using Argus.Sync.Reducers;
using Chrysalis.Cbor.Extensions.Cardano.Core;
using Chrysalis.Cbor.Extensions.Cardano.Core.Common;
using Chrysalis.Cbor.Extensions.Cardano.Core.Header;
using Chrysalis.Cbor.Extensions.Cardano.Core.Transaction;
using Chrysalis.Cbor.Types.Cardano.Core;
using Chrysalis.Cbor.Types.Cardano.Core.Transaction;
using Chrysalis.Wallet.Models.Addresses;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Context;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Reducers;

public class BlockSummaryReducer(IDbContextFactory<MyDbContext> dbContextFactory) : IReducer<BlockSummary>
{
    // Cardano mainnet: 432000 slots per epoch
    // Preview/testnet: typically 86400 slots per epoch
    // For flexibility, we'll calculate based on typical values
    private const ulong SlotsPerEpoch = 432000;

    public async Task RollForwardAsync(Block block)
    {
        await using var db = await dbContextFactory.CreateDbContextAsync();

        var header = block.Header();
        var headerBody = header.HeaderBody();
        ulong slot = headerBody.Slot();
        ulong epoch = slot / SlotsPerEpoch;

        // Get block hash from header
        string blockHash = header.Hash().ToLowerInvariant();

        // Get previous block hash
        string? previousBlockHash = null;
        try
        {
            var prevHash = headerBody.PrevHash();
            if (prevHash != null && prevHash.Length > 0)
            {
                previousBlockHash = Convert.ToHexString(prevHash).ToLowerInvariant();
            }
        }
        catch
        {
            // Previous hash might not be available in all block types
        }

        // Get transaction bodies
        List<TransactionBody> txBodies = [.. block.TransactionBodies()];
        int txCount = txBodies.Count;

        // Calculate statistics
        int inputCount = 0;
        int outputCount = 0;
        ulong totalFees = 0;
        ulong totalLovelaceMoved = 0;
        HashSet<string> uniqueAddresses = [];
        int mintCount = 0;
        int burnCount = 0;

        foreach (var txBody in txBodies)
        {
            // Count inputs
            var inputs = txBody.Inputs().ToList();
            inputCount += inputs.Count;

            // Count outputs and calculate totals
            var outputs = txBody.Outputs().ToList();
            outputCount += outputs.Count;

            foreach (var output in outputs)
            {
                // Extract address
                try
                {
                    string address = Address.FromBytes(output.Address()).ToBech32();
                    uniqueAddresses.Add(address);
                }
                catch
                {
                    // Try hex fallback
                    string address = Convert.ToHexString(output.Address()).ToLowerInvariant();
                    uniqueAddresses.Add(address);
                }

                // Get lovelace amount
                ulong lovelace = output.Amount().Lovelace();
                totalLovelaceMoved += lovelace;
            }

            // Get fees
            try
            {
                var fee = txBody.Fee();
                totalFees += fee;
            }
            catch
            {
                // Fee might not be directly available
            }

            // Count mints and burns
            var mint = txBody.Mint();
            if (mint != null && mint.Count > 0)
            {
                foreach (var (_, tokenBundle) in mint)
                {
                    // Try to iterate token bundle if possible
                    try
                    {
                        if (tokenBundle is IEnumerable<KeyValuePair<byte[], long>> enumerable)
                        {
                            foreach (var (_, quantity) in enumerable)
                            {
                                if (quantity > 0)
                                    mintCount++;
                                else if (quantity < 0)
                                    burnCount++;
                            }
                        }
                    }
                    catch
                    {
                        // If we can't iterate, skip mint/burn counting
                    }
                }
            }
        }

        // Calculate height - get from previous block or calculate
        ulong height = 0;
        if (!string.IsNullOrEmpty(previousBlockHash))
        {
            var previousBlock = await db.BlockSummary
                .FirstOrDefaultAsync(b => b.BlockHash == previousBlockHash);
            
            if (previousBlock != null)
            {
                height = previousBlock.Height + 1;
            }
            else
            {
                // If previous block not found, try to get max height and add 1
                var maxHeight = await db.BlockSummary
                    .OrderByDescending(b => b.Height)
                    .Select(b => b.Height)
                    .FirstOrDefaultAsync();
                height = maxHeight + 1;
            }
        }
        else
        {
            // Genesis block or first block - height is 0 or 1
            var maxHeight = await db.BlockSummary
                .OrderByDescending(b => b.Height)
                .Select(b => b.Height)
                .FirstOrDefaultAsync();
            height = maxHeight > 0 ? maxHeight + 1 : 1;
        }

        // Calculate timestamp (Cardano mainnet genesis: 2017-09-23 21:44:51 UTC)
        // Each slot is 1 second
        // For preview/testnet, adjust accordingly
        DateTimeOffset? timestamp = null;
        try
        {
            // Mainnet genesis timestamp
            var genesisTimestamp = new DateTimeOffset(2017, 9, 23, 21, 44, 51, TimeSpan.Zero);
            timestamp = genesisTimestamp.AddSeconds((long)slot);
        }
        catch
        {
            // If calculation fails, leave as null
        }

        // Convert lovelace to ADA for readability (1 ADA = 1,000,000 Lovelace)
        ulong totalAdaMoved = totalLovelaceMoved / 1_000_000;

        // Check if block summary already exists (for updates)
        var existing = await db.BlockSummary
            .FirstOrDefaultAsync(b => b.BlockHash == blockHash);

        if (existing != null)
        {
            // Update existing record
            existing.Slot = slot;
            existing.Epoch = epoch;
            existing.Height = height;
            existing.PreviousBlockHash = previousBlockHash;
            existing.TxCount = txCount;
            existing.InputCount = inputCount;
            existing.OutputCount = outputCount;
            existing.UniqueAddressCount = uniqueAddresses.Count;
            existing.TotalFees = totalFees;
            existing.TotalAdaMoved = totalAdaMoved;
            existing.TotalLovelaceMoved = totalLovelaceMoved;
            existing.MintCount = mintCount;
            existing.BurnCount = burnCount;
            existing.Timestamp = timestamp;
        }
        else
        {
            // Create new block summary
            var blockSummary = new BlockSummary(
                BlockHash: blockHash,
                Slot: slot,
                Epoch: epoch,
                Height: height,
                PreviousBlockHash: previousBlockHash,
                TxCount: txCount,
                InputCount: inputCount,
                OutputCount: outputCount,
                UniqueAddressCount: uniqueAddresses.Count,
                TotalFees: totalFees,
                TotalAdaMoved: totalAdaMoved,
                TotalLovelaceMoved: totalLovelaceMoved,
                MintCount: mintCount,
                BurnCount: burnCount,
                Timestamp: timestamp
            );

            db.BlockSummary.Add(blockSummary);
        }

        await db.SaveChangesAsync();
    }

    public async Task RollBackwardAsync(ulong rollbackSlot)
    {
        await using var db = await dbContextFactory.CreateDbContextAsync();

        // Remove blocks at or after the rollback slot
        var blocksToRemove = await db.BlockSummary
            .Where(b => b.Slot >= rollbackSlot)
            .ToListAsync();

        if (blocksToRemove.Count > 0)
        {
            db.BlockSummary.RemoveRange(blocksToRemove);
            await db.SaveChangesAsync();
        }
    }
}

