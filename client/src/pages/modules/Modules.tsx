import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Blocks, ArrowRightLeft, BookOpen } from "lucide-react"
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/modules/blocks">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
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

          <Link to="/modules/transactions">
            <Card className="h-full cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ArrowRightLeft className="h-6 w-6 text-primary" />
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
        </div>
      </div>
    </div>
  )
}
