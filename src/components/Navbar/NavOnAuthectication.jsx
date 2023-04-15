import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { auth } from "../../firebase";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function NavOnAuthectication() {
  const userState = useSelector((e) => e.auth.userState);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out Successfully.");
        setTimeout(() => {
          window.location.reload();
          localStorage.clear();
        }, 2000);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {userState ? (
        <>
          <NavDropdown
            title={
              <>
                <i className="nav-icons fa-solid fa-user fa-sm"></i>
                {userState.displayName}
              </>
            }
            style={{ fontSize: "20px", color: "#00235B !important" }}
            drop="down-centered"
            align="end"
            id="dropdown-button-drop-down-centered"
          >
            <NavDropdown.Item>
              <NavLink
                to="/yourquizzes"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                <i className="fa-solid fa-clock-rotate-left me-2"></i> Your
                Quizes
              </NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item onClick={userSignOut}>
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>{" "}
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <Nav.Item>
            <NavLink to="/signup">
              <Button variant="outline-dark" className="m-2 ">
                <i className="fa-solid fa-user-plus"></i> Sign-Up
              </Button>
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink to="/login">
              <Button variant="dark" className="m-2 ps-4 pe-4 ">
                <i className="fa-regular fa-user"></i> Login
              </Button>
            </NavLink>
          </Nav.Item>
        </>
      )}
    </>
  );
}

export default NavOnAuthectication;
