import React, { useState } from "react";
import { ethers } from "ethers";
import Greeter from "../../artifacts/contracts/Greeter.sol/Greeter.json"

const Home = () => {
    const [greeting, setGreeting] = useState('')

    const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    async function fetchGreeting() {
    //checks whether Metamask is installed on the browser or not.
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        setGreeting(data);
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
    return (
        <div>
        <h1>This is the home page.</h1>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        {greeting}
        </div>     
    )
}

export default Home; 