// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SettlementContract {
    address public owner;
    mapping(address => uint256) public balances;

    event Settlement(address indexed from, address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function settle(address payable _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        _to.transfer(_amount);
        emit Settlement(msg.sender, _to, _amount);
    }
}
