"use client"

import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/thirdweb"
import { createWallet } from "thirdweb/wallets"
import { Wallet, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActiveAccount } from "thirdweb/react"
import { useEffect } from "react"

declare global {
  interface Window {
    ethereum?: any;
  }
}

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
          console.error("Network switch error:", err);
        }
        router.push("/dashboard")
      }
    }
    ensureTENNetwork();
  }, [account, router])

  return (
    <div className="wallet-connect-container">
      <ConnectButton
        client={client}
        wallets={wallets}
        connectButton={{
          label: "Connect Wallet",
          className: "!w-[234px] !h-[44px] !rounded-lg !border-2 !border-white !bg-transparent !text-white !font-semibold !text-[16px] transition-all duration-200 hover:!bg-white hover:!text-black hover:opacity-90 hover:scale-105 active:scale-95 !shadow-lg !px-0 !py-0",
          style: {
            fontFamily: 'Noto Sans, sans-serif',
            minWidth: '234px',
            maxWidth: '234px',
            height: '44px',
            backgroundColor: 'transparent',
            border: '2px solid white',
            color: 'white',
          }
        }}
        connectModal={{
          size: "wide",
          title: "Connect to Health Protocol",
          showThirdwebBranding: false,
        }}
      />
    </div>
  )
}