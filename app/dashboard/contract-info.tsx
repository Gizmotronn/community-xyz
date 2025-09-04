import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ContractInfoPage() {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [recentTxs, setRecentTxs] = useState<any[]>([]);
  const [contractData, setContractData] = useState<any>(null);

  useEffect(() => {
    // Connect to local Hardhat node
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");

    // Replace with your contract address and ABI
    const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180a3";
    const contractABI: any[] = [
      // ...add your contract ABI here...
    ];
    setContractAddress(contractAddr);

  const contract = new ethers.Contract(contractAddr, contractABI, provider);

    // Example: fetch contract data (customize for your contract)
    async function fetchContractData() {
      // e.g., get balance, owner, etc.
      // setContractData(await contract.someGetter());
    }

    // Fetch recent transactions from local node
    async function fetchRecentTxs() {
      const blockNumber = await provider.getBlockNumber();
      const txs: any[] = [];
      for (let i = blockNumber; i > blockNumber - 10 && i > 0; i--) {
        const block = await provider.getBlock(i);
        if (block && block.transactions) {
          for (const txHash of block.transactions) {
            const tx = await provider.getTransaction(txHash);
            if (tx) txs.push(tx);
          }
        }
      }
      setRecentTxs(txs);
    }

    fetchContractData();
    fetchRecentTxs();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contract Information</h1>
      <div className="mb-6">
        <div><strong>Address:</strong> {contractAddress}</div>
        {/* Render contractData here */}
      </div>
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <ul className="space-y-2">
        {recentTxs.map((tx, idx) => (
          <li key={tx.hash} className="border p-2 rounded">
            <div><strong>Hash:</strong> {tx.hash}</div>
            <div><strong>From:</strong> {tx.from}</div>
            <div><strong>To:</strong> {tx.to}</div>
            <div><strong>Value:</strong> {ethers.formatEther(tx.value)} ETH</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
