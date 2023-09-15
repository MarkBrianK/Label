import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';
import CommentHandler from './Screens/CommentsHandler';


const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('session_id');
    if (session) {
      // Introduce a 2-second delay before setting isLoggedIn to true
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 2000);
    }
  }, []);


  return (
    <div>
      <Routes>
        <Route path={ROUTES.home} element={<Suspense fallback={<div>Loading...</div>}><Home isLoggedIn={isLoggedIn} /></Suspense>} />

        <Route path={ROUTES.clothcomments} element={<Suspense fallback={<div> Loading...</div>}  > <CommentHandler /></Suspense>} />

        {/* Render the SignUpFo<Route path=''rm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signUp} element={<Suspense fallback={<div>Loading...</div>}><SignUpForm /></Suspense>} />
        )}
        {/* Render the SignInForm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signIn} element={<Suspense fallback={<div>Loading...</div>}><SignInForm  /></Suspense>} />
        )}
      </Routes>
    </div>
  );
}

export default App;
