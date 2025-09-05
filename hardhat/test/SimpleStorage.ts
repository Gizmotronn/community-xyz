import { ethers } from "hardhat";
import { expect } from "chai";

describe("SimpleStorage", function () {
  it("Should store and retrieve a value", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const contract = await SimpleStorage.deploy();
    await contract.waitForDeployment(); 
    await contract.set(42);
    expect(await contract.get()).to.equal(42);
  });
});
