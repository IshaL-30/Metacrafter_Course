// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    string public Full_Name;
    string public Nick_Name;
    uint public power;
    uint256 public Initial_Amount;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor(string memory _full, string memory _nick, uint _pow, uint256 _initial_Amount) {
        Full_Name = _full;
        Nick_Name = _nick;
        power = _pow;
        Initial_Amount = _initial_Amount * (10 ** power);
        balanceOf[msg.sender] = Initial_Amount;
        emit Transfer(address(0), msg.sender, Initial_Amount);
    }

    function mint(address to, uint256 amount) public returns(uint) {
        balanceOf[to] += amount;
        return balanceOf[to];
    }

    function burn(address to, uint256 amount) public returns(uint) {
        balanceOf[to] -= amount;
        return balanceOf[to];
    }

    function transferto(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= amount, "Transfer amount exceeds balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Transfer to the zero address");
        require(balanceOf[from] >= amount, "Transfer amount exceeds balance");
        require(allowance[from][msg.sender] >= amount, "Transfer amount exceeds allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
