import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"

const UploadDoc = () => {
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
        let accounts = await 
        contract.setDocHash("welcome, im your sig.").then((transactionResponse) => console.log(transactionResponse))
        
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

