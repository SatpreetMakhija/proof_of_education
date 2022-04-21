//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FileUpload {
    string private docHash;

    // constructor(string memory _docHash) {
    //     console.log("Deploying a Greeter with greeting:", _docHash);
    //     docHash = _docHash;
    // }

    function getDocHash() public view returns (string memory) {
        return docHash;
    }

    function setDocHash(string memory _docHash) public {
        console.log("Changing greeting from '%s' to '%s'", docHash, _docHash);
        docHash = _docHash;
        console.log(docHash);
    }
}

