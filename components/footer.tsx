'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full mt-20 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Animated Background Gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" /> */}

      {/* Subtle Glassmorphic Overlay */}
      {/* <div className="absolute inset-0 backdrop-blur-sm bg-black/20" /> */}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Top Gradient Line */}
      <div className="relative border-t border-white/10 pt-6 sm:pt-8 mt-8">
        {/* Subtle Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[0.8px] bg-white" />

        <div className="relative z-10 container mx-auto max-w-[1440px]">

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">

            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Logo with Subtle Glow */}
              <div className="flex items-center gap-3 justify-center sm:justify-start group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D7E9]/20 to-[#FF9400]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <Image
                    src="/landingPage/logo_HP.png"
                    alt="Health Protocol"
                    width={120}
                    height={65}
                    className="relative w-[100px] sm:w-[110px] lg:w-[120px] h-auto transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Description Text with Gradient Accent */}
              <p
                className="text-gray-300 max-w-md leading-relaxed text-center sm:text-left mx-auto sm:mx-0"
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 300,
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  lineHeight: '150%',
                }}
              >
                Empowering communities through{' '}
                <span className="bg-gradient-to-r from-[#00D7E9] to-[#FF9400] bg-clip-text text-transparent font-normal">
                  decentralized health coordination
                </span>
                . Building the infrastructure for aligned stakeholders and tokenized health activation.
              </p>

              {/* Social Media Links - Glassmorphic Style */}
              <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                {/* X (Twitter) */}
                <Link
                  href="https://twitter.com/0xhealthshared"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X (Twitter)"
                  className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00D7E9]/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D7E9]/10 to-[#FF9400]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white fill-current transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>

                {/* Discord */}
                <Link
                  href="https://discord.gg/health-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join our Discord community"
                  className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#FF9400]/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9400]/10 to-[#00D7E9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white fill-current transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </Link>

                {/* Email */}
                <Link
                  href="mailto:contact@healthprotocol.xyz"
                  aria-label="Email us"
                  className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00D7E9]/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D7E9]/10 to-[#FF9400]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </Link>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4 text-center sm:text-left">
              <h4
                className="text-transparent bg-white bg-clip-text font-bold mb-4 sm:mb-6"
                style={{
                  fontFamily: 'Archivo Black',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                }}
              >
                Quick Links
              </h4>

              <div className="space-y-3">
                <Link
                  href="/landing-page/litepaper"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Litepaper
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>

                <Link
                  href="/health-scorecard-explorer"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Scorecard Explorer
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>

                <Link
                  href="https://health-shared.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Health-Shared
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>

                <Link
                  href="#roadmap"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Roadmap
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Resources Column */}
            <div className="space-y-4 text-center sm:text-left">
              <h4
                className="text-transparent bg-white bg-clip-text font-bold mb-4 sm:mb-6"
                style={{
                  fontFamily: 'Archivo Black',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                }}
              >
                Resources
              </h4>

              <div className="space-y-3">
                <Link
                  href="https://medium.com/health-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>

                <Link
                  href="https://github.com/health-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    GitHub
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>

                <Link
                  href="#team"
                  className="group block text-gray-400 hover:text-white transition-all duration-300 relative"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    fontWeight: 300,
                  }}
                >
                  <span className="relative inline-block">
                    Team
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00D7E9] to-[#FF9400] group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Gradient Border */}
          <div className="relative border-t border-white/10 pt-6 sm:pt-8 mt-8">
            {/* Subtle Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[0.8px] bg-white" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright Notice */}
              <p
                className="text-gray-500 text-center md:text-left"
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 'clamp(12px, 1.5vw, 14px)',
                  fontWeight: 300,
                }}
              >
                © {new Date().getFullYear()} Health Protocol. All rights reserved.
              </p>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    fontWeight: 300,
                  }}
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    fontWeight: 300,
                  }}
                >
                  Terms of Service
                </Link>

                <Link
                  href="/cookies"
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    fontWeight: 300,
                  }}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}