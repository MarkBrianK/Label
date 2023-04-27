import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/Auth/Signup';
import SignInForm from './Components/Auth/Signin';



function App() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch("http://127.0.0.1:3000/csrfToken");
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    fetchCsrfToken();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpForm csrfToken={csrfToken} />} />
        <Route path="/" element={<SignInForm csrfToken={csrfToken} />} />


      </Routes>

    </div>


  );
}

export default App;



