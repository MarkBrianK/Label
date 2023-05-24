import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import logo from "../Image/label.png";
import "../Styles/Signin.css";

const SignInForm = ({ setSession, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/users/sign_in", {
        user: {
          email,
          password,
        },
      });
      if (response && response.data && response.data.success) {
        const sessionID = response.data.session_id.public_id;
        const userID = response.data.user_id;

        sessionStorage.setItem("session_id", sessionID);
        sessionStorage.setItem("user_id", userID.toString());

        navigate("/home");
        setSession(sessionID);
      } else {
        setErrorMessage(response.data.message || "Could not log in.");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "An error occurred.");
    }
  };

  return (
    <div className="signin">
      <div className="image">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="p-5 rounded">
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group controlId="email">
            <Form.Label className="formlabel">Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="formlabel">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group> <br/>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} <br/>

          <Button
            type="submit"
            disabled={isLoading}
            block
            className="custom-button"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>

          <div className="mt-3 text-center" id="signuplink">
            Don't have an account? <Link className="tosignup" to="/signup">Sign up</Link> now.
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
