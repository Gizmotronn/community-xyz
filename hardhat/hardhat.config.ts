import { HardhatUserConfig } from "hardhat/config";
// import "@matterlabs/hardhat-zksync-deploy";
// import "@matterlabs/hardhat-zksync-solc";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    hardhat: {}, // Local Ethereum environment for fast testing
    zksyncTestnet: {
      url: "https://testnet.era.zksync.dev", // ZKsync testnet endpoint
    },
  },
};

export default config;

export const zksolc = {
  version: "1.3.13", // Use latest compatible version
  compilerSource: "binary",
  settings: {},
};
