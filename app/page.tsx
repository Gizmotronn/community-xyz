import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CommunitySection } from "@/components/community-section"
import { IntegrationSection } from "@/components/integration-section"
import { Footer } from "@/components/footer"
import { FloatingNavigation } from "@/components/floating-navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <FloatingNavigation />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="community">
        <CommunitySection />
      </div>
      <div id="integration">
        <IntegrationSection />
      </div>
      <Footer />
    </main>
  )
}
