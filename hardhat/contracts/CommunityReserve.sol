// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CommunityReserve {
    address public owner;
    uint256 public reserveBalance;

    mapping(address => uint256) public userInvested;
    mapping(address => uint256) public communityRaised;

    event Invest(address indexed user, uint256 amount);
    event Distribute(address indexed community, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Users invest ETH into the reserve
    function invest() external payable {
        require(msg.value > 0, "No ETH sent");
        userInvested[msg.sender] += msg.value;
        reserveBalance += msg.value;
        emit Invest(msg.sender, msg.value);
    }

    // Owner distributes funds to a community
    function distribute(address community, uint256 amount) external onlyOwner {
        require(amount <= reserveBalance, "Insufficient reserve");
        reserveBalance -= amount;
        communityRaised[community] += amount;
        emit Distribute(community, amount);
        payable(community).transfer(amount);
    }

    // Fallback to receive ETH
    receive() external payable {
        require(msg.value > 0, "No ETH sent");
        userInvested[msg.sender] += msg.value;
        reserveBalance += msg.value;
        emit Invest(msg.sender, msg.value);
    }
}
