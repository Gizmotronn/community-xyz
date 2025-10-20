"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function TopNavigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 63
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 border-b border-white/10 ">
            <div className="w-full h-[63px] flex items-center justify-between md:justify-center px-4 sm:px-6 md:px-8 relative">

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white hover:text-white/80 transition-colors z-50"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

                <div className="hidden md:flex items-center gap-6 lg:gap-[43px]">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection("litepaper")}
                        className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors"
                    >
                        Litepaper
                    </button>
                    <button
                        onClick={() => scrollToSection("team")}
                        className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors"
                    >
                        Team
                    </button>
                    <button
                        onClick={() => scrollToSection("roadmap")}
                        className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors"
                    >
                        Roadmap
                    </button>
                </div>

                <div className="hidden md:block absolute right-4 sm:right-6 lg:right-[100px]">
                    <Button
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-[#242424] font-['Noto_Sans'] text-sm font-semibold px-4 lg:px-6 py-2 rounded-[10px] h-8 transition-colors"
                        asChild
                    >
                        <a href="https://discord.gg/health-protocol" target="_blank" rel="noopener noreferrer">
                            Discord
                        </a>
                    </Button>
                </div>

                <div className="md:hidden">
                    <Button
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-[#242424] font-['Noto_Sans'] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-[10px] h-8 transition-colors"
                        asChild
                    >
                        <a href="https://discord.gg/health-protocol" target="_blank" rel="noopener noreferrer">
                            Discord
                        </a>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40  z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Content */}
                    <div className="absolute top-[63px] left-0 right-0 bg-[#242424]/95  border-b border-white/10 shadow-2xl z-40 md:hidden">
                        <div className="flex flex-col p-4 space-y-2">
                            <button
                                onClick={() => scrollToSection("hero")}
                                className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("litepaper")}
                                className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left"
                            >
                                Litepaper
                            </button>
                            <button
                                onClick={() => scrollToSection("team")}
                                className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left"
                            >
                                Team
                            </button>
                            <button
                                onClick={() => scrollToSection("roadmap")}
                                className="text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left"
                            >
                                Roadmap
                            </button>
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}