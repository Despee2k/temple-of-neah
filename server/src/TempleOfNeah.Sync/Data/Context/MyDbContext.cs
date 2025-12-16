using Argus.Sync.Data;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Context;
public class MyDbContext(DbContextOptions options, IConfiguration configuration)
    : CardanoDbContext(options, configuration)
{
    public DbSet<BlockSummary> BlockSummary => Set<BlockSummary>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BlockSummary>(e =>
        {
            e.HasKey(b => b.BlockHash);
            e.HasIndex(b => b.Slot);
            e.HasIndex(b => b.Epoch);
            e.HasIndex(b => b.Height);
        });
    }
}