using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TempleOfNeah.Sync.Data.Context;
using TempleOfNeah.Sync.Data.Models;

namespace TempleOfNeah.Sync.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlockSummaryController : ControllerBase
{
    private readonly IDbContextFactory<MyDbContext> _dbContextFactory;

    public BlockSummaryController(IDbContextFactory<MyDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    /// <summary>
    /// Get all block summaries with pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlockSummary>>> GetBlocks(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] ulong? minSlot = null,
        [FromQuery] ulong? maxSlot = null,
        [FromQuery] ulong? epoch = null)
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var query = db.BlockSummary.AsQueryable();

        if (minSlot.HasValue)
            query = query.Where(b => b.Slot >= minSlot.Value);

        if (maxSlot.HasValue)
            query = query.Where(b => b.Slot <= maxSlot.Value);

        if (epoch.HasValue)
            query = query.Where(b => b.Epoch == epoch.Value);

        var totalCount = await query.CountAsync();

        var blocks = await query
            .OrderByDescending(b => b.Slot)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        Response.Headers.Append("X-Total-Count", totalCount.ToString());
        Response.Headers.Append("X-Page", page.ToString());
        Response.Headers.Append("X-Page-Size", pageSize.ToString());

        return Ok(blocks);
    }

    /// <summary>
    /// Get a specific block by hash
    /// </summary>
    [HttpGet("{blockHash}")]
    public async Task<ActionResult<BlockSummary>> GetBlockByHash(string blockHash)
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var block = await db.BlockSummary
            .FirstOrDefaultAsync(b => b.BlockHash == blockHash);

        if (block == null)
            return NotFound($"Block with hash {blockHash} not found");

        return Ok(block);
    }

    /// <summary>
    /// Get a specific block by slot number
    /// </summary>
    [HttpGet("slot/{slot}")]
    public async Task<ActionResult<BlockSummary>> GetBlockBySlot(ulong slot)
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var block = await db.BlockSummary
            .FirstOrDefaultAsync(b => b.Slot == slot);

        if (block == null)
            return NotFound($"Block at slot {slot} not found");

        return Ok(block);
    }

    /// <summary>
    /// Get blocks by epoch
    /// </summary>
    [HttpGet("epoch/{epoch}")]
    public async Task<ActionResult<IEnumerable<BlockSummary>>> GetBlocksByEpoch(ulong epoch)
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var blocks = await db.BlockSummary
            .Where(b => b.Epoch == epoch)
            .OrderByDescending(b => b.Slot)
            .ToListAsync();

        return Ok(blocks);
    }

    /// <summary>
    /// Get latest blocks
    /// </summary>
    [HttpGet("latest")]
    public async Task<ActionResult<IEnumerable<BlockSummary>>> GetLatestBlocks([FromQuery] int count = 10)
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var blocks = await db.BlockSummary
            .OrderByDescending(b => b.Slot)
            .Take(count)
            .ToListAsync();

        return Ok(blocks);
    }

    /// <summary>
    /// Get block statistics
    /// </summary>
    [HttpGet("statistics")]
    public async Task<ActionResult<object>> GetStatistics()
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        var stats = new
        {
            TotalBlocks = await db.BlockSummary.CountAsync(),
            LatestBlock = await db.BlockSummary
                .OrderByDescending(b => b.Slot)
                .FirstOrDefaultAsync(),
            LatestEpoch = await db.BlockSummary
                .OrderByDescending(b => b.Epoch)
                .Select(b => b.Epoch)
                .FirstOrDefaultAsync(),
            TotalTransactions = await db.BlockSummary.SumAsync(b => (long)b.TxCount),
            TotalAdaMoved = await db.BlockSummary.SumAsync(b => (decimal)b.TotalAdaMoved),
            AverageTxPerBlock = await db.BlockSummary.AverageAsync(b => (double)b.TxCount)
        };

        return Ok(stats);
    }

    /// <summary>
    /// Get aggregated metrics for the last X days
    /// </summary>
    /// <param name="days">Number of days to look back (default: 7)</param>
    /// <param name="metric">Metric to aggregate: ada, fees, or lovelace (default: ada)</param>
    [HttpGet("aggregate/last-days")]
    public async Task<ActionResult<object>> GetLastDaysAggregate(
        [FromQuery] int days = 7,
        [FromQuery] string metric = "ada")
    {
        await using var db = await _dbContextFactory.CreateDbContextAsync();

        if (days <= 0)
            return BadRequest("Days must be greater than 0");

        // Calculate the cutoff date
        var cutoffDate = DateTimeOffset.UtcNow.AddDays(-days);

        // Filter blocks from the last X days
        var query = db.BlockSummary
            .Where(b => b.Timestamp.HasValue && b.Timestamp.Value >= cutoffDate);

        object result;

        switch (metric.ToLowerInvariant())
        {
            case "ada":
                var totalAda = await query.SumAsync(b => (decimal?)b.TotalAdaMoved) ?? 0;
                result = new
                {
                    Metric = "TotalAdaMoved",
                    Days = days,
                    CutoffDate = cutoffDate,
                    TotalValue = totalAda,
                    Unit = "ADA",
                    AveragePerDay = totalAda / days
                };
                break;

            case "fees":
                var totalFees = await query.SumAsync(b => (decimal?)b.TotalFees) ?? 0;
                result = new
                {
                    Metric = "TotalFees",
                    Days = days,
                    CutoffDate = cutoffDate,
                    TotalValue = totalFees,
                    Unit = "Lovelace",
                    AveragePerDay = totalFees / days,
                    AveragePerDayInAda = totalFees / days / 1_000_000
                };
                break;

            case "lovelace":
                var totalLovelace = await query.SumAsync(b => (decimal?)b.TotalLovelaceMoved) ?? 0;
                result = new
                {
                    Metric = "TotalLovelaceMoved",
                    Days = days,
                    CutoffDate = cutoffDate,
                    TotalValue = totalLovelace,
                    Unit = "Lovelace",
                    AveragePerDay = totalLovelace / days,
                    AveragePerDayInAda = totalLovelace / days / 1_000_000
                };
                break;

            default:
                return BadRequest("Metric must be 'ada', 'fees', or 'lovelace'");
        }

        // Add block count for context
        var blockCount = await query.CountAsync();
        var resultDict = new Dictionary<string, object>();
        
        if (result is not null)
        {
            foreach (var prop in result.GetType().GetProperties())
            {
                resultDict[prop.Name] = prop.GetValue(result) ?? "";
            }
        }
        
        resultDict["BlockCount"] = blockCount;

        return Ok(resultDict);
    }
}

