"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Users, Zap, Globe, MessageCircle, Activity, Menu, X } from "lucide-react"
import Link from "next/link"

export function FloatingNavigation() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    setIsMobileMenuOpen(false) 
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out hidden md:block ${isSticky ? "top-4 left-1/2 -translate-x-1/2" : "bottom-8 left-1/2 -translate-x-1/2"
          }`}
      >
        <div className="flex items-center gap-1 lg:gap-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full px-2 lg:px-4 py-2 lg:py-3 shadow-2xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("hero")}
            className="rounded-full px-2 lg:px-4 py-1 lg:py-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
          >
            <Home className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            <span className="text-xs lg:text-sm">Home</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("features")}
            className="rounded-full px-2 lg:px-4 py-1 lg:py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300"
          >
            <Zap className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            <span className="text-xs lg:text-sm">Features</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("community")}
            className="rounded-full px-2 lg:px-4 py-1 lg:py-2 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-300"
          >
            <Users className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            <span className="text-xs lg:text-sm">Community</span>
          </Button>

          <Link href="/health-scorecard-explorer">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-2 lg:px-4 py-1 lg:py-2 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300"
            >
              <Activity className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="text-xs lg:text-sm">Scorecards</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("integration")}
            className="rounded-full px-2 lg:px-4 py-1 lg:py-2 hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300"
          >
            <Globe className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            <span className="text-xs lg:text-sm">Integrate</span>
          </Button>

          <div className="w-px h-4 lg:h-6 bg-border mx-1 lg:mx-2" />

          <Button
            size="sm"
            className="rounded-full px-2 lg:px-4 py-1 lg:py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            <span className="text-xs lg:text-sm">Discord</span>
          </Button>
        </div>
      </nav>

      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out md:hidden ${isSticky ? "top-4 right-4" : "bottom-4 right-4"
          }`}
      >
        <Button
          onClick={toggleMobileMenu}
          size="sm"
          className="rounded-full p-3 bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl hover:shadow-xl transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {isMobileMenuOpen && (
          <div className={`absolute right-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-3 min-w-[200px] ${isSticky ? "top-16" : "bottom-16"
            }`}>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("hero")}
                className="justify-start rounded-xl px-3 py-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
              >
                <Home className="h-4 w-4 mr-3" />
                Home
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("features")}
                className="justify-start rounded-xl px-3 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300"
              >
                <Zap className="h-4 w-4 mr-3" />
                Features
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("community")}
                className="justify-start rounded-xl px-3 py-2 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-300"
              >
                <Users className="h-4 w-4 mr-3" />
                Community
              </Button>

              <Link href="/health-scorecard-explorer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start rounded-xl px-3 py-2 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300"
                >
                  <Activity className="h-4 w-4 mr-3" />
                  Scorecards
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("integration")}
                className="justify-start rounded-xl px-3 py-2 hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300"
              >
                <Globe className="h-4 w-4 mr-3" />
                Integrate
              </Button>

              <div className="w-full h-px bg-border my-2" />

              <Button
                size="sm"
                className="justify-start rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                Discord
              </Button>
            </div>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
