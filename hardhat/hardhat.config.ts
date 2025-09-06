import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const TEN_RPC_URL = "https://gateway.ten.xyz/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x" + "0".repeat(64); // Use environment variable

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
  ten: {
    url: process.env.TEN_RPC_URL || "https://testnet.ten.xyz/v1/", // Alternative endpoint
    chainId: 443,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    timeout: 60000, // Add timeout
  },
},
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
};

export default config;
