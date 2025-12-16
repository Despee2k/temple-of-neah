import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Blocks, Shield, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetStarted() {
	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
				<div className="space-y-3">
					<p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
						<Sparkles className="h-4 w-4 text-primary" />
						New to Cardano? Start here.
					</p>
					<h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">Get Started</h1>
					<p className="text-pretty text-lg text-muted-foreground sm:text-xl">
						A quick onboarding path for beginners: set up a wallet, understand blocks, and take your first guided lesson.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link to="/modules/blocks">
							<Button size="lg" className="gap-2">
								Start with Blocks
								<Blocks className="h-4 w-4" />
							</Button>
						</Link>
						<Link to="/modules/wallets">
							<Button size="lg" variant="outline" className="gap-2 bg-transparent">
								Learn Wallets
								<Wallet className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<Card className="border-border bg-card">
						<CardHeader>
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
								<Blocks className="h-6 w-6 text-accent" />
							</div>
							<CardTitle className="text-foreground">1) Understand Blocks</CardTitle>
							<CardDescription>See how data is organized on-chain</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 text-sm text-muted-foreground">
							<ul className="space-y-2">
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
									Learn block structure, height, and hashes
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
									Explore live data in the Block Explorer
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
									See how blocks link together over time
								</li>
							</ul>
							<div className="flex flex-col gap-2">
								<Link to="/modules/blocks">
									<Button variant="outline" className="w-full gap-2 bg-transparent">
										Open Blocks Module
										<ArrowRight className="h-4 w-4" />
									</Button>
								</Link>
								<Link to="/explorer">
									<Button variant="ghost" className="w-full gap-2">
										View Live Explorer
										<ArrowRight className="h-4 w-4" />
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					<Card className="border-border bg-card">
						<CardHeader>
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
								<Wallet className="h-6 w-6 text-primary" />
							</div>
							<CardTitle className="text-foreground">2) Set up a Wallet</CardTitle>
							<CardDescription>Learn how to store and secure your ADA</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 text-sm text-muted-foreground">
							<ul className="space-y-2">
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Choose a wallet type (hardware recommended for security)
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Back up your recovery phrase safely (never store it online)
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Try receiving test ADA on a fresh address
								</li>
							</ul>
							<Link to="/modules/wallets">
								<Button variant="outline" className="w-full gap-2 bg-transparent">
									Open Wallets Module
									<ArrowRight className="h-4 w-4" />
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="border-border bg-card">
						<CardHeader>
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
								<Shield className="h-6 w-6 text-primary" />
							</div>
							<CardTitle className="text-foreground">3) Stay Safe</CardTitle>
							<CardDescription>Security habits before you transact</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 text-sm text-muted-foreground">
							<ul className="space-y-2">
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Double-check addresses; use small test sends first
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Never share your recovery phrase or private keys
								</li>
								<li className="flex gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Keep wallet software and browser extensions updated
								</li>
							</ul>
							<Link to="/modules/transactions">
								<Button variant="outline" className="w-full gap-2 bg-transparent">
									Learn Transactions
									<ArrowRight className="h-4 w-4" />
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>

				<Card className="border-border bg-card">
					<CardHeader>
						<CardTitle className="text-foreground">Quick Start Checklist</CardTitle>
						<CardDescription>Follow these steps in order</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-2 font-semibold text-foreground">
								<BookOpen className="h-4 w-4 text-primary" />
								<span>Step-by-step</span>
							</div>
							<ol className="list-decimal space-y-1 pl-5">
								<li>Explore a block in the Blocks module</li>
								<li>Pick a wallet type and back up your recovery phrase</li>
								<li>Receive ADA on a fresh address (try a small amount)</li>
								<li>Send a tiny test transaction to yourself</li>
								<li>Review security tips before larger transactions</li>
							</ol>
						</div>
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-2 font-semibold text-foreground">
								<Sparkles className="h-4 w-4 text-accent" />
								<span>Next modules</span>
							</div>
							<ul className="space-y-1">
								<li>Blocks → how data is organized</li>
								<li>Wallets & Addresses → foundation for safety</li>
								<li>Transactions → how ADA moves</li>
								<li>UTXOs → why change outputs exist</li>
								<li>Staking → earn rewards safely</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

