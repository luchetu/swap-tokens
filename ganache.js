const Web3 = require("web3");
require("dotenv").config();

const ganache = require("ganache-cli");
const options = {
    fork: `https://mainnet.infura.io/v3/${process.env.INFURA_MAINNET}`,
    unlocked_accounts: [
        "0x6262998ced04146fa42253a5c0af90ca02dfd2a3",
        "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268",
        "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
        "0xF977814e90dA44bFA03b6295A0616a897441aceC"
    ],

    account_keys_path: "keys.json",
    host: "127.0.0.1",
    port: 7545,
    seed: 1306,
};

const server = ganache.server(options);
const PORT = 7545;
server.listen(PORT, async (err, blockchain) => {
    if (err) throw err;
    console.log(`ganache listening on port ${PORT}`);
    const provider = server.provider;
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log(accounts[1]);
});