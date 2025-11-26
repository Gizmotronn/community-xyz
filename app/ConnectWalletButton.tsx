"use client"
import { ConnectWallet } from "@thirdweb-dev/react";

export default function ConnectWalletButton() {
  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      modalTitle="Connect your wallet"
      switchToActiveChain={true}
      style={{
        padding: "1rem 2rem",
        fontSize: "1.125rem",
        fontWeight: 600,
        borderRadius: "0.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    />
  );
}