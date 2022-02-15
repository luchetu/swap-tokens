pragma solidity 0.6.6;

import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";

contract Dex {
    string public name = "Dex";
    address internal constant UNISWAP_V2_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public uniswapRouter;
    address internal constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address internal constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address internal constant USDT = 0xdac17f958d2ee523a2206206994597c13d831ec7;
    address internal constant BAL = 0xba100000625a3754423978a60c9317c58a424e3d;
    IUniswap public uniswapRouter;

    constructor() public payable {
        uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
    }

    function swapEthForUSDC(uint256 ethAmount) external payable {
        uint256 deadline = block.timestamp + 150;
        address[] memory path = getEthForUSDCPath();
        uint256 amountOutMin = uniswapRouter.getAmountsOut(ethAmount, path)[1];
        uniswapRouter.swapExactETHForTokens{value: msg.value}(
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }

    function swapUSDCForEth(uint256 tokenAmount) external payable {
        uint256 deadline = block.timestamp + 150;
        address[] memory path = getUSDCForEthPath();
        uint256 amountOutMin = uniswapRouter.getAmountsOut(tokenAmount, path)[
            1
        ];
        IERC20(USDC).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(USDC).approve(UNISWAP_V2_ROUTER, tokenAmount);
        uniswapRouter.swapExactTokensForETH(
            tokenAmount,
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }

    function getEthForUSDCPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = USDC;

        return path;
    }

    function getUSDCForEthPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = USDC;
        path[1] = uniswapRouter.WETH();

        return path;
    }

    function swapEthForDai(uint256 ethAmount) public payable {
        uint256 deadline = block.timestamp + 150;
        address[] memory path = getEthForDaiPath();
        uint256 amountOutMin = uniswapRouter.getAmountsOut(ethAmount, path)[1];
        uniswapRouter.swapExactETHForTokens{value: msg.value}(
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }

    function getEthForDaiPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = daiAddress;

        return path;
    }

    function swapDaiForEth(uint256 tokenAmount) external payable {
        uint256 deadline = block.timestamp + 150;
        address[] memory path = getDaiForEthPath();
        uint256 amountOutMin = uniswapRouter.getAmountsOut(tokenAmount, path)[
            1
        ];
        IERC20(DAI).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(DAI).approve(UNISWAP_V2_ROUTER, tokenAmount);
        uniswapRouter.swapExactTokensForETH(
            tokenAmount,
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }

    function getDAIForEthPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = DAI;
        path[1] = uniswapRouter.WETH();

        return path;
    }
}
