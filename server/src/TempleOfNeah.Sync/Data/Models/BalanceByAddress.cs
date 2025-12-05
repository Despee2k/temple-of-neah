using Argus.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Models;

public record BalanceByAddress(
    string Address, 
    long Balance
) : IReducerModel
{
    public long Balance { get; init; } = Balance;
}