"use client"

import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/thirdweb"
import { createWallet } from "thirdweb/wallets"
import { Wallet, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActiveAccount } from "thirdweb/react"
import { useEffect } from "react"

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("app.phantom"),
]

export function WalletConnectButton() {
  const router = useRouter()
  const account = useActiveAccount()

  useEffect(() => {
    if (account) {
      router.push("/dashboard")
    }
  }, [account, router])

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectButton={{
        label: "Connect Wallet",
        className:
          "group px-8 py-6 text-lg font-semibold web3-glow hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground rounded-md flex items-center gap-2",
      }}
      connectModal={{
        size: "wide",
        title: "Connect to Health Protocol",
        showThirdwebBranding: false,
      }}
    >
      <Wallet className="h-5 w-5" />
      Connect Wallet
      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </ConnectButton>
  )
}
