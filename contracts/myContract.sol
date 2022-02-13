// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IBPool.sol";
import "./IWeth.sol";


contract myContract{
    IBPool public bPool;
    IWeth public weth;
    IERC20 public bal;

    constructor( address _bPool, address _bal,address _weth){
        bPool = IBPool(_bPool);
        weth = IWeth(_weth);
        bal= IERC20(_bal);
    }

function swapEtherForbal(uint256 amountOfBal) external payable{
    weth.deposit{ value: msg.value } ();
    uint price = 110 * bPool.getSpotPrice( address(weth), address(bal)) /100;

    uint wethAMount = price * amountOfBal;
    weth.approve(address(bPool), wethAMount);
    bPool.swapExactAmountOut(
        address(weth),
        wethAMount,
        address(bal),
        amountOfBal,
        price
    );

    bal.transfer(msg.sender,amountOfBal);
    payable(msg.sender).transfer(address(this).balance);
}

function getSpotPrice() external view returns(uint){
  return bPool.getSpotPrice(address(weth),address(bal));
}
}

