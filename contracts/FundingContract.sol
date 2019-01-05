pragma solidity ^0.4.20;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract FundingContract is Ownable {

    mapping (address => uint) public cooldown;

    event Deposit(address indexed _from, uint _value);
    event Fund(address indexed _to);

    modifier timePassed(address _address) {
        require (cooldown[_address] < now, "Cooldown period has not passed yet.");
        _;
    }

    modifier contractFunded() {
        require(address(this).balance >= 1 finney, "Contract is not funded");
        _;
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() external onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    function fund(address _address) external onlyOwner timePassed(_address) contractFunded {
        _address.transfer(1 finney);
        cooldown[_address] = now + 30 days;
        emit Fund(_address);
    }
}