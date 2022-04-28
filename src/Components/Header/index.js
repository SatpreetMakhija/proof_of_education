import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/login/loginSlice";

const NavigationBar = () =>{
	const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn)
  	const dispatch = useDispatch()
	
	return(
  	<header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">

      <div id="logo">
      <h1><a href="/"><span>Proof of</span> Education</a></h1>
      </div>

      <nav id="navbar" class="navbar">
	  <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/upload-doc" className="nav-link">
              Upload Document
            </Nav.Link>
            <Nav.Link as={Link} to="/validate-doc">
              Validate Document
            </Nav.Link>
            {!isUserLoggedIn && <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>}
            {isUserLoggedIn && <button style={{color: "#71c55d", padding: 0,border:0,background:0, marginLeft:10}} onClick={() => dispatch(logoutUser())}>Logout</button>}
          </Nav>
        </Container>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
	)
}

export default NavigationBar;