import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = ({setSession, setUserId}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password fields are empty
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Check if email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        user: {
          email,
          password,
        },
      });

      // Check the success field in the response data
      if (response && response.data && response.data.success) {
        // Extract the session ID from the response
        const sessionID = response.data.session_id.public_id;
        const userID = response.data.user_id;
        setUserId(userID);


        // Set the session ID in the session storage
        sessionStorage.setItem('session_id', sessionID);
        sessionStorage.setItem('user_id', userID.toString());



        // Redirect to the user page or perform any other necessary actions
        navigate('/user');
        setSession(sessionID);
      } else {
        setErrorMessage(response.data.message || 'Could not log in.');
        setIsLoading(false)
      }

    } catch (error) {
      setErrorMessage(error.response.data.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <Row>
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

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <Button type="submit" disabled={isLoading} block>
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>

              <div className="mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link> now.
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInForm;
