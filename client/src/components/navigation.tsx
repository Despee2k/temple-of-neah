import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg">
              <img src="/images/cardano.png" alt="Cardano Logo" className="h-8 w-8" />
            </div>
            <span className="text-xl font-semibold text-foreground">Learn Cardano</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/modules"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Modules
            </Link>
            <Link
              to="/explorer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Block Explorer
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link to="/get-started">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
