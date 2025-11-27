"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

type NavigationVariant = 'landing' | 'health-protocol'

interface TopNavigationProps {
    variant?: NavigationVariant
}

export function TopNavigation({ variant = 'landing' }: TopNavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false)
        
        if (pathname !== '/') {
            // Store the section to scroll to after navigation
            sessionStorage.setItem('scrollToSection', sectionId)
            router.push('/')
            return
        }

        // Direct scroll if already on homepage
        performScroll(sectionId)
    }

    const performScroll = (sectionId: string) => {
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
    }

    // Handle scroll after navigation from another page
    useEffect(() => {
        const scrollTarget = sessionStorage.getItem('scrollToSection')
        if (scrollTarget && pathname === '/') {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                performScroll(scrollTarget)
                sessionStorage.removeItem('scrollToSection')
            }, 100)
        }
    }, [pathname])

    const landingNavItems = [
        { label: 'Home', action: () => scrollToSection("hero") },
        { label: 'Litepaper', action: () => scrollToSection("litepaper") },
        { label: 'Team', action: () => scrollToSection("team") },
        { label: 'Roadmap', action: () => scrollToSection("roadmap") },
    ]

    const healthProtocolNavItems = [
        { label: 'Home', href: '/' },
        { label: 'Staking', href: '/health-protocol-page/staking' },
        { label: 'Explore Communities', href: '/health-protocol-page/explore-communities' },
        { label: 'For Pharma', href: '/health-protocol-page/pharma' },
    ]

    const navItems = variant === 'health-protocol' ? healthProtocolNavItems : landingNavItems

    const renderNavButton = (item: typeof navItems[0], index: number) => {
        if ('href' in item && item.href) {
            return (
                <Link key={index} href={item.href}>
                    <button className="group text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors relative">
                        <span className="relative inline-block">
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                        </span>
                    </button>
                </Link>
            )
        }

        return (
            <button
                key={index}
                onClick={item.action}
                className="group text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 transition-colors relative"
            >
                <span className="relative inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                </span>
            </button>
        )
    }

    const renderMobileNavButton = (item: typeof navItems[0], index: number) => {
        if ('href' in item && item.href) {
            return (
                <Link key={index} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="group text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left relative w-full">
                        <span className="relative inline-block">
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                        </span>
                    </button>
                </Link>
            )
        }

        return (
            <button
                key={index}
                onClick={item.action}
                className="group text-white font-['Noto_Sans'] text-sm font-semibold hover:text-white/80 hover:bg-white/5 transition-all py-3 px-4 rounded-lg text-left relative"
            >
                <span className="relative inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                </span>
            </button>
        )
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
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
                    {navItems.map((item, index) => renderNavButton(item, index))}
                </div>

                <div className="hidden md:block absolute right-4 sm:right-6 lg:right-[100px]">
                    <Button
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-black font-['Noto_Sans'] text-sm font-semibold px-4 lg:px-6 py-2 rounded-[10px] h-8 transition-colors"
                        asChild
                    >
                        <a href="https://discord.com/invite/nMqmSJSCzZ" target="_blank" rel="noopener noreferrer">
                            Discord
                        </a>
                    </Button>
                </div>

                <div className="md:hidden">
                    <Button
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-black font-['Noto_Sans'] text-sm font-semibold px-3 sm:px-4 py-2 rounded-[10px] h-8 transition-colors"
                        asChild
                    >
                        <a href="https://discord.com/invite/nMqmSJSCzZ" target="_blank" rel="noopener noreferrer">
                            Discord
                        </a>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-[63px] left-0 right-0 bg-[#242424]/95 border-b border-white/10 shadow-2xl z-40 md:hidden">
                        <div className="flex flex-col p-4 space-y-2">
                            {navItems.map((item, index) => renderMobileNavButton(item, index))}
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}