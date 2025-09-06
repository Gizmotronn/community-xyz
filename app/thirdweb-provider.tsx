"use client"
import { ThirdwebProvider } from "@thirdweb-dev/react"

export default function ThirdwebProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || process.env.THIRDWEB_CLIENT_ID}>
      {children}
    </ThirdwebProvider>
  )
}