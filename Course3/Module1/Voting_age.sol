// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract voting{

    struct Candidate {
        address id;
        string name;
        uint age;
    }

    Candidate public voter;

    mapping(address => Candidate) public candidate;

    function setCandidate(string memory _name, uint _age) public {
        voter = Candidate(msg.sender,_name,_age);
        candidate[msg.sender] = voter;
    }

    //Function to check whether the entered age is valid or not
    function valid_age() public view returns (bool) {
        require(voter.age >= 0, "Invalid age");
        return true;  
    }

    //Check if the person is permited to vote or not
    function can_vote() public view returns (string memory) {
        bool validAge = valid_age();
        if(voter.age < 18 || validAge == false) {
            revert("Minimum age for voting is 18 years");
        }
        return "Eligible to vote";
    }

    // Function to find after how many years a person will be permited to vote 
    function vote_after() public view returns(uint) {
        assert(voter.age <18 && voter.age >0);
        uint rem = 18 - voter.age +1;
        assert(rem != 0);
        return rem;
    }
}