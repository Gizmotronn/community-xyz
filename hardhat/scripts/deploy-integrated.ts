import { ethers } from "hardhat";
import { Wallet, utils } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as fs from "fs";

async function deployIntegrated(hre: HardhatRuntimeEnvironment) {
    console.log("Deploying Complete Health Protocol System...");
    console.log("=".repeat(70));

    const isZkSync = hre.network.name.includes('zkSync');
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    let deployer: any;
    let wallet: any;

    if (isZkSync) {
        wallet = new Wallet(PRIVATE_KEY);
        deployer = new Deployer(hre, wallet);
        console.log("Using zkSync deployer with wallet:", wallet.address);

        const balance = await wallet.getBalance();
        console.log("Wallet balance:", ethers.utils.formatEther(balance), "ETH");
    } else {
        [wallet] = await ethers.getSigners();
        console.log("Using standard deployer with account:", wallet.address);

        const balance = await ethers.provider.getBalance(wallet.address);
        console.log("Account balance:", ethers.formatEther(balance), "ETH");
    }

    console.log("Network:", hre.network.name);
    console.log("Chain ID:", hre.network.config.chainId);
    console.log("=".repeat(70));

    const deployedContracts: any = {};

    try {
        console.log("1. Deploying IncentivePricing contract...");
        let incentivePricing: any;

        if (isZkSync) {
            const incentivePricingArtifact = await deployer.loadArtifact("IncentivePricing");
            incentivePricing = await deployer.deploy(incentivePricingArtifact);
            await incentivePricing.deployed();
        } else {
            const IncentivePricingFactory = await ethers.getContractFactory("IncentivePricing");
            incentivePricing = await IncentivePricingFactory.deploy();
            await incentivePricing.waitForDeployment();
        }

        const incentivePricingAddress = isZkSync ? incentivePricing.address : await incentivePricing.getAddress();
        console.log(" IncentivePricing deployed to:", incentivePricingAddress);

        deployedContracts.IncentivePricing = {
            address: incentivePricingAddress,
            transactionHash: incentivePricing.deployTransaction?.hash || "N/A",
        };

        console.log("2. Deploying PointsIntegration contract...");
        let pointsIntegration: any;
        const ivanContractAddress = process.env.IVAN_HEALTH_PROTOCOL_CONTRACT || "0x0000000000000000000000000000000000000000";

        if (isZkSync) {
            const pointsIntegrationArtifact = await deployer.loadArtifact("PointsIntegration");
            pointsIntegration = await deployer.deploy(pointsIntegrationArtifact, [ivanContractAddress]);
            await pointsIntegration.deployed();
        } else {
            const PointsIntegrationFactory = await ethers.getContractFactory("PointsIntegration");
            pointsIntegration = await PointsIntegrationFactory.deploy(ivanContractAddress);
            await pointsIntegration.waitForDeployment();
        }

        const pointsIntegrationAddress = isZkSync ? pointsIntegration.address : await pointsIntegration.getAddress();
        console.log(" PointsIntegration deployed to:", pointsIntegrationAddress);

        deployedContracts.PointsIntegration = {
            address: pointsIntegrationAddress,
            transactionHash: pointsIntegration.deployTransaction?.hash || "N/A",
        };

        console.log("3. Deploying CommunityReserve contract...");
        let communityReserve: any;

        if (isZkSync) {
            const communityReserveArtifact = await deployer.loadArtifact("CommunityReserve");
            communityReserve = await deployer.deploy(communityReserveArtifact);
            await communityReserve.deployed();
        } else {
            const CommunityReserveFactory = await ethers.getContractFactory("CommunityReserve");
            communityReserve = await CommunityReserveFactory.deploy();
            await communityReserve.waitForDeployment();
        }

        const communityReserveAddress = isZkSync ? communityReserve.address : await communityReserve.getAddress();
        console.log(" CommunityReserve deployed to:", communityReserveAddress);

        deployedContracts.CommunityReserve = {
            address: communityReserveAddress,
            transactionHash: communityReserve.deployTransaction?.hash || "N/A",
        };

        console.log("4. Linking contracts...");

        await communityReserve.setIncentivePricingContract(incentivePricingAddress);
        console.log(" CommunityReserve linked to IncentivePricing");

        await communityReserve.setPointsIntegrationContract(pointsIntegrationAddress);
        console.log(" CommunityReserve linked to PointsIntegration");

        await incentivePricing.authorizeContract(communityReserveAddress);
        console.log(" CommunityReserve authorized in IncentivePricing");

        await pointsIntegration.authorizeContract(communityReserveAddress);
        console.log(" CommunityReserve authorized in PointsIntegration");

        console.log("5. Verifying deployments...");

        // Verify IncentivePricing
        const incentivePricingOwner = await incentivePricing.owner();
        const basePricing = await incentivePricing.basePricing(0); 
        const isAuthorizedInPricing = await incentivePricing.authorizedContracts(communityReserveAddress);

        console.log("IncentivePricing verification:");
        console.log("  Owner:", incentivePricingOwner);
        console.log("  Base interview price:", ethers.formatEther(basePricing), "ETH");
        console.log("  CommunityReserve authorized:", isAuthorizedInPricing);

        // Verify PointsIntegration
        const pointsIntegrationOwner = await pointsIntegration.owner();
        const isAuthorizedInPoints = await pointsIntegration.authorizedContracts(communityReserveAddress);
        const isHealthProtocolLinked = await pointsIntegration.isHealthProtocolLinked();

        console.log("PointsIntegration verification:");
        console.log("  Owner:", pointsIntegrationOwner);
        console.log("  CommunityReserve authorized:", isAuthorizedInPoints);
        console.log("  Health Protocol linked:", isHealthProtocolLinked);

        // Verify CommunityReserve
        const communityReserveOwner = await communityReserve.owner();
        const totalReserve = await communityReserve.totalReserve();
        const contractBalance = await communityReserve.getBalance();
        const linkedIncentivePricing = await communityReserve.incentivePricingContract();
        const linkedPointsIntegration = await communityReserve.pointsIntegrationContract();

        console.log("CommunityReserve verification:");
        console.log("  Owner:", communityReserveOwner);
        console.log("  Total reserve:", totalReserve.toString());
        console.log("  Contract balance:", contractBalance.toString());
        console.log("  Linked IncentivePricing:", linkedIncentivePricing);
        console.log("  Linked PointsIntegration:", linkedPointsIntegration);

        // Verify fee percentages
        const communityMemberFee = await communityReserve.COMMUNITY_MEMBER_FEE();
        const localDaoFee = await communityReserve.LOCAL_DAO_RESERVE_FEE();
        const onboardingFee = await communityReserve.ONBOARDING_ORG_FEE();
        const treasuryFee = await communityReserve.TREASURY_FEE();

        console.log("Fee Structure verification:");
        console.log("  Community Member Fee:", communityMemberFee.toString(), "(40%)");
        console.log("  Local DAO Reserve Fee:", localDaoFee.toString(), "(25%)");
        console.log("  Onboarding Org Fee:", onboardingFee.toString(), "(15%)");
        console.log("  Treasury Fee:", treasuryFee.toString(), "(20%)");

        console.log("6. Testing basic functionality...");

        const testCommunity = process.env.TEST_COMMUNITY_ADDRESS || "0x1234567890123456789012345678901234567890";
        const testOnboardingOrg = process.env.TEST_ONBOARDING_ORG || "0x0987654321098765432109876543210987654321";

        console.log("Registering test community...");
        await communityReserve.registerCommunity(testCommunity, testOnboardingOrg);
        await incentivePricing.registerCommunity(testCommunity, 25); // Bootstrap community

        console.log(" Test community registered in both contracts");

        // Test pricing calculation
        const prices = await communityReserve.getAllIncentivePrices(testCommunity);
        const incentiveNames = ["Interview", "Referral", "Data Sharing", "Trial", "Engagement"];

        console.log("Sample incentive prices (Bootstrap phase):");
        for (let i = 0; i < 5; i++) {
            const priceInEth = isZkSync ?
                ethers.utils.formatEther(prices[i]) :
                ethers.formatEther(prices[i]);
            console.log(`  ${incentiveNames[i]}: ${priceInEth} ETH`);
        }

        console.log("Testing community stats update...");
        await communityReserve.updateCommunityStats(testCommunity, 100, 50, 25);

        const [memberCount, totalInterviews, totalReferrals] = await communityReserve.getCommunityInfo(testCommunity);
        console.log(" Community stats updated:");
        console.log(`  Members: ${memberCount}, Interviews: ${totalInterviews}, Referrals: ${totalReferrals}`);

        console.log("7. Saving deployment information...");

        const deploymentInfo = {
            network: hre.network.name,
            chainId: hre.network.config.chainId,
            deployer: isZkSync ? wallet.address : wallet.address,
            deploymentTime: new Date().toISOString(),
            isZkSync: isZkSync,
            contracts: deployedContracts,
            linkedContracts: {
                incentivePricingInCommunityReserve: linkedIncentivePricing,
                pointsIntegrationInCommunityReserve: linkedPointsIntegration,
            },
            configuration: {
                feeStructure: {
                    communityMember: "40%",
                    localDAO: "25%",
                    onboardingOrg: "15%",
                    treasury: "20%"
                },
                authorization: {
                    communityReserveInIncentivePricing: isAuthorizedInPricing,
                    communityReserveInPointsIntegration: isAuthorizedInPoints,
                },
                integration: {
                    ivanHealthProtocolContract: ivanContractAddress,
                    healthProtocolLinked: isHealthProtocolLinked,
                    pointsPerEth: process.env.POINTS_PER_ETH || "1000",
                }
            },
            testData: {
                testCommunity: testCommunity,
                testOnboardingOrg: testOnboardingOrg,
                samplePrices: {
                    interview: isZkSync ? ethers.utils.formatEther(prices[0]) : ethers.formatEther(prices[0]),
                    referral: isZkSync ? ethers.utils.formatEther(prices[1]) : ethers.formatEther(prices[1]),
                    dataSharing: isZkSync ? ethers.utils.formatEther(prices[2]) : ethers.formatEther(prices[2]),
                    trial: isZkSync ? ethers.utils.formatEther(prices[3]) : ethers.formatEther(prices[3]),
                    engagement: isZkSync ? ethers.utils.formatEther(prices[4]) : ethers.formatEther(prices[4]),
                }
            }
        };

        const filename = `deployment-info-integrated-${hre.network.name}.json`;
        fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));

        const frontendDeploymentInfo = {
            network: hre.network.name,
            chainId: hre.network.config.chainId,
            contracts: {
                IncentivePricing: { address: incentivePricingAddress },
                PointsIntegration: { address: pointsIntegrationAddress },
                CommunityReserve: { address: communityReserveAddress },
            }
        };

        const frontendFilename = `deployment-info.json`;
        fs.writeFileSync(frontendFilename, JSON.stringify(frontendDeploymentInfo, null, 2));

        console.log("=".repeat(70));
        console.log(" DEPLOYMENT COMPLETED SUCCESSFULLY!");
        console.log("=".repeat(70));
        console.log("Contract Addresses:");
        console.log("  IncentivePricing:", incentivePricingAddress);
        console.log("  PointsIntegration:", pointsIntegrationAddress);
        console.log("  CommunityReserve:", communityReserveAddress);
        console.log("");
        console.log("Features Available:");
        console.log("   Dynamic incentive pricing based on community phases");
        console.log("   Points integration with Ivan's health protocol");
        console.log("   Fee distribution (40/25/15/20% split)");
        console.log("   Community registration and management");
        console.log("   Batch incentive payments");
        console.log("   zkSync compatibility");
        console.log("");
        console.log("Configuration files created:");
        console.log("  -", filename);
        console.log("  -", frontendFilename);
        console.log("");
        console.log("Next Steps:");
        if (isZkSync) {
            console.log("  1. Verify contracts on zkSync explorer");
            console.log("  2. Test frontend integration with zkSync network");
        } else {
            console.log("  1. Run comprehensive tests: yarn test");
            console.log("  2. Test frontend integration");
        }
        console.log("  3. Configure frontend with new contract addresses");
        console.log("  4. Deploy to production network when ready");
        console.log("=".repeat(70));

        return deploymentInfo;

    } catch (error) {
        console.error(" Deployment failed:", error);
        throw error;
    }
}

if (require.main === module) {
    deployIntegrated(require("hardhat"))
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("Integrated deployment failed:", error);
            process.exit(1);
        });
}

export default deployIntegrated;
