import { Navigation } from "@/components/navigation"
import { EpochsSlotsVisualization } from "@/components/epochs-slots-visualization"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function EpochsModule() {
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
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Epochs & Slots</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Understand Cardano's unique time system. Learn how slots and epochs organize blockchain time, when staking
            rewards are distributed, and how protocol updates are scheduled.
          </p>
        </div>

        <EpochsSlotsVisualization />
      </div>
    </div>
  )
}

