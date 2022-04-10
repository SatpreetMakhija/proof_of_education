import React from "react";
import { Button } from "react-bootstrap";

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
    <React.Fragment>
      <Button variant="info" onClick={loginHandler}>
        {!isUserLoggedIn
          ? "Login via Metamask"
          : `You have logged in via Metamask, welcome ${userAddress}`}
      </Button>
    </React.Fragment>
  );
};

export default Login;
