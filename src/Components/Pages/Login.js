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
      <section>						
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
                ? "Login"
                : `You have logged in`}
            </Button>
          </React.Fragment>
        </label>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>Don't have a Metamask Acount??</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div class="img__btn">
            <a  id = "login-signup" href="https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet">Click Here</a>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>Time to feel like home,</h2>
          <label>
            <span>Name</span>
            <input type="text" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <button type="button" class="submit">Click Here!</button>
          <button type="button" class="fb-btn">Join with <span>facebook</span></button>
        </div>
      </div>
    </div>
    </section>
      );
};


export default Login;
