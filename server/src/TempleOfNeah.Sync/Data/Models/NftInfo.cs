using Argus.Sync.Data.Models;

namespace TempleOfNeah.Sync.Data.Models;

public record NftInfo(
    string PolicyId,
    string AssetName,
    ulong Slot,
    string? Name = null,
    string? Image = null
) : IReducerModel;
