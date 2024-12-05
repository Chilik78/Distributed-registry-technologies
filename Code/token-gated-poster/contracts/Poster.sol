// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract Poster {

    address tokenAddress;
    uint256 public threshold;
    address public owner;

    constructor(address _tokenAddress, uint256 _threshold) {
        tokenAddress = _tokenAddress;
        threshold = _threshold;
        owner = msg.sender;
        emit OwnershipTransferred(address(0x0), owner);
    }

    event NewPost(address indexed user, string content, string indexed tag);

    function post(string memory content, string memory tag) public {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(msg.sender);
        if (balance < threshold) revert("Not enough tokens");
        emit NewPost(msg.sender, content, tag);
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address _newOwner) public virtual onlyOwner {
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }

    function setTokenAddress(address _newTokenAddress) public virtual onlyOwner {
        tokenAddress = _newTokenAddress;
    }

    function setThreshold(uint256 _newThreshold) public virtual onlyOwner {
        threshold = _newThreshold;
    }
}