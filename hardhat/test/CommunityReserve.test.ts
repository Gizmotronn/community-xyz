import { expect } from "chai";
import { ethers } from "hardhat";
import { CommunityReserve } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Enhanced CommunityReserve", function () {
  let communityReserve: CommunityReserve;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let community1: HardhatEthersSigner;
  let member1: HardhatEthersSigner;
  let onboardingOrg: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, user1, user2, community1, member1, onboardingOrg] = await ethers.getSigners();

    const CommunityReserve = await ethers.getContractFactory("CommunityReserve");
    communityReserve = await CommunityReserve.deploy();
    await communityReserve.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await communityReserve.owner()).to.equal(owner.address);
    });

    it("Should start with zero total reserve", async function () {
      expect(await communityReserve.totalReserve()).to.equal(0);
    });

    it("Should have correct fee percentages", async function () {
      expect(await communityReserve.COMMUNITY_MEMBER_FEE()).to.equal(4000);
      expect(await communityReserve.LOCAL_DAO_RESERVE_FEE()).to.equal(2500);
      expect(await communityReserve.ONBOARDING_ORG_FEE()).to.equal(1500);
      expect(await communityReserve.TREASURY_FEE()).to.equal(2000);
    });
  });

  describe("Community Registration", function () {
    it("Should register a community with onboarding org", async function () {
      await expect(communityReserve.registerCommunity(community1.address, onboardingOrg.address))
        .to.emit(communityReserve, "CommunityRegistered")
        .withArgs(community1.address, onboardingOrg.address);

      expect(await communityReserve.registeredCommunities(community1.address)).to.be.true;
      expect(await communityReserve.communityOnboardingOrg(community1.address))
        .to.equal(onboardingOrg.address);
    });

    it("Should register a community without onboarding org", async function () {
      await expect(communityReserve.registerCommunity(community1.address, ethers.ZeroAddress))
        .to.emit(communityReserve, "CommunityRegistered")
        .withArgs(community1.address, ethers.ZeroAddress);

      expect(await communityReserve.registeredCommunities(community1.address)).to.be.true;
      expect(await communityReserve.communityOnboardingOrg(community1.address))
        .to.equal(ethers.ZeroAddress);
    });

    it("Should reject registration from non-owner", async function () {
      await expect(
        communityReserve.connect(user1).registerCommunity(community1.address, onboardingOrg.address)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Investing", function () {
    it("Should allow users to invest ETH", async function () {
      const investmentAmount = ethers.parseEther("1.0");

      await expect(communityReserve.connect(user1).invest({ value: investmentAmount }))
        .to.emit(communityReserve, "Invest")
        .withArgs(user1.address, investmentAmount);

      expect(await communityReserve.userInvested(user1.address)).to.equal(investmentAmount);
      expect(await communityReserve.totalReserve()).to.equal(investmentAmount);
      expect(await communityReserve.getBalance()).to.equal(investmentAmount);
    });

    it("Should reject zero investment", async function () {
      await expect(communityReserve.connect(user1).invest({ value: 0 }))
        .to.be.revertedWith("Investment amount must be greater than 0");
    });

    it("Should handle multiple investments from same user", async function () {
      const firstInvestment = ethers.parseEther("1.0");
      const secondInvestment = ethers.parseEther("0.5");

      await communityReserve.connect(user1).invest({ value: firstInvestment });
      await communityReserve.connect(user1).invest({ value: secondInvestment });

      expect(await communityReserve.userInvested(user1.address))
        .to.equal(firstInvestment + secondInvestment);
      expect(await communityReserve.totalReserve())
        .to.equal(firstInvestment + secondInvestment);
    });
  });

  describe("Basic Distribution", function () {
    beforeEach(async function () {
      // Register community and invest some funds
      await communityReserve.registerCommunity(community1.address, onboardingOrg.address);
      await communityReserve.connect(user1).invest({ value: ethers.parseEther("10") });
    });

    it("Should allow owner to distribute funds to registered community", async function () {
      const distributionAmount = ethers.parseEther("1");
      const initialReserve = await communityReserve.totalReserve();

      await expect(communityReserve.distribute(community1.address, distributionAmount))
        .to.emit(communityReserve, "Distribute")
        .withArgs(community1.address, distributionAmount);

      expect(await communityReserve.totalReserve())
        .to.equal(initialReserve - distributionAmount);
      expect(await communityReserve.communityRaised(community1.address))
        .to.equal(distributionAmount);
    });

    it("Should reject distribution to unregistered community", async function () {
      await expect(
        communityReserve.distribute(user2.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Community not registered");
    });

    it("Should reject distribution with insufficient funds", async function () {
      const excessiveAmount = ethers.parseEther("20"); // More than invested

      await expect(
        communityReserve.distribute(community1.address, excessiveAmount)
      ).to.be.revertedWith("Insufficient reserve balance");
    });

    it("Should reject distribution from non-owner", async function () {
      await expect(
        communityReserve.connect(user1).distribute(community1.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Fee Distribution", function () {
    beforeEach(async function () {
      // Register community and invest some funds
      await communityReserve.registerCommunity(community1.address, onboardingOrg.address);
      await communityReserve.connect(user1).invest({ value: ethers.parseEther("10") });
    });

    it("Should distribute funds with correct fee splits", async function () {
      const distributionAmount = ethers.parseEther("1");

      const memberInitialBalance = await ethers.provider.getBalance(member1.address);
      const communityInitialBalance = await ethers.provider.getBalance(community1.address);
      const onboardingInitialBalance = await ethers.provider.getBalance(onboardingOrg.address);
      const ownerInitialBalance = await ethers.provider.getBalance(owner.address);

      const tx = await communityReserve.distributeWithFees(
        community1.address,
        member1.address,
        distributionAmount
      );
      const receipt = await tx.wait();

      const memberAmount = distributionAmount * 4000n / 10000n; 
      const daoAmount = distributionAmount * 2500n / 10000n;   
      const onboardingAmount = distributionAmount * 1500n / 10000n; 
      const treasuryAmount = distributionAmount * 2000n / 10000n; 
      // Check balances
      expect(await ethers.provider.getBalance(member1.address))
        .to.equal(memberInitialBalance + memberAmount);
      expect(await ethers.provider.getBalance(community1.address))
        .to.equal(communityInitialBalance + daoAmount);
      expect(await ethers.provider.getBalance(onboardingOrg.address))
        .to.equal(onboardingInitialBalance + onboardingAmount);

      // Check events
      await expect(tx)
        .to.emit(communityReserve, "FeeDistribution")
        .withArgs(
          community1.address,
          member1.address,
          onboardingOrg.address,
          memberAmount,
          daoAmount,
          onboardingAmount,
          treasuryAmount
        );
    });

    it("Should handle distribution when no onboarding org exists", async function () {
      await communityReserve.registerCommunity(user2.address, ethers.ZeroAddress);

      const distributionAmount = ethers.parseEther("1");
      const ownerInitialBalance = await ethers.provider.getBalance(owner.address);

      const tx = await communityReserve.distributeWithFees(
        user2.address,
        member1.address,
        distributionAmount
      );
      const receipt = await tx.wait();
      if (!receipt) throw new Error("Transaction receipt is null");

      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const expectedTreasuryAmount = distributionAmount * 3500n / 10000n;
      const expectedOwnerBalance = ownerInitialBalance + expectedTreasuryAmount - gasUsed;

      expect(await ethers.provider.getBalance(owner.address)).to.equal(expectedOwnerBalance);
    });

    it("Should reject distribution to unregistered community", async function () {
      await expect(
        communityReserve.distributeWithFees(
          user2.address, // unregistered community
          member1.address,
          ethers.parseEther("1")
        )
      ).to.be.revertedWith("Community not registered");
    });

    it("Should reject distribution with insufficient funds", async function () {
      const excessiveAmount = ethers.parseEther("20"); // More than invested

      await expect(
        communityReserve.distributeWithFees(
          community1.address,
          member1.address,
          excessiveAmount
        )
      ).to.be.revertedWith("Insufficient reserve balance");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await communityReserve.registerCommunity(community1.address, onboardingOrg.address);
      await communityReserve.connect(user1).invest({ value: ethers.parseEther("5") });
      await communityReserve.connect(user2).invest({ value: ethers.parseEther("3") });
    });

    it("Should return correct user investment", async function () {
      expect(await communityReserve.getUserInvestment(user1.address))
        .to.equal(ethers.parseEther("5"));
      expect(await communityReserve.getUserInvestment(user2.address))
        .to.equal(ethers.parseEther("3"));
    });

    it("Should return correct community raised amount", async function () {
      await communityReserve.distribute(community1.address, ethers.parseEther("2"));

      expect(await communityReserve.getCommunityRaised(community1.address))
        .to.equal(ethers.parseEther("2"));
    });

    it("Should return correct contract balance", async function () {
      expect(await communityReserve.getBalance())
        .to.equal(ethers.parseEther("8"));
    });
  });

  describe("Emergency Functions", function () {
    beforeEach(async function () {
      await communityReserve.connect(user1).invest({ value: ethers.parseEther("5") });
    });

    it("Should allow owner to emergency withdraw", async function () {
      const ownerInitialBalance = await ethers.provider.getBalance(owner.address);
      const contractBalance = await communityReserve.getBalance();

      const tx = await communityReserve.emergencyWithdraw();
      const receipt = await tx.wait();
      if (!receipt) throw new Error("Transaction receipt is null");

      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      expect(await communityReserve.getBalance()).to.equal(0);
      expect(await ethers.provider.getBalance(owner.address)).to.equal(
        ownerInitialBalance + contractBalance - gasUsed
      );
    });

    it("Should reject emergency withdraw from non-owner", async function () {
      await expect(communityReserve.connect(user1).emergencyWithdraw())
        .to.be.revertedWith("Only owner can call this function");
    });
  });
});