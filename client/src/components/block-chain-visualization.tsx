import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { getLatestBlockSummaries, type BlockSummary } from "@/api/blockSummary"

interface Block {
  id: string
  hash: string
  height: number
  timestamp: string
  transactions: number
}

const POLL_INTERVAL_MS = 10000

function truncateHash(hash: string, maxLength: number = 12): string {
  if (hash.length <= maxLength) return hash
  return `${hash.substring(0, maxLength)}...`
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

// Convert BlockSummary to Block format
function blockSummaryToBlock(summary: BlockSummary): Block {
  return {
    id: summary.blockHash,
    hash: truncateHash(summary.blockHash),
    height: summary.height,
    timestamp: formatTime(summary.timestamp),
    transactions: summary.txCount,
  }
}

export function BlockChainVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const seenBlockHashes = useRef<Set<string>>(new Set())

  // Initial load: get latest 3 blocks
  useEffect(() => {
    let isMounted = true

    const loadInitialBlocks = async () => {
      try {
        setIsLoading(true)
        const latestBlocks = await getLatestBlockSummaries(3)
        if (!isMounted) return

        // Sort by timestamp (oldest first for display)
        const sorted = [...latestBlocks].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        )

        const initialBlocks = sorted.map(blockSummaryToBlock)
        setBlocks(initialBlocks)

        // Track seen blocks
        sorted.forEach((block) => seenBlockHashes.current.add(block.blockHash))
      } catch (e) {
        console.error("Failed to load initial blocks for visualization", e)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialBlocks()

    return () => {
      isMounted = false
    }
  }, [])

  // Polling: check for new blocks and add them automatically once blocks are loaded
  useEffect(() => {
    // Don't start polling until we have initial blocks loaded
    if (isLoading || blocks.length === 0) return

    let isMounted = true

    const pollForNewBlocks = async () => {
      try {
        // Get latest block to check for new ones
        const latestBlocks = await getLatestBlockSummaries(1)
        if (!isMounted || latestBlocks.length === 0) return

        const latestBlock = latestBlocks[0]

        // Check if this is a new block we haven't seen
        if (!seenBlockHashes.current.has(latestBlock.blockHash)) {
          const newBlock = blockSummaryToBlock(latestBlock)
          seenBlockHashes.current.add(latestBlock.blockHash)

          setBlocks((prev) => {
            // Keep only the last 4 blocks for display
            const updated = [...prev, newBlock].slice(-4)
            return updated
          })

          // Highlight the new block
          setHighlightedBlock(newBlock.id)
          setTimeout(() => setHighlightedBlock(null), 1000)
        }
      } catch (e) {
        console.error("Failed to poll for new blocks", e)
      }
    }

    // Poll immediately, then every interval
    void pollForNewBlocks()
    const interval = setInterval(() => {
      void pollForNewBlocks()
    }, POLL_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [isLoading, blocks.length])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div>
          <CardTitle className="text-foreground">Live Blockchain Formation</CardTitle>
          <CardDescription>Watch how blocks link together to form the chain</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">Loading blockchain visualization...</p>
          </div>
        ) : blocks.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No blocks available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4 pb-4">
              {blocks.map((block, index) => (
                <div key={block.id} className="flex items-center gap-4">
                  {/* Block */}
                  <div
                    className={cn(
                      "relative flex min-w-[200px] flex-col gap-2 rounded-lg border-2 p-4 transition-all duration-500",
                      highlightedBlock === block.id
                        ? "animate-in zoom-in border-primary bg-primary/20 shadow-lg shadow-primary/50"
                        : "border-border bg-background",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Block</span>
                      <span className="animate-pulse text-xs font-semibold text-primary">{block.height}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Hash</span>
                        <span className="font-mono text-primary">{block.hash}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-mono text-foreground">{block.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">TXs</span>
                        <span className="font-mono text-accent">{block.transactions}</span>
                      </div>
                    </div>
                    {index < blocks.length - 1 && (
                      <div className="absolute -right-2 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-primary" />
                    )}
                  </div>

                  {/* Arrow */}
                  {index < blocks.length - 1 && (
                    <div className="flex items-center">
                      <div className="relative h-0.5 w-8 bg-primary">
                        <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-b-4 border-l-8 border-t-4 border-b-transparent border-l-primary border-t-transparent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && blocks.length > 0 && (
          <div className="mt-4 animate-in fade-in rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <p className="text-sm text-primary">
              Polling for new blocks every {POLL_INTERVAL_MS / 1000} seconds...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
