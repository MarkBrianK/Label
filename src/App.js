import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './Auth/Signup';
import SignInForm from './Auth/Signin';

function App() {
  return (

    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>

  );
}

export default App;



