import React from "react";
import { Button } from "react-bootstrap";
import meta from "./img/MetaMask_Fox.svg.png"
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  loginUser,
  setAddressOfUser,
} from "../../features/login/loginSlice";

const Login = (props) => {
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.login.address)
  const loginHandler = async () => {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        dispatch(loginUser());
        const address = accounts[0];
        dispatch(setAddressOfUser(address));
        // console.log(state.login.address)
      } catch (error) {
        console.log("Error connecting.....");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  

  return (	
		<div>			
      <p class="tip">Click on button in image container</p>
          
      <div class="cont">
        <div class="form sign-in">
        <img src={meta} style= {{width:200, height:200}}></img>
          <h2>Welcome back,</h2>
          
          <label>
            <span><h5>Login with Metamask</h5></span>
            <React.Fragment>
              <Button id = "login-button" variant="info" onClick={loginHandler}>
                {!isUserLoggedIn
                  ? "Login" : "Login Successful"}
              </Button>
              
            </React.Fragment>
          </label>
          {isUserLoggedIn && <div className = "login-noti">Your address: <br></br> <h6>{userAddress}</h6></div>}
        </div>
      </div>
    </div>	
      );
};


export default Login;
