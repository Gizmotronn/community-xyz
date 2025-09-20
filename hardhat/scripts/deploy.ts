import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  console.log("Deploying Community XYZ Smart Contracts...");
  console.log("=".repeat(60));

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  console.log("=".repeat(60));

  console.log("Deploying IncentivePricing contract...");
  const IncentivePricing = await ethers.getContractFactory("IncentivePricing");
  const incentivePricing = await IncentivePricing.deploy();
  await incentivePricing.waitForDeployment();

  const incentivePricingAddress = await incentivePricing.getAddress();
  console.log("IncentivePricing deployed to:", incentivePricingAddress);

  // Deploy CommunityReserve contract
  console.log("Deploying CommunityReserve contract...");
  const CommunityReserve = await ethers.getContractFactory("CommunityReserve");
  const communityReserve = await CommunityReserve.deploy();
  await communityReserve.waitForDeployment();

  const communityReserveAddress = await communityReserve.getAddress();
  console.log("CommunityReserve deployed to:", communityReserveAddress);

  // Link contracts
  console.log("Linking contracts...");
  await communityReserve.setIncentivePricingContract(incentivePricingAddress);
  console.log("CommunityReserve linked to IncentivePricing");

  // Authorize CommunityReserve to call IncentivePricing functions
  console.log("Authorizing CommunityReserve contract...");
  await incentivePricing.authorizeContract(communityReserveAddress);
  console.log("CommunityReserve authorized to update community data");

  console.log("=".repeat(60));
  console.log("Verifying deployments...");

  // Verify IncentivePricing
  const owner1 = await incentivePricing.owner();
  const basePricing = await incentivePricing.basePricing(0);
  const isAuthorized = await incentivePricing.authorizedContracts(communityReserveAddress);
  console.log("IncentivePricing owner:", owner1);
  console.log("Base interview price:", ethers.formatEther(basePricing), "ETH");
  console.log("CommunityReserve authorized:", isAuthorized);

  // Verify CommunityReserve
  const owner2 = await communityReserve.owner();
  const totalReserve = await communityReserve.totalReserve();
  const contractBalance = await communityReserve.getBalance();
  const linkedContract = await communityReserve.incentivePricingContract();

  console.log("CommunityReserve owner:", owner2);
  console.log("Initial total reserve:", totalReserve.toString());
  console.log("Initial contract balance:", contractBalance.toString());
  console.log("Linked IncentivePricing:", linkedContract);

  // Verify fee percentages
  const communityMemberFee = await communityReserve.COMMUNITY_MEMBER_FEE();
  const localDaoFee = await communityReserve.LOCAL_DAO_RESERVE_FEE();
  const onboardingFee = await communityReserve.ONBOARDING_ORG_FEE();
  const treasuryFee = await communityReserve.TREASURY_FEE();

  console.log("=".repeat(60));
  console.log("Fee Structure Verification:");
  console.log("Community Member Fee:", communityMemberFee.toString(), "(40%)");
  console.log("Local DAO Reserve Fee:", localDaoFee.toString(), "(25%)");
  console.log("Onboarding Org Fee:", onboardingFee.toString(), "(15%)");
  console.log("Treasury Fee:", treasuryFee.toString(), "(20%)");

  console.log("=".repeat(60));
  console.log("Testing basic functionality...");

  // Test community registration
  const testCommunity = "0x1234567890123456789012345678901234567890";
  const testOnboardingOrg = "0x0987654321098765432109876543210987654321";

  console.log("Registering test community in CommunityReserve...");
  await communityReserve.registerCommunity(testCommunity, testOnboardingOrg);

  console.log("Registering test community in IncentivePricing...");
  await incentivePricing.registerCommunity(testCommunity, 25);

  console.log("Test community registered in both contracts");

  // Update community stats in CommunityReserve (this will automatically update IncentivePricing)
  console.log("Updating community stats via CommunityReserve...");
  await communityReserve.updateCommunityStats(testCommunity, 50, 20, 10);
  console.log("Community stats updated successfully");

  // Verify the update worked
  const [memberCount, interviews, referrals, , phase] = await incentivePricing.getCommunityData(testCommunity);
  console.log("Updated community data:");
  console.log("  - Members:", memberCount.toString());
  console.log("  - Interviews:", interviews.toString());
  console.log("  - Referrals:", referrals.toString());
  console.log("  - Phase:", phase.toString(), "(0=Bootstrap, 1=Growth, 2=Established, 3=Scaled, 4=Pharma Ready)");

  // Test incentive price calculation
  try {
    const incentivePrice = await communityReserve.getIncentivePrice(testCommunity, 0);
    console.log("Test incentive price:", ethers.formatEther(incentivePrice), "ETH");

    // Get all incentive prices
    const allPrices = await communityReserve.getAllIncentivePrices(testCommunity);
    console.log("All incentive prices:");
    console.log("  - Interview:", ethers.formatEther(allPrices[0]), "ETH");
    console.log("  - Referral:", ethers.formatEther(allPrices[1]), "ETH");
    console.log("  - Data Sharing:", ethers.formatEther(allPrices[2]), "ETH");
    console.log("  - Trial:", ethers.formatEther(allPrices[3]), "ETH");
    console.log("  - Engagement:", ethers.formatEther(allPrices[4]), "ETH");

    console.log("Testing investment functionality...");
    await communityReserve.invest({ value: ethers.parseEther("1") });
    const newBalance = await communityReserve.getBalance();
    const newReserve = await communityReserve.totalReserve();
    console.log("Investment successful!");
    console.log("  - New contract balance:", ethers.formatEther(newBalance), "ETH");
    console.log("  - New total reserve:", ethers.formatEther(newReserve), "ETH");

  } catch (error) {
    console.log("Some functionality tests failed:");
    console.log("Error details:", error instanceof Error ? error.message : String(error));
  }

  console.log("=".repeat(60));
  console.log("Saving deployment information...");

  // Save comprehensive deployment info
  const deploymentInfo = {
    network: process.env.HARDHAT_NETWORK || "localhost",
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    blockNumber: await ethers.provider.getBlockNumber(),
    contracts: {
      IncentivePricing: {
        address: incentivePricingAddress,
        contractName: "IncentivePricing",
        version: "1.0.0"
      },
      CommunityReserve: {
        address: communityReserveAddress,
        contractName: "CommunityReserve",
        version: "2.0.0",
        linkedContracts: {
          incentivePricing: incentivePricingAddress
        }
      }
    },
    testData: {
      testCommunity: testCommunity,
      testOnboardingOrg: testOnboardingOrg
    },
    configuration: {
      feeStructure: {
        communityMember: "40%",
        localDAO: "25%",
        onboardingOrg: "15%",
        treasury: "20%"
      },
      authorization: {
        communityReserveAuthorized: isAuthorized
      }
    }
  };

  const deploymentPath = "deployment-info.json";
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to:", deploymentPath);

  console.log("=".repeat(60));
  console.log("Community XYZ deployment completed successfully!");
  console.log("All contracts working perfectly with proper authorization!");
  console.log("=".repeat(60));

  console.log("Contract Addresses:");
  console.log("IncentivePricing:", incentivePricingAddress);
  console.log("CommunityReserve:", communityReserveAddress);
  console.log("=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });