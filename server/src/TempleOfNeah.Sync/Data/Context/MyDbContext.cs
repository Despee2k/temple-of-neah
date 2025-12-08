using Argus.Sync.Data;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Context;
public class MyDbContext(DbContextOptions options, IConfiguration configuration)
    : CardanoDbContext(options, configuration)
{
    public DbSet<BalanceByAddress> BalanceByAddress => Set<BalanceByAddress>();

    public DbSet<UtxoByAddress> UtxoByAddress => Set<UtxoByAddress>();

    public DbSet<NftInfo> NftInfo => Set<NftInfo>();

    // public DbSet<NftMetadata> NftMetadata => Set<NftMetadata>();

    // public DbSet<OwnershipHistory> OwnershipHistory => Set<OwnershipHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Balance By Address
        modelBuilder.Entity<BalanceByAddress>(e => e.HasKey(b => b.Address));

        // UTXO By Address
        modelBuilder.Entity<UtxoByAddress>(e => 
        {
            e.HasKey(u => new { u.TxHash, u.OutputIndex });
            e.HasIndex(u => u.Address);
        });

        // NFT Info
        modelBuilder.Entity<NftInfo>(e =>
        {
            e.HasKey(n => new { n.PolicyId, n.AssetName });
            e.HasIndex(n => n.PolicyId);
        });

        // // NFT Metadata
        // modelBuilder.Entity<NftMetadata>(e =>
        // {
        //     e.HasKey(n => new { n.PolicyId, n.AssetName });
        //     e.HasIndex(n => n.Name);
        // });
        
        // // Ownership History
        // modelBuilder.Entity<OwnershipHistory>(e =>
        // {
        //     e.HasKey(o => new { o.AssetId, o.Timestamp });
        //     e.HasIndex(o => o.Address);
        // });
    }
}