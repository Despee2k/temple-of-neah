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

// public class OwnershipHistoryReducer(IDbContextFactory<MyDbContext> dbContextFactory) : IReducer<OwnershipHistory>
// {
//     public async Task RollForwardAsync(Block block)
//     {
//         await using var db = await dbContextFactory.CreateDbContextAsync();
//         ulong slot = block.Header().HeaderBody().Slot();
//         var txBodies = block.TransactionBodies().ToList();

//         foreach (var tx in txBodies)
//         {
//             var mint = tx.Mint;
//             if (mint == null) continue;

//             foreach (var policyPair in mint.AsEnumerable())
//             {
//                 string policyId = Convert.ToHexString(policyPair.Key).ToLowerInvariant();

//                 foreach (var assetPair in policyPair.Value.AsEnumerable())
//                 {
//                     string assetName = System.Text.Encoding.UTF8.GetString(assetPair.Key);

//                     // Record ownership
//                     foreach (var output in tx.Outputs())
//                     {
//                         string address;
//                         try
//                         {
//                             address = Address.FromBytes(output.Address()).ToBech32();
//                         }
//                         catch
//                         {
//                             address = Convert.ToHexString(output.Address()).ToLowerInvariant();
//                         }

//                         db.OwnershipHistory.Add(new OwnershipHistory(
//                             policyId,
//                             assetName,
//                             tx.Hash().ToLowerInvariant(),
//                             address,
//                             slot
//                         ));
//                     }
//                 }
//             }
//         }

//         await db.SaveChangesAsync();
//     }

//     public async Task RollBackwardAsync(ulong slot)
//     {
//         await using var db = await dbContextFactory.CreateDbContextAsync();
//         var ownershipToRemove = await db.OwnershipHistory.Where(o => o.Slot >= slot).ToListAsync();
//         db.OwnershipHistory.RemoveRange(ownershipToRemove);
//         await db.SaveChangesAsync();
//     }
// }
