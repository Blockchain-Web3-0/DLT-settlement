const { expect } = require("chai");

describe("SettlementContract", function() {
    it("Should settle funds between accounts", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const SettlementContract = await ethers.getContractFactory("SettlementContract");
        const contract = await SettlementContract.deploy();
        await contract.deployed();

        // Deposit funds
        await contract.connect(owner).deposit({ value: ethers.utils.parseEther("1.0") });

        // Settle funds
        await contract.connect(owner).settle(addr1.address, ethers.utils.parseEther("0.5"));

        expect(await ethers.provider.getBalance(addr1.address)).to.equal(ethers.utils.parseEther("0.5"));
    });
});