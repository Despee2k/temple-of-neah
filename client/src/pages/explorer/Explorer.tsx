import { Navigation } from "@/components/navigation"
import { BlockChainVisualization } from "@/components/block-chain-visualization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Blocks, Clock, Activity } from "lucide-react"

export default function Explorer() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Block Explorer</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Explore the Cardano blockchain in real-time. Watch new blocks being created and search for specific blocks
            or transactions.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-border bg-card">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by block height, hash, or transaction ID..."
                  className="pl-10 bg-background"
                />
              </div>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
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
              <div className="text-2xl font-bold text-foreground">8,234,567</div>
              <p className="text-xs text-muted-foreground">Just now</p>
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
              <div className="text-2xl font-bold text-foreground">20s</div>
              <p className="text-xs text-muted-foreground">Last 100 blocks</p>
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
              <div className="text-2xl font-bold text-foreground">42 TPS</div>
              <p className="text-xs text-muted-foreground">Transactions per second</p>
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
              {[
                { height: 8234567, hash: "a3b9f8c2d1e5", txs: 42, time: "2 sec ago" },
                { height: 8234566, hash: "b5c7d3e9f8a2", txs: 38, time: "22 sec ago" },
                { height: 8234565, hash: "c9d8e2f1a5b7", txs: 35, time: "42 sec ago" },
                { height: 8234564, hash: "d3e9f8a2b1c5", txs: 51, time: "1 min ago" },
                { height: 8234563, hash: "e8f2a1b5c7d3", txs: 29, time: "1 min ago" },
              ].map((block) => (
                <div
                  key={block.height}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Blocks className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Block #{block.height.toLocaleString()}</p>
                      <p className="font-mono text-xs text-muted-foreground">{block.hash}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{block.txs} transactions</p>
                      <p className="text-xs text-muted-foreground">{block.time}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
