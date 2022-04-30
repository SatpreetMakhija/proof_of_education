import React from "react";
import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
// import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"
import FileUpload from "../../utils/FileUpload.json"
var txDecoder = require('ethereum-tx-decoder');


const UploadDoc = () => {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [txId, setTxId] = useState('');


  const userAddress = useSelector((state) => state.login.address)
  // const FileUploadAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // local host

  const FileUploadAddress = "0x497A8AA7745dE7E65Fa9c3c9c58028928ffbFBFb"; //ropsten



  async function uploadSig(e) {

    // Handelling file upload and hashing  ///////////////////

    e.preventDefault();
    const data = new FormData(e.target);
    const file = data.get("message");
    const fileContents = await readToText(file);
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(fileContents))
    console.log("hash", hash)

    async function readToText(file) {

      const temporaryFileReader = new FileReader();
  
      return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
              temporaryFileReader.abort();
              reject(new DOMException("Problem parsing input file."));
          };
  
          temporaryFileReader.onload = () => {
              resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsBinaryString(file);
      });
  
    }; 
    

    // Handelling file upload and hashing  ///////////////////




    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileUploadAddress,
        FileUpload.abi,
        signer
      );
      try {

        console.log(typeof(await signer.getAddress()))
        const msgToSign = hash;
        const signature = signer.signMessage(msgToSign);
        const signerAddress = signer.getAddress()
        const tx = await contract.setDocHash(signature, signerAddress);
        const receipt = await tx.wait()
        // console.log(receipt.transactionHash);
        // user needs to save txHash value for verification
        const txHash = receipt.transactionHash;
        // console.log("The transaction hash is ", txHash);
        let txn_encoded = window.btoa(txHash); // encode a string
         // decode the string
        console.log("TransactionId:", txn_encoded)
        setTxId(txn_encoded);
        // const transaction = await provider.getTransaction(txHash);
        // const data = transaction.data;

        // const iface = new ethers.utils.Interface(FileUpload.abi);
        // const inputToSetDocHash = iface.decodeFunctionData("setDocHash", data)[0]
        // console.log(inputToSetDocHash)

      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  
  return (
  <div className="box">
    <div>
      <form className="m-4" onSubmit={uploadSig}>
          <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
            <main className="mt-4 p-4">
            <div className="logo-h">
              <h1><span>Upload</span> Document</h1>
            </div>

              <div className="">
                <div class="custom-file-upload">
                  <input
                    required
                    type="file"
                    name="message"
                    className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <button type="submit" className="btn btn-success">
                Upload 
              </button>

            </footer>
          </div>
        </form>
        {txId && 
        <div id = "upload-noti">
          <div className="login-noti">
              <h5>Transcation Success!!</h5>
        </div>
          <h6>Your Transaction Id {txId}</h6>
          <p>Save this for verification!</p>
        </div>}
        </div>
    </div>
  )
};

export default UploadDoc;

