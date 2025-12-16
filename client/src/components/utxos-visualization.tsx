import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Coins, ArrowRightLeft, Wallet, Package } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface UTXO {
  id: string
  amount: number
  source: string
  status: "unspent" | "spent"
}

const initialUTXOs: UTXO[] = [
  { id: "utxo1", amount: 50, source: "Received from Alice", status: "unspent" },
  { id: "utxo2", amount: 30, source: "Received from Bob", status: "unspent" },
  { id: "utxo3", amount: 20, source: "Received from Charlie", status: "unspent" },
]

export function UTXOsVisualization() {
  const [utxos, setUtxos] = useState<UTXO[]>(initialUTXOs)
  const [sendAmount, setSendAmount] = useState(60)
  const [showTransaction, setShowTransaction] = useState(false)

  const totalBalance = utxos.filter((u) => u.status === "unspent").reduce((sum, u) => sum + u.amount, 0)

  const handleTransaction = () => {
    if (sendAmount > totalBalance) return

    setShowTransaction(true)
    // Simulate spending UTXOs
    let remaining = sendAmount
    const newUtxos = utxos.map((utxo) => {
      if (utxo.status === "spent" || remaining <= 0) return utxo
      if (utxo.amount <= remaining) {
        remaining -= utxo.amount
        return { ...utxo, status: "spent" as const }
      }
      return utxo
    })

    // Add change UTXO
    if (remaining > 0) {
      const changeAmount = utxos
        .filter((u) => u.status === "unspent")
        .reduce((sum, u) => sum + u.amount, 0) - sendAmount
      if (changeAmount > 0) {
        newUtxos.push({
          id: `utxo${Date.now()}`,
          amount: changeAmount,
          source: "Change from transaction",
          status: "unspent",
        })
      }
    }

    setUtxos(newUtxos)
  }

  const handleReset = () => {
    setUtxos(initialUTXOs)
    setShowTransaction(false)
    setSendAmount(60)
  }

  const selectedUTXOs = utxos.filter((u) => u.status === "unspent")
  const totalSelected = selectedUTXOs.reduce((sum, u) => sum + u.amount, 0)
  const change = totalSelected - sendAmount
  const fee = 0.17 // Example fee

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Understanding UTXOs</CardTitle>
          <CardDescription>Cardano's unique transaction model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            UTXO stands for "Unspent Transaction Output." Unlike account-based systems (like Ethereum), Cardano uses a
            UTXO model similar to Bitcoin. Understanding UTXOs is crucial for understanding how Cardano transactions
            work.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">UTXO Model</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Think of UTXOs like physical bills. You can't spend half a $20 bill—you use the whole bill and get
                change back. UTXOs work the same way.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Account Model</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Ethereum uses an account model where you have a balance. Cardano's UTXO model is different—you have
                multiple "coins" (UTXOs) of different amounts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive UTXO Demo */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Interactive UTXO Demo</CardTitle>
          <CardDescription>See how UTXOs work in a transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Your Wallet */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Your Wallet</h3>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                Total: {totalBalance} ADA
              </Badge>
            </div>

            <div className="space-y-2">
              {utxos.map((utxo) => (
                <div
                  key={utxo.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border-2 p-3 transition-all",
                    utxo.status === "unspent"
                      ? "border-primary/50 bg-primary/5"
                      : "border-muted bg-muted/30 opacity-60",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        utxo.status === "unspent" ? "bg-primary/20" : "bg-muted",
                      )}
                    >
                      <Coins className={cn("h-5 w-5", utxo.status === "unspent" ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{utxo.amount} ADA</p>
                      <p className="text-xs text-muted-foreground">{utxo.source}</p>
                    </div>
                  </div>
                  <Badge
                    variant={utxo.status === "unspent" ? "default" : "outline"}
                    className={utxo.status === "spent" ? "border-muted-foreground text-muted-foreground" : ""}
                  >
                    {utxo.status === "unspent" ? "Unspent" : "Spent"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Input */}
          {!showTransaction && (
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">Amount to Send (ADA)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value))}
                  min="0.1"
                  max={totalBalance}
                  step="0.1"
                  className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Available: {totalBalance} ADA {sendAmount > totalBalance && "(Insufficient funds)"}
                </p>
              </div>
              <button
                onClick={handleTransaction}
                disabled={sendAmount > totalBalance || sendAmount <= 0}
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Create Transaction
              </button>
            </div>
          )}

          {/* Transaction Result */}
          {showTransaction && (
            <div className="space-y-4">
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Transaction Created</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <span className="text-sm text-muted-foreground">Amount Sent</span>
                    <span className="font-mono font-semibold text-foreground">{sendAmount} ADA</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <span className="text-sm text-muted-foreground">Transaction Fee</span>
                    <span className="font-mono font-semibold text-accent">{fee} ADA</span>
                  </div>
                  {change > 0 && (
                    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <span className="text-sm text-muted-foreground">Change Returned</span>
                      <span className="font-mono font-semibold text-primary">{change.toFixed(2)} ADA</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <h3 className="mb-3 font-semibold text-foreground">What Happened?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>
                      Selected UTXOs totaling {totalSelected} ADA were used (you can't spend part of a UTXO)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>
                      {sendAmount} ADA was sent to the recipient, plus {fee} ADA fee
                    </span>
                  </li>
                  {change > 0 && (
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        {change.toFixed(2)} ADA was returned to you as a new UTXO (change)
                      </span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>The used UTXOs are now marked as "spent" and can't be used again</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleReset}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 font-medium transition-colors hover:bg-muted"
              >
                Reset Demo
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Key Concepts</CardTitle>
          <CardDescription>Understanding UTXOs in depth</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TooltipProvider>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">What is a UTXO?</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            A UTXO is an unspent transaction output—a "coin" of a specific amount that hasn't been spent
                            yet.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      A UTXO is like a physical coin or bill. When someone sends you ADA, you receive a UTXO of that
                      amount. Your wallet balance is the sum of all your unspent UTXOs. Each UTXO has a specific amount
                      and can only be spent entirely—you can't spend part of a UTXO.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <ArrowRightLeft className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">How Transactions Work</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            To send ADA, you select UTXOs to use as inputs, specify outputs, and pay a fee. Change is
                            returned as a new UTXO.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      When you want to send ADA, your wallet selects UTXOs that total at least the amount you want to
                      send. These become transaction inputs. The transaction creates outputs: one to the recipient and
                      one back to you (change). The difference between inputs and outputs goes to fees. After the
                      transaction, the input UTXOs are marked as spent and can't be used again.
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
                      <h3 className="font-semibold text-foreground">Change Output</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            When you spend UTXOs worth more than you're sending, the excess is returned as change in a new
                            UTXO.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      If you have a 50 ADA UTXO and want to send 30 ADA, you can't split the UTXO. Instead, you spend
                      the entire 50 ADA UTXO, send 30 ADA to the recipient, and receive 20 ADA back as change in a new
                      UTXO. This is why transactions can create multiple outputs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Wallet className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">UTXO Selection</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Wallets automatically select which UTXOs to use, typically trying to minimize the number of
                            inputs and outputs.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Your wallet automatically selects which UTXOs to use for each transaction. It tries to minimize
                      transaction size (which affects fees) and the number of UTXOs. This is why you might see your
                      wallet consolidate smaller UTXOs when making transactions. You generally don't need to worry
                      about UTXO selection—your wallet handles it automatically.
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

