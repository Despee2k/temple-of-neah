import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Clock, Calendar, Layers } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Epoch {
  number: number
  startSlot: number
  endSlot: number
  duration: string
  blocks: number
  status: "past" | "current" | "future"
}

const exampleEpochs: Epoch[] = [
  {
    number: 450,
    startSlot: 97200000,
    endSlot: 97243200,
    duration: "5 days",
    blocks: 21600,
    status: "past",
  },
  {
    number: 451,
    startSlot: 97243200,
    endSlot: 97286400,
    duration: "5 days",
    blocks: 21600,
    status: "current",
  },
  {
    number: 452,
    startSlot: 97286400,
    endSlot: 97329600,
    duration: "5 days",
    blocks: 21600,
    status: "future",
  },
]

export function EpochsSlotsVisualization() {
  const [selectedEpoch, setSelectedEpoch] = useState<number | null>(451)
  const [currentSlot, setCurrentSlot] = useState(97250000)

  const selectedEpochData = exampleEpochs.find((e) => e.number === selectedEpoch)

  const slotsInEpoch = selectedEpochData ? selectedEpochData.endSlot - selectedEpochData.startSlot : 43200
  const slotsPerDay = 86400 // 24 hours * 60 minutes * 60 seconds
  const daysInEpoch = slotsInEpoch / slotsPerDay
  const progressInEpoch = selectedEpochData
    ? ((currentSlot - selectedEpochData.startSlot) / slotsInEpoch) * 100
    : 0

  const formatSlot = (slot: number) => {
    return slot.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Epochs & Slots</CardTitle>
          <CardDescription>Understanding Cardano's time system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cardano uses a unique time system based on slots and epochs. Understanding this system is crucial for
            staking rewards, protocol updates, and understanding when blocks are created.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Slots</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Each slot is exactly 1 second. Blocks can be created during specific slots, and slots are numbered
                sequentially from the genesis block.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Epochs</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                An epoch is a period of approximately 5 days (432,000 slots). Epochs are used for staking rewards
                distribution and protocol parameters.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Timeline */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Epoch Timeline</CardTitle>
          <CardDescription>See how epochs and slots relate to each other</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {exampleEpochs.map((epoch) => {
              const isSelected = selectedEpoch === epoch.number
              const progress = epoch.status === "current" ? progressInEpoch : epoch.status === "past" ? 100 : 0

              return (
                <div
                  key={epoch.number}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-4 transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-background hover:border-primary/50",
                    epoch.status === "current" && "ring-2 ring-accent/50",
                  )}
                  onClick={() => setSelectedEpoch(epoch.number)}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg font-bold",
                          epoch.status === "current"
                            ? "bg-accent/20 text-accent"
                            : epoch.status === "past"
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary/20 text-primary",
                        )}
                      >
                        {epoch.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Epoch {epoch.number}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              epoch.status === "current"
                                ? "border-accent text-accent"
                                : epoch.status === "past"
                                  ? "border-muted-foreground text-muted-foreground"
                                  : "border-primary text-primary",
                            )}
                          >
                            {epoch.status === "current"
                              ? "Current"
                              : epoch.status === "past"
                                ? "Past"
                                : "Future"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{epoch.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Slots</p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {formatSlot(epoch.startSlot)} - {formatSlot(epoch.endSlot)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">
                        {progress.toFixed(1)}% ({epoch.blocks} blocks)
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full transition-all",
                          epoch.status === "current"
                            ? "bg-accent"
                            : epoch.status === "past"
                              ? "bg-muted-foreground"
                              : "bg-primary/30",
                        )}
                        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Epoch View */}
      {selectedEpochData && (
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-foreground">Epoch {selectedEpochData.number} Details</CardTitle>
            <CardDescription>Understanding the structure of an epoch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Total Slots</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-primary">{slotsInEpoch.toLocaleString()}</p>
                <p className="mt-1 text-xs text-muted-foreground">432,000 slots per epoch</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Duration</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-accent">{daysInEpoch.toFixed(1)} days</p>
                <p className="mt-1 text-xs text-muted-foreground">~5 days per epoch</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Expected Blocks</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-primary">{selectedEpochData.blocks.toLocaleString()}</p>
                <p className="mt-1 text-xs text-muted-foreground">~20 seconds per block</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Slot Range</h3>
                </div>
                <p className="mt-2 font-mono text-sm font-bold text-foreground">
                  {formatSlot(selectedEpochData.startSlot)}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  to {formatSlot(selectedEpochData.endSlot)}
                </p>
              </div>
            </div>

            {/* Slot Breakdown */}
            <div className="rounded-lg border border-border bg-background p-4">
              <h3 className="mb-3 font-semibold text-foreground">Slot Breakdown</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Slots per second</span>
                  <span className="font-semibold text-foreground">1 slot = 1 second</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Slots per hour</span>
                  <span className="font-semibold text-foreground">3,600 slots</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Slots per day</span>
                  <span className="font-semibold text-foreground">86,400 slots</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Slots per epoch</span>
                    <span className="font-mono font-bold text-primary">432,000 slots</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Concepts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Key Concepts</CardTitle>
          <CardDescription>Understanding epochs and slots</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TooltipProvider>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Slots</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Slots are 1-second time units. Each slot can potentially contain a block, though not every
                            slot will have one.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Slots are numbered sequentially starting from the genesis block (slot 0). Each slot represents one
                      second of real time. Stake pools are assigned to specific slots where they can create blocks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Epochs</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Epochs are ~5 day periods used for staking rewards, protocol updates, and governance
                            decisions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      An epoch contains exactly 432,000 slots (5 days). At the end of each epoch, staking rewards are
                      calculated and distributed. Epoch boundaries are also when protocol parameter updates take effect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Block Creation</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Blocks are created approximately every 20 seconds, but not every slot will have a block.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      While each slot is 1 second, blocks are created roughly every 20 seconds on average. This means
                      about 1 in 20 slots will contain a block. The exact timing depends on which stake pool is
                      assigned to create the block.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Info className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Staking Rewards</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Rewards are calculated at the end of each epoch and distributed to delegators.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Staking rewards are calculated at epoch boundaries based on the stake pool's performance during
                      that epoch. Rewards are typically distributed 2 epochs after you delegate (about 10 days). This
                      delay ensures accurate calculation and distribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}

