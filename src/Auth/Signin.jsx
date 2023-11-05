import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/Image/Levick.png";
import Styles from "../Assets/Styles/Signin.module.css"

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setIsLoading(true);

      const response = await axios.post(
        "https://levick-6ab9bbf8750f.herokuapp.com/users/sign_in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response && response.data && response.data.success) {
        const userIdToEncrypt = response.data.user_id.toString();
        const secretKey = "wabebee_x1_levick";
        const encryptedUserId = CryptoJS.AES.encrypt(
          userIdToEncrypt,
          secretKey
        ).toString();
        localStorage.setItem("user_id", encryptedUserId);

        setSuccess(true);
        localStorage.setItem("session_id", response.data.session_id);
        localStorage.setItem("username", response.data.username)
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage(response.data.message || "Could not log in.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={Styles.signin}>
      <Helmet>
        <title>Sign In - Levick 23</title>
        <meta
          name="description"
          content="Sign in to Levick 23 and explore our trendy and affordable clothing collection. Find your unique style and create your fashion statement with Levick 23."
        />
      </Helmet>

      <div className={Styles.image}>
        <img src={logo} alt="Levick Logo" className={Styles.logoImage} />
      </div>
      <div className="p-4 rounded">
        <Form onSubmit={handleSubmit} className={Styles.form}>
          <Form.Group controlId="email">
            <Form.Label className={Styles.formlabel}>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className={Styles.formlabel}>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div >
              <input
                className="m-1"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="mt-1 text-secondary">Show Password</label>
            </div>
          </Form.Group>
          <br />
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {success && (
            <Alert variant="success">
              You have successfully signed in.
            </Alert>
          )}
          <br />
          {isLoading ?
            <div className={Styles.loadingSpinner}>
              <div className={Styles.spinner}></div>
            </div> : <Button
              type="submit"
              disabled={isLoading}
              block
              className={Styles.customButton}
            >
              Sign In
            </Button>}
          <div className="mt-3 text-center" id={Styles.signuplink}>
            {/* Add a "Forgot Password" link here */}
            <a href="https://levick-6ab9bbf8750f.herokuapp.com/users/forgot_password" className="forgot-password-link">
              Forgot Password ?
            </a>

          </div>

          <div className="mt-3 text-center" id={Styles.signuplink}>
            Don't have an account?{" "}
            <Link className={Styles.tosignup} to="/signup">
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



