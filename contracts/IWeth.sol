
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWeth{
    function deposit() external payable;
    function withdraw(uint wad) external;
    function approve(address guy, uint wad) external returns (bool);
    function balanceOf(address owner) external returns (uint);
}
