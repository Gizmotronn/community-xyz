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
        {/* Brown/dark overlay for web3 feel, with grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A13A2E] via-[#233B54]/90 to-[#A46A8F]/80 opacity-95" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20 mix-blend-overlay" />
      </div>

  {/* Enhanced floating elements for web3 aesthetic */}
  <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#A46A8F]/60 border-4 border-[#F6A23A] blur-sm animate-pulse" />
  <div className="absolute bottom-32 right-16 w-20 h-20 rounded-full bg-[#F6A23A]/60 border-4 border-[#A13A2E] blur-sm animate-bounce" />
  <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-[#6AD1E3]/60 border-4 border-[#233B54] blur-sm animate-pulse delay-1000" />
  <div className="absolute left-1/2 top-1/4 w-32 h-8 rounded-full bg-[#F6F1D5]/30 border border-[#A46A8F] rotate-12 animate-spin-slow" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10 py-16">
          {/* Main headline */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-xl">
            <span className="gradient-text">Health Protocol</span>
            <br />
            <span className="text-foreground font-bold bg-[#F6A23A]/80 px-4 py-2 rounded-xl inline-block drop-shadow-lg">Owns Your Data</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#F6F1D5] max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Take control of your health data with <span className="text-accent font-semibold">decentralized technology</span>.<br />
            Join thousands building the future of healthcare ownership.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <WalletConnectButton />

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-accent text-accent bg-[#233B54]/80 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text drop-shadow-lg">10K+</div>
              <div className="text-sm text-[#F6A23A] font-semibold">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text drop-shadow-lg">$2M+</div>
              <div className="text-sm text-[#6AD1E3] font-semibold">Data Value Secured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading gradient-text drop-shadow-lg">50+</div>
              <div className="text-sm text-[#A46A8F] font-semibold">Health Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
