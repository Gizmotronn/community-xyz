import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Twitter, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#181A20] border-t border-[#222] text-white">
  <div className="container mx-auto px-6 py-16">
  <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-2xl gradient-text text-white">Health Protocol</h3>
            <p className="text-gray-300 max-w-md">
              Empowering individuals to own, control, and monetize their health data through decentralized technology.
              Building the future of healthcare, one block at a time.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:text-white">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white">Protocol</h4>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Whitepaper
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tokenomics
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Governance
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Roadmap
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white">Stay Updated</h4>
            <p className="text-sm text-gray-400">
              Get the latest updates on Health Protocol development and community news.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter email" className="flex-1 bg-[#222] text-white border-gray-600 placeholder-gray-400" />
              <Button size="icon" className="border-gray-600 text-gray-300 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#222] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 Health Protocol. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
