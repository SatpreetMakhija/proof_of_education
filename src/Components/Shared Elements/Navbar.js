import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/login/loginSlice";

const NavigationBar = () => {

  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Proof Of Education</Navbar.Brand>
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
            {isUserLoggedIn && <Button onClick={() => dispatch(logoutUser())}>Logout</Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
