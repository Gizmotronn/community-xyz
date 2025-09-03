
declare global {
  interface Window {
    ethereum?: any;
  }
}
"use client"

import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/thirdweb"
import { createWallet } from "thirdweb/wallets"
import { Wallet, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActiveAccount } from "thirdweb/react"
import { useEffect } from "react"

const TEN_NETWORK_PARAMS = {
  chainId: "0x7E57",
  chainName: "TEN Testnet",
  nativeCurrency: {
    name: "TENETH",
    symbol: "TENETH",
    decimals: 18,
  },
  rpcUrls: ["https://gateway.ten.xyz/"],
  blockExplorerUrls: ["https://tenscan.ten.xyz/"],
};

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
    async function ensureTENNetwork() {
      if (typeof window !== "undefined" && window.ethereum && account) {
        try {
          // Add TEN network to MetaMask
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [TEN_NETWORK_PARAMS],
          });
          // Switch to TEN network
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: TEN_NETWORK_PARAMS.chainId }],
          });
        } catch (err) {
          // Ignore if already added/switch failed
        }
        router.push("/dashboard")
      }
    }
    ensureTENNetwork();
  }, [account, router])

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectButton={{
        label: (
          <span className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        ),
        className:
          "group px-8 py-6 text-lg font-semibold web3-glow hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground rounded-md flex items-center gap-2",
      }}
      connectModal={{
        size: "wide",
        title: "Connect to Health Protocol",
        showThirdwebBranding: false,
      }}
    />
  )
}
