const Dex = artifacts.require("Dex");
const { DAI } = require("../config/config");
const { USDC } = require("../config/config");
const { USDT } = require("../config/config");
const { BAL } = require("../config/config");
const { WBTC } = require("../config/config");
const IERC20 = artifacts.require("IERC20");
const { DAI_WHALE } = require("../config/config");
const { USDC_WHALE } = require("../config/config");
const { USDT_WHALE } = require("../config/config");
const { WBTC_WHALE } = require("../config/config");


module.exports = async function (deployer, networks, accounts) {
    const usdc = await IERC20.at(USDC);
    const dai = await IERC20.at(DAI);
    const usdt = await IERC20.at(USDT);
    const wbtc = await IERC20.at(WBTC);
    const bal = await IERC20.at(BAL);

    // Create Dex Contract with 10 ether from the deployer account
    await deployer.deploy(Dex, {
        from: accounts[0],
        value: "10000000000000000000",
    });
    console.log("Dai>>>>" + DAI_WHALE);
    console.log("USDC_WHALE>>>>" + USDC_WHALE);
    console.log("USDT_WHALE>>>>" + USDT_WHALE);
    console.log("WBTC_WHALE>>>>" + WBTC_WHALE);
    console.log("metamask>>>>" + accounts[1]);


    const dex = await Dex.deployed();

    // Transfer USDC from unlocked account to Dex Contract
    await usdc.transfer(dex.address, 10000000000, {
        from: USDC_WHALE,
    });
    // Transfer DAI from unlocked account to Dex Contract
    await dai.transfer(dex.address, 10000000000, {
        from: DAI_WHALE,
    });
    // Transfer USDT from unlocked account to Dex Contract
    await usdt.transfer(dex.address, 10000000000, {
        from: USDT_WHALE,
    });
    // // Transfer BAL from unlocked account to Dex Contract
    // await bal.transfer(dex.address, 10000000000, {
    //     from: TOKEN_WHALE,
    // });
    // Transfer WBTC from unlocked account to Dex Contract
    await wbtc.transfer(dex.address, 10000000000, {
        from: WBTC_WHALE,
    });

    // Transfer USDC from unlocked account to user account
    await usdc.transfer(accounts[1], 10000000000, {
        from: USDC_WHALE,
    });

    // Transfer DAI from unlocked account to user account
    await dai.transfer(accounts[1], 10000000000, {
        from: DAI_WHALE,
    });
    // Transfer WBTC from unlocked account to user account
    await wbtc.transfer(accounts[1], 10000000000, {
        from: WBTC_WHALE,
    });
    // Transfer USDT from unlocked account to user account
    await usdt.transfer(accounts[1], 10000000000, {
        from: USDT_WHALE,
    });
    // Transfer BAL from unlocked account to user account
    // await bal.transfer(accounts[1], 10000000000, {
    //     from: TOKEN_WHALE,
    // });

    console.log("usdt>>>>" + await usdt.address)
    console.log("usdc>>>>" + await usdc.address)
    console.log("dai>>>>" + await dai.address)
    console.log("wbtc>>>>" + await wbtc.address)

};