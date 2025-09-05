import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  console.log("Deploying CommunityReserve contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract
  const CommunityReserve = await ethers.getContractFactory("CommunityReserve");
  console.log("Deploying contract...");

  const communityReserve = await CommunityReserve.deploy();
  await communityReserve.waitForDeployment();

  const contractAddress = await communityReserve.getAddress();
  console.log("CommunityReserve deployed to:", contractAddress);

  // Verify initial state
  const owner = await communityReserve.owner();
  const totalReserve = await communityReserve.totalReserve();
  const contractBalance = await communityReserve.getBalance();

  console.log("Contract owner:", owner);
  console.log("Initial total reserve:", totalReserve.toString());
  console.log("Initial contract balance:", contractBalance.toString());

  // Verify fee percentages
  const communityMemberFee = await communityReserve.COMMUNITY_MEMBER_FEE();
  const localDaoFee = await communityReserve.LOCAL_DAO_RESERVE_FEE();
  const onboardingFee = await communityReserve.ONBOARDING_ORG_FEE();
  const treasuryFee = await communityReserve.TREASURY_FEE();

  console.log("\nFee Structure:");
  console.log("Community Member Fee:", communityMemberFee.toString(), "(40%)");
  console.log("Local DAO Reserve Fee:", localDaoFee.toString(), "(25%)");
  console.log("Onboarding Org Fee:", onboardingFee.toString(), "(15%)");
  console.log("Treasury Fee:", treasuryFee.toString(), "(20%)");

  // Save deployment info
  const deploymentInfo = {
    address: contractAddress,
    network: process.env.HARDHAT_NETWORK || "localhost",
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    blockNumber: await ethers.provider.getBlockNumber(),
    contractName: "CommunityReserve",
    version: "1.0.0"
  };

  const deploymentPath = "deployment-info.json";
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\nDeployment info saved to:", deploymentPath);

  console.log("\n Contract deployment completed successfully!");
  console.log(" Ready for testing and integration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(" Deployment failed:");
    console.error(error);
    process.exit(1);
  });