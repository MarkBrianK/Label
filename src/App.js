import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import SignUpForm from './Components/Auth/Signup';
// import SignInForm from './Components/Auth/Signin';
 import Home from './Components/Home';
import Button from './Shared/Button';
import SheetModal from './Shared/SheetModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setSession = (sessionID) => {
    sessionStorage.setItem('session_id', sessionID);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const session = sessionStorage.getItem('session_id');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>

   
    <Home/>
    </div>
  );
}

export default App;
