import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Block {
  id: number
  hash: string
  timestamp: string
  transactions: number
}

export function BlockChainVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, hash: "a3b9f8c2", timestamp: "14:30:12", transactions: 38 },
    { id: 2, hash: "b5c7d3e9", timestamp: "14:30:32", transactions: 42 },
    { id: 3, hash: "c9d8e2f1", timestamp: "14:30:52", transactions: 35 },
  ])
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedBlock, setHighlightedBlock] = useState<number | null>(null)

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        const newBlock: Block = {
          id: blocks.length + 1,
          hash: Math.random().toString(36).substring(2, 10),
          timestamp: new Date().toLocaleTimeString(),
          transactions: Math.floor(Math.random() * 50) + 20,
        }

        setBlocks((prev) => [...prev.slice(-4), newBlock])
        setHighlightedBlock(newBlock.id)

        setTimeout(() => setHighlightedBlock(null), 1000)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isAnimating, blocks.length])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Live Blockchain Formation</CardTitle>
            <CardDescription>Watch how blocks link together to form the chain</CardDescription>
          </div>
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant={isAnimating ? "outline" : "default"}
            className="gap-2"
          >
            {isAnimating ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
                    <span className="text-xs font-semibold text-muted-foreground">Block #{block.id}</span>
                    {highlightedBlock === block.id && (
                      <span className="animate-pulse text-xs font-semibold text-primary">NEW</span>
                    )}
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

        {isAnimating && (
          <div className="mt-4 animate-in fade-in rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <p className="text-sm text-primary">New blocks are being added every 20 seconds...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
