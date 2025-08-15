import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, Heart } from "lucide-react"

export function CommunitySection() {
  return (
    <section className="py-24 section-gradient-purple">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Join Our <span className="gradient-text">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with healthcare innovators, researchers, and advocates building the decentralized future of health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg mb-2">Active Community</h3>
                    <p className="text-muted-foreground">
                      "The Health Protocol community is incredibly supportive. We're all working together to
                      revolutionize healthcare data ownership."
                    </p>
                    <p className="text-sm text-purple-500 mt-2 font-semibold">- Sarah Chen, Early Adopter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-l-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg mb-2">Research Impact</h3>
                    <p className="text-muted-foreground">
                      "By contributing my data through Health Protocol, I'm helping advance medical research while
                      maintaining complete privacy control."
                    </p>
                    <p className="text-sm text-pink-500 mt-2 font-semibold">- Dr. Michael Rodriguez, Researcher</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-transparent border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-500"
              >
                View Governance Forum
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/diverse-health-tech.png"
              alt="Health Protocol Community"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-heading text-2xl shadow-lg">
              10K+
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
