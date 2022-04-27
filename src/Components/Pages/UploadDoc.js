import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"
var txDecoder = require('ethereum-tx-decoder');



const UploadDoc = () => {
  const [file, setFile] = useState('')

  const userAddress = useSelector((state) => state.login.address)
  const FileUploadAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  async function uploadSig(e) {

    // Handelling file upload and hashing  ///////////////////

    setFile(e.target.files[0])
    console.log("state: ",e.target.files[0])
    const fileContents = await readToText(e.target.files[0])
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
        console.log("The transaction hash is ", txHash);
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
    <form> 
    <div style={{
      display:'flex',
      justifyContent:'center', 
      alignItems: 'center', 
      height: "100vh",
    }}>
      <input type="file" onChange={uploadSig}/>
      <button type="submit"> Send it </button>
    </div>
  </form>
  )
};

export default UploadDoc;

