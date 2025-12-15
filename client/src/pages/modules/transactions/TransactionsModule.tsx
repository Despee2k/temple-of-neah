import { Navigation } from "@/components/navigation"
import { TransactionFlow } from "@/components/transaction-flow"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function TransactionsModule() {
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
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">How Transactions Work</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Watch ADA flow from sender to receiver. Click "Play Animation" to see a step-by-step breakdown of a
            transaction with explanations at each stage.
          </p>
        </div>

        <TransactionFlow />
      </div>
    </div>
  )
}
