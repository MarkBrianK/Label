import React, { useEffect, useState, lazy, Suspense } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes/Routes';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import ContactPage from './Components/ContactPage';
import LoadingSpinner from './Shared/LoadingSpinner';

const Home = lazy(() => import('./Components/Home'));
const SignUpForm = lazy(() => import('./Auth/Signup'));
const SignInForm = lazy(() => import('./Auth/Signin'));
const CommentHandler = lazy(() => import('./Screens/CommentsHandler'));
const Profile = lazy(() => import('./Components/Profile'));
const EditProfile = lazy(() => import('./Screens/EditProfile'));
const MakeSaleForm = lazy(() => import('./Screens/MakeSale'));
const AllSales = lazy(() => import('./Screens/AllSales'));
const Explore = lazy(() => import('./Components/StoryLine'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    try {
      const secretKey = 'wabebee_x1_levick';
      const encryptedUserID = localStorage.getItem('user_id');
      setUserDetails(localStorage.getItem('username'));
      if (encryptedUserID) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
        const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedUserData) {
          const currentUser = JSON.parse(decryptedUserData);
          setUser(currentUser);
        } else {
          console.error('Please log in.');
        }
      } else {
        console.error('Please log in.');
      }
    } catch (error) {
      console.error('Error decrypting user data:', error);
    }
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/cloths')
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error('Error fetching clothes:', error));
  }, []);

  useEffect(() => {
    const session = localStorage.getItem('session_id');
    if (session) {
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 100);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>{userDetails ? `${userDetails} - Levick 23` : 'Levick 23 - Trendy and Affordable Clothing'}</title>
        <meta name="description" content="Welcome to Levick 23, your ultimate destination for trendy and affordable clothing! At Levick 23, we believe that fashion should be a reflection of individuality, style, and confidence. Our carefully curated collection features a diverse range of chic and contemporary apparel, designed to inspire and empower fashion-forward individuals like you." />
      </Helmet>
      <CloudinaryContext cloudName="djmvocl1y">
        <Routes>
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path={ROUTES.home}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <Home user={user} userdetails={userDetails} isLoggedIn={isLoggedIn} clothes={clothes} />
              </Suspense>
            )}
          />

          <Route
            path={ROUTES.clothComments}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <CommentHandler user={user} />
              </Suspense>
            )}
          />
          <Route
            path={ROUTES.profile}
            element={(
              <Suspense fallback={<div className="loading-spinner"><div className="spinner"></div></div>}>
                <Profile user={user} userdetails={userDetails} />
              </Suspense>
            )}
          />
          <Route
            path={ROUTES.editProfile}
            element={(
              <Suspense fallback={<div className="loading-spinner"><div className="spinner"></div></div>}>
                <EditProfile user={user} />
              </Suspense>
            )}
          />
          <Route
            path={ROUTES.makeSale}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <MakeSaleForm user={user} userdetails={userDetails} />
              </Suspense>
            )}
          />
          <Route
            path={ROUTES.allSales}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <AllSales user={user} />
              </Suspense>
            )}
          />
          <Route
            path={ROUTES.explore}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <Explore user={user} clothes={clothes} />
              </Suspense>
            )}
          />

          {!isLoggedIn && (
            <Route
              path={ROUTES.signUp}
              element={(
                <Suspense fallback={<LoadingSpinner />}>
                  <SignUpForm />
                </Suspense>
              )}
            />
          )}
          {!isLoggedIn && (
            <Route
              path={ROUTES.signIn}
              element={(
                <Suspense fallback={<LoadingSpinner />}>
                  <SignInForm setUser={setUser} />
                </Suspense>
              )}
            />
          )}

        </Routes>
      </CloudinaryContext>
    </div>
  );
}

export default App;
