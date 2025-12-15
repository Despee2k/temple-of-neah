import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { useState } from "react"

interface BlockData {
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

const mockBlock: BlockData = {
  height: 8234567,
  hash: "a3b9f8c2d1e5a7b3c9d8e2f1a5b7c3d9e8f2a1b5c7d3e9f8a2b1c5d7e3f9a8b2",
  previousHash: "b5c7d3e9f8a2b1c5d7e3f9a8b2c1d5e7f3a9b8c2d1e5a7b3c9d8e2f1a5b7c3",
  timestamp: "2024-01-15 14:32:18 UTC",
  transactions: 42,
  totalADA: "125,430.25",
  fees: "8.45",
  slotNumber: 84523940,
  epoch: 421,
}

export function BlockExplorer() {
  const [selectedField, setSelectedField] = useState<string | null>(null)

  const explanations = {
    height: {
      title: "Block Height",
      description: "The sequential number of this block in the blockchain. Each new block increases this number by 1.",
      example: "This is block #8,234,567 in the Cardano blockchain.",
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
      example: "This block contains 42 transactions from different users.",
    },
    totalADA: {
      title: "Total ADA",
      description: "The sum of all ADA tokens transferred in all transactions within this block.",
      example: "125,430.25 ADA moved between addresses in this block.",
    },
    fees: {
      title: "Transaction Fees",
      description:
        "The total fees paid by users to have their transactions included in this block. These fees go to stake pool operators.",
      example: "Users paid 8.45 ADA in fees for processing these transactions.",
    },
    slotNumber: {
      title: "Slot Number",
      description:
        "A time unit in Cardano. Each slot is 1 second, and slots are grouped into epochs. Blocks can be created in specific slots.",
      example: "This block was created in slot 84,523,940.",
    },
    epoch: {
      title: "Epoch",
      description:
        "A period of time in Cardano, lasting about 5 days. Epochs are used for staking rewards and protocol updates.",
      example: "This block is part of epoch 421.",
    },
  }

  return (
    <div className="space-y-6">
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
                    {mockBlock.height.toLocaleString()}
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
                  <span className="truncate font-mono text-xs text-primary">{mockBlock.hash}</span>
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
                  <span className="truncate font-mono text-xs text-accent">{mockBlock.previousHash}</span>
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
                  <span className="font-mono text-sm text-foreground">{mockBlock.timestamp}</span>
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
                    <span className="font-mono text-lg font-semibold text-primary">{mockBlock.transactions}</span>
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
                    <span className="font-mono text-lg font-semibold text-primary">₳{mockBlock.totalADA}</span>
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
                    <span className="font-mono text-lg font-semibold text-accent">₳{mockBlock.fees}</span>
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
                    <span className="font-mono text-sm text-foreground">{mockBlock.slotNumber.toLocaleString()}</span>
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
                    <span className="font-mono text-sm text-foreground">{mockBlock.epoch}</span>
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
