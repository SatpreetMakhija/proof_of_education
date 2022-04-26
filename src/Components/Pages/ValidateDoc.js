import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import FileUpload from "../../artifacts/contracts/FileUpload.sol/FileUpload.json"

const FileUploadAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";


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
  // try {
  //   // const signerAddr = await ethers.utils.verifyMessage(message, signature);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    
  //   if (signerAddr !== address) {
  //     return false;
  //   }

  //   return true;
  // } catch (err) {
  //   console.log(err);
  //   return false;
  // }
};

export default function VerifyMessage() {




  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  
    // setSuccessMsg();
    // setError();
    const isValid = await verifyMessage(data.get("message"),data.get("txHash"));

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <form className="m-4" onSubmit={handleVerification}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify signature
          </h1>
          <div className="">
            <div className="my-3">
              <textarea
                required
                type="text"
                name="message"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Message"
              />
            </div>
            <div className="my-3">
              <textarea
                required
                type="text"
                name="txHash"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="txHash"
              />
            </div>
            {/* <div className="my-3">
              <input
                required
                type="text"
                name="address"
                className="textarea w-full input input-bordered focus:ring focus:outline-none"
                placeholder="Signer address"
              />
            </div> */}
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Verify signature
          </button>
        </footer>
        <div className="p-4 mt-4">
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  );
}
