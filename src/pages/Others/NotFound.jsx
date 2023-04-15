import React from "react";
import Button from "react-bootstrap/esm/Button";
import { NavLink } from "react-router-dom";
import NotFoundSVG from "./NotFound.svg";

function NotFound() {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img className="img-fluid" src={NotFoundSVG} width="600px" alt="" />
        <h1 className="display-3 mt-2"> Page Not Found</h1>

        <NavLink to="/" className="mt-4">
          <Button variant="primary" className="pe-4 ps-4">
            Back to Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
