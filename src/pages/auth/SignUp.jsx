import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import SignupSVG from "./Signup.svg";
import "./Authform.css";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Container, Row, Spinner } from "react-bootstrap";

function SignUp() {
  const navigate = useNavigate();
  const userState = useSelector((e) => e.auth.userState);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userState) {
      navigate("/");
    }
  }, [userState]);

  const signUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const authState = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // to set the displayName as the firstName
      await updateProfile(authState.user, {
        displayName: firstName,
      });

      // to save the user to the firebase with the user id
      const docRef = doc(db, "usersdetails", authState.user.uid);
      await setDoc(docRef, {
        uid: authState.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      navigate("/");
      toast.success("Account created successfully.");
    } catch (error) {
      // Customize the error message
      let errorMessage = "An error occurred. Please try again later.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already in use. Please try a different email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div className="container mt-5">
        <Row>
          <Col md={6}>
            <h1 className="display-5 text-center">Create a new account</h1>
            <div className="signup-form mt-3">
              <Form id="signup" onSubmit={signUp}>
                <div className="row">
                  <Form.Group className="mb-3 col-md-6" controlId="first-name">
                    <Form.Label>First name </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6" controlId="last-name">
                    <Form.Label>Last name </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Text className="text-muted">
                  Already have an account?&nbsp;
                  <NavLink
                    className="text-reset text-decoration-none"
                    to="/login"
                  >
                    Login!
                  </NavLink>
                </Form.Text>

                <div className="d-flex justify-content-center mt-2">
                  <Button variant="dark" type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          <Col md={6} className="mb-5 mt-5 ">
            <img
              className="img-fluid "
              min-width="400px"
              src={SignupSVG}
              alt=""
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SignUp;
