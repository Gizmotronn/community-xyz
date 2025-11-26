import { Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as fs from "fs";

export default async function deployZkSync(hre: HardhatRuntimeEnvironment) {
    console.log("Deploying Community XYZ Smart Contracts to zkSync...");
    console.log("=".repeat(60));

    const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    const { Provider } = await import("zksync-ethers");
    const zkSyncProvider = new Provider("https://sepolia.era.zksync.dev");
    const wallet = new Wallet(PRIVATE_KEY, zkSyncProvider);
    const deployer = new Deployer(hre, wallet);

    console.log("Deploying with wallet:", wallet.address);

    try {
        const balance = await zkSyncProvider.getBalance(wallet.address);
        console.log("Wallet balance:", ethers.formatEther(balance), "ETH");
    } catch (e) {
        console.log("Could not fetch balance, continuing...");
    }

    console.log("Network:", hre.network.name);
    console.log("=".repeat(60));

    console.log("Deploying IncentivePricing contract...");
    const incentivePricingArtifact = await deployer.loadArtifact("IncentivePricing");
    const incentivePricing = await deployer.deploy(incentivePricingArtifact);

    await incentivePricing.deployed();
    console.log("IncentivePricing deployed to:", incentivePricing.address);

    console.log("Deploying CommunityReserve contract...");
    const communityReserveArtifact = await deployer.loadArtifact("CommunityReserve");
    const communityReserve = await deployer.deploy(communityReserveArtifact);

    await communityReserve.deployed();
    console.log("CommunityReserve deployed to:", communityReserve.address);

    // Link contracts
    console.log("Linking contracts...");
    await communityReserve.setIncentivePricingContract(incentivePricing.address);
    console.log("CommunityReserve linked to IncentivePricing");

    console.log("Authorizing CommunityReserve contract...");
    await incentivePricing.authorizeContract(communityReserve.address);
    console.log("CommunityReserve authorized to update community data");

    // Save deployment info
    const deploymentInfo = {
        network: hre.network.name,
        chainId: hre.network.config.chainId,
        deployer: wallet.address,
        deploymentTime: new Date().toISOString(),
        contracts: {
            IncentivePricing: {
                address: incentivePricing.address,
                transactionHash: incentivePricing.deployTransaction.hash,
                contractName: "IncentivePricing",
                version: "1.0.0-zksync"
            },
            CommunityReserve: {
                address: communityReserve.address,
                transactionHash: communityReserve.deployTransaction.hash,
                contractName: "CommunityReserve",
                version: "2.0.0-zksync",
                linkedContracts: {
                    incentivePricing: incentivePricing.address
                }
            },
        },
        configuration: {
            feeStructure: {
                communityMember: "40%",
                localDAO: "25%",
                onboardingOrg: "15%",
                treasury: "20%"
            },
            authorization: {
                communityReserveAuthorized: true
            }
        }
    };

    const filename = `deployment-info-zksync-${hre.network.name}.json`;
    fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));

    console.log("=".repeat(60));
    console.log("zkSync Deployment completed successfully!");
    console.log("Contract Addresses:");
    console.log("  IncentivePricing:", incentivePricing.address);
    console.log("  CommunityReserve:", communityReserve.address);
    console.log("Deployment info saved to:", filename);
    console.log("=".repeat(60));

    console.log("Testing basic functionality...");

    // Test community registration
    const testCommunity = "0x1234567890123456789012345678901234567890";
    const testOnboardingOrg = "0x0987654321098765432109876543210987654321";

    console.log("Registering test community...");
    await communityReserve.registerCommunity(testCommunity, testOnboardingOrg);
    await incentivePricing.registerCommunity(testCommunity, 25);

    console.log("Test community registered successfully!");

    // Get pricing information
    const prices = await communityReserve.getAllIncentivePrices(testCommunity);
    console.log("Sample incentive prices (ETH):");
    const incentiveNames = ["Interview", "Referral", "Data Sharing", "Trial", "Engagement"];
    for (let i = 0; i < 5; i++) {
        console.log(`  ${incentiveNames[i]}: ${ethers.formatEther(prices[i])}`);
    }

    console.log("=".repeat(60));
    console.log("zkSync deployment and testing completed successfully!");

    return deploymentInfo;
}


if (require.main === module) {
    deployZkSync(require("hardhat"))
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("zkSync deployment failed:", error);
            process.exit(1);
        });
}