import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import LoginSVG from "./Login.svg";
import "./Authform.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userState = useSelector((e) => e.auth.userState);

  useEffect(() => {
    if (userState) {
      navigate("/");
    }
  }, [userState]);

  const signIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Logged in!");
    } catch (error) {
      // Customize the error message
      let errorMessage = "An error occurred. Please try again later.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please try again later.";
      }
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div className=" container mt-5">
        <Row>
          <Col md={6} className="mb-5">
            <img
              className="img-fluid mt-5"
              min-width="300px"
              src={LoginSVG}
              alt=""
            />
          </Col>

          <Col md={6} className="mb-5">
            <h1 className="display-5 text-center ">Login to Quizee</h1>
            <div className="login-form mt-3">
              <Form id="login" onSubmit={signIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Text className="text-muted ">
                  Don't have an account?&nbsp;
                  <NavLink
                    className="text-reset text-decoration-none"
                    to="/signup"
                  >
                    Sign Up!
                  </NavLink>
                </Form.Text>

                <div className="d-flex justify-content-center mt-2">
                  <Button variant="dark" type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Login;
