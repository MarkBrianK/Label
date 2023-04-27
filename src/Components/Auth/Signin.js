import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../User';

const SignInForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "X-CSRF-Token": props.csrfToken,
          },
        }
      );
      console.log(response);

      // Set a state variable to indicate that the user is logged in
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <User />
      ) : (
        <Row >
          <Col md={6} className="mx-auto">
            <div className="p-5 bg-light rounded">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="authenticity-token">
                  <Form.Control type="hidden" name="authenticity_token" value={props.csrfToken} />
                </Form.Group>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <Button type="submit" disabled={isLoading} block>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>

                <div className="mt-3 text-center">
                  Dont have an account? <Link to="/signup">Sign up</Link> now.
                </div>
              </Form>
            </div>
          </Col>
        </Row>

      )}
    </div>
  );
};

export default SignInForm;
