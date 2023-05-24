import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './Components/Auth/Signup';
import SignInForm from './Components/Auth/Signin';
import Home from './Components/Home'
import HandleCloth from './Components/ClothHandler';
import HomePage from './Components/Home2'

function App() {
  const session = sessionStorage.getItem('session_id')
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(()=>{
    if (session){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }

  },[])


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm  />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/handle-cloth/:clothId" element={<HandleCloth />} />
          </>
        ) : (
          <Route
            path="/user"
            element={<Navigate to="/" replace />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
