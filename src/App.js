import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';


const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));
const CommentHandler = lazy(()=> import('./Screens/CommentsHandler'));
const Profile = lazy(()=> import('./Components/Profile'));



function App() {
  const [user, setUser] = useState(null);
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
        <Route path={ROUTES.home} element={<Suspense fallback={<div>Loading...</div>}><Home user={user} isLoggedIn={isLoggedIn} /></Suspense>} />

        <Route path={ROUTES.clothcomments} element={<Suspense fallback={<div> Loading...</div>}  > <CommentHandler user={user} /></Suspense>} />
        <Route path={ROUTES.profile} element={<Suspense fallback={<div>Loading ...</div>}> < Profile user={user} /> </Suspense>} />

        {/* Render the SignUpFo<Route path=''rm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signUp} element={<Suspense fallback={<div>Loading...</div>}><SignUpForm  /></Suspense>} />
        )}
        {/* Render the SignInForm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signIn} element={<Suspense fallback={<div>Loading...</div>}><SignInForm setUser={setUser}  /></Suspense>} />
        )}

      </Routes>
    </div>
  );
}

export default App;
