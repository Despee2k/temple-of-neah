using Argus.Sync.Data;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Context;
public class MyDbContext(DbContextOptions options, IConfiguration configuration)
    : CardanoDbContext(options, configuration)
{
    public DbSet<BalanceByAddress> BalanceByAddress => Set<BalanceByAddress>();

    public DbSet<UtxoByAddress> UtxoByAddress => Set<UtxoByAddress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<BalanceByAddress>(e => e.HasKey(b => b.Address));
        modelBuilder.Entity<UtxoByAddress>(e => 
        {
            e.HasKey(u => new { u.TxHash, u.OutputIndex });
            e.HasIndex(u => u.Address);
        });
    }
}