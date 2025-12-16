import { Navigation } from "@/components/navigation"
import { UTXOsVisualization } from "@/components/utxos-visualization"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function UTXOsModule() {
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
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Understanding UTXOs</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Master Cardano's unique UTXO model. Learn how transactions work differently from account-based systems, how
            change is handled, and why understanding UTXOs is crucial for using Cardano effectively.
          </p>
        </div>

        <UTXOsVisualization />
      </div>
    </div>
  )
}

