import React, { useState } from "react";
import { ethers } from "ethers";
import image from "./img/hero-img.png"
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    const [greeting, setGreeting] = useState('')

    const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
      <main id="main">
    <section id="hero">
    <div class="hero-container" data-aos="fade-in">
      <h1>Welcome to PoE</h1>
      <h2>Elegant and smooth transcript validator</h2>
      <img src={image} alt="Hero Imgs" data-aos="zoom-out" data-aos-delay="100"></img>
      <a href="#get-started" class="btn-get-started scrollto">
      <Nav className="me-auto">
      <Nav.Link as={Link} to="/login" className="nav-link">
      Get Started
      </Nav.Link>
      </Nav>
      </a>
      <div class="btns">
        <a href="https://github.com/SatpreetMakhija/proof_of_education"><i class="fa fa-apple fa-3x"></i> Github</a>
        
      </div>
      <div class="btns">
      <p>&copy; Jenish Raj Bajracharya & Satpreet Makhija</p>
      </div>
    </div>

    <div>
      
    </div>

    
  </section> 
</main>
  
  
           
    )
}

export default Home; 

// <div>
// <h1>This is the home page.</h1>
// <button onClick={fetchGreeting}>Fetch Greeting</button>
// {greeting}
// </div>  