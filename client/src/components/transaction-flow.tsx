import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TransactionData {
  sender: string
  receiver: string
  amount: string
  fee: string
  hash: string
}

const mockTransaction: TransactionData = {
  sender: "addr1qx2fxv2um...9y5nc2p",
  receiver: "addr1q8r2n5km...7h3dx8s",
  amount: "1,250.50",
  fee: "0.17",
  hash: "f9a8b2c1d5e7f3a9b8c2d1e5a7b3c9d8e2f1a5b7c3d9e8f2a1b5c7d3e9f8a2b1",
}

type AnimationStep = 0 | 1 | 2 | 3 | 4 | 5

export function TransactionFlow() {
  const [animationStep, setAnimationStep] = useState<AnimationStep>(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying && animationStep < 5) {
      const timer = setTimeout(() => {
        setAnimationStep((prev) => (prev + 1) as AnimationStep)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (animationStep === 5) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false)
    }
  }, [isPlaying, animationStep])

  const handlePlay = () => {
    setAnimationStep(0)
    setIsPlaying(true)
  }

  const handleReset = () => {
    setAnimationStep(0)
    setIsPlaying(false)
  }

  const stepExplanations = [
    {
      title: "Transaction Created",
      description: "User initiates a transfer of ADA from their wallet to another address.",
    },
    {
      title: "Inputs Selected",
      description: "The wallet selects UTXOs (unspent outputs) from the sender's address to fund the transaction.",
    },
    {
      title: "Outputs Defined",
      description: "Transaction specifies: amount to receiver, change back to sender, and transaction fee.",
    },
    {
      title: "Transaction Signed",
      description: "Sender signs the transaction with their private key, proving they own the ADA.",
    },
    {
      title: "Broadcast to Network",
      description: "Signed transaction is sent to the Cardano network and enters the mempool.",
    },
    {
      title: "Included in Block",
      description: "A stake pool operator includes the transaction in a new block, confirming it on-chain.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Transaction Visualization</CardTitle>
              <CardDescription>Step-by-step animated breakdown</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePlay} disabled={isPlaying} className="gap-2">
                <Play className="h-4 w-4" />
                Play Animation
              </Button>
              <Button onClick={handleReset} variant="outline" disabled={isPlaying} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Visual Flow */}
      <Card className="border-primary/20 bg-card">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {/* Sender */}
            <div
              className={cn(
                "relative flex flex-col items-center transition-all duration-500",
                animationStep >= 1 && "scale-105",
              )}
            >
              <div
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all duration-500",
                  animationStep >= 1
                    ? "border-primary bg-primary/20 shadow-lg shadow-primary/50"
                    : "border-border bg-muted",
                )}
              >
                <span className="text-2xl">👤</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Sender</p>
              <p className="mt-1 max-w-[150px] truncate font-mono text-xs text-muted-foreground">
                {mockTransaction.sender}
              </p>
              {animationStep >= 1 && (
                <Badge variant="outline" className="mt-2 animate-in fade-in border-primary text-primary">
                  Signs TX
                </Badge>
              )}
            </div>

            {/* Flow Arrow 1 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "relative h-2 w-32 overflow-hidden rounded-full bg-muted transition-all duration-500",
                  animationStep >= 2 && "bg-primary/20",
                )}
              >
                {animationStep >= 2 && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </div>
              <ArrowRight
                className={cn(
                  "h-6 w-6 transition-all duration-500",
                  animationStep >= 2 ? "text-primary" : "text-muted-foreground",
                )}
              />
              {animationStep >= 2 && (
                <p className="animate-in fade-in text-xs font-medium text-primary">₳{mockTransaction.amount}</p>
              )}
            </div>

            {/* Transaction */}
            <div
              className={cn(
                "relative flex flex-col items-center transition-all duration-500",
                animationStep >= 3 && "scale-110",
              )}
            >
              <div
                className={cn(
                  "flex h-32 w-32 flex-col items-center justify-center rounded-xl border-4 p-4 transition-all duration-500",
                  animationStep >= 3
                    ? "border-accent bg-accent/20 shadow-lg shadow-accent/50"
                    : "border-border bg-muted",
                )}
              >
                <span className="text-3xl">📄</span>
                <p className="mt-2 text-xs font-semibold text-foreground">Transaction</p>
              </div>
              {animationStep >= 3 && (
                <div className="mt-3 flex flex-col items-center gap-1 animate-in fade-in">
                  <Badge variant="outline" className="border-accent text-accent">
                    In Mempool
                  </Badge>
                  <p className="text-xs text-muted-foreground">Fee: ₳{mockTransaction.fee}</p>
                </div>
              )}
            </div>

            {/* Flow Arrow 2 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "relative h-2 w-32 overflow-hidden rounded-full bg-muted transition-all duration-500",
                  animationStep >= 4 && "bg-primary/20",
                )}
              >
                {animationStep >= 4 && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </div>
              <ArrowRight
                className={cn(
                  "h-6 w-6 transition-all duration-500",
                  animationStep >= 4 ? "text-primary" : "text-muted-foreground",
                )}
              />
              {animationStep >= 4 && <p className="animate-in fade-in text-xs font-medium text-primary">Confirmed</p>}
            </div>

            {/* Receiver */}
            <div
              className={cn(
                "relative flex flex-col items-center transition-all duration-500",
                animationStep >= 5 && "scale-105",
              )}
            >
              <div
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all duration-500",
                  animationStep >= 5
                    ? "border-primary bg-primary/20 shadow-lg shadow-primary/50"
                    : "border-border bg-muted",
                )}
              >
                <span className="text-2xl">👤</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Receiver</p>
              <p className="mt-1 max-w-[150px] truncate font-mono text-xs text-muted-foreground">
                {mockTransaction.receiver}
              </p>
              {animationStep >= 5 && (
                <Badge variant="outline" className="mt-2 animate-in fade-in border-primary text-primary">
                  Received
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-12">
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(animationStep / 5) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Start</span>
              <span>Step {animationStep} of 5</span>
              <span>Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Explanation */}
      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-foreground">{stepExplanations[animationStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{stepExplanations[animationStep].description}</p>

          {/* Transaction Details */}
          {animationStep >= 2 && (
            <div className="mt-6 space-y-3 animate-in fade-in">
              <div className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount Sent</span>
                  <span className="font-mono text-sm font-semibold text-primary">₳{mockTransaction.amount}</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transaction Fee</span>
                  <span className="font-mono text-sm font-semibold text-accent">₳{mockTransaction.fee}</span>
                </div>
              </div>
              {animationStep >= 4 && (
                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">Transaction Hash</span>
                    <span className="truncate font-mono text-xs text-foreground">{mockTransaction.hash}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Key Concepts</CardTitle>
          <CardDescription>Understanding transaction components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="font-semibold text-foreground">UTXOs (Unspent Transaction Outputs)</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cardano uses a UTXO model where each transaction consumes previous outputs and creates new ones. Think of
              it like using physical bills - you can't spend half a $20 bill, you use the whole bill and get change
              back.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="font-semibold text-foreground">Transaction Fees</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Fees compensate stake pool operators for processing transactions and maintaining the network. Cardano fees
              are calculated based on transaction size (bytes) and computational resources needed.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="font-semibold text-foreground">Digital Signatures</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Only the owner of the private key can sign transactions from their address. This cryptographic signature
              proves ownership without revealing the private key itself.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
