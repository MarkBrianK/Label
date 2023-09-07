import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';

const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setSession = (sessionID) => {
    localStorage.setItem('session_id', sessionID);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const session = localStorage.getItem('session_id');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={ROUTES.home} element={<Suspense fallback={<div>Loading...</div>}><Home isLoggedIn={isLoggedIn} /></Suspense>} />
        <Route path={ROUTES.signUp} element={<Suspense fallback={<div>Loading...</div>}><SignUpForm /></Suspense>} />
        <Route path={ROUTES.signIn} element={<Suspense fallback={<div>Loading...</div>}><SignInForm setSession={setSession} /></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
