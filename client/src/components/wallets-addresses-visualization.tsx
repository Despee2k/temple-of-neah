import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Wallet, Key, Shield, Eye, Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface WalletType {
  id: string
  name: string
  description: string
  security: "high" | "medium" | "low"
  features: string[]
  icon: string
}

const walletTypes: WalletType[] = [
  {
    id: "hardware",
    name: "Hardware Wallet",
    description: "Physical device that stores keys offline",
    security: "high",
    features: ["Cold storage", "Offline keys", "Maximum security", "Best for large amounts"],
    icon: "🔒",
  },
  {
    id: "mobile",
    name: "Mobile Wallet",
    description: "App on your smartphone",
    security: "medium",
    features: ["Convenient", "QR codes", "Mobile payments", "Good for daily use"],
    icon: "📱",
  },
  {
    id: "desktop",
    name: "Desktop Wallet",
    description: "Application on your computer",
    security: "medium",
    features: ["Full control", "Advanced features", "Staking support", "Good balance"],
    icon: "💻",
  },
  {
    id: "web",
    name: "Web Wallet",
    description: "Browser-based wallet",
    security: "low",
    features: ["Easy access", "No installation", "Quick setup", "Use with caution"],
    icon: "🌐",
  },
]

const exampleAddress = "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnjhl8h5nqvn80fn4s77rve44"
const shortAddress = "addr1qx2fxv2um...80fn4s77rve44"

export function WalletsAddressesVisualization() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedWalletData = walletTypes.find((w) => w.id === selectedWallet)

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Wallets & Addresses</CardTitle>
          <CardDescription>Your gateway to the Cardano blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A wallet is your interface to the Cardano blockchain. It stores your keys, manages your addresses, and lets
            you send and receive ADA. Understanding wallets and addresses is the first step to using Cardano.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Wallets</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Software or hardware that stores your private keys and lets you interact with the blockchain. Your ADA
                isn't actually "in" the wallet—it's on the blockchain.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Addresses</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Public identifiers where you receive ADA. Like an email address, you can share it freely. Each wallet
                can generate multiple addresses for privacy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Types */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Types of Wallets</CardTitle>
          <CardDescription>Choose the right wallet for your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {walletTypes.map((wallet) => {
              const isSelected = selectedWallet === wallet.id

              return (
                <div
                  key={wallet.id}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-4 transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-background hover:border-primary/50",
                  )}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{wallet.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{wallet.name}</h3>
                        <p className="text-xs text-muted-foreground">{wallet.description}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        wallet.security === "high"
                          ? "border-green-500 text-green-500"
                          : wallet.security === "medium"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-red-500 text-red-500",
                      )}
                    >
                      {wallet.security === "high" ? "High" : wallet.security === "medium" ? "Medium" : "Low"} Security
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    {wallet.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {selectedWalletData && (
            <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="mb-2 font-semibold text-foreground">Why choose {selectedWalletData.name}?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedWalletData.security === "high" &&
                  "Hardware wallets offer the highest security by keeping your private keys completely offline. They're essential for storing large amounts of ADA safely."}
                {selectedWalletData.security === "medium" && selectedWalletData.id === "mobile" &&
                  "Mobile wallets offer a great balance of convenience and security. Perfect for everyday transactions and staking on the go."}
                {selectedWalletData.security === "medium" && selectedWalletData.id === "desktop" &&
                  "Desktop wallets give you full control over your keys while providing advanced features like staking and token management."}
                {selectedWalletData.security === "low" &&
                  "Web wallets are convenient but less secure. Only use them for small amounts and always ensure you're on the official website."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address Structure */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Understanding Addresses</CardTitle>
          <CardDescription>How Cardano addresses work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Example Cardano Address</h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="break-all font-mono text-xs text-foreground">{exampleAddress}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              This is a full Cardano address. It's safe to share publicly—people can send you ADA but can't access
              your funds.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-sm font-bold text-primary">addr</span>
                </div>
                <h3 className="font-semibold text-foreground">Prefix</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cardano addresses start with "addr1" for mainnet. This identifies it as a Cardano address.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Key className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Public Key</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The main part of the address is derived from your public key. This is what people use to send you ADA.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Checksum</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The end of the address includes a checksum to detect typos. If you mistype an address, the checksum will
                be wrong.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Private Keys & Security */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-foreground">⚠️ Private Keys & Security</CardTitle>
          <CardDescription>Critical security information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-destructive/20 bg-background p-4">
            <div className="mb-3 flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-destructive" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Never Share Your Private Key</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Your private key is like the password to your bank account. Anyone who has it can control your ADA.
                  Never share it with anyone, ever. Legitimate services will never ask for your private key.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold text-foreground">✅ Do</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Back up your recovery phrase in a safe place</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Use hardware wallets for large amounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Verify addresses before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Keep your wallet software updated</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold text-foreground">❌ Don't</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Share your private key or recovery phrase</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Store keys in screenshots or cloud storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Click suspicious links or download unknown software</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Send ADA to addresses without double-checking</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Key Concepts</CardTitle>
          <CardDescription>Essential wallet and address terminology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TooltipProvider>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Wallet</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Software or hardware that manages your keys and lets you interact with the blockchain. Your
                            ADA is stored on the blockchain, not in the wallet.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      A wallet is essentially a key manager. It stores your private keys (which prove you own your ADA)
                      and provides an interface to send transactions. The wallet doesn't actually "hold" your ADA—that's
                      stored on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Key className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Private Key</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            A secret number that proves ownership of your ADA. Never share this with anyone.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Your private key is a secret number that mathematically proves you own the ADA associated with
                      your addresses. It's used to sign transactions. If someone gets your private key, they can steal
                      your funds. This is why security is paramount.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Public Address</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            A public identifier derived from your public key. Safe to share—people can send you ADA but
                            can't access your funds.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Your address is like your bank account number—you can share it publicly so people can send you ADA.
                      It's derived from your public key (which is derived from your private key). The address itself
                      doesn't reveal your private key, so it's safe to share.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Recovery Phrase</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            A series of words that can restore your wallet. Write it down and store it securely—never
                            store it digitally.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      When you create a wallet, you're given a recovery phrase (usually 12 or 24 words). This phrase
                      can regenerate your private keys. If you lose your wallet but have the recovery phrase, you can
                      restore access. Write it down on paper and store it securely—never take photos or store it on
                      your computer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}

