import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import logo from "../Assets/Image/Levick.png";
import "../Assets/Styles/Signup.css";

function SignupForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match");
      setIsLoading(false);
      return;
    } else {
      setPasswordConfirmationError("");
    }

    try {
      const response = await axios.post(
        "https://levick-29ef28f8e880.herokuapp.com/users",
        {
          user: {
            name,
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
      <Helmet>
        <title>Sign Up - Levick 23</title>
        <meta
          name="description"
          content="Sign up to Levick 23 and explore our trendy and affordable clothing collection. Create your account and discover your unique style at Levick 23."
        />
      </Helmet>
      <div className="display-image">
        <img src={logo} alt="Logo" className="display-logo img-fluid" />
      </div>
      <div className="centered-container">
        <div className="holder">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              You have successfully signed up. Kindly check your email to
              confirm your account.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="formlabel">Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!usernameError}
                placeholder="John Doe"
                required
              />
              <Form.Control.Feedback type="invalid">
                {usernameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label className="formlabel">Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!usernameError}
                placeholder="John Doe Smith"
                required
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
                placeholder="example@gmail.com"
                required
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
                placeholder="Password"
                required
              />
              <div className="show-password-toggle">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="m-1 text-secondary">Show Password</label>
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
                placeholder="Confirm Password"
                required
              />
              <div className="show-password-toggle">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  checked={showPasswordConfirmation}
                  onChange={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                />

                <label className="m-1 text-secondary">Show Password</label>
              </div>
              <Form.Control.Feedback type="invalid">
                {passwordConfirmationError}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            {isLoading ?
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div> : <Button
                type="submit"
                disabled={isLoading}
                className="custom-button mx-auto d-flex justify-content-center"
              >
                Sign Up
              </Button>
            }
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
