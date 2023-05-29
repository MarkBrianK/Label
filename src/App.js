import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './Components/Auth/Signup';
import SignInForm from './Components/Auth/Signin';
import Home from './Components/Home';
import HandleCloth from './Components/ClothHandler';
import HomePage from './Components/Home2';

function App() {
  const storedSession = sessionStorage.getItem('session_id');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedSession);

  const setSession = (sessionID) => {
    sessionStorage.setItem('session_id', sessionID);
    setIsLoggedIn(true);
  };

  const clearSession = () => {
    sessionStorage.removeItem('session_id');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const session = sessionStorage.getItem('session_id');
    setIsLoggedIn(!!session);
  }, []);

  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/signin"
          element={<SignInForm setSession={setSession} />}
        />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/handle-cloth/:clothId" element={<HandleCloth />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
}


export default App;
