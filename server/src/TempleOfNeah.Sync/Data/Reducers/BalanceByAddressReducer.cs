using Argus.Sync.Reducers;
using Chrysalis.Cbor.Extensions.Cardano.Core;
using Chrysalis.Cbor.Extensions.Cardano.Core.Common;
using Chrysalis.Cbor.Extensions.Cardano.Core.Header;
using Chrysalis.Cbor.Extensions.Cardano.Core.Transaction;
using Chrysalis.Cbor.Types.Cardano.Core;
using Chrysalis.Cbor.Types.Cardano.Core.Transaction;
using Chrysalis.Tx.Providers;
using Chrysalis.Wallet.Models.Addresses;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Context;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Reducers;

public class BalanceByAddressReducer(IDbContextFactory<MyDbContext> dbContextFactory) : IReducer<BalanceByAddress>
{
    public async Task RollForwardAsync(Block block)
    {
        await using MyDbContext db = await dbContextFactory.CreateDbContextAsync();

        ulong slot = block.Header().HeaderBody().Slot();
        Dictionary<string, long> balanceChanges = [];

        List<TransactionBody> txBodies = [.. block.TransactionBodies()];

        // Collect all input references for batch query
        List<(string TxHash, uint Index)> inputRefs = []; 
        foreach (TransactionBody txBody in txBodies)
        {
            foreach (TransactionInput input in txBody.Inputs())
            {
                string inputTxHash = Convert.ToHexString(input.TransactionId()).ToLowerInvariant();
                uint inputIndex = (uint)input.Index();
                inputRefs.Add((inputTxHash, inputIndex));
            }
        }

        // Batch query all unspent UTXOs being spent
        Dictionary<string, UtxoByAddress> utxoLookup = [];
        if (inputRefs.Count > 0)
        {
            List<string> txHashes = [.. inputRefs.Select(r => r.TxHash).Distinct()];
            List<UtxoByAddress> utxos = await db.UtxoByAddress
                .Where(u => txHashes.Contains(u.TxHash) && u.SpentAtSlot == null)
                .ToListAsync();

            foreach (UtxoByAddress utxo in utxos)
            {
                string key = $"{utxo.TxHash}#{utxo.OutputIndex}";
                utxoLookup[key] = utxo;
            }
        }

        // Process each transaction
        foreach (TransactionBody txBody in txBodies)
        {
            string txHash = txBody.Hash().ToLowerInvariant();

            // Process inputs (subtract from balance)
            foreach (TransactionInput input in txBody.Inputs())
            {
                string inputTxHash = Convert.ToHexString(input.TransactionId()).ToLowerInvariant();
                uint inputIndex = (uint)input.Index();
                string key = $"{inputTxHash}#{inputIndex}";

                if (utxoLookup.TryGetValue(key, out UtxoByAddress? utxo))
                {
                    // Subtract from balance
                    if (!balanceChanges.TryAdd(utxo.Address, -(long)utxo.Amount))
                    {
                        balanceChanges[utxo.Address] -= (long)utxo.Amount;
                    }

                    // Soft-delete: mark the UTXO as spent at this slot
                    db.Entry(utxo).Property(u => u.SpentAtSlot).CurrentValue = slot;
                }
            }

            // Process outputs (add to balance)
            List<TransactionOutput> outputs = [.. txBody.Outputs()];
            for (uint outputIndex = 0; outputIndex < outputs.Count; outputIndex++)
            {
                TransactionOutput output = outputs[(int)outputIndex];

                // Try to convert to bech32, fallback to hex for unsupported address types
                string address;
                try
                {
                    address = Address.FromBytes(output.Address()).ToBech32();
                }
                catch
                {
                    // Fallback to hex for Byron or other unsupported address formats
                    address = Convert.ToHexString(output.Address()).ToLowerInvariant();
                }

                ulong lovelace = output.Amount().Lovelace();

                // Add to balance
                if (!balanceChanges.TryAdd(address, (long)lovelace))
                {
                    balanceChanges[address] += (long)lovelace;
                }

                // Store the new UTXO
                db.UtxoByAddress.Add(new UtxoByAddress(
                    txHash,
                    outputIndex,
                    address,
                    lovelace,
                    slot
                ));
            }
        }

        // Batch query existing balances
        List<string> addressesToUpdate = [.. balanceChanges.Keys];
        Dictionary<string, BalanceByAddress> existingBalances = await db.BalanceByAddress
            .Where(b => addressesToUpdate.Contains(b.Address))
            .ToDictionaryAsync(b => b.Address);

        // Apply balance changes
        foreach ((string address, long change) in balanceChanges)
        {
            if (existingBalances.TryGetValue(address, out BalanceByAddress? existing))
            {
                existing.Balance += change;
            }
            else
            {
                db.BalanceByAddress.Add(new BalanceByAddress(address, change));
            }
        }

        await db.SaveChangesAsync();
    }

    public async Task RollBackwardAsync(ulong slot)
    {
        await using MyDbContext db = await dbContextFactory.CreateDbContextAsync();

        Dictionary<string, long> balancedAdjustments = [];

        // 1. Find UTXOs created at or after the rollback slot (need to remove/subtract)
        List<UtxoByAddress> utxosToRemove = await db.UtxoByAddress
            .Where(u => u.Slot >= slot)
            .ToListAsync();

        foreach (UtxoByAddress utxo in utxosToRemove)
        {
            // Only subtract if it wasn't already spent (unspent UTXOs contribute to balance)
            if (utxo.SpentAtSlot == null)
            {
                if (!balancedAdjustments.TryAdd(utxo.Address, -(long)utxo.Amount))
                {
                    balancedAdjustments[utxo.Address] -= (long)utxo.Amount;                    
                } 
            }
        }

        // 2. Find UTXOs spent at or after the rollback slot (need to restore/add back)
        List<UtxoByAddress> utxosToRestore = await db.UtxoByAddress
            .Where(u => u.SpentAtSlot >= slot && u.Slot < slot)
            .ToListAsync();

        foreach (UtxoByAddress utxo in utxosToRestore)
        {
            // Add back to balance since we're un-spending this UTXO
            if (!balancedAdjustments.TryAdd(utxo.Address, (long)utxo.Amount))
            {
                balancedAdjustments[utxo.Address] += (long)utxo.Amount;                    
            }

            // Clear the spent marker
            db.Entry(utxo).Property(u => u.SpentAtSlot).CurrentValue = null;
        }

        if (balancedAdjustments.Count == 0 && utxosToRemove.Count == 0)
        {
            return;
        }
        
        // Batch query existing balances
        List<string> addresses = [.. balancedAdjustments.Keys];
        Dictionary<string, BalanceByAddress> existingBalances = await db.BalanceByAddress
            .Where(b => addresses.Contains(b.Address))
            .ToDictionaryAsync(b => b.Address);

        // Apply balance adjustments
        foreach ((string address, long adjustment) in balancedAdjustments)
        {
            if (existingBalances.TryGetValue(address, out BalanceByAddress? existing))
            {
                existing.Balance += adjustment;
            }
            else
            {
                db.BalanceByAddress.Add(new BalanceByAddress(address, adjustment));
            }
        }
    
        // Remove UTXOs created at or after rollback slot
        db.UtxoByAddress.RemoveRange(utxosToRemove);

        await db.SaveChangesAsync();
    }
}