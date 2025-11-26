import { expect } from "chai";
import { ethers } from "hardhat";
import { IncentivePricing } from "../typechain-types";

describe("IncentivePricing", function () {
    let incentivePricing: IncentivePricing;
    let owner: any;
    let community1: any;
    let community2: any;
    let user1: any;

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
        [owner, community1, community2, user1] = await ethers.getSigners();

        const IncentivePricingFactory = await ethers.getContractFactory("IncentivePricing");
        incentivePricing = await IncentivePricingFactory.deploy();
        await incentivePricing.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await incentivePricing.owner()).to.equal(owner.address);
        });

        it("Should initialize base pricing correctly", async function () {
            expect(await incentivePricing.basePricing(IncentiveType.INTERVIEW_PARTICIPATION))
                .to.equal(ethers.parseEther("0.01"));
            expect(await incentivePricing.basePricing(IncentiveType.FRIEND_REFERRAL))
                .to.equal(ethers.parseEther("0.005"));
            expect(await incentivePricing.basePricing(IncentiveType.TRIAL_PARTICIPATION))
                .to.equal(ethers.parseEther("0.05"));
        });

        it("Should initialize phase multipliers correctly", async function () {
            expect(await incentivePricing.phaseMultipliers(CommunityPhase.BOOTSTRAP))
                .to.equal(15000); // 150%
            expect(await incentivePricing.phaseMultipliers(CommunityPhase.ESTABLISHED))
                .to.equal(10000); // 100%
            expect(await incentivePricing.phaseMultipliers(CommunityPhase.PHARMA_READY))
                .to.equal(6000);  // 60%
        });
    });

    describe("Community Registration", function () {
        it("Should register a new community", async function () {
            await incentivePricing.registerCommunity(community1.address, 25);

            const [memberCount, , , , phase, isActive] = await incentivePricing.getCommunityData(community1.address);

            expect(memberCount).to.equal(25);
            expect(phase).to.equal(CommunityPhase.BOOTSTRAP);
            expect(isActive).to.be.true;
        });

        it("Should emit CommunityRegistered event", async function () {
            await expect(incentivePricing.registerCommunity(community1.address, 25))
                .to.emit(incentivePricing, "CommunityRegistered")
                .withArgs(community1.address, CommunityPhase.BOOTSTRAP);
        });

        it("Should not allow non-owner to register community", async function () {
            await expect(
                incentivePricing.connect(user1).registerCommunity(community1.address, 25)
            ).to.be.revertedWith("Only owner can call this function");
        });

        it("Should not register same community twice", async function () {
            await incentivePricing.registerCommunity(community1.address, 25);

            await expect(
                incentivePricing.registerCommunity(community1.address, 30)
            ).to.be.revertedWith("Community already registered");
        });
    });

    describe("Community Phase Determination", function () {
        it("Should correctly determine BOOTSTRAP phase", async function () {
            const phase = await incentivePricing.determineCommunityPhase(25, 5, 0);
            expect(phase).to.equal(CommunityPhase.BOOTSTRAP);
        });

        it("Should correctly determine GROWTH phase", async function () {
            const phase = await incentivePricing.determineCommunityPhase(75, 25, 0);
            expect(phase).to.equal(CommunityPhase.GROWTH);
        });

        it("Should correctly determine ESTABLISHED phase", async function () {
            const phase = await incentivePricing.determineCommunityPhase(250, 60, ethers.parseEther("10"));
            expect(phase).to.equal(CommunityPhase.ESTABLISHED);
        });

        it("Should correctly determine SCALED phase", async function () {
            const phase = await incentivePricing.determineCommunityPhase(600, 250, ethers.parseEther("50"));
            expect(phase).to.equal(CommunityPhase.SCALED);
        });

        it("Should correctly determine PHARMA_READY phase", async function () {
            const phase = await incentivePricing.determineCommunityPhase(1200, 600, ethers.parseEther("150"));
            expect(phase).to.equal(CommunityPhase.PHARMA_READY);
        });
    });

    describe("Community Data Updates", function () {
        beforeEach(async function () {
            await incentivePricing.registerCommunity(community1.address, 25);
        });

        it("Should update community data", async function () {
            await incentivePricing.updateCommunityData(
                community1.address,
                100,
                30,
                15,
                ethers.parseEther("5")
            );

            const [memberCount, totalInterviews, totalReferrals, fundsRaised, phase] =
                await incentivePricing.getCommunityData(community1.address);

            expect(memberCount).to.equal(100);
            expect(totalInterviews).to.equal(30);
            expect(totalReferrals).to.equal(15);
            expect(fundsRaised).to.equal(ethers.parseEther("5"));
            expect(phase).to.equal(CommunityPhase.ESTABLISHED);
        });

        it("Should emit CommunityUpdated event when phase changes", async function () {
            await expect(
                incentivePricing.updateCommunityData(community1.address, 250, 60, 30, ethers.parseEther("10"))
            )
                .to.emit(incentivePricing, "CommunityUpdated")
                .withArgs(community1.address, CommunityPhase.ESTABLISHED);
        });

        it("Should not allow non-owner to update community data", async function () {
            await expect(
                incentivePricing.connect(user1).updateCommunityData(
                    community1.address, 100, 30, 15, ethers.parseEther("5")
                )
            ).to.be.revertedWith("Only owner can call this function");
        });
    });

    describe("Incentive Price Calculation", function () {
        beforeEach(async function () {
            await incentivePricing.registerCommunity(community1.address, 25); // BOOTSTRAP phase
            await incentivePricing.registerCommunity(community2.address, 300); // ESTABLISHED phase
        });

        it("Should calculate correct price for BOOTSTRAP community", async function () {
            const price = await incentivePricing.calculateIncentivePrice(
                community1.address,
                IncentiveType.INTERVIEW_PARTICIPATION
            );

            // Base price: 0.01 ETH, Bootstrap multiplier: 150%
            const expectedPrice = ethers.parseEther("0.01") * 15000n / 10000n;
            expect(price).to.equal(expectedPrice);
        });

        it("Should calculate correct price for ESTABLISHED community", async function () {
            const price = await incentivePricing.calculateIncentivePrice(
                community2.address,
                IncentiveType.INTERVIEW_PARTICIPATION
            );

            // Base price: 0.01 ETH, Established multiplier: 100%
            const expectedPrice = ethers.parseEther("0.01");
            expect(price).to.equal(expectedPrice);
        });

        it("Should calculate different prices for different incentive types", async function () {
            const interviewPrice = await incentivePricing.calculateIncentivePrice(
                community1.address,
                IncentiveType.INTERVIEW_PARTICIPATION
            );

            const referralPrice = await incentivePricing.calculateIncentivePrice(
                community1.address,
                IncentiveType.FRIEND_REFERRAL
            );

            expect(interviewPrice).to.be.greaterThan(referralPrice);
        });

        it("Should emit IncentiveCalculated event", async function () {
            const tx = await incentivePricing.calculateAndEmitIncentivePrice(
                community1.address,
                IncentiveType.INTERVIEW_PARTICIPATION
            );

            const expectedPrice = ethers.parseEther("0.01") * 15000n / 10000n;

            await expect(tx)
                .to.emit(incentivePricing, "IncentiveCalculated")
                .withArgs(community1.address, IncentiveType.INTERVIEW_PARTICIPATION, expectedPrice);
        });
    });

    describe("Pricing Updates", function () {
        it("Should update base pricing", async function () {
            const newPrice = ethers.parseEther("0.02");

            await incentivePricing.updateBasePricing(IncentiveType.INTERVIEW_PARTICIPATION, newPrice);

            expect(await incentivePricing.basePricing(IncentiveType.INTERVIEW_PARTICIPATION))
                .to.equal(newPrice);
        });

        it("Should emit PricingUpdated event", async function () {
            const newPrice = ethers.parseEther("0.02");

            await expect(
                incentivePricing.updateBasePricing(IncentiveType.INTERVIEW_PARTICIPATION, newPrice)
            )
                .to.emit(incentivePricing, "PricingUpdated")
                .withArgs(IncentiveType.INTERVIEW_PARTICIPATION, newPrice);
        });

        it("Should update phase multipliers", async function () {
            const newMultiplier = 12000; // 120%

            await incentivePricing.updatePhaseMultiplier(CommunityPhase.BOOTSTRAP, newMultiplier);

            expect(await incentivePricing.phaseMultipliers(CommunityPhase.BOOTSTRAP))
                .to.equal(newMultiplier);
        });

        it("Should not allow non-owner to update pricing", async function () {
            await expect(
                incentivePricing.connect(user1).updateBasePricing(
                    IncentiveType.INTERVIEW_PARTICIPATION,
                    ethers.parseEther("0.02")
                )
            ).to.be.revertedWith("Only owner can call this function");
        });
    });

    describe("Utility Functions", function () {
        beforeEach(async function () {
            await incentivePricing.registerCommunity(community1.address, 25);
            await incentivePricing.registerCommunity(community2.address, 300);
        });

        it("Should return all registered communities", async function () {
            const communities = await incentivePricing.getRegisteredCommunities();
            expect(communities.length).to.equal(2);
            expect(communities[0]).to.equal(community1.address);
            expect(communities[1]).to.equal(community2.address);
        });

        it("Should return all incentive prices for a community", async function () {
            const prices = await incentivePricing.getAllIncentivePrices(community1.address);
            expect(prices.length).to.equal(5);

            // All prices should be > 0
            for (let i = 0; i < 5; i++) {
                expect(prices[i]).to.be.greaterThan(0);
            }
        });

        it("Should deactivate community", async function () {
            await incentivePricing.deactivateCommunity(community1.address);

            const [, , , , , isActive] = await incentivePricing.getCommunityData(community1.address);
            expect(isActive).to.be.false;
        });
    });

    describe("Access Control", function () {
        it("Should transfer ownership", async function () {
            await incentivePricing.transferOwnership(user1.address);
            expect(await incentivePricing.owner()).to.equal(user1.address);
        });

        it("Should not allow transfer to zero address", async function () {
            await expect(
                incentivePricing.transferOwnership(ethers.ZeroAddress)
            ).to.be.revertedWith("New owner cannot be zero address");
        });
    });
});