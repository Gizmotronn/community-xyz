import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowRight, CheckCircle } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Link your Web3 wallet to securely authenticate and manage your health data ownership.",
  },
  {
    step: "02",
    title: "Verify Identity",
    description: "Complete a privacy-preserving identity verification to ensure data integrity and security.",
  },
  {
    step: "03",
    title: "Import Data",
    description: "Securely import your existing health records or start fresh with our partner providers.",
  },
  {
    step: "04",
    title: "Earn Rewards",
    description: "Start earning tokens by contributing to research, governance, and ecosystem growth.",
  },
]

export function IntegrationSection() {
  return (
    <section className="py-24 section-gradient-orange">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Get Started in <span className="gradient-text">Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple onboarding process designed for both crypto natives and healthcare newcomers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 border hover:border-orange-400/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-heading text-lg shadow-lg">
                      {step.step}
                    </div>
                    <CardTitle className="font-heading text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground ml-16">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
              <CardContent className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <Wallet className="h-10 w-10 text-orange-500" />
                </div>

                <div>
                  <h3 className="font-heading text-2xl mb-2">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of users taking control of their health data with blockchain technology.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>No monthly fees or subscriptions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>Complete data ownership and control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>Earn rewards for participation</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                >
                  Connect Wallet Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
