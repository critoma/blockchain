// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Faucet {
    //constructor to set the owner
        //constructor() payable {
        //}

    //function to donate funds to the faucet contract - the contract receive
    receive () external payable {}

    function withdraw(/*address payable _requestor,*/ uint /*calldata*/ withdraw_amount) public {
        require(withdraw_amount <= 100000000000000000);
        //msg.sender.transfer(withdraw_amount);
        payable(msg.sender).transfer(withdraw_amount);
        //_requestor.transfer(withdraw_amount);
        //payable(msg.sender).send(withdraw_amount);
    }
}
