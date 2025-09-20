// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract IncentivePricing {
    address public owner;

    // Authorized contracts that can call updateCommunityData
    mapping(address => bool) public authorizedContracts;

    // Community Development Phases
    enum CommunityPhase {
        BOOTSTRAP, // 0: Starting phase (1-50 members)
        GROWTH, // 1: Growing phase (51-200 members)
        ESTABLISHED, // 2: Established phase (201-500 members)
        SCALED, // 3: Large scale (500+ members)
        PHARMA_READY // 4: Ready for pharmaceutical partnerships
    }

    // Incentive Types
    enum IncentiveType {
        INTERVIEW_PARTICIPATION,
        FRIEND_REFERRAL,
        HEALTH_DATA_SHARING,
        TRIAL_PARTICIPATION,
        COMMUNITY_ENGAGEMENT
    }

    // Community data structure
    struct CommunityData {
        uint256 memberCount;
        uint256 totalInterviews;
        uint256 totalReferrals;
        uint256 fundsRaised;
        CommunityPhase phase;
        bool isActive;
        uint256 lastUpdated;
    }

    // Base pricing for each incentive type
    mapping(IncentiveType => uint256) public basePricing;

    // Phase multipliers (basis points: 10000 = 100%)
    mapping(CommunityPhase => uint256) public phaseMultipliers;

    // Registered communities
    address[] public registeredCommunities;
    mapping(address => CommunityData) public communities;

    // Events
    event CommunityRegistered(address indexed community, CommunityPhase phase);
    event CommunityUpdated(address indexed community, CommunityPhase newPhase);
    event ContractAuthorized(address indexed contractAddress);
    event ContractDeauthorized(address indexed contractAddress);
    event BasePriceUpdated(IncentiveType incentiveType, uint256 newPrice);
    event PhaseMultiplierUpdated(CommunityPhase phase, uint256 newMultiplier);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyOwnerOrAuthorized() {
        require(
            msg.sender == owner || authorizedContracts[msg.sender],
            "Only owner can call this function"
        );
        _;
    }

    modifier validCommunity(address community) {
        require(
            communities[community].isActive,
            "Community not registered or inactive"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        _initializeBasePricing();
        _initializePhaseMultipliers();
    }

    /**
     * @dev Initialize base pricing for incentive types
     */
    function _initializeBasePricing() private {
        // Base prices in ETH converted to wei
        basePricing[IncentiveType.INTERVIEW_PARTICIPATION] = 0.01 ether;
        basePricing[IncentiveType.FRIEND_REFERRAL] = 0.005 ether;
        basePricing[IncentiveType.HEALTH_DATA_SHARING] = 0.008 ether;
        basePricing[IncentiveType.TRIAL_PARTICIPATION] = 0.02 ether;
        basePricing[IncentiveType.COMMUNITY_ENGAGEMENT] = 0.003 ether;
    }

    /**
     * @dev Initialize phase multipliers
     */
    function _initializePhaseMultipliers() private {
        // Multipliers as basis points (10000 = 100%)
        phaseMultipliers[CommunityPhase.BOOTSTRAP] = 15000; // 150% - Higher incentives for new communities
        phaseMultipliers[CommunityPhase.GROWTH] = 12000; // 120% - Good incentives for growing communities
        phaseMultipliers[CommunityPhase.ESTABLISHED] = 10000; // 100% - Standard rate
        phaseMultipliers[CommunityPhase.SCALED] = 8000; // 80%  - Lower incentives for large communities
        phaseMultipliers[CommunityPhase.PHARMA_READY] = 6000; // 60%  - Lowest incentives for mature communities
    }

    /**
     * @dev Authorize a contract to call restricted functions
     */
    function authorizeContract(address contractAddress) external onlyOwner {
        require(contractAddress != address(0), "Invalid contract address");
        authorizedContracts[contractAddress] = true;
        emit ContractAuthorized(contractAddress);
    }

    /**
     * @dev Deauthorize a contract
     */
    function deauthorizeContract(address contractAddress) external onlyOwner {
        authorizedContracts[contractAddress] = false;
        emit ContractDeauthorized(contractAddress);
    }

    /**
     * @dev Register a new community
     */
    function registerCommunity(
        address community,
        uint256 initialMemberCount
    ) external onlyOwner {
        require(community != address(0), "Invalid community address");
        require(
            !communities[community].isActive,
            "Community already registered"
        );

        CommunityPhase phase = determineCommunityPhase(
            initialMemberCount,
            0,
            0
        );

        communities[community] = CommunityData({
            memberCount: initialMemberCount,
            totalInterviews: 0,
            totalReferrals: 0,
            fundsRaised: 0,
            phase: phase,
            isActive: true,
            lastUpdated: block.timestamp
        });

        registeredCommunities.push(community);
        emit CommunityRegistered(community, phase);
    }

    /**
     * @dev Update community data and recalculate phase (callable by owner or authorized contracts)
     */
    function updateCommunityData(
        address community,
        uint256 newMemberCount,
        uint256 newInterviews,
        uint256 newReferrals,
        uint256 newFundsRaised
    ) external onlyOwnerOrAuthorized validCommunity(community) {
        CommunityData storage communityData = communities[community];

        // Update data
        communityData.memberCount = newMemberCount;
        communityData.totalInterviews = newInterviews;
        communityData.totalReferrals = newReferrals;
        communityData.fundsRaised = newFundsRaised;
        communityData.lastUpdated = block.timestamp;

        // Recalculate phase
        CommunityPhase newPhase = determineCommunityPhase(
            newMemberCount,
            newInterviews,
            newFundsRaised
        );

        if (newPhase != communityData.phase) {
            communityData.phase = newPhase;
            emit CommunityUpdated(community, newPhase);
        }
    }

    /**
     * @dev Calculate incentive price for a community and incentive type
     */
    function calculateIncentivePrice(
        address community,
        IncentiveType incentiveType
    ) external view validCommunity(community) returns (uint256) {
        CommunityData memory communityData = communities[community];

        uint256 basePrice = basePricing[incentiveType];
        uint256 multiplier = phaseMultipliers[communityData.phase];

        // Apply phase multiplier
        uint256 finalPrice = (basePrice * multiplier) / 10000;

        return finalPrice;
    }

    /**
     * @dev Determine community phase based on metrics
     */
    function determineCommunityPhase(
        uint256 memberCount,
        uint256 totalInterviews,
        uint256 fundsRaised
    ) public pure returns (CommunityPhase) {
        // Phase determination logic based on member count and activity

        // Pharma Ready: Large community with significant funding
        if (memberCount >= 1000 && fundsRaised >= 100 ether) {
            return CommunityPhase.PHARMA_READY;
        }

        // Scaled: Large community
        if (memberCount >= 500) {
            return CommunityPhase.SCALED;
        }

        // Established: Medium community with good activity
        if (
            memberCount >= 200 || (memberCount >= 100 && totalInterviews >= 50)
        ) {
            return CommunityPhase.ESTABLISHED;
        }

        // Growth: Growing community
        if (memberCount >= 50 || (memberCount >= 25 && totalInterviews >= 20)) {
            return CommunityPhase.GROWTH;
        }

        // Bootstrap: New/small community
        return CommunityPhase.BOOTSTRAP;
    }

    /**
     * @dev Get community data
     */
    function getCommunityData(
        address community
    )
        external
        view
        returns (
            uint256 memberCount,
            uint256 totalInterviews,
            uint256 totalReferrals,
            uint256 fundsRaised,
            CommunityPhase phase,
            bool isActive,
            uint256 lastUpdated
        )
    {
        CommunityData memory data = communities[community];
        return (
            data.memberCount,
            data.totalInterviews,
            data.totalReferrals,
            data.fundsRaised,
            data.phase,
            data.isActive,
            data.lastUpdated
        );
    }

    /**
     * @dev Get all registered communities
     */
    function getRegisteredCommunities()
        external
        view
        returns (address[] memory)
    {
        return registeredCommunities;
    }

    /**
     * @dev Get pricing for all incentive types for a community
     */
    function getAllIncentivePrices(
        address community
    )
        external
        view
        validCommunity(community)
        returns (uint256[5] memory prices)
    {
        for (uint i = 0; i < 5; i++) {
            prices[i] = this.calculateIncentivePrice(
                community,
                IncentiveType(i)
            );
        }
        return prices;
    }

    /**
     * @dev Update base pricing for an incentive type (owner only)
     */
    function updateBasePricing(
        IncentiveType incentiveType,
        uint256 newPrice
    ) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        basePricing[incentiveType] = newPrice;
        emit BasePriceUpdated(incentiveType, newPrice);
    }

    /**
     * @dev Update phase multiplier (owner only)
     */
    function updatePhaseMultiplier(
        CommunityPhase phase,
        uint256 newMultiplier
    ) external onlyOwner {
        require(newMultiplier > 0, "Multiplier must be greater than 0");
        require(newMultiplier <= 50000, "Multiplier too high"); // Max 500%
        phaseMultipliers[phase] = newMultiplier;
        emit PhaseMultiplierUpdated(phase, newMultiplier);
    }

    /**
     * @dev Emergency function to deactivate a community
     */
    function deactivateCommunity(address community) external onlyOwner {
        communities[community].isActive = false;
    }

    /**
     * @dev Reactivate a community
     */
    function reactivateCommunity(address community) external onlyOwner {
        require(community != address(0), "Invalid community address");
        communities[community].isActive = true;
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
        return "1.0.0-zksync";
    }

    /**
     * @dev Check if contract is deployed on zkSync
     */
    function isZkSync() external view returns (bool) {
        // zkSync Era has specific system contracts at these addresses
        return
            address(0x8008).code.length > 0 || // SYSTEM_CONTEXT_CONTRACT
            address(0x8009).code.length > 0; // ETH_TOKEN_CONTRACT
    }

    /**
     * @dev Get phase name for frontend display
     */
    function getPhaseName(
        CommunityPhase phase
    ) external pure returns (string memory) {
        if (phase == CommunityPhase.BOOTSTRAP) return "Bootstrap";
        if (phase == CommunityPhase.GROWTH) return "Growth";
        if (phase == CommunityPhase.ESTABLISHED) return "Established";
        if (phase == CommunityPhase.SCALED) return "Scaled";
        if (phase == CommunityPhase.PHARMA_READY) return "Pharma Ready";
        return "Unknown";
    }

    /**
     * @dev Get incentive type name for frontend display
     */
    function getIncentiveTypeName(
        IncentiveType incentiveType
    ) external pure returns (string memory) {
        if (incentiveType == IncentiveType.INTERVIEW_PARTICIPATION)
            return "Interview Participation";
        if (incentiveType == IncentiveType.FRIEND_REFERRAL)
            return "Friend Referral";
        if (incentiveType == IncentiveType.HEALTH_DATA_SHARING)
            return "Health Data Sharing";
        if (incentiveType == IncentiveType.TRIAL_PARTICIPATION)
            return "Trial Participation";
        if (incentiveType == IncentiveType.COMMUNITY_ENGAGEMENT)
            return "Community Engagement";
        return "Unknown";
    }
}
