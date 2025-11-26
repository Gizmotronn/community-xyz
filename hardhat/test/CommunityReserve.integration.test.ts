import { expect } from "chai";
import { ethers } from "hardhat";
import { CommunityReserve, IncentivePricing } from "../typechain-types";

describe("CommunityReserve + IncentivePricing Integration", function () {
    let communityReserve: CommunityReserve;
    let incentivePricing: IncentivePricing;
    let owner: any;
    let community1: any;
    let community2: any;
    let member1: any;
    let member2: any;
    let onboardingOrg: any;

    const IncentiveType = {
        INTERVIEW_PARTICIPATION: 0,
        FRIEND_REFERRAL: 1,
        HEALTH_DATA_SHARING: 2,
        TRIAL_PARTICIPATION: 3,
        COMMUNITY_ENGAGEMENT: 4
    };

    const CommunityPhase = {
        BOOTSTRAP: 0,
        GROWTH: 1,
        ESTABLISHED: 2,
        SCALED: 3,
        PHARMA_READY: 4
    };

    beforeEach(async function () {
        [owner, community1, community2, member1, member2, onboardingOrg] = await ethers.getSigners();

        // Deploy IncentivePricing
        const IncentivePricingFactory = await ethers.getContractFactory("IncentivePricing");
        incentivePricing = await IncentivePricingFactory.deploy();
        await incentivePricing.waitForDeployment();

        // Deploy CommunityReserve
        const CommunityReserveFactory = await ethers.getContractFactory("CommunityReserve");
        communityReserve = await CommunityReserveFactory.deploy();
        await communityReserve.waitForDeployment();

        // Link contracts
        await communityReserve.setIncentivePricingContract(await incentivePricing.getAddress());

        // IMPORTANT: Authorize CommunityReserve in IncentivePricing
        await incentivePricing.authorizeContract(await communityReserve.getAddress());

        // Setup test data
        await communityReserve.registerCommunity(community1.address, onboardingOrg.address);
        await incentivePricing.registerCommunity(community1.address, 25); // Bootstrap phase

        // Add some funds to the reserve
        await communityReserve.invest({ value: ethers.parseEther("10") });
    });

    describe("Contract Linking", function () {
        it("Should link contracts correctly", async function () {
            const linkedAddress = await communityReserve.incentivePricingContract();
            expect(linkedAddress).to.equal(await incentivePricing.getAddress());
        });

        it("Should authorize contracts correctly", async function () {
            const isAuthorized = await incentivePricing.authorizedContracts(await communityReserve.getAddress());
            expect(isAuthorized).to.be.true;
        });

        it("Should emit event when linking contracts", async function () {
            const newIncentivePricing = await (await ethers.getContractFactory("IncentivePricing")).deploy();
            await newIncentivePricing.waitForDeployment();

            await expect(
                communityReserve.setIncentivePricingContract(await newIncentivePricing.getAddress())
            ).to.emit(communityReserve, "IncentivePricingContractUpdated");
        });
    });

    describe("Community Registration & Stats Update", function () {
        it("Should register community in both contracts", async function () {
            await communityReserve.registerCommunity(community2.address, onboardingOrg.address);
            await incentivePricing.registerCommunity(community2.address, 100);

            // Check CommunityReserve
            const [, , , , , isRegistered] = await communityReserve.getCommunityInfo(community2.address);
            expect(isRegistered).to.be.true;

            // Check IncentivePricing
            const [memberCount, , , , , isActive] = await incentivePricing.getCommunityData(community2.address);
            expect(memberCount).to.equal(100);
            expect(isActive).to.be.true;
        });

        it("Should update community stats in both contracts", async function () {
            await communityReserve.updateCommunityStats(community1.address, 100, 50, 25);

            // Check CommunityReserve
            const [, memberCount, totalInterviews, totalReferrals] = await communityReserve.getCommunityInfo(community1.address);
            expect(memberCount).to.equal(100);
            expect(totalInterviews).to.equal(50);
            expect(totalReferrals).to.equal(25);

            // Check IncentivePricing (should be updated automatically)
            const [ipMemberCount, ipTotalInterviews, ipTotalReferrals] = await incentivePricing.getCommunityData(community1.address);
            expect(ipMemberCount).to.equal(100);
            expect(ipTotalInterviews).to.equal(50);
            expect(ipTotalReferrals).to.equal(25);
        });
    });

    describe("Dynamic Incentive Pricing", function () {
        it("Should calculate correct incentive price for bootstrap community", async function () {
            const price = await communityReserve.getIncentivePrice(community1.address, IncentiveType.INTERVIEW_PARTICIPATION);

            // Bootstrap phase has 150% multiplier
            const expectedPrice = ethers.parseEther("0.01") * 15000n / 10000n; // 0.015 ETH
            expect(price).to.equal(expectedPrice);
        });

        it("Should return all incentive prices", async function () {
            const prices = await communityReserve.getAllIncentivePrices(community1.address);
            expect(prices.length).to.equal(5);

            // All prices should be > 0 and different
            for (let i = 0; i < 5; i++) {
                expect(prices[i]).to.be.greaterThan(0);
            }

            // Interview should cost more than referral
            expect(prices[0]).to.be.greaterThan(prices[1]);
        });

        it("Should adjust prices when community phase changes", async function () {
            // Initial price (Bootstrap phase - 150%)
            const initialPrice = await communityReserve.getIncentivePrice(community1.address, IncentiveType.INTERVIEW_PARTICIPATION);

            // Update community to established phase
            await communityReserve.updateCommunityStats(community1.address, 300, 150, 75);

            // New price (Established phase - 100%)
            const newPrice = await communityReserve.getIncentivePrice(community1.address, IncentiveType.INTERVIEW_PARTICIPATION);

            // New price should be lower (no bootstrap bonus)
            expect(newPrice).to.be.lessThan(initialPrice);
            expect(newPrice).to.equal(ethers.parseEther("0.01")); // Base price
        });
    });

    describe("Incentive Payments", function () {
        it("Should pay incentive with correct amount", async function () {
            const initialBalance = await ethers.provider.getBalance(member1.address);
            const expectedIncentive = ethers.parseEther("0.01") * 15000n / 10000n * 4000n / 10000n; // Bootstrap price * 40%

            await expect(
                communityReserve.payIncentive(community1.address, member1.address, IncentiveType.INTERVIEW_PARTICIPATION)
            ).to.emit(communityReserve, "IncentivePaid");

            const finalBalance = await ethers.provider.getBalance(member1.address);
            const received = finalBalance - initialBalance;

            expect(received).to.be.closeTo(expectedIncentive, ethers.parseEther("0.001")); // Small tolerance for gas
        });

        it("Should distribute fees correctly during incentive payment", async function () {
            const memberInitial = await ethers.provider.getBalance(member1.address);
            const communityInitial = await ethers.provider.getBalance(community1.address);
            const onboardingInitial = await ethers.provider.getBalance(onboardingOrg.address);
            const ownerInitial = await ethers.provider.getBalance(owner.address);

            const tx = await communityReserve.payIncentive(
                community1.address,
                member1.address,
                IncentiveType.INTERVIEW_PARTICIPATION
            );

            // Get transaction cost for owner
            const receipt = await tx.wait();
            const txCost = receipt!.gasUsed * receipt!.gasPrice;

            const totalIncentive = ethers.parseEther("0.01") * 15000n / 10000n; // 0.015 ETH
            const expectedMember = totalIncentive * 4000n / 10000n; // 40%
            const expectedCommunity = totalIncentive * 2500n / 10000n; // 25%
            const expectedOnboarding = totalIncentive * 1500n / 10000n; // 15%
            const expectedTreasury = totalIncentive * 2000n / 10000n; // 20%

            // Check balances
            const memberFinal = await ethers.provider.getBalance(member1.address);
            const communityFinal = await ethers.provider.getBalance(community1.address);
            const onboardingFinal = await ethers.provider.getBalance(onboardingOrg.address);
            const ownerFinal = await ethers.provider.getBalance(owner.address);

            expect(memberFinal - memberInitial).to.equal(expectedMember);
            expect(communityFinal - communityInitial).to.equal(expectedCommunity);
            expect(onboardingFinal - onboardingInitial).to.equal(expectedOnboarding);
            expect(ownerFinal - ownerInitial + txCost).to.be.closeTo(expectedTreasury, ethers.parseEther("0.001"));
        });

        it("Should handle batch incentive payments", async function () {
            const recipients = [member1.address, member2.address];
            const incentiveTypes = [IncentiveType.INTERVIEW_PARTICIPATION, IncentiveType.FRIEND_REFERRAL];

            const initialBalance1 = await ethers.provider.getBalance(member1.address);
            const initialBalance2 = await ethers.provider.getBalance(member2.address);

            await communityReserve.batchPayIncentives(community1.address, recipients, incentiveTypes);

            const finalBalance1 = await ethers.provider.getBalance(member1.address);
            const finalBalance2 = await ethers.provider.getBalance(member2.address);

            // Both should receive different amounts (different incentive types)
            const received1 = finalBalance1 - initialBalance1;
            const received2 = finalBalance2 - initialBalance2;

            expect(received1).to.be.greaterThan(0);
            expect(received2).to.be.greaterThan(0);
            expect(received1).to.be.greaterThan(received2); // Interview > Referral
        });
    });

    describe("Error Handling", function () {
        it("Should fail incentive payment for unregistered community", async function () {
            await expect(
                communityReserve.payIncentive(member2.address, member1.address, IncentiveType.INTERVIEW_PARTICIPATION)
            ).to.be.revertedWith("Community not registered");
        });

        it("Should fail when IncentivePricing contract not set", async function () {
            // Deploy new CommunityReserve without linking
            const newCommunityReserve = await (await ethers.getContractFactory("CommunityReserve")).deploy();
            await newCommunityReserve.waitForDeployment();

            await newCommunityReserve.registerCommunity(community1.address, onboardingOrg.address);

            await expect(
                newCommunityReserve.getIncentivePrice(community1.address, IncentiveType.INTERVIEW_PARTICIPATION)
            ).to.be.revertedWith("IncentivePricing contract not set");
        });

        it("Should fail incentive payment with insufficient funds", async function () {
            // Deploy contracts with no funds
            const newCommunityReserve = await (await ethers.getContractFactory("CommunityReserve")).deploy();
            const newIncentivePricing = await (await ethers.getContractFactory("IncentivePricing")).deploy();

            await newCommunityReserve.setIncentivePricingContract(await newIncentivePricing.getAddress());
            await newIncentivePricing.authorizeContract(await newCommunityReserve.getAddress());
            await newCommunityReserve.registerCommunity(community1.address, onboardingOrg.address);
            await newIncentivePricing.registerCommunity(community1.address, 25);

            await expect(
                newCommunityReserve.payIncentive(community1.address, member1.address, IncentiveType.INTERVIEW_PARTICIPATION)
            ).to.be.revertedWith("Insufficient reserve balance");
        });
    });

    describe("Integration Flows", function () {
        it("Should handle complete community lifecycle", async function () {
            // 1. Register new community
            await communityReserve.registerCommunity(community2.address, onboardingOrg.address);
            await incentivePricing.registerCommunity(community2.address, 10); // Very small bootstrap

            // 2. Check initial pricing (Bootstrap phase)
            let price = await communityReserve.getIncentivePrice(community2.address, IncentiveType.INTERVIEW_PARTICIPATION);
            expect(price).to.equal(ethers.parseEther("0.015")); // 150% of base

            // 3. Community grows
            await communityReserve.updateCommunityStats(community2.address, 75, 30, 15);

            // 4. Check new pricing (Growth phase)
            price = await communityReserve.getIncentivePrice(community2.address, IncentiveType.INTERVIEW_PARTICIPATION);
            expect(price).to.equal(ethers.parseEther("0.012")); // 120% of base

            // 5. Pay some incentives
            await communityReserve.payIncentive(community2.address, member1.address, IncentiveType.INTERVIEW_PARTICIPATION);
            await communityReserve.payIncentive(community2.address, member2.address, IncentiveType.FRIEND_REFERRAL);

            // 6. Community becomes established
            await communityReserve.updateCommunityStats(community2.address, 250, 100, 50);

            // 7. Check established pricing (100% of base)
            price = await communityReserve.getIncentivePrice(community2.address, IncentiveType.INTERVIEW_PARTICIPATION);
            expect(price).to.equal(ethers.parseEther("0.01")); // 100% of base

            // 8. Verify community info
            const [, memberCount, totalInterviews, totalReferrals, totalDistributed, isRegistered] =
                await communityReserve.getCommunityInfo(community2.address);

            expect(memberCount).to.equal(250);
            expect(totalInterviews).to.equal(100);
            expect(totalReferrals).to.equal(50);
            expect(totalDistributed).to.be.greaterThan(0);
            expect(isRegistered).to.be.true;
        });

        it("Should handle investor funding and incentive distribution cycle", async function () {
            // 1. Multiple investors fund the reserve
            await communityReserve.connect(member1).invest({ value: ethers.parseEther("5") });
            await communityReserve.connect(member2).invest({ value: ethers.parseEther("3") });

            const totalReserveBefore = await communityReserve.totalReserve();
            expect(totalReserveBefore).to.equal(ethers.parseEther("18")); // 10 + 5 + 3

            // 2. Track individual investments
            expect(await communityReserve.getUserInvestment(owner.address)).to.equal(ethers.parseEther("10"));
            expect(await communityReserve.getUserInvestment(member1.address)).to.equal(ethers.parseEther("5"));
            expect(await communityReserve.getUserInvestment(member2.address)).to.equal(ethers.parseEther("3"));

            // 3. Pay multiple incentives
            const recipients = [member1.address, member2.address];
            const incentiveTypes = [IncentiveType.TRIAL_PARTICIPATION, IncentiveType.HEALTH_DATA_SHARING];

            await communityReserve.batchPayIncentives(community1.address, recipients, incentiveTypes);

            // 4. Verify reserve decreased
            const totalReserveAfter = await communityReserve.totalReserve();
            expect(totalReserveAfter).to.be.lessThan(totalReserveBefore);

            // 5. Check community distribution tracking
            const communityDistributed = await communityReserve.getCommunityDistributed(community1.address);
            expect(communityDistributed).to.be.greaterThan(0);
        });
    });

    describe("Advanced Features", function () {
        it("Should handle emergency scenarios", async function () {
            const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
            const contractBalance = await communityReserve.getBalance();

            const tx = await communityReserve.emergencyWithdraw(ethers.parseEther("1"));
            const receipt = await tx.wait();
            const txCost = receipt!.gasUsed * receipt!.gasPrice;

            const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
            const finalContractBalance = await communityReserve.getBalance();

            expect(finalContractBalance).to.equal(contractBalance - ethers.parseEther("1"));
            expect(finalOwnerBalance).to.be.closeTo(
                initialOwnerBalance + ethers.parseEther("1") - txCost,
                ethers.parseEther("0.001")
            );
        });

        it("Should handle ownership transfer", async function () {
            await communityReserve.transferOwnership(member1.address);
            expect(await communityReserve.owner()).to.equal(member1.address);

            // Old owner should not be able to perform owner functions
            await expect(
                communityReserve.registerCommunity(member2.address, onboardingOrg.address)
            ).to.be.revertedWith("Only owner can call this function");

            // New owner should be able to perform owner functions
            await expect(
                communityReserve.connect(member1).registerCommunity(member2.address, onboardingOrg.address)
            ).to.not.be.reverted;
        });

        it("Should handle fallback payments", async function () {
            const initialReserve = await communityReserve.totalReserve();
            const initialUserInvestment = await communityReserve.getUserInvestment(member1.address);

            // Send ETH directly to contract (triggers receive function)
            await member1.sendTransaction({
                to: await communityReserve.getAddress(),
                value: ethers.parseEther("2")
            });

            const finalReserve = await communityReserve.totalReserve();
            const finalUserInvestment = await communityReserve.getUserInvestment(member1.address);

            expect(finalReserve).to.equal(initialReserve + ethers.parseEther("2"));
            expect(finalUserInvestment).to.equal(initialUserInvestment + ethers.parseEther("2"));
        });
    });

    describe("Edge Cases", function () {
        it("Should handle zero amounts gracefully", async function () {
            await expect(
                communityReserve.invest({ value: 0 })
            ).to.be.revertedWith("Investment amount must be greater than 0");

            await expect(
                communityReserve.distribute(community1.address, 0)
            ).to.be.revertedWith("Distribution amount must be greater than 0");
        });

        it("Should handle invalid addresses", async function () {
            await expect(
                communityReserve.registerCommunity(ethers.ZeroAddress, onboardingOrg.address)
            ).to.be.revertedWith("Invalid community address");

            await expect(
                communityReserve.registerCommunity(community2.address, ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid onboarding org address");
        });

        it("Should handle array length mismatches", async function () {
            const recipients = [member1.address, member2.address];
            const incentiveTypes = [IncentiveType.INTERVIEW_PARTICIPATION]; // Different length

            await expect(
                communityReserve.batchPayIncentives(community1.address, recipients, incentiveTypes)
            ).to.be.revertedWith("Arrays length mismatch");
        });

        it("Should handle empty arrays", async function () {
            await expect(
                communityReserve.batchPayIncentives(community1.address, [], [])
            ).to.be.revertedWith("No recipients provided");
        });
    });
});