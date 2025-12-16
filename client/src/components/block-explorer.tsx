import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { getLatestBlockSummaries, type BlockSummary } from "@/api/blockSummary"

interface BlockViewModel {
  height: number
  hash: string
  previousHash: string
  timestamp: string
  transactions: number
  totalADA: string
  fees: string
  slotNumber: number
  epoch: number
}

export function BlockExplorer() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [block, setBlock] = useState<BlockViewModel | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadBlock = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [latest] = await getLatestBlockSummaries(1)
        if (!isMounted || !latest) return

        const viewModel = mapBlockSummaryToViewModel(latest)
        setBlock(viewModel)
      } catch (e) {
        if (!isMounted) return
        console.error("Failed to load latest block summary", e)
        setError("Unable to load live block data right now.")
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadBlock()

    return () => {
      isMounted = false
    }
  }, [])

  const mapBlockSummaryToViewModel = (summary: BlockSummary): BlockViewModel => {
    const timestamp = new Date(summary.timestamp)
    const timestampLabel = `${timestamp.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })} UTC`

    return {
      height: summary.height,
      hash: summary.blockHash,
      previousHash: summary.previousBlockHash,
      timestamp: timestampLabel,
      transactions: summary.txCount,
      totalADA: summary.totalAdaMoved.toLocaleString(undefined, {
        maximumFractionDigits: 6,
      }),
      fees: summary.totalFees.toLocaleString(undefined, {
        maximumFractionDigits: 6,
      }),
      slotNumber: summary.slot,
      epoch: summary.epoch,
    }
  }

  const explanations = useMemo(() => ({
    height: {
      title: "Block Height",
      description: "The sequential number of this block in the blockchain. Each new block increases this number by 1.",
      example: `This is block #${block?.height || 0} in the Cardano blockchain.`,
    },
    hash: {
      title: "Block Hash",
      description:
        "A unique fingerprint of this block created by cryptographic hashing. Like a digital signature that can't be faked.",
      example: "This hash proves the block's contents haven't been tampered with.",
    },
    previousHash: {
      title: "Previous Block Hash",
      description:
        "The hash of the block that came before this one. This creates the 'chain' in blockchain by linking blocks together.",
      example: "Each block points to its parent, forming an unbreakable chain back to the first block.",
    },
    timestamp: {
      title: "Timestamp",
      description: "The exact date and time when this block was created and added to the blockchain.",
      example: "Blocks on Cardano are created approximately every 20 seconds.",
    },
    transactions: {
      title: "Transactions",
      description: "The number of transactions (transfers of ADA or other assets) included in this block.",
      example: `This block contains ${block?.transactions || 'N/A'} transactions from different users.`,
    },
    totalADA: {
      title: "Total ADA",
      description: "The sum of all ADA tokens transferred in all transactions within this block.",
      example: `${block?.totalADA || 'N/A'} ADA moved between addresses in this block.`,
    },
    fees: {
      title: "Transaction Fees",
      description:
        "The total fees paid by users to have their transactions included in this block. These fees go to stake pool operators.",
      example: `Users paid ${block?.fees || 'N/A'} ADA in fees for processing these transactions.`,
    },
    slotNumber: {
      title: "Slot Number",
      description:
        "A time unit in Cardano. Each slot is 1 second, and slots are grouped into epochs. Blocks can be created in specific slots.",
      example: `This block was created in slot ${block?.slotNumber || 'N/A'}.`,
    },
    epoch: {
      title: "Epoch",
      description:
        "A period of time in Cardano, lasting about 5 days. Epochs are used for staking rewards and protocol updates.",
      example: `This block is part of epoch ${block?.epoch || 'N/A'}.`,
    },
  }), [block])

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="py-3 text-sm text-destructive">
            {error} Showing placeholders until the API is available.
          </CardContent>
        </Card>
      )}

      {/* Main Block Visualization */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">Block Explorer</CardTitle>
              <CardDescription>Click any field to learn what it means</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary text-primary">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="space-y-4">
              {/* Block Height */}
              <div
                className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedField === "height"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedField(selectedField === "height" ? null : "height")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Block Height</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">The sequential position of this block in the chain</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="font-mono text-lg font-semibold text-primary">
                    {block ? block.height.toLocaleString() : isLoading ? "Loading..." : "—"}
                  </span>
                </div>
              </div>

              {/* Block Hash */}
              <div
                className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedField === "hash"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedField(selectedField === "hash" ? null : "hash")}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Block Hash</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Unique identifier created by cryptographic hashing</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="truncate font-mono text-xs text-primary">
                    {block ? block.hash : isLoading ? "Loading..." : "—"}
                  </span>
                </div>
              </div>

              {/* Previous Hash */}
              <div
                className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedField === "previousHash"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedField(selectedField === "previousHash" ? null : "previousHash")}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Previous Block Hash</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Links to the previous block, creating the chain</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="truncate font-mono text-xs text-accent">
                    {block ? block.previousHash : isLoading ? "Loading..." : "—"}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <div
                className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedField === "timestamp"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedField(selectedField === "timestamp" ? null : "timestamp")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Timestamp</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">When this block was created</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="font-mono text-sm text-foreground">
                    {block ? block.timestamp : isLoading ? "Loading..." : "—"}
                  </span>
                </div>
              </div>

              {/* Grid for remaining fields */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Transactions */}
                <div
                  className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedField === "transactions"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedField(selectedField === "transactions" ? null : "transactions")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Transactions</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Number of transactions in this block</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  <span className="font-mono text-lg font-semibold text-primary">
                    {block ? block.transactions : isLoading ? "…" : "—"}
                  </span>
                  </div>
                </div>

                {/* Total ADA */}
                <div
                  className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedField === "totalADA"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedField(selectedField === "totalADA" ? null : "totalADA")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Total ADA</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Sum of all ADA transferred</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {block ? `₳${block.totalADA}` : isLoading ? "₳…" : "₳—`"}
                    </span>
                  </div>
                </div>

                {/* Fees */}
                <div
                  className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedField === "fees"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedField(selectedField === "fees" ? null : "fees")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Fees</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Transaction fees paid to validators</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-mono text-lg font-semibold text-accent">
                      {block ? `₳${block.fees}` : isLoading ? "₳…" : "₳—"}
                    </span>
                  </div>
                </div>

                {/* Slot Number */}
                <div
                  className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedField === "slotNumber"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedField(selectedField === "slotNumber" ? null : "slotNumber")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Slot</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Time unit in Cardano (1 slot = 1 second)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-mono text-sm text-foreground">
                      {block ? block.slotNumber.toLocaleString() : isLoading ? "Loading..." : "—"}
                    </span>
                  </div>
                </div>

                {/* Epoch */}
                <div
                  className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedField === "epoch"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedField(selectedField === "epoch" ? null : "epoch")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Epoch</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Time period (~5 days) for staking rewards</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-mono text-sm text-foreground">
                      {block ? block.epoch : isLoading ? "Loading..." : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Explanation Panel */}
      {selectedField && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-foreground">
              {explanations[selectedField as keyof typeof explanations].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground">
              {explanations[selectedField as keyof typeof explanations].description}
            </p>
            <div className="rounded-lg border border-primary/20 bg-background p-4">
              <p className="text-sm font-medium text-muted-foreground">Example:</p>
              <p className="mt-2 text-sm text-foreground">
                {explanations[selectedField as keyof typeof explanations].example}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
