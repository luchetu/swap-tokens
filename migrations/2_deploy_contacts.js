const IBPool = artifacts.require("IBPool");
const IWeth = artifacts.require("IWeth");
const myContract = artifacts.require("myContract");

module.exports = async function (deployer) {

    // deploy myContract
    await deployer.deploy(myContract, "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014", "0xba100000625a3754423978a60c9317c58a424e3D","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
};

