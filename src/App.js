import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './Auth/Signup';
import SignInForm from './Auth/Signin';
 import Home from './Components/Home';
import Button from './Shared/Button';
import SheetModal from './Shared/SheetModal';
import { ROUTES } from './Routes/Routes';

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
    <Routes>
    <Route path={ROUTES.home} element={<Home/>}/>
    <Route path={ROUTES.signUp} element={<SignUpForm/>}/>
    <Route path={ROUTES.signIn} element={<SignInForm/>}/>
    </Routes>
    </div>
  );
}

export default App;
