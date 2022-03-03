pragma solidity 0.6.6;

import "/home/hluchetu/projects/balancer/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAI is ERC20 {
    constructor() public ERC20("Dai StableCoin", "DAI") {}
}
