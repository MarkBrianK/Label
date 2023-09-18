import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import logo from "../Assets/Image/Levick.png";
import "../Assets/Styles/Signup.css";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://levick-7b15defb7ee9.herokuapp.com/users",
        {
          user: {
            username,
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
        }, 5000);
      } else {
        const data = response.data;
        setError(data.error);
        if (data.errors) {
          setUsernameError(data.errors.username);
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
          setPasswordConfirmationError(data.errors.password_confirmation);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="home-container">
      <div className="display-image">
        <img src={logo} alt="Logo" className="display-logo img-fluid" />
      </div>
      <div className="centered-container">
        <div className="holder">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              You have successfully signed up. Kindly check your email to confirm your account.
            </Alert>
          )}

          {isLoading && (
            <div className="loading-alert">
              <div className="spinner-border text-primary loading-spinner" role="status">
                <span className="sr-only" id="spinner"></span>
              </div>
              <style>
                {`
                .loading-spinner {
                  transform-origin: center;
                  animation: spin 2s linear infinite;
                }

                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
              </style>
              <Alert variant="danger" className="loading-text">
                {isLoading ? "Loading..." : ""}
              </Alert>
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <h2 className="form-header">Sign Up</h2>
            <Form.Group controlId="username">
              <Form.Label className="formlabel">Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!usernameError}
              />
              <Form.Control.Feedback type="invalid">
                {usernameError}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <div className="show-password-toggle">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label>Show Password</label>
              </div>
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password-confirmation">
              <Form.Label className="formlabel">Confirm Password</Form.Label>
              <Form.Control
                type={showPasswordConfirmation ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                isInvalid={!!passwordConfirmationError}
              />
              <div className="show-password-toggle">
                <input
                  type="checkbox"
                  checked={showPasswordConfirmation}
                  onChange={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                />
                <label>Show Password</label>
              </div>
              <Form.Control.Feedback type="invalid">
                {passwordConfirmationError}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button
              className="custom-button"
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
