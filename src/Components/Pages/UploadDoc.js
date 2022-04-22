import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"
var txDecoder = require('ethereum-tx-decoder');



const UploadDoc = () => {
  

//=======Code to parse transaction data to get the input to the function of smart contract called=======/
//   function hex_to_ascii(str1)
//  {
// 	var hex  = str1.toString();
// 	var str = '';
// 	for (var n = 0; n < hex.length; n += 2) {
// 		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
// 	}
// 	return str;
//  }
// const inputData = hex_to_ascii(data.slice(10));
        // console.log(inputData.length)

        // const inputData1 = ethers.utils.defaultAbiCoder.decode("string", data.slice(10));
        // console.log(inputData1)
        // console.log(inputData1.length);
  
//=======Code to parse transaction data to get the input to the function of smart contract called=======/

  const userAddress = useSelector((state) => state.login.address)
  const FileUploadAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  async function uploadSig() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileUploadAddress,
        FileUpload.abi,
        signer
      );
      try {
        const tx = await contract.setDocHash("thiss the new sig");
        const receipt = await tx.wait()
        console.log(receipt.transactionHash);
        const txHash = receipt.transactionHash;
        const transaction = await provider.getTransaction(txHash);
        const data = transaction.data;

        const iface = new ethers.utils.Interface(FileUpload.abi);
        const inputToSetDocHash = iface.decodeFunctionData("setDocHash", data)[0]
        console.log(inputToSetDocHash.length)

      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }


  return (
    <p>
      <button onClick={uploadSig}>Set sig</button>
    </p>
  )
};

export default UploadDoc;

