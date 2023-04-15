import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import NavOnAuthectication from "./NavOnAuthectication";
import "./NavBar.css";
import logo from "../../assets/logo.png";

function NavBar() {
  return (
    <>
      <Navbar
        sticky="top"
        id="navbar"
        variant="light"
        expand="lg"
        className="shadow"
      >
        <Container>
          <NavLink to="/" className="text-decoration-none">
            <Navbar.Brand>
              <img src={logo} className="mb-2 logoImg" alt="logo-icon" />
              <span className="logoText">QUIZEE</span>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavOnAuthectication />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
