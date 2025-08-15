import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Twitter, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-2xl gradient-text">Health Protocol</h3>
            <p className="text-muted-foreground max-w-md">
              Empowering individuals to own, control, and monetize their health data through decentralized technology.
              Building the future of healthcare, one block at a time.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg">Protocol</h4>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Whitepaper
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Tokenomics
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Governance
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Roadmap
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on Health Protocol development and community news.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter email" className="flex-1" />
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Health Protocol. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
