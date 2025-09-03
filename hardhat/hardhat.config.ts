import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const TEN_RPC_URL = "https://gateway.ten.xyz/"; // TEN testnet RPC

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    ten: {
      url: TEN_RPC_URL,
      chainId: 443, 
      accounts: ["f16706b46e4cd2b2030c2f06549f0238ebf5f7f7c4955428975ec8134add8aae"] 
    }
  },
};

export default config;
