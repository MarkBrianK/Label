import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/Auth/Signup';
import SignInForm from './Components/Auth/Signin';



function App() {


  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<SignInForm />} />


      </Routes>

    </div>


  );
}

export default App;



