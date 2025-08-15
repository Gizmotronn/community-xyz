import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Data Sovereignty",
    description:
      "Your health data belongs to you. Control who accesses it and how it's used with blockchain-powered ownership.",
  },
  {
    icon: Database,
    title: "Decentralized Storage",
    description:
      "Health records stored across a distributed network, ensuring availability and preventing single points of failure.",
  },
  {
    icon: Users,
    title: "Community Governance",
    description:
      "Shape the future of Health Protocol through DAO governance. Every token holder has a voice in protocol decisions.",
  },
  {
    icon: Zap,
    title: "Instant Rewards",
    description:
      "Earn tokens for contributing health data, participating in research, and helping build the ecosystem.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 section-gradient-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Why Choose <span className="gradient-text">Health Protocol</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge blockchain technology to give you complete control over your most valuable asset: your
            health data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-400/50 hover:shadow-blue-500/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
