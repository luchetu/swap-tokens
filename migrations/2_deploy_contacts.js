const IBPool = artifacts.require("IBPool");
const IWeth = artifacts.require("IWeth");
const myContract = artifacts.require("myContract");

module.exports = async function (deployer) {

    // deploy myContract
    await deployer.deploy(myContract, "0xe867be952ee17d2d294f2de62b13b9f4af521e9a", "0xba100000625a3754423978a60c9317c58a424e3D","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
};

