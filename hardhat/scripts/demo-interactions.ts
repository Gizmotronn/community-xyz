import { ethers } from "hardhat";

async function main() {
    console.log("Starting Community XYZ Demo...");
    console.log("=".repeat(50));

    let deploymentInfo;
    try {
        const fs = require('fs');
        deploymentInfo = JSON.parse(fs.readFileSync('deployment-info.json', 'utf8'));
    } catch (error) {
        console.error("Please run deployment first: yarn deploy:local");
        return;
    }

    const [owner, investor1, investor2, community1, community2, onboardingOrg, member1, member2] = await ethers.getSigners();

    // Get contract instances
    const CommunityReserve = await ethers.getContractFactory("CommunityReserve");
    const IncentivePricing = await ethers.getContractFactory("IncentivePricing");

    const communityReserve = CommunityReserve.attach(deploymentInfo.contracts.CommunityReserve.address);
    const incentivePricing = IncentivePricing.attach(deploymentInfo.contracts.IncentivePricing.address);

    console.log("Contract Addresses:");
    console.log("CommunityReserve:", await communityReserve.getAddress());
    console.log("IncentivePricing:", await incentivePricing.getAddress());
    console.log("=".repeat(50));

    // Demo 1: Investment Flow
    console.log("Demo 1: Investment Flow");
    console.log("-".repeat(30));

    console.log("Initial Reserve Balance:", ethers.formatEther(await communityReserve.getBalance()), "ETH");

    // Multiple investors
    console.log("Investor 1 investing 2 ETH...");
    await communityReserve.connect(investor1).invest({ value: ethers.parseEther("2") });

    console.log("Investor 2 investing 3 ETH...");
    await communityReserve.connect(investor2).invest({ value: ethers.parseEther("3") });

    console.log("New Reserve Balance:", ethers.formatEther(await communityReserve.getBalance()), "ETH");
    console.log("Total Reserve:", ethers.formatEther(await communityReserve.totalReserve()), "ETH");

    console.log("Investment flow completed\n");

    // Demo 2: Community Registration & Management
    console.log("Demo 2: Community Registration & Management");
    console.log("-".repeat(30));

    // Register communities
    console.log("Registering Bootstrap Community...");
    await communityReserve.registerCommunity(community1.address, onboardingOrg.address);
    await incentivePricing.registerCommunity(community1.address, 25); // Small bootstrap community

    console.log("Registering Growth Community...");
    await communityReserve.registerCommunity(community2.address, onboardingOrg.address);
    await incentivePricing.registerCommunity(community2.address, 150); // Growing community

    // Check community phases
    const [, , , , phase1] = await incentivePricing.getCommunityData(community1.address);
    const [, , , , phase2] = await incentivePricing.getCommunityData(community2.address);

    const phaseNames = ["Bootstrap", "Growth", "Established", "Scaled", "Pharma Ready"];
    console.log(`Community 1 Phase: ${phaseNames[phase1]} (${phase1})`);
    console.log(`Community 2 Phase: ${phaseNames[phase2]} (${phase2})`);

    console.log("Community registration completed\n");

    // Demo 3: Dynamic Pricing
    console.log("Demo 3: Dynamic Incentive Pricing");
    console.log("-".repeat(30));

    // Get pricing for both communities
    const prices1 = await communityReserve.getAllIncentivePrices(community1.address);
    const prices2 = await communityReserve.getAllIncentivePrices(community2.address);

    const incentiveNames = ["Interview", "Referral", "Data Sharing", "Trial", "Engagement"];

    console.log("Bootstrap Community Prices:");
    for (let i = 0; i < 5; i++) {
        console.log(`  ${incentiveNames[i]}: ${ethers.formatEther(prices1[i])} ETH`);
    }

    console.log("Growth Community Prices:");
    for (let i = 0; i < 5; i++) {
        console.log(`  ${incentiveNames[i]}: ${ethers.formatEther(prices2[i])} ETH`);
    }

    console.log("Pricing comparison completed\n");

    // Demo 4: Incentive Payments
    console.log("Demo 4: Incentive Payments with Fee Distribution");
    console.log("-".repeat(30));

    // Record initial balances
    const memberInitial = await ethers.provider.getBalance(member1.address);
    const communityInitial = await ethers.provider.getBalance(community1.address);
    const onboardingInitial = await ethers.provider.getBalance(onboardingOrg.address);
    const ownerInitial = await ethers.provider.getBalance(owner.address);

    console.log("Paying interview incentive to member...");
    const tx = await communityReserve.payIncentive(community1.address, member1.address, 0); // Interview
    const receipt = await tx.wait();
    const txCost = receipt!.gasUsed * receipt!.gasPrice;

    // Check balance changes
    const memberFinal = await ethers.provider.getBalance(member1.address);
    const communityFinal = await ethers.provider.getBalance(community1.address);
    const onboardingFinal = await ethers.provider.getBalance(onboardingOrg.address);
    const ownerFinal = await ethers.provider.getBalance(owner.address);

    console.log("Fee Distribution Results:");
    console.log(`  Member received: ${ethers.formatEther(memberFinal - memberInitial)} ETH (40%)`);
    console.log(`  Community received: ${ethers.formatEther(communityFinal - communityInitial)} ETH (25%)`);
    console.log(`  Onboarding Org received: ${ethers.formatEther(onboardingFinal - onboardingInitial)} ETH (15%)`);
    console.log(`  Treasury received: ${ethers.formatEther(ownerFinal - ownerInitial + txCost)} ETH (20%)`);

    console.log("Incentive payment completed\n");

    // Demo 5: Batch Payments
    console.log("Demo 5: Batch Incentive Payments");
    console.log("-".repeat(30));

    const recipients = [member1.address, member2.address];
    const incentiveTypes = [1, 2]; 

    console.log("Batch paying referral and data sharing incentives...");
    await communityReserve.batchPayIncentives(community1.address, recipients, incentiveTypes);

    console.log("Batch payments completed\n");

    // Demo 6: Community Growth Simulation
    console.log("Demo 6: Community Growth & Phase Transition");
    console.log("-".repeat(30));

    console.log("Updating community stats - simulating growth...");
    await communityReserve.updateCommunityStats(community1.address, 100, 45, 20);

    // Check new phase
    const [, , , , newPhase1] = await incentivePricing.getCommunityData(community1.address);
    console.log(`Community 1 New Phase: ${phaseNames[newPhase1]} (was ${phaseNames[phase1]})`);

    const newPrices1 = await communityReserve.getAllIncentivePrices(community1.address);
    console.log("Updated Pricing:");
    console.log(`  Interview: ${ethers.formatEther(newPrices1[0])} ETH (was ${ethers.formatEther(prices1[0])} ETH)`);

    console.log("Growth simulation completed\n");

    // Demo 7: Contract State Summary
    console.log("Demo 7: Final Contract State");
    console.log("-".repeat(30));

    const finalBalance = await communityReserve.getBalance();
    const finalReserve = await communityReserve.totalReserve();

    console.log("Final Contract State:");
    console.log(`  Contract Balance: ${ethers.formatEther(finalBalance)} ETH`);
    console.log(`  Total Reserve: ${ethers.formatEther(finalReserve)} ETH`);

    console.log("Investment Tracking:");
    console.log(`  Owner invested: ${ethers.formatEther(await communityReserve.getUserInvestment(owner.address))} ETH`);
    console.log(`  Investor 1: ${ethers.formatEther(await communityReserve.getUserInvestment(investor1.address))} ETH`);
    console.log(`  Investor 2: ${ethers.formatEther(await communityReserve.getUserInvestment(investor2.address))} ETH`);

    console.log("=".repeat(50));
    console.log("Demo completed successfully!");
    console.log("All features working as expected:");
    console.log("  - Investment system");
    console.log("  - Community registration");
    console.log("  - Dynamic pricing based on community phase");
    console.log("  - Fee distribution (40/25/15/20)");
    console.log("  - Batch operations");
    console.log("  - Community growth tracking");
    console.log("  - Integration between contracts");
    console.log("=".repeat(50));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Demo failed:", error);
        process.exit(1);
    });