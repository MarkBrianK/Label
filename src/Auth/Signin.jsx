import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/Image/Levick.png";
import "../Assets/Styles/Signin.css";


const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://levick-7b15defb7ee9.herokuapp.com/users/sign_in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response && response.data && response.data.success) {
        setSuccess(true);

        const userIdToEncrypt = response.data.user_id.toString();
        const secretKey = "wabebee_x1_levick";
        const encryptedUserId = CryptoJS.AES.encrypt(userIdToEncrypt, secretKey).toString();
        localStorage.setItem("user_id", encryptedUserId);
        localStorage.setItem("session_id", response.data.session_id);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "Could not log in.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
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
          </Form.Group>{" "}
          <br />
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}{" "}
          {success && (
            <Alert variant="success">
              You have successfully signed in.
            </Alert>
          )}
          <br />
          <Button
            type="submit"
            disabled={isLoading}
            block
            className="custom-button"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
          <div className="mt-3 text-center" id="signuplink">
            Don't have an account?{" "}
            <Link className="tosignup" to="/signup">
              Sign up
            </Link>{" "}
            now.
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
