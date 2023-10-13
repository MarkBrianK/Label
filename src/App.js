import React, { useEffect, useState, lazy, Suspense } from 'react';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';
import CryptoJS from 'crypto-js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import ContactPage from "./Components/ContactPage"



const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));
const CommentHandler = lazy(() => import('./Screens/CommentsHandler'));
const Profile = lazy(() => import('./Components/Profile'));
const EditProfile = lazy(() => import('./Screens/EditProfile'))





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
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 2000);
    }
  }, []);



  return (
    <div>

      <Helmet>
        <title>{userdetails ? `${userdetails} - Levick 23` : 'Levick 23 - Trendy and Affordable Clothing'}</title>
        <meta name="description" content="Welcome to Levick 23, your ultimate destination for trendy and affordable clothing! At Levick 23, we believe that fashion should be a reflection of individuality, style, and confidence. Our carefully curated collection features a diverse range of chic and contemporary apparel, designed to inspire and empower fashion-forward individuals like you." />
      </Helmet>
      <Routes>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path={ROUTES.home} element={<Suspense fallback={
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        }><Home user={user} userdetails={userdetails} isLoggedIn={isLoggedIn} /></Suspense>} />

        <Route path={ROUTES.clothComments} element={<Suspense fallback={
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        }  > <CommentHandler user={user} /></Suspense>} />
        <Route path={ROUTES.profile} element={<Suspense fallback={<div className="loading-spinner">
          <div className="spinner"></div>
        </div>}> < Profile user={user} userdetails={userdetails} /> </Suspense>} />
        <Route path={ROUTES.editProfile} element={<Suspense fallback={<div className="loading-spinner">
          <div className="spinner"></div>
        </div>}> < EditProfile user={user} /> </Suspense>} />

        {/* Render the SignUpFo<Route path=''rm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signUp} element={<Suspense fallback={
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          }><SignUpForm /></Suspense>} />
        )}
        {/* Render the SignInForm route only when the user is not logged in */}
        {!isLoggedIn && (
          <Route path={ROUTES.signIn} element={<Suspense fallback={
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          }><SignInForm setUser={setUser} /></Suspense>} />
        )}

      </Routes>
    </div>
  );
}

export default App;
