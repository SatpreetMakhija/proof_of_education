import React from "react";
import { Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../features/login/loginSlice";


const Login = () => {
    const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
    const dispatch = useDispatch();
    console.log("reporting from Login page", isUserLoggedIn)
    return (
        <Button variant="info" onClick={() => dispatch(loginUser())}>{!isUserLoggedIn? "Login via Metamask": "You have successfully logged in."}</Button>
    )
}


export default Login;
