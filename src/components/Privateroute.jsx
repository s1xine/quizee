import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const userState = useSelector((e) => e.auth.userState);
  const isLoading = userState === null;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return userState ? <Outlet /> : <Navigate to="/login" />;
};
