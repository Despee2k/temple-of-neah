import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Blocks, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export function Navigation() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="border-border bg-card border-b">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-2">
						<div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
							<Blocks className="text-primary-foreground h-5 w-5" />
						</div>
						<span className="text-foreground text-xl font-semibold">Learn Cardano</span>
					</Link>

					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="h-9 w-9">
							{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
						</Button>

						<div className="hidden items-center gap-6 md:flex">
							<Link
								to="/modules"
								className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
							>
								Modules
							</Link>
							<Link
								to="/explorer"
								className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
							>
								Block Explorer
							</Link>
							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
							>
								About
							</Link>
							<Link to="/modules">
								<Button size="sm">Get Started</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
