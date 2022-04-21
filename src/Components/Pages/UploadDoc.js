// import React from "react";
// // const crypto  = require('crypto');
// // const fs = require('fs');

// // function hash(file){
// //     const h = crypto.createHash('sha256');
// //     h.update(file);
// //     const hex = h.digest('hex');
// //     console.log(hex)

// // }


// // hash('helloworld')
// // const UploadDoc = () => {
// //     return (
// //         <h1>This is the Upload Document Page</h1>
// //     )
// // }

// // export default UploadDoc;


// /**
//  * Component to handle file upload. Works for image
//  * uploads, but can be edited to work for any file.
//  */
//  function FileUpload() {
//     // State to store uploaded file
//     const [file, setFile] = React.useState("");
  
//     // Handles file upload event and updates state
//     function handleUpload(event) {
//       setFile(event.target.files[0]);
  
//       // Add code here to upload file to server
//       // ...
//     }
  
//     return (
//       <div id="upload-box">
//         <input type="file" onChange={handleUpload} />
//         <p>Filename: {file.name}</p>
//         <p>File type: {file.type}</p>
//         <p>File size: {file.size} bytes</p>
//         {file && <ImageThumb image={file} />}
//       </div>
//     );
//   }
  
//   /**
//    * Component to display thumbnail of image.
//    */
//   const ImageThumb = ({ image }) => {
//     return <img src={URL.createObjectURL(image)} alt={image.name} />;
//   };
  
  
//   export default function App() {
//     return <FileUpload />;
//   }
import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";

const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message")
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <form className="m-4" onSubmit={handleSign}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign messages
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
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Sign message
          </button>
          <ErrorMessage message={error} />
        </footer>
        {signatures.map((sig, idx) => {
          return (
            <div className="p-2" key={sig}>
              <div className="my-3">
                <p>
                  Message {idx + 1}: {sig.message}
                </p>
                <p>Signer: {sig.address}</p>
                <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={sig.signature}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}


