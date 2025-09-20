// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IHealthProtocolPoints {
    function addPoints(
        uint256 communityId,
        uint256 userId,
        uint256 points
    ) external;
    function bulkAddPoints(
        uint256 communityId,
        uint256[] calldata userIds,
        uint256[] calldata points
    ) external;
    function getScoreCard(
        uint256 communityId,
        uint256 userId
    ) external view returns (uint256 totalPoints, uint256 level, bool exists);
}

contract PointsIntegration {
    address public owner;
    IHealthProtocolPoints public healthProtocolContract;

    // Map community addresses to community IDs
    mapping(address => uint256) public communityToId;
    mapping(address => uint256) public userToId;
    uint256 public nextCommunityId = 1;
    uint256 public nextUserId = 1;

    // Points conversion rate (1 ETH incentive = X points)
    uint256 public constant POINTS_PER_ETH = 1000; // 1 ETH = 1000 points

    // Track points awarded for transparency
    mapping(address => mapping(address => uint256)) public totalPointsAwarded;

    event CommunityRegistered(address indexed community, uint256 communityId);
    event UserRegistered(address indexed user, uint256 userId);
    event PointsAwarded(
        address indexed community,
        address indexed user,
        uint256 points,
        uint256 ethValue
    );
    event PointsConverted(uint256 ethAmount, uint256 pointsAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedContracts[msg.sender],
            "Not authorized"
        );
        _;
    }

    // Allow CommunityReserve to call functions
    mapping(address => bool) public authorizedContracts;

    constructor(address _healthProtocolContract) {
        owner = msg.sender;
        if (_healthProtocolContract != address(0)) {
            healthProtocolContract = IHealthProtocolPoints(
                _healthProtocolContract
            );
        }
    }

    /**
     * @dev Authorize contract (like CommunityReserve) to call functions
     */
    function authorizeContract(address contractAddress) external onlyOwner {
        authorizedContracts[contractAddress] = true;
    }

    /**
     * @dev Set or update
     */
    function setHealthProtocolContract(address _contract) external onlyOwner {
        healthProtocolContract = IHealthProtocolPoints(_contract);
    }

    /**
     * @dev Register community and get ID
     */
    function registerCommunity(
        address community
    ) external onlyAuthorized returns (uint256) {
        if (communityToId[community] == 0) {
            communityToId[community] = nextCommunityId;
            nextCommunityId++;
            emit CommunityRegistered(community, communityToId[community]);
        }
        return communityToId[community];
    }

    /**
     * @dev Register user and get ID
     */
    function registerUser(address user) external returns (uint256) {
        if (userToId[user] == 0) {
            userToId[user] = nextUserId;
            nextUserId++;
            emit UserRegistered(user, userToId[user]);
        }
        return userToId[user];
    }

    /**
     * @dev Convert ETH incentive amount to points and award them
     */
    function convertAndAwardPoints(
        address community,
        address user,
        uint256 ethAmount
    ) external onlyAuthorized {
        uint256 points = (ethAmount * POINTS_PER_ETH) / 1 ether;

        // Register community and user if not already registered
        if (communityToId[community] == 0) {
            this.registerCommunity(community);
        }
        if (userToId[user] == 0) {
            this.registerUser(user);
        }

        uint256 communityId = communityToId[community];
        uint256 userId = userToId[user];

        // Award points if available
        if (address(healthProtocolContract) != address(0)) {
            healthProtocolContract.addPoints(communityId, userId, points);
        }

        // Track locally
        totalPointsAwarded[community][user] += points;

        emit PointsAwarded(community, user, points, ethAmount);
        emit PointsConverted(ethAmount, points);
    }

    /**
     * @dev Bulk convert and award points
     */
    function bulkConvertAndAwardPoints(
        address community,
        address[] calldata users,
        uint256[] calldata ethAmounts
    ) external onlyAuthorized {
        require(users.length == ethAmounts.length, "Arrays length mismatch");

        // Ensure community is registered
        if (communityToId[community] == 0) {
            this.registerCommunity(community);
        }
        uint256 communityId = communityToId[community];

        uint256[] memory userIds = new uint256[](users.length);
        uint256[] memory pointsArray = new uint256[](users.length);

        for (uint256 i = 0; i < users.length; i++) {
            // Register user if not already registered
            if (userToId[users[i]] == 0) {
                this.registerUser(users[i]);
            }

            userIds[i] = userToId[users[i]];
            pointsArray[i] = (ethAmounts[i] * POINTS_PER_ETH) / 1 ether;

            // Track locally
            totalPointsAwarded[community][users[i]] += pointsArray[i];

            emit PointsAwarded(
                community,
                users[i],
                pointsArray[i],
                ethAmounts[i]
            );
        }

        // Bulk award if available
        if (address(healthProtocolContract) != address(0)) {
            healthProtocolContract.bulkAddPoints(
                communityId,
                userIds,
                pointsArray
            );
        }
    }

    /**
     * @dev Get user's total points in a community
     */
    function getUserPoints(
        address community,
        address user
    ) external view returns (uint256 localPoints, uint256 contractPoints) {
        localPoints = totalPointsAwarded[community][user];

        if (
            address(healthProtocolContract) != address(0) &&
            communityToId[community] != 0 &&
            userToId[user] != 0
        ) {
            uint256 communityId = communityToId[community];
            uint256 userId = userToId[user];

            (contractPoints, , ) = healthProtocolContract.getScoreCard(
                communityId,
                userId
            );
        }
    }

    /**
     * @dev Get community stats
     */
    function getCommunityStats(
        address community
    )
        external
        view
        returns (
            uint256 communityId,
            uint256 totalUsers,
            uint256 totalPointsDistributed
        )
    {
        communityId = communityToId[community];


        totalUsers = nextUserId - 1; // Approximation

        totalPointsDistributed = 0; // Placeholder
    }

    /**
     * @dev Emergency function to update points conversion rate (currently disabled)
     */
    function updatePointsPerEth(uint256 /* newRate */) external onlyOwner {

        require(false, "Rate is currently fixed - contact admin for changes");
    }

    /**
     * @dev Check if contracts are properly linked
     */
    function isHealthProtocolLinked() external view returns (bool) {
        return address(healthProtocolContract) != address(0);
    }

    /**
     * @dev Get version for compatibility checking
     */
    function version() external pure returns (string memory) {
        return "1.0.0-points-integration";
    }
}
