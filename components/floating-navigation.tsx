"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Users, Zap, Globe, MessageCircle } from "lucide-react"
import Link from "next/link"

export function FloatingNavigation() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY

      setIsSticky(scrollPosition > heroHeight - 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isSticky ? "top-4 left-1/2 -translate-x-1/2" : "bottom-8 left-1/2 -translate-x-1/2"
      }`}
    >
      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full px-4 py-3 shadow-2xl">

        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("hero")}
          className="rounded-full px-4 py-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>       

        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("litepaper")}
          className="rounded-full px-4 py-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
        >
          <Globe className="h-4 w-4 mr-2" />
          Litepaper
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("team")}
          className="rounded-full px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300"
        >
          <Users className="h-4 w-4 mr-2" />
          Team
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("roadmap")}
          className="rounded-full px-4 py-2 hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300"
        >
          <Globe className="h-4 w-4 mr-2" />
          Roadmap
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Link href="https://discord.com/invite/drUNgZEFZw"><Button
          size="sm"
          className="rounded-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Discord
        </Button></Link>
      </div>
    </nav>
  )
}
