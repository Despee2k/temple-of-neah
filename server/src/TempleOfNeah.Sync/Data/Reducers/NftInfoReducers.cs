using Argus.Sync.Reducers;
using Chrysalis.Cbor.Extensions.Cardano.Core;
using Chrysalis.Cbor.Extensions.Cardano.Core.Header;
using Chrysalis.Cbor.Types.Cardano.Core;
using Chrysalis.Cbor.Types.Cardano.Core.Transaction;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Context;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Reducers;

public class NftInfoReducer(IDbContextFactory<MyDbContext> dbContextFactory) : IReducer<NftInfo>
{
    public async Task RollForwardAsync(Block block)
    {
        await using var db = await dbContextFactory.CreateDbContextAsync();
        ulong slot = block.Header().HeaderBody().Slot();
        var auxDataSet = block.AuxiliaryDataSet();

        var nftsToSave = new List<NftInfo>();

        Console.WriteLine($"Slot: {block.Header().HeaderBody().Slot()}");
        Console.WriteLine($"Tx Count: {block.TransactionBodies().ToList().Count}");
        Console.WriteLine($"AuxiliaryData Count: {block.AuxiliaryDataSet().Count}");

        Console.WriteLine($"Processing {auxDataSet.Count} auxiliary data entries for NFTs at slot {slot}.");

        foreach (var (_, entry) in auxDataSet)
        {
            var metadata = entry.Metadata();

            Console.WriteLine($"Auxiliary data metadata: {metadata}");

            if (metadata != null && metadata.Value.TryGetValue(721, out var nftMetadatum))
            {
                if (nftMetadatum is not MetadatumMap nftPolicyMap)
                    continue;

                foreach (var (policyKey, assetsObj) in nftPolicyMap.Value)
                {
                    Console.WriteLine($"Processing policy key: {policyKey}, assetsObj: {assetsObj}");

                    if (policyKey is not MetadatumBytes policyBytes || assetsObj is not MetadatumMap assetsMap)
                        continue;

                    string policyId = Convert.ToHexString(policyBytes.Value).ToLowerInvariant();

                    foreach (var (assetKey, assetMetaObj) in assetsMap.Value)
                    {
                        Console.WriteLine($"Processing asset key: {assetKey}, assetMetaObj: {assetMetaObj}");

                        if (assetKey is not MetadatumBytes assetBytes || assetMetaObj is not MetadatumMap assetMetaMap)
                            continue;

                        string assetName = Convert.ToHexString(assetBytes.Value).ToLowerInvariant();

                        var assetMetaDict = assetMetaMap.Value.ToDictionary(
                            kvp => (kvp.Key as MetadataText)?.Value ?? string.Empty,
                            kvp => (kvp.Value as MetadataText)?.Value ?? string.Empty
                        );

                        string name = assetMetaDict.GetValueOrDefault("name") ?? string.Empty;
                        string image = assetMetaDict.GetValueOrDefault("image") ?? string.Empty;

                        nftsToSave.Add(new NftInfo(
                            PolicyId: policyId,
                            AssetName: assetName,
                            Slot: slot,
                            Name: name,
                            Image: image
                        ));
                    }
                }
            }
        }

        Console.WriteLine("Saving NFTs info to database...");
        db.NftInfo.AddRange(nftsToSave);
        await db.SaveChangesAsync();
    }

    public async Task RollBackwardAsync(ulong rollbackSlot)
    {
        await using var db = await dbContextFactory.CreateDbContextAsync();

        var nftsToRemove = await db.NftInfo
            .Where(n => n.Slot >= rollbackSlot)
            .ToListAsync();

        if (nftsToRemove.Count > 0)
        {
            db.NftInfo.RemoveRange(nftsToRemove);
            await db.SaveChangesAsync();
        }
    }
}
