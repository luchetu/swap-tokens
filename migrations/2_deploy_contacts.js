const Dex = artifacts.require("Dex");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");
const DAI = artifacts.require("DAI");
const BAL = artifacts.require("BAL");

//const USDC_MAINNET = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNLOCKED_ACCOUNT = "0x6262998ced04146fa42253a5c0af90ca02dfd2a3";

module.exports = async function (deployer, networks, accounts) {

    await deployer.deploy(USDC);
    await deployer.deploy(USDT);
    await deployer.deploy(DAI);
    await deployer.deploy(BAL);

    const usdc = await USDC.deployed();
    const usdt = await USDT.deployed();
    const dai = await DAI.deployed();
    const bal = await BAL.deployed();

    // Create Dex Contract with 10 ether from the deployer account
    await deployer.deploy(Dex, {
        from: accounts[0],
        value: "10000000000000000000",
    });

    const dex = await Dex.deployed();

    // Transfer USDC  to Dex Contract
    await usdc.faucet(dex.address, 100);
    // Transfer USDt  to Dex Contract
    await usdt.faucet(dex.address, 100);
    // Transfer DAI  to Dex Contract
    await dai.faucet(dex.address, 100);
    // Transfer BAL  to Dex Contract
    await bal.faucet(dex.address, 100);

    // Transfer USDC to user account
    await usdc.faucet(accounts[1], 100);
    // Transfer USDT to user account
    await usdt.faucet(accounts[1], 100);
    // Transfer DAI to user account
    await dai.faucet(accounts[1], 100);
    // Transfer BAL to user account
    await bal.faucet(accounts[1], 100);

    const balance = await dai.balanceOf(accounts[1]);
    console.log(balance.toString())

    const balance0 = await dai.balanceOf(dex.address);
    console.log(balance0.toString())
};