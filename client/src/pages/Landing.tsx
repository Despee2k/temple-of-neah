import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { BlockChainVisualization } from "@/components/block-chain-visualization"
import { Blocks, ArrowRightLeft, Sparkles, BookOpen, Eye, Zap } from "lucide-react"
import { Link } from "react-router-dom"

function Landing() {
  return (
	 <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Powered by Real Blockchain Data</span>
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Learn Cardano Through Real Data
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Transform complex blockchain concepts into visual, interactive lessons. Explore real Cardano blocks,
              transactions, and ADA movement with beginner-friendly explanations.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/modules">
                <Button size="lg" className="gap-2">
                  Start Learning
                  <BookOpen className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/explorer">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Explore Blocks
                  <Blocks className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Blockchain Demo */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">See It In Action</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Watch how blocks are linked together in real-time to form the blockchain
          </p>
        </div>

        <BlockChainVisualization />
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Interactive modules that break down blockchain complexity into simple, visual steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Link to="/modules/blocks">
            <Card className="relative h-full cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Blocks className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">What is a Block?</CardTitle>
                <CardDescription>
                  Understand blockchain fundamentals with visual breakdowns of real Cardano blocks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Block structure and components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Timestamps and block heights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Hash connections explained</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/modules/transactions">
            <Card className="relative h-full cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-accent hover:shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/10" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <ArrowRightLeft className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">Transaction Flow</CardTitle>
                <CardDescription>
                  Follow ADA movement with animated, step-by-step transaction visualizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Input and output addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Transaction fees breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Animated flow diagrams</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/explorer">
            <Card className="relative h-full cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Live Block Explorer</CardTitle>
                <CardDescription>
                  Explore real-time Cardano blockchain data with interactive tooltips and guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Live blockchain data via Argus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Interactive tooltips everywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Search and filter capabilities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Built for Beginners</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                No prior blockchain experience required. Our interactive modules transform technical jargon into clear,
                visual explanations that anyone can understand.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Real Data, Real Learning</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Powered by Argus indexer for authentic Cardano blockchain exploration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <BookOpen className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Step-by-Step Modules</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Progressive lessons that build your understanding from basics to advanced
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Interactive Visuals</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Animated flows and tooltips make complex concepts instantly clear
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                    <span className="text-sm font-medium text-foreground">Block Height</span>
                    <span className="font-mono text-sm text-primary">8,234,567</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                    <span className="text-sm font-medium text-foreground">Transactions</span>
                    <span className="font-mono text-sm text-primary">42</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                    <span className="text-sm font-medium text-foreground">Total ADA</span>
                    <span className="font-mono text-sm text-primary">125,430</span>
                  </div>
                  <div className="rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 text-center">
                    <p className="text-sm font-medium text-primary">Click any value to learn more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 text-center sm:p-12">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Start Your Blockchain Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Join students and developers learning Cardano through real, interactive blockchain data
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/modules">
              <Button size="lg" className="gap-2">
                Explore First Module
                <BookOpen className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/explorer">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View Live Blocks
                <Blocks className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">Built with real Cardano data via Argus indexer</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing