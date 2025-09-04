import { Wallet, Provider } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as hre from "hardhat";

async function main() {
  // Private key for local testing (DO NOT use in production)
  const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x..."; // Replace with your test key
  const zkSyncProvider = new Provider("http://localhost:3050");
  const wallet = new Wallet(PRIVATE_KEY, zkSyncProvider);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("SimpleStorage");
  const contract = await deployer.deploy(artifact, []);
  console.log("SimpleStorage deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
