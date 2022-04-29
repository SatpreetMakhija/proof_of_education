import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"

// const FileUploadAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; //local net

const FileUploadAddress = "0x497A8AA7745dE7E65Fa9c3c9c58028928ffbFBFb";  //ropsten net



const verifyMessage = async (_message, _txHash ) => {
  
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      FileUploadAddress,
      FileUpload.abi,
      provider
    );
    try {
      const message = _message;
      const txHash = _txHash;
      console.log(message);
      console.log(txHash);
      // code to retrieve signature from txHash //
      const transaction = await provider.getTransaction(txHash);
      const data = transaction.data;
      console.log("transaction data is here:")
      console.log(data);
      const iface = new ethers.utils.Interface(FileUpload.abi);
      const univPublicKey = iface.decodeFunctionData("setDocHash", data)[1]
      const signature = iface.decodeFunctionData("setDocHash", data)[0]
      
     console.log(signature);
      const signerAddress = await ethers.utils.verifyMessage(message, signature);
      console.log(signerAddress)
      if (signerAddress !== univPublicKey) {
        console.log("signature does NOT match");
        return false;
      }
      console.log("Signature matches!")
      return true;
    } catch (err) {
      console.log("Error: ", err);
    }
  }
 
};

export default function VerifyMessage() {




  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // const file = new FormData(e.target.files);
    // setSuccessMsg();
    // setError();
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
    const txn_decoded = window.atob(data.get("txHash"));
    const isValid = await verifyMessage(hash,txn_decoded);

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <div className="box">
      <div className="box-in">
        <form className="m-4" onSubmit={handleVerification}>
          <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
            <main className="mt-4 p-4">
            <div className="logo-h">
              <h1><span>Validate</span> Document</h1>
            </div>
              <div className="">
                <div className="custom-file-upload">
                  <input
                    required
                    type="file"
                    name="message"
                    className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  />
                </div>
                <div className="my-3">
                  <textarea
                    required
                    type="text"
                    name="txHash"
                    class="form-control" id="exampleInputPassword1"
                    placeholder="txHash"
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-success"
              >
                Verify signature
              </button>
            </footer>
            
          </div>
        </form>
        <div className="p-4 mt-4">
              <ErrorMessage message={error} />
              <SuccessMessage message={successMsg} />
            </div>
        </div>
    </div>
  );
}
