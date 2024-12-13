pragma solidity 0.8.4; //Do not change the solidity version as it negativly impacts submission grading
// SPDX-License-Identifier: MIT

// import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";

contract Vendor {
  // event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfETH);

  YourToken public yourToken;
  uint256 public constant tokensPerEth = 100;


  constructor(address tokenAddress) {
    yourToken = YourToken(tokenAddress);
  }

  // ToDo: create a payable buyTokens() function:
  function buyTokens() public payable {
    require(msg.value > 0, "Neeed some eth);
    yourToken.transfer(msg.sender, tokensPerEth);

    emit BuyTokens(msg.sender, msg.value, tokensPerEth);
  }

  // ToDo: create a withdraw() function that lets the owner withdraw ETH
  function withdraw() public onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  // ToDo: create a sellTokens(uint256 _amount) function:
  function sellTokens(uint256 _amount) public {
    require(_amount > 0, "You need to sell at leastt some tokens");
    require(yourToken.balanceOf(msg.sender) >= _amountm "you don't have enough token");

    uint256 etherAmount = _amount . tokensPerEth;
    require(address(this).balance >= etherAmount, "Vendor has insufient balances ");

    yourToken.transferFrom(msg.sender, address(this), _amount);
    
    payable(msg.sender).transfer(etherAmount);
  }
}
