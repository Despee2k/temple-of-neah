import { Navigation } from "@/components/navigation"
import { BlockChainVisualization } from "@/components/block-chain-visualization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Blocks, Clock, Activity } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { getLatestBlockSummaries, getBlockSummaryByHash, type BlockSummary } from "@/api/blockSummary"

const POLL_INTERVAL_MS = 10000

function formatTimeAgo(timestamp: string): string {
  const then = new Date(timestamp).getTime()
  const now = Date.now()
  const diffSeconds = Math.max(0, Math.round((now - then) / 1000))

  if (diffSeconds < 5) return "Just now"
  if (diffSeconds < 60) return `${diffSeconds} sec ago`

  const diffMinutes = Math.round(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes} min ago`

  const diffHours = Math.round(diffMinutes / 60)
  return `${diffHours} hr ago`
}

export default function Explorer() {
  const [latestBlocks, setLatestBlocks] = useState<BlockSummary[]>([])
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false)
  const [blocksError, setBlocksError] = useState<string | null>(null)
  const [recentBlocksCount, setRecentBlocksCount] = useState(8)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchedBlock, setSearchedBlock] = useState<BlockSummary | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadBlocks = async () => {
      try {
        setIsLoadingBlocks(true)
        setBlocksError(null)

        const blocks = await getLatestBlockSummaries(recentBlocksCount)
        if (!isMounted) return

        setLatestBlocks(blocks)
      } catch (e) {
        if (!isMounted) return
        console.error("Failed to load latest blocks", e)
        setBlocksError("Unable to load latest blocks right now.")
      } finally {
        if (isMounted) {
          setIsLoadingBlocks(false)
        }
      }
    }

    void loadBlocks()

    const intervalId = window.setInterval(() => {
      void loadBlocks()
    }, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [recentBlocksCount])

  const latestBlock = latestBlocks[0]

  const { averageBlockTimeSeconds, tps } = useMemo(() => {
    if (latestBlocks.length < 2) {
      return { averageBlockTimeSeconds: null as number | null, tps: null as number | null }
    }

    const sorted = [...latestBlocks].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )

    const firstTime = new Date(sorted[0].timestamp).getTime()
    const lastTime = new Date(sorted[sorted.length - 1].timestamp).getTime()

    const totalSeconds = Math.max(1, (lastTime - firstTime) / 1000)
    const averageBlockTimeSeconds = totalSeconds / (sorted.length - 1)

    const totalTx = sorted.reduce((acc, block) => acc + block.txCount, 0)
    const tps = totalTx / totalSeconds

    return { averageBlockTimeSeconds, tps }
  }, [latestBlocks])

  const handleSearch = async () => {
    const query = searchQuery.trim()
    if (!query) return

    try {
      setIsSearching(true)
      setSearchError(null)
      setSearchedBlock(null)

      const block = await getBlockSummaryByHash(query)
      setSearchedBlock(block)
    } catch (e) {
      console.error("Failed to search block by hash", e)
      setSearchError("No block found with that hash or the server is unavailable.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Block Explorer</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Explore the Cardano blockchain in real-time. Watch new blocks being created and search for specific.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-border bg-card">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by block hash..."
                  className="pl-10 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      void handleSearch()
                    }
                  }}
                />
              </div>
              <Button className="gap-2" onClick={() => void handleSearch()} disabled={isSearching}>
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            {searchError && (
              <p className="mt-3 text-sm text-destructive">
                {searchError}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Latest Block</CardDescription>
                <Blocks className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {latestBlock
                  ? latestBlock.height.toLocaleString()
                  : isLoadingBlocks
                    ? "Loading…"
                    : "—"}
              </div>
              <p className="text-xs text-muted-foreground">
                {latestBlock
                  ? formatTimeAgo(latestBlock.timestamp)
                  : isLoadingBlocks
                    ? "Fetching latest block…"
                    : blocksError ?? "No data"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Avg Block Time</CardDescription>
                <Clock className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {averageBlockTimeSeconds != null
                  ? `${averageBlockTimeSeconds.toFixed(1)}s`
                  : isLoadingBlocks
                    ? "Loading…"
                    : "—"}
              </div>
              <p className="text-xs text-muted-foreground">
                {latestBlocks.length > 0 ? `Last ${latestBlocks.length} blocks` : "Waiting for data"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Network Activity</CardDescription>
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {tps != null
                  ? `${tps.toFixed(1)} TPS`
                  : isLoadingBlocks
                    ? "Loading…"
                    : "—"}
              </div>
              <p className="text-xs text-muted-foreground">
                {latestBlocks.length > 0 ? "Approx. based on recent blocks" : "Transactions per second"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Live Blockchain */}
        <BlockChainVisualization />

        {/* Recent Blocks */}
        <Card className="mt-6 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Blocks</CardTitle>
            <CardDescription>Latest blocks added to the Cardano blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoadingBlocks && latestBlocks.length === 0 && (
                <p className="text-sm text-muted-foreground">Loading recent blocks…</p>
              )}

              {!isLoadingBlocks && latestBlocks.length === 0 && blocksError && (
                <p className="text-sm text-destructive">{blocksError}</p>
              )}

              {latestBlocks.map((block) => (
                <div
                  key={block.blockHash}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Blocks className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Block #{block.height.toLocaleString()}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">{block.blockHash}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{block.txCount} transactions</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(block.timestamp)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => setSearchedBlock(block)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}

              {!isLoadingBlocks && latestBlocks.length > 0 && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => setRecentBlocksCount((prev) => prev + 5)}
                  >
                    View more blocks
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Result Modal */}
        {searchedBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="max-w-xl w-full border-primary/40 bg-card shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-foreground">Block Details</CardTitle>
                    <CardDescription>Detailed summary of a real Cardano block</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => setSearchedBlock(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Block Hash</p>
                  <p className="font-mono text-xs break-all text-foreground">{searchedBlock.blockHash}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Height</p>
                    <p className="font-mono text-foreground">{searchedBlock.height.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Slot</p>
                    <p className="font-mono text-foreground">{searchedBlock.slot.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Epoch</p>
                    <p className="font-mono text-foreground">{searchedBlock.epoch}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Timestamp</p>
                    <p className="font-mono text-foreground">
                      {new Date(searchedBlock.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Transactions</p>
                    <p className="font-mono text-foreground">{searchedBlock.txCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Unique Addresses</p>
                    <p className="font-mono text-foreground">{searchedBlock.uniqueAddressCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Total ADA Moved</p>
                    <p className="font-mono text-primary">
                      ₳
                      {searchedBlock.totalAdaMoved.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Total Fees</p>
                    <p className="font-mono text-accent">
                      ₳
                      {searchedBlock.totalFees.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>
                    This summary is simplified from real on-chain data indexed by your backend. It shows how active this
                    block was: how many transactions it contains, how much ADA moved, and how much was paid in fees.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
