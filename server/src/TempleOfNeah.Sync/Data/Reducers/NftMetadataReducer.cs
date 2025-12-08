// using Argus.Sync.Reducers;
// using Chrysalis.Cbor.Extensions.Cardano.Core;
// using Chrysalis.Cbor.Extensions.Cardano.Core.Common;
// using Chrysalis.Cbor.Extensions.Cardano.Core.Header;
// using Chrysalis.Cbor.Extensions.Cardano.Core.Transaction;
// using Chrysalis.Cbor.Types.Cardano.Core;
// using Chrysalis.Cbor.Types.Cardano.Core.Transaction;
// using Chrysalis.Tx.Providers;
// using Chrysalis.Wallet.Models.Addresses;
// using Microsoft.AspNetCore.Components.Web;
// using Microsoft.EntityFrameworkCore;
// using TempleOfNeah.Sync.Data.Context;
// using TempleOfNeah.Sync.Data.Models;

// namespace TempleOfNeah.Sync.Data.Reducers;

// public class NftMetadataReducer(IDbContextFactory<MyDbContext> dbContextFactory) : IReducer<NftMetadata>
// {
//     public async Task RollForwardAsync(Block block)
//     {
//         await using var db = await dbContextFactory.CreateDbContextAsync();
//         ulong slot = block.Header().HeaderBody().Slot();
//         var txBodies = block.TransactionBodies().ToList();

//         foreach (var tx in txBodies)
//         {
//             var aux = tx.AuxiliaryData; // metadata
//             if (aux == null) continue;

//             foreach (var kv in aux.Metadata) // pseudo-code depending on Argus version
//             {
//                 string policyId = kv.Key;
//                 foreach (var asset in kv.Value)
//                 {
//                     string assetName = asset.Key;
//                     string metadataJson = asset.Value.ToString();

//                     // Check if exists
//                     var existing = await db.NftMetadata
//                         .FirstOrDefaultAsync(n => n.PolicyId == policyId && n.AssetName == assetName);

//                     if (existing == null)
//                     {
//                         db.NftMetadata.Add(new NftMetadata(policyId, assetName, metadataJson, slot));
//                     }
//                 }
//             }
//         }

//         await db.SaveChangesAsync();
//     }

//     public async Task RollBackwardAsync(ulong slot)
//     {
//         await using var db = await dbContextFactory.CreateDbContextAsync();
//         var metadataToRemove = await db.NftMetadata.Where(n => n.Slot >= slot).ToListAsync();
//         db.NftMetadata.RemoveRange(metadataToRemove);
//         await db.SaveChangesAsync();
//     }
// }
