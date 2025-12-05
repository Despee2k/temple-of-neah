using Argus.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Models;

public record UtxoByAddress(
    string TxHash,
    uint OutputIndex,
    string Address,
    ulong Amount,
    ulong Slot,
    ulong? SpentAtSlot = null
) : IReducerModel;