// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// Import the IncentivePricing interface
interface IIncentivePricing {
    enum IncentiveType {
        INTERVIEW_PARTICIPATION,
        FRIEND_REFERRAL,
        HEALTH_DATA_SHARING,
        TRIAL_PARTICIPATION,
        COMMUNITY_ENGAGEMENT
    }

    function calculateIncentivePrice(
        address community,
        IncentiveType incentiveType
    ) external view returns (uint256);
    function updateCommunityData(
        address community,
        uint256 newMemberCount,
        uint256 newInterviews,
        uint256 newReferrals,
        uint256 newFundsRaised
    ) external;
}

// Interface for Points Integration
interface IPointsIntegration {
    function convertAndAwardPoints(
        address community,
        address user,
        uint256 ethAmount
    ) external;
    function bulkConvertAndAwardPoints(
        address community,
        address[] calldata users,
        uint256[] calldata ethAmounts
    ) external;
}

contract CommunityReserve {
    address public owner;
    uint256 public totalReserve;

    // Fee percentages (in basis points: 10000 = 100%)
    uint256 public constant COMMUNITY_MEMBER_FEE = 4000; // 40%
    uint256 public constant LOCAL_DAO_RESERVE_FEE = 2500; // 25%
    uint256 public constant ONBOARDING_ORG_FEE = 1500; // 15%
    uint256 public constant TREASURY_FEE = 2000; // 20%

    // Contract references
    IIncentivePricing public incentivePricingContract;
    IPointsIntegration public pointsIntegrationContract;

    // Community data
    struct Community {
        address onboardingOrg;
        uint256 memberCount;
        uint256 totalInterviews;
        uint256 totalReferrals;
        uint256 totalDistributed;
        bool isRegistered;
        uint256 lastActivity;
    }

    // State mappings
    mapping(address => uint256) public userInvested;
    mapping(address => uint256) public communityRaised;
    mapping(address => bool) public registeredCommunities;
    mapping(address => address) public communityOnboardingOrg;

    // Enhanced mappings
    mapping(address => uint256) public userInvestments;
    mapping(address => uint256) public communityDistributed;
    mapping(address => Community) public communities;

    // Events
    event Invest(address indexed user, uint256 amount);
    event Distribute(address indexed community, uint256 amount);
    event CommunityRegistered(
        address indexed community,
        address indexed onboardingOrg
    );
    event DistributeWithFees(
        address indexed community,
        address indexed member,
        address indexed onboardingOrg,
        uint256 memberAmount,
        uint256 daoAmount,
        uint256 onboardingAmount,
        uint256 treasuryAmount
    );
    event IncentivePaid(
        address indexed community,
        address indexed recipient,
        uint256 amount,
        uint8 incentiveType
    );
    event IncentivePricingContractUpdated(address indexed newContract);
    event PointsIntegrationContractUpdated(address indexed newContract);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Invest in the community reserve
     */
    function invest() external payable {
        require(msg.value > 0, "Investment amount must be greater than 0");

        totalReserve += msg.value;
        userInvested[msg.sender] += msg.value;
        userInvestments[msg.sender] += msg.value;

        emit Invest(msg.sender, msg.value);
    }

    /**
     * @dev Register a new community
     */
    function registerCommunity(
        address community,
        address onboardingOrg
    ) external onlyOwner {
        require(community != address(0), "Invalid community address");
        require(onboardingOrg != address(0), "Invalid onboarding org address");
        require(
            !communities[community].isRegistered,
            "Community already registered"
        );

        communities[community] = Community({
            onboardingOrg: onboardingOrg,
            memberCount: 0,
            totalInterviews: 0,
            totalReferrals: 0,
            totalDistributed: 0,
            isRegistered: true,
            lastActivity: block.timestamp
        });

        registeredCommunities[community] = true;
        communityOnboardingOrg[community] = onboardingOrg;

        emit CommunityRegistered(community, onboardingOrg);
    }

    /**
     * @dev Update community statistics
     */
    function updateCommunityStats(
        address community,
        uint256 memberCount,
        uint256 interviews,
        uint256 referrals
    ) external onlyOwner {
        require(
            communities[community].isRegistered,
            "Community not registered"
        );

        Community storage comm = communities[community];
        comm.memberCount = memberCount;
        comm.totalInterviews = interviews;
        comm.totalReferrals = referrals;
        comm.lastActivity = block.timestamp;

        if (address(incentivePricingContract) != address(0)) {
            incentivePricingContract.updateCommunityData(
                community,
                memberCount,
                interviews,
                referrals,
                communityRaised[community]
            );
        }
    }

    /**
     * @dev Pay incentive to community member with points integration
     */
    function payIncentive(
        address community,
        address recipient,
        IIncentivePricing.IncentiveType incentiveType
    ) external onlyOwner {
        require(
            communities[community].isRegistered,
            "Community not registered"
        );
        require(recipient != address(0), "Invalid recipient");

        uint256 incentiveAmount = getIncentivePrice(
            community,
            uint8(incentiveType)
        );
        require(
            address(this).balance >= incentiveAmount,
            "Insufficient contract balance"
        );

        // Pay the recipient
        payable(recipient).transfer(incentiveAmount);

        // Update community stats
        communities[community].totalDistributed += incentiveAmount;
        communityDistributed[community] += incentiveAmount;

        // Integrate with points system if available
        if (address(pointsIntegrationContract) != address(0)) {
            pointsIntegrationContract.convertAndAwardPoints(
                community,
                recipient,
                incentiveAmount
            );
        }

        emit IncentivePaid(
            community,
            recipient,
            incentiveAmount,
            uint8(incentiveType)
        );
    }

    /**
     * @dev Batch pay incentives to multiple recipients
     */
    function batchPayIncentives(
        address community,
        address[] calldata recipients,
        uint8[] calldata incentiveTypes
    ) external onlyOwner {
        require(
            recipients.length == incentiveTypes.length,
            "Arrays length mismatch"
        );
        require(
            communities[community].isRegistered,
            "Community not registered"
        );

        uint256 totalAmount = 0;
        uint256[] memory amounts = new uint256[](recipients.length);

        // Calculate total required amount
        for (uint256 i = 0; i < recipients.length; i++) {
            amounts[i] = getIncentivePrice(community, incentiveTypes[i]);
            totalAmount += amounts[i];
        }

        require(
            address(this).balance >= totalAmount,
            "Insufficient contract balance"
        );

        // Pay all recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient");
            payable(recipients[i]).transfer(amounts[i]);
            emit IncentivePaid(
                community,
                recipients[i],
                amounts[i],
                incentiveTypes[i]
            );
        }

        // Update community stats
        communities[community].totalDistributed += totalAmount;
        communityDistributed[community] += totalAmount;

        // Integrate with points system if available
        if (address(pointsIntegrationContract) != address(0)) {
            pointsIntegrationContract.bulkConvertAndAwardPoints(
                community,
                recipients,
                amounts
            );
        }
    }

    /**
     * @dev Distribute funds to community with fee splitting
     */
    function distributeWithFees(
        address community,
        address member,
        uint256 amount
    ) external onlyOwner {
        require(
            communities[community].isRegistered,
            "Community not registered"
        );
        require(member != address(0), "Invalid member address");
        require(address(this).balance >= amount, "Insufficient balance");

        address onboardingOrg = communities[community].onboardingOrg;

        // Calculate fee distributions
        uint256 memberAmount = (amount * COMMUNITY_MEMBER_FEE) / 10000;
        uint256 daoAmount = (amount * LOCAL_DAO_RESERVE_FEE) / 10000;
        uint256 onboardingAmount = (amount * ONBOARDING_ORG_FEE) / 10000;
        uint256 treasuryAmount = (amount * TREASURY_FEE) / 10000;

        // Ensure we don't exceed the total amount due to rounding
        uint256 totalCalculated = memberAmount +
            daoAmount +
            onboardingAmount +
            treasuryAmount;
        if (totalCalculated > amount) {
            treasuryAmount =
                amount -
                (memberAmount + daoAmount + onboardingAmount);
        }

        // Distribute funds
        payable(member).transfer(memberAmount);

        // DAO gets its share (stays in contract for now)

        payable(onboardingOrg).transfer(onboardingAmount);

        // Treasury gets its share (stays in contract for now)

        // Update stats
        communities[community].totalDistributed += amount;
        communityDistributed[community] += amount;

        // Integrate with points system
        if (address(pointsIntegrationContract) != address(0)) {
            pointsIntegrationContract.convertAndAwardPoints(
                community,
                member,
                memberAmount
            );
        }

        emit DistributeWithFees(
            community,
            member,
            onboardingOrg,
            memberAmount,
            daoAmount,
            onboardingAmount,
            treasuryAmount
        );
    }

    /**
     * @dev Standard distribution without fee splitting
     */
    function distribute(address community, uint256 amount) external onlyOwner {
        require(
            communities[community].isRegistered,
            "Community not registered"
        );
        require(totalReserve >= amount, "Insufficient reserve balance");
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        totalReserve -= amount;
        communityRaised[community] += amount;
        communities[community].totalDistributed += amount;
        communityDistributed[community] += amount;


        emit Distribute(community, amount);
    }

    /**
     * @dev Set IncentivePricing contract
     */
    function setIncentivePricingContract(address _contract) external onlyOwner {
        incentivePricingContract = IIncentivePricing(_contract);
        emit IncentivePricingContractUpdated(_contract);
    }

    /**
     * @dev Set Points Integration contract
     */
    function setPointsIntegrationContract(
        address _contract
    ) external onlyOwner {
        pointsIntegrationContract = IPointsIntegration(_contract);
        emit PointsIntegrationContractUpdated(_contract);
    }

    /**
     * @dev Get incentive price for a community and type
     */
    function getIncentivePrice(
        address community,
        uint8 incentiveType
    ) public view returns (uint256) {
        if (address(incentivePricingContract) != address(0)) {
            return
                incentivePricingContract.calculateIncentivePrice(
                    community,
                    IIncentivePricing.IncentiveType(incentiveType)
                );
        }
        // Fallback pricing if no pricing contract
        return 0.01 ether;
    }

    /**
     * @dev Get all incentive prices for a community
     */
    function getAllIncentivePrices(
        address community
    ) external view returns (uint256[5] memory prices) {
        for (uint256 i = 0; i < 5; i++) {
            prices[i] = getIncentivePrice(community, uint8(i));
        }
        return prices;
    }

    /**
     * @dev Get community information
     */
    function getCommunityInfo(
        address community
    )
        external
        view
        returns (
            address onboardingOrg,
            uint256 memberCount,
            uint256 totalInterviews,
            uint256 totalReferrals,
            uint256 totalDistributed,
            bool isRegistered,
            uint256 lastActivity
        )
    {
        Community memory comm = communities[community];
        return (
            comm.onboardingOrg,
            comm.memberCount,
            comm.totalInterviews,
            comm.totalReferrals,
            comm.totalDistributed,
            comm.isRegistered,
            comm.lastActivity
        );
    }

    /**
     * @dev Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get registered communities
     */
    function getRegisteredCommunities()
        external
        pure
        returns (address[] memory)
    {

        address[] memory result = new address[](0);
        return result;
    }

    /**
     * @dev Get user investment amount
     */
    function getUserInvestment(address user) external view returns (uint256) {
        return userInvestments[user];
    }

    /**
     * @dev Get total amount raised by community
     */
    function getCommunityRaised(
        address community
    ) external view returns (uint256) {
        return communityRaised[community];
    }

    /**
     * @dev Emergency withdraw all funds (parameterless version for tests)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        totalReserve = 0;
        payable(owner).transfer(balance);
    }

    /**
     * @dev Emergency withdraw specific amount
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(
            amount <= address(this).balance,
            "Insufficient contract balance"
        );
        payable(owner).transfer(amount);
    }

    /**
     * @dev Transfer ownership
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }

    /**
     * @dev Get contract version for zkSync compatibility
     */
    function version() external pure returns (string memory) {
        return "2.0.0-zksync-points";
    }

    /**
     * @dev Check if contract is deployed on zkSync
     */
    function isZkSync() external view returns (bool) {
        return
            address(0x8008).code.length > 0 || // SYSTEM_CONTEXT_CONTRACT
            address(0x8009).code.length > 0; // ETH_TOKEN_CONTRACT
    }

    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {
        totalReserve += msg.value;
        userInvested[msg.sender] += msg.value;
        userInvestments[msg.sender] += msg.value;
        emit Invest(msg.sender, msg.value);
    }
}
