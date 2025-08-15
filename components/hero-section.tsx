import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { WalletConnectButton } from "./wallet-connect-button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with generated image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder-jnyni.png"
          alt="Health Protocol Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Floating elements for web3 aesthetic */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-accent/10 animate-bounce" />
      <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-primary/20 animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main headline */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight">
            <span className="gradient-text">Health Protocol</span>
            <br />
            <span className="text-foreground">Owns Your Data</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Take control of your health data with decentralized technology. Join thousands building the future of
            healthcare ownership.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <WalletConnectButton />

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text">10K+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text">$2M+</div>
              <div className="text-sm text-muted-foreground">Data Value Secured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">Health Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
