//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FileUpload {
    // string private docHash;
    struct signAddress {
        string documentSignature;
        string universityPublicKey; 
    }
    signAddress private dummySignAddress;
    // constructor(string memory _docHash) {
    //     console.log("Deploying a Greeter with greeting:", _docHash);
    //     docHash = _docHash;
    // }

    function getDocHash() public view returns (signAddress memory) {
        return dummySignAddress;
    }

    function setDocHash(string memory _documentSignature, string memory  _universityPublicKey) public {
        dummySignAddress = signAddress(_documentSignature, _universityPublicKey);
        console.log("new signAddress is ", _documentSignature);
        console.log("new univ Address is ", _universityPublicKey);
        // console.log("Changing documentSignature from '%d' to '%s' ", dummySignAddress["documentSignature"], _documentSignature);
        // console.log("Changing greeting from '%s' to '%s'", docHash, _docHash);
        // docHash = _docHash;
        // console.log(docHash);
    }
}

