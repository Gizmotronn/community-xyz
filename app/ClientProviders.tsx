"use client"
import ThirdwebProviderWrapper from "./thirdweb-provider"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ThirdwebProviderWrapper>{children}</ThirdwebProviderWrapper>;
}