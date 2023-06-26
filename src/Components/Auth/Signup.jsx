import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import logo from "../Image/Levick.png";
import "../Styles/Signup.css";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/users",
        {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        const data = response.data;
        setError(data.error);
        if (data.errors) {
          setNameError(data.errors.name);
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="home-container">
      <div className="image"> 
        <img src={logo} alt="Logo" className="logo img-fluid" />
      </div>
      <div className="centered-container">
        <div className="holder">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              You have successfully signed up. Redirecting to sign-in form...
            </Alert>
          )}
          {isLoading && (
            <div className="spinner-border text-primary d-inline-block" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <h2 className="form-header">Sign Up</h2>
            <Form.Group controlId="name">
              <Form.Label className="formlabel">Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!nameError}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="formlabel">Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="formlabel">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password-confirmation">
              <Form.Label className="formlabel">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                isInvalid={!!passwordConfirmationError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordConfirmationError}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button className="custom-button" variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
