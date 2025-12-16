import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, BookOpen, Eye, Zap } from "lucide-react"

interface Developer {
  name: string
  role: string
  bio: string
  image: string
}

const developers: Developer[] = [
  {
    name: "Zeus Elderfield",
    role: "Lead Full Stack Engineer",
    bio: "Leads the full-stack development of the Cardano platform, connecting the Argus indexer with a scalable",
    image: "/images/developers/zeus.jpg",
  },
  {
    name: "Reynat Daganta",
    role: "AI Engineer",
    bio: "Builds AI-driven features that turn complex Cardano blockchain data into engaging and easy-to-understand learning experiences.",
    image: "/images/developers/reynat.jpg",
  },
  {
    name: "Jyreneah Angel",
    role: "UI/UX Designer",
    bio: "Designs intuitive and visually engaging interfaces that simplify Cardano blockchain concepts for users.",
    image: "/images/developers/neah.jpg",
  },
  {
    name: "Ron Ramas",
    role: "Frontend Developer",
    bio: "Develops responsive React + TypeScript interfaces that transform indexed Cardano data into clear, interactive visuals.",
    image: "/images/developers/ron.jpg",
  },
  {
    name: "Destin Ecarma",
    role: "Devops Engineer",
    bio: "Maintains the infrastructure, deployments, and reliability of the Cardano platform and its indexing services.",
    image: "/images/developers/destin.png",
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* App Description Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">About Learn Cardano</h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Transforming blockchain complexity into visual, interactive learning experiences
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Learn Cardano is an interactive, beginner-friendly web application that helps users understand how
                  the Cardano blockchain works by transforming real blockchain data into visual explanations. Instead
                  of showing raw blocks, transactions, or cryptic data structures, we simplify and explain them using
                  clean UI, diagrams, and guided walkthroughs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Our backend uses Argus to index real Cardano blockchain data. From each block, we extract only
                  essential, beginner-friendly information like slot numbers, transaction counts, total ADA moved, and
                  fees. This data is then presented through interactive learning modules that explain what's actually
                  happening on the Cardano blockchain in plain language.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground">Key Features</CardTitle>
                <CardDescription>What makes Learn Cardano unique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Real Data</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Powered by Argus indexer for authentic Cardano blockchain exploration
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-accent" />
                      <h3 className="font-semibold text-foreground">Visual Learning</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interactive modules with tooltips, animations, and step-by-step explanations
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Beginner-Friendly</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No prior blockchain experience required. Learn at your own pace.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Developers Section */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Meet the Team</h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              The developers behind Learn Cardano
            </p>
          </div>

          <div className="flex gap-8 justify-center">
            {developers.slice(0, 3).map((developer, index) => (
              <Card key={index} className="border-border bg-card max-w-80">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to a colored placeholder if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&size=128&background=random`
                      }}
                    />
                  </div>
                  <CardTitle className="text-foreground">{developer.name}</CardTitle>
                  <CardDescription>{developer.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">{developer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-8 justify-center">
            {developers.slice(3).map((developer, index) => (
              <Card key={index} className="border-border bg-card max-w-80">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to a colored placeholder if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&size=128&background=random`
                      }}
                    />
                  </div>
                  <CardTitle className="text-foreground">{developer.name}</CardTitle>
                  <CardDescription>{developer.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">{developer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="mt-16">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Built With</CardTitle>
              <CardDescription>Technologies powering Learn Cardano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground">Frontend</h3>
                  <p className="mt-1 text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground">Backend</h3>
                  <p className="mt-1 text-sm text-muted-foreground">.NET, C#</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground">Data Indexing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Argus Indexer</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground">Blockchain</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Cardano</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

