import { Navigation } from "@/components/navigation"
import { StakingVisualization } from "@/components/staking-visualization"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function StakingModule() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/modules">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Staking & Delegation</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Learn how Cardano's Proof-of-Stake system works. Explore stake pools, calculate rewards, and understand how
            delegation helps secure the network while earning passive income.
          </p>
        </div>

        <StakingVisualization />
      </div>
    </div>
  )
}

