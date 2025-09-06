// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CommunityReserve {
    address public owner;
    uint256 public totalReserve;
    
    // Fee percentages (in basis points: 10000 = 100%)
    uint256 public constant COMMUNITY_MEMBER_FEE = 4000;  // 40%
    uint256 public constant LOCAL_DAO_RESERVE_FEE = 2500; // 25%
    uint256 public constant ONBOARDING_ORG_FEE = 1500;    // 15%
    uint256 public constant TREASURY_FEE = 2000;          // 20%
    
    // State mappings
    mapping(address => uint256) public userInvested;
    mapping(address => uint256) public communityRaised;
    mapping(address => bool) public registeredCommunities;
    mapping(address => address) public communityOnboardingOrg; // community -> onboarding org
    
    // Events
    event Invest(address indexed user, uint256 amount);
    event Distribute(address indexed community, uint256 amount);
    event FeeDistribution(
        address indexed community,
        address indexed member,
        address indexed onboardingOrg,
        uint256 memberAmount,
        uint256 daoAmount,
        uint256 onboardingAmount,
        uint256 treasuryAmount
    );
    event CommunityRegistered(address indexed community, address indexed onboardingOrg);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Register a community with optional onboarding organization
    function registerCommunity(address community, address onboardingOrg) external onlyOwner {
        require(community != address(0), "Invalid community address");
        registeredCommunities[community] = true;
        if (onboardingOrg != address(0)) {
            communityOnboardingOrg[community] = onboardingOrg;
        }
        emit CommunityRegistered(community, onboardingOrg);
    }
    
    // Users invest ETH into the reserve
    function invest() external payable {
        require(msg.value > 0, "Investment amount must be greater than 0");
        userInvested[msg.sender] += msg.value;
        totalReserve += msg.value;
        emit Invest(msg.sender, msg.value);
    }
    
    // Owner distributes funds to a community with fee splitting
    function distribute(address community, uint256 amount) external onlyOwner {
        require(registeredCommunities[community], "Community not registered");
        require(amount <= totalReserve, "Insufficient reserve balance");
        require(amount > 0, "Distribution amount must be greater than 0");
        
        totalReserve -= amount;
        communityRaised[community] += amount;
        
        emit Distribute(community, amount);
    }
    
    // Distribute funds with fee splitting to stakeholders
    function distributeWithFees(
        address community,
        address member,
        uint256 totalAmount
    ) external onlyOwner {
        require(registeredCommunities[community], "Community not registered");
        require(totalAmount <= totalReserve, "Insufficient reserve balance");
        require(totalAmount > 0, "Distribution amount must be greater than 0");
        require(member != address(0), "Invalid member address");
        
        totalReserve -= totalAmount;
        
        // Calculate fee distributions
        uint256 memberAmount = (totalAmount * COMMUNITY_MEMBER_FEE) / 10000;
        uint256 daoAmount = (totalAmount * LOCAL_DAO_RESERVE_FEE) / 10000;
        uint256 onboardingAmount = (totalAmount * ONBOARDING_ORG_FEE) / 10000;
        uint256 treasuryAmount = (totalAmount * TREASURY_FEE) / 10000;
        
        // Transfer to member (the person being incentivized)
        payable(member).transfer(memberAmount);
        
        // Transfer to community DAO reserve
        payable(community).transfer(daoAmount);
        
        // Transfer to onboarding organization (if exists)
        address onboardingOrg = communityOnboardingOrg[community];
        if (onboardingOrg != address(0)) {
            payable(onboardingOrg).transfer(onboardingAmount);
        } else {
            // If no onboarding org, add to treasury
            treasuryAmount += onboardingAmount;
        }
        
        // Transfer to protocol treasury (owner for now)
        payable(owner).transfer(treasuryAmount);
        
        communityRaised[community] += totalAmount;
        
        emit FeeDistribution(
            community,
            member,
            onboardingOrg,
            memberAmount,
            daoAmount,
            onboardingAmount,
            treasuryAmount
        );
        emit Distribute(community, totalAmount);
    }
    
    // Get contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    // Get user's total investment
    function getUserInvestment(address user) external view returns (uint256) {
        return userInvested[user];
    }
    
    // Get total amount raised for a community
    function getCommunityRaised(address community) external view returns (uint256) {
        return communityRaised[community];
    }
    
    // Emergency withdraw function (owner only)
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        totalReserve = 0;
        payable(owner).transfer(balance);
    }
    
    // Fallback function to receive ETH
    receive() external payable {
        require(msg.value > 0, "No ETH sent");
        userInvested[msg.sender] += msg.value;
        totalReserve += msg.value;
        emit Invest(msg.sender, msg.value);
    }
}