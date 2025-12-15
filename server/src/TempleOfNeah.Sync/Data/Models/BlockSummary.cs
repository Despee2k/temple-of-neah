using Argus.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Models;

public record BlockSummary(
    string BlockHash,
    ulong Slot,
    ulong Epoch,
    ulong Height,
    string? PreviousBlockHash,
    int TxCount,
    int InputCount,
    int OutputCount,
    int UniqueAddressCount,
    ulong TotalFees,
    ulong TotalAdaMoved,
    ulong TotalLovelaceMoved,
    int MintCount,
    int BurnCount,
    DateTimeOffset? Timestamp
) : IReducerModel
{
    public ulong Slot { get; set; } = Slot;
    public ulong Epoch { get; set; } = Epoch;
    public ulong Height { get; set; } = Height;
    public string? PreviousBlockHash { get; set; } = PreviousBlockHash;
    public int TxCount { get; set; } = TxCount;
    public int InputCount { get; set; } = InputCount;
    public int OutputCount { get; set; } = OutputCount;
    public int UniqueAddressCount { get; set; } = UniqueAddressCount;
    public ulong TotalFees { get; set; } = TotalFees;
    public ulong TotalAdaMoved { get; set; } = TotalAdaMoved;
    public ulong TotalLovelaceMoved { get; set; } = TotalLovelaceMoved;
    public int MintCount { get; set; } = MintCount;
    public int BurnCount { get; set; } = BurnCount;
    public DateTimeOffset? Timestamp { get; set; } = Timestamp;
}