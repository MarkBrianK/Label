import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';
import CryptoJS from 'crypto-js';
import EditProfile from './Screens/EditProfile';


const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));
const CommentHandler = lazy(()=> import('./Screens/CommentsHandler'));
const Profile = lazy(()=> import('./Components/Profile'));



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [userdetails, setUserDetails] = useState(null)

  useEffect(() => {
    try {
      const secretKey = "wabebee_x1_levick";
      const encryptedUserID = localStorage.getItem("user_id");
      setUserDetails(localStorage.getItem("username"))
      if (encryptedUserID) {

        const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
        const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedUserData) {
          const currentUser = JSON.parse(decryptedUserData);
          setUser(currentUser);

        } else {

          console.error("Please log in.");
        }
      } else {
        console.error("Please log in.");
      }
    } catch (error) {
      console.error("Error decrypting user data:", error);
    }
  }, []);



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
        <Route path={ROUTES.home} element={<Suspense fallback={<div>Loading...</div>}><Home user={user} userdetails={userdetails} isLoggedIn={isLoggedIn} /></Suspense>} />

        <Route path={ROUTES.clothcomments} element={<Suspense fallback={<div> Loading...</div>}  > <CommentHandler user={user} /></Suspense>} />
        <Route path={ROUTES.profile} element={<Suspense fallback={<div>Loading ...</div>}> < Profile user={user} userdetails={userdetails} /> </Suspense>} />
        <Route path={ROUTES.editProfile} element={<Suspense fallback={<div>Loading ...</div>}> < EditProfile user={user}  /> </Suspense>} />

        {/* Render the SignUpFo<Route path=''rm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signUp} element={<Suspense fallback={<div>Loading...</div>}><SignUpForm  /></Suspense>} />
        )}
        {/* Render the SignInForm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signIn} element={<Suspense fallback={<div>Loading...</div>}><SignInForm setUser={setUser}   /></Suspense>} />
        )}

      </Routes>
    </div>
  );
}

export default App;
