import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TrendingUp, Users, Coins, Shield } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface StakePool {
  id: string
  name: string
  ticker: string
  stake: number
  delegators: number
  saturation: number
  margin: number
  fixedFee: number
}

const examplePools: StakePool[] = [
  {
    id: "pool1",
    name: "Cardano Foundation",
    ticker: "CF",
    stake: 125000000,
    delegators: 1250,
    saturation: 0.65,
    margin: 0.02,
    fixedFee: 340,
  },
  {
    id: "pool2",
    name: "IOHK Pool",
    ticker: "IOHK",
    stake: 98000000,
    delegators: 980,
    saturation: 0.51,
    margin: 0.025,
    fixedFee: 340,
  },
  {
    id: "pool3",
    name: "Community Pool",
    ticker: "COMM",
    stake: 45000000,
    delegators: 450,
    saturation: 0.23,
    margin: 0.03,
    fixedFee: 340,
  },
]

export function StakingVisualization() {
  const [delegatedAmount, setDelegatedAmount] = useState(10000)
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null)

  const formatAda = (lovelace: number) => {
    return (lovelace / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })
  }

  const calculateRewards = (pool: StakePool, stake: number) => {
    const annualRewardRate = 0.05 // ~5% APY
    const poolReward = (stake / pool.stake) * (pool.stake * annualRewardRate)
    const poolFee = poolReward * pool.margin + pool.fixedFee / 1000000
    const delegatorReward = poolReward - poolFee
    return {
      total: poolReward,
      fee: poolFee,
      delegator: delegatorReward,
      apy: (delegatorReward / stake) * 100,
    }
  }

  const selectedPoolData = selectedPoolId
    ? examplePools.find((p) => p.id === selectedPoolId)
    : null

  const rewards = selectedPoolData
    ? calculateRewards(selectedPoolData, delegatedAmount * 1000000)
    : null

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">What is Staking?</CardTitle>
          <CardDescription>Understanding Cardano's Proof-of-Stake system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Staking allows ADA holders to participate in network security and earn rewards. Unlike mining in Bitcoin,
            Cardano uses a Proof-of-Stake system where you delegate your ADA to stake pools that validate transactions.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Secure Network</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your staked ADA helps secure the Cardano network by giving stake pools voting power.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Earn Rewards</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Receive ADA rewards every epoch (~5 days) for helping secure the network.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">No Locking</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your ADA never leaves your wallet. You can spend it anytime, even while staking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stake Pool Selection */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Choose a Stake Pool</CardTitle>
          <CardDescription>Select a pool to see how delegation works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Amount to Delegate (ADA)
              </label>
              <input
                type="number"
                value={delegatedAmount}
                onChange={(e) => setDelegatedAmount(Number(e.target.value))}
                min="1"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {examplePools.map((pool) => {
              const isSelected = selectedPoolId === pool.id

              return (
                <div
                  key={pool.id}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-4 transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-background hover:border-primary/50",
                  )}
                  onClick={() => setSelectedPoolId(pool.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{pool.name}</h3>
                      <p className="text-sm text-muted-foreground">{pool.ticker}</p>
                    </div>
                    {isSelected && <Badge className="bg-primary">Selected</Badge>}
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Stake</span>
                      <span className="font-mono font-semibold text-foreground">
                        {formatAda(pool.stake)} ADA
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delegators</span>
                      <span className="font-semibold text-foreground">{pool.delegators}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Margin</span>
                      <span className="font-semibold text-accent">{(pool.margin * 100).toFixed(2)}%</span>
                    </div>
                    <div className="mt-2">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Saturation</span>
                        <span className="font-semibold text-foreground">
                          {(pool.saturation * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full transition-all",
                            pool.saturation > 0.9
                              ? "bg-destructive"
                              : pool.saturation > 0.7
                                ? "bg-accent"
                                : "bg-primary",
                          )}
                          style={{ width: `${pool.saturation * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Calculation */}
      {selectedPoolData && rewards && (
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-foreground">Rewards Breakdown</CardTitle>
            <CardDescription>
              Estimated rewards for delegating {delegatedAmount.toLocaleString()} ADA to {selectedPoolData.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Estimated APY</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-primary">{rewards.apy.toFixed(2)}%</p>
                <p className="mt-1 text-xs text-muted-foreground">Annual percentage yield</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Epoch Rewards</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-accent">
                  {(rewards.delegator / 1000000).toFixed(2)} ADA
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Every ~5 days</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h3 className="mb-3 font-semibold text-foreground">Reward Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Pool Rewards</span>
                  <span className="font-mono font-semibold text-foreground">
                    {(rewards.total / 1000000).toFixed(2)} ADA
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pool Fee ({selectedPoolData.margin * 100}%)</span>
                  <span className="font-mono font-semibold text-accent">
                    {(rewards.fee / 1000000).toFixed(2)} ADA
                  </span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Your Reward</span>
                    <span className="font-mono text-lg font-bold text-primary">
                      {(rewards.delegator / 1000000).toFixed(2)} ADA
                    </span>
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
          <CardDescription>Understanding staking terminology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TooltipProvider>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Stake Pool</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            A node operator that validates transactions and creates blocks. Stake pools combine ADA from
                            multiple delegators.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Stake pools are run by operators who maintain the Cardano network infrastructure. When you
                      delegate, you're choosing which pool should represent your stake.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Saturation</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Saturation is when a pool reaches optimal size. Over-saturated pools earn diminishing
                            rewards.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Cardano has a saturation limit (~64M ADA per pool). Pools near saturation may offer lower rewards.
                      It's often better to choose pools with 50-90% saturation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Pool Fees</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Pools charge a margin percentage and a fixed fee. Lower fees mean more rewards for
                            delegators.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Pool operators charge fees to cover operational costs. Margin fees are a percentage of rewards
                      (typically 0-5%), plus a fixed fee (usually 340 ADA per epoch, shared among all delegators).
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Delegation</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Delegation assigns your stake to a pool. Your ADA stays in your wallet and can be spent
                            anytime.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      When you delegate, you're telling the network which stake pool should represent your ADA stake.
                      This happens instantly and can be changed anytime. Your ADA never leaves your wallet.
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

