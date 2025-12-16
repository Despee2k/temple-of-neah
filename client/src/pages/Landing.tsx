import { BlockChainVisualization } from "@/components/block-chain-visualization";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, ArrowRightLeft, Sparkles, BookOpen, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<div className="bg-background min-h-screen">
			<Navigation />

			{/* Hero Section */}
			<section className="border-border relative overflow-hidden border-b">
				<div className="from-primary/5 via-background to-accent/5 absolute inset-0 bg-gradient-to-br" />
				<div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<div className="border-border bg-card mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
							<Sparkles className="text-primary h-4 w-4" />
							<span className="text-muted-foreground">Powered by Real Blockchain Data</span>
						</div>
						<h1 className="text-foreground text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
							Learn Cardano Through Real Data
						</h1>
						<p className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
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
					<h2 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">See It In Action</h2>
					<p className="text-muted-foreground mt-4 text-lg text-pretty">
						Watch how blocks are linked together in real-time to form the blockchain
					</p>
				</div>

				<BlockChainVisualization />
			</section>

			{/* Features Section */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">How It Works</h2>
					<p className="text-muted-foreground mt-4 text-lg text-pretty">
						Interactive modules that break down blockchain complexity into simple, visual steps
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					<Link to="/modules/blocks">
						<Card className="border-border bg-card hover:border-primary relative h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg">
							<div className="bg-primary/10 absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full" />
							<CardHeader>
								<div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
									<Blocks className="text-primary h-6 w-6" />
								</div>
								<CardTitle className="text-foreground">What is a Block?</CardTitle>
								<CardDescription>
									Understand blockchain fundamentals with visual breakdowns of real Cardano blocks
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="text-muted-foreground space-y-2 text-sm">
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Block structure and components</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Timestamps and block heights</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Hash connections explained</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</Link>

					<Link to="/modules/transactions">
						<Card className="border-border bg-card hover:border-primary relative h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg">
							<div className="bg-primary/10 absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full" />
							<CardHeader>
								<div className="bg-accent/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
									<ArrowRightLeft className="text-accent h-6 w-6" />
								</div>
								<CardTitle className="text-foreground">Transaction Flow</CardTitle>
								<CardDescription>
									Follow ADA movement with animated, step-by-step transaction visualizations
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="text-muted-foreground space-y-2 text-sm">
									<li className="flex items-start gap-2">
										<div className="bg-accent mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Input and output addresses</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-accent mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Transaction fees breakdown</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-accent mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Animated flow diagrams</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</Link>

					<Link to="/explorer">
						<Card className="border-border bg-card hover:border-primary relative h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg">
							<div className="bg-primary/10 absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full" />
							<CardHeader>
								<div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
									<Eye className="text-primary h-6 w-6" />
								</div>
								<CardTitle className="text-foreground">Live Block Explorer</CardTitle>
								<CardDescription>
									Explore real-time Cardano blockchain data with interactive tooltips and guides
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="text-muted-foreground space-y-2 text-sm">
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Live blockchain data via Argus</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Interactive tooltips everywhere</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" />
										<span>Search and filter capabilities</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="border-border bg-muted/30 border-y">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
						<div>
							<h2 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">Built for Beginners</h2>
							<p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
								No prior blockchain experience required. Our interactive modules transform technical jargon into clear,
								visual explanations that anyone can understand.
							</p>
							<div className="mt-8 space-y-4">
								<div className="flex items-start gap-4">
									<div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
										<Zap className="text-primary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-foreground font-semibold">Real Data, Real Learning</h3>
										<p className="text-muted-foreground mt-1 text-sm">
											Powered by Argus indexer for authentic Cardano blockchain exploration
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
										<BookOpen className="text-primary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-foreground font-semibold">Step-by-Step Modules</h3>
										<p className="text-muted-foreground mt-1 text-sm">
											Progressive lessons that build your understanding from basics to advanced
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
										<Sparkles className="text-primary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-foreground font-semibold">Interactive Visuals</h3>
										<p className="text-muted-foreground mt-1 text-sm">
											Animated flows and tooltips make complex concepts instantly clear
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<div className="border-border bg-card rounded-xl border p-8">
								<div className="space-y-4">
									<div className="border-border bg-background flex items-center justify-between rounded-lg border p-4">
										<span className="text-foreground text-sm font-medium">Block Height</span>
										<span className="text-primary font-mono text-sm">8,234,567</span>
									</div>
									<div className="border-border bg-background flex items-center justify-between rounded-lg border p-4">
										<span className="text-foreground text-sm font-medium">Transactions</span>
										<span className="text-primary font-mono text-sm">42</span>
									</div>
									<div className="border-border bg-background flex items-center justify-between rounded-lg border p-4">
										<span className="text-foreground text-sm font-medium">Total ADA</span>
										<span className="text-primary font-mono text-sm">125,430</span>
									</div>
									<div className="border-primary/50 bg-primary/5 rounded-lg border border-dashed p-4 text-center">
										<p className="text-primary text-sm font-medium">Click any value to learn more</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
				<div className="border-border from-primary/10 via-card to-accent/10 rounded-2xl border bg-gradient-to-br p-8 text-center sm:p-12">
					<h2 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">
						Start Your Blockchain Journey Today
					</h2>
					<p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg text-pretty">
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
			<footer className="border-border bg-card border-t">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<p className="text-muted-foreground text-center text-sm">Built with real Cardano data via Argus indexer</p>
				</div>
			</footer>
		</div>
	);
}

export default Landing;
