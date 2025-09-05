import { useEffect, useState } from "react";
import { ethers } from "ethers";

import contractJson from "../../hardhat/artifacts/contracts/CommunityReserve.sol/CommunityReserve.json";

interface ContractData {
  owner: string;
  totalReserve: string;
  balance: string;
  communityMemberFee: number;
  localDaoFee: number;
  onboardingFee: number;
  treasuryFee: number;
}

interface Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  blockNumber: number;
  timestamp?: number;
  gasUsed?: string;
}

export default function ContractInfoPage() {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [recentTxs, setRecentTxs] = useState<Transaction[]>([]);
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    initializeContract();
  }, []);

  async function initializeContract() {
    try {
      setLoading(true);
      setError("");

      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      
      // Get the contract ABI from the build artifacts
      const contractABI = contractJson.abi;
      
      let contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Default local deployment
      
      try {
        const deploymentResponse = await fetch("/hardhat/deployment-info.json");
        if (deploymentResponse.ok) {
          const deploymentInfo = await deploymentResponse.json();
          contractAddr = deploymentInfo.address;
        }
      } catch (e) {
        console.log("Using default contract address (deployment-info.json not found)");
      }

      setContractAddress(contractAddr);

      const contract = new ethers.Contract(contractAddr, contractABI, provider);

      // Fetch contract data
      await fetchContractData(contract);
      
      // Fetch recent transactions
      await fetchRecentTxs(provider, contractAddr);

    } catch (err) {
      console.error("Error initializing contract:", err);
      setError("Failed to connect to contract. Make sure Hardhat node is running.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchContractData(contract: ethers.Contract) {
    try {
      const [
        owner,
        totalReserve,
        balance,
        communityMemberFee,
        localDaoFee,
        onboardingFee,
        treasuryFee
      ] = await Promise.all([
        contract.owner(),
        contract.totalReserve(),
        contract.getBalance(),
        contract.COMMUNITY_MEMBER_FEE(),
        contract.LOCAL_DAO_RESERVE_FEE(),
        contract.ONBOARDING_ORG_FEE(),
        contract.TREASURY_FEE()
      ]);

      setContractData({
        owner,
        totalReserve: ethers.formatEther(totalReserve),
        balance: ethers.formatEther(balance),
        communityMemberFee: Number(communityMemberFee) / 100, // Convert from basis points to percentage
        localDaoFee: Number(localDaoFee) / 100,
        onboardingFee: Number(onboardingFee) / 100,
        treasuryFee: Number(treasuryFee) / 100
      });
    } catch (err) {
      console.error("Error fetching contract data:", err);
    }
  }

  async function fetchRecentTxs(provider: ethers.JsonRpcProvider, contractAddr: string) {
    try {
      const blockNumber = await provider.getBlockNumber();
      const txs: Transaction[] = [];
      
      // Look through the last 50 blocks for contract transactions
      for (let i = blockNumber; i > Math.max(blockNumber - 50, 0); i--) {
        const block = await provider.getBlock(i, true);
        if (block && block.transactions) {
          for (const tx of block.transactions) {
            // Filter for transactions to/from our contract
            if (tx.to?.toLowerCase() === contractAddr.toLowerCase() || 
                tx.from?.toLowerCase() === contractAddr.toLowerCase()) {
              
              // Get transaction receipt for gas used
              const receipt = await provider.getTransactionReceipt(tx.hash);
              
              txs.push({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: ethers.formatEther(tx.value),
                blockNumber: tx.blockNumber || 0,
                timestamp: block.timestamp,
                gasUsed: receipt ? receipt.gasUsed.toString() : undefined
              });
            }
          }
        }
      }
      
      // Sort by block number (newest first)
      txs.sort((a, b) => b.blockNumber - a.blockNumber);
      setRecentTxs(txs.slice(0, 10)); // Show only the 10 most recent
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading contract information...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button 
          onClick={initializeContract}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contract Information</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Contract Address</h2>
        <div className="font-mono text-sm bg-white p-2 rounded border">
          {contractAddress}
        </div>
      </div>

      {contractData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contract State</h2>
            <div className="space-y-3">
              <div>
                <strong>Owner:</strong>
                <div className="font-mono text-sm mt-1">{contractData.owner}</div>
              </div>
              <div>
                <strong>Total Reserve:</strong>
                <div className="text-lg font-semibold">{contractData.totalReserve} ETH</div>
              </div>
              <div>
                <strong>Contract Balance:</strong>
                <div className="text-lg font-semibold">{contractData.balance} ETH</div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Fee Structure</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Community Member:</span>
                <span className="font-semibold">{contractData.communityMemberFee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Local DAO Reserve:</span>
                <span className="font-semibold">{contractData.localDaoFee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Onboarding Org:</span>
                <span className="font-semibold">{contractData.onboardingFee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Treasury:</span>
                <span className="font-semibold">{contractData.treasuryFee}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Contract Transactions</h2>
        {recentTxs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No recent transactions found. Try making an investment or distribution.
          </div>
        ) : (
          <div className="space-y-3">
            {recentTxs.map((tx, idx) => (
              <div key={tx.hash} className="border rounded p-4 hover:bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Transaction Hash</div>
                    <div className="font-mono text-sm">{tx.hash.slice(0, 42)}...</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Block Number</div>
                    <div>{tx.blockNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">From</div>
                    <div className="font-mono text-sm">{tx.from}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Value</div>
                    <div className="font-semibold">{tx.value} ETH</div>
                  </div>
                  {tx.timestamp && (
                    <div>
                      <div className="text-sm text-gray-600">Timestamp</div>
                      <div>{new Date(tx.timestamp * 1000).toLocaleString()}</div>
                    </div>
                  )}
                  {tx.gasUsed && (
                    <div>
                      <div className="text-sm text-gray-600">Gas Used</div>
                      <div>{Number(tx.gasUsed).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button 
          onClick={initializeContract}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}