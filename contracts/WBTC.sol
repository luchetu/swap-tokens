pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WBTC is ERC20 {
  constructor() public ERC20('WBTC Token', 'WBTC') {}
}