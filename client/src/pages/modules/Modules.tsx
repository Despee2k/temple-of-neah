import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Blocks, ArrowRightLeft, BookOpen, Coins, Calendar, Wallet, Package } from "lucide-react"
import { Link } from "react-router-dom"

export default function Modules() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">Learning Modules</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Interactive lessons that transform blockchain complexity into simple, visual explanations
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Learning Path:</span> Modules are ordered by importance for
            beginners. Start with Blocks, then Wallets, and work your way through!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Blocks - Foundation */}
          <Link to="/modules/blocks">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    #1 Foundation
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Blocks className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">What is a Block?</CardTitle>
                <CardDescription>Learn the fundamentals of blockchain blocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>15 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 2. Wallets - Essential */}
          <Link to="/modules/wallets">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    #2 Essential
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Wallets & Addresses</CardTitle>
                <CardDescription>Your gateway to using Cardano safely</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>20 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 3. Transactions - Core Functionality */}
          <Link to="/modules/transactions">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-accent hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-accent text-accent">
                    #3 Core
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <ArrowRightLeft className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">How Transactions Work</CardTitle>
                <CardDescription>Visualize ADA movement and transaction flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>20 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 4. UTXOs - Understanding Transactions */}
          <Link to="/modules/utxos">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    #4 Advanced
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Understanding UTXOs</CardTitle>
                <CardDescription>Master Cardano's unique transaction model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>22 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 5. Staking - Earning Rewards */}
          <Link to="/modules/staking">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    #5 Earning
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Staking & Delegation</CardTitle>
                <CardDescription>Understand Cardano's Proof-of-Stake system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>25 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 6. Epochs - Timing System */}
          <Link to="/modules/epochs">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-accent hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-accent text-accent">
                    #6 Timing
                  </Badge>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">Epochs & Slots</CardTitle>
                <CardDescription>Learn Cardano's unique time system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>18 min interactive lesson</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
