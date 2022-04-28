import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import React components
import Home from "./Components/Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadDoc from "./Components/Pages/UploadDoc";
//import React-bootstrap elements
import NavigationBar from "./Components/Shared Elements/Navbar";
import ValidateDoc from "./Components/Pages/ValidateDoc";
import Login from "./Components/Pages/Login";

//global state management using Redux-toolkit
import { useSelector } from "react-redux";
import Header from "./Components/Header"
import Footer from "./Components/Footer"


function App() {
  
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  console.log(isUserLoggedIn)
  

  return (
    <React.Fragment>
      
        <div className="App">
          <Router>
            {/* <NavigationBar /> */}
            <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload-doc" element={<UploadDoc />} />
              <Route path="/validate-doc" element={<ValidateDoc />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            {/* <Footer/> */}
          </Router>
        </div>
      
    </React.Fragment>
  );
}

export default App;
