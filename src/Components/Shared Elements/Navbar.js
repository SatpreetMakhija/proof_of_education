import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
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
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
