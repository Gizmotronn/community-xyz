const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("SimpleStorage", function () {
  it("Should store and retrieve a value", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const contract = await SimpleStorage.deploy();
    await contract.deployed();

    await contract.set(42);
    expect(await contract.get()).to.equal(42);
  });
});
