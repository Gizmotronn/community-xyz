const { ethers } = require("hardhat");

async function main() {
  const CommunityReserve = await ethers.getContractFactory("CommunityReserve");
  const contract = await CommunityReserve.deploy();
  await contract.deployed();
  console.log("CommunityReserve deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});