import "./Styles/Header.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import levick from "./Image/Levick.png";

function Header() {
  const sessionCookie = sessionStorage.getItem('session_id');
  const userId = parseInt(sessionStorage.getItem('user_id'));
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie && userId);
  }, [sessionCookie, userId]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        await axios.delete('http://localhost:3000/users/sign_out', {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
          withCredentials: true,
        });

        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('user_id');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate('/signin');
    }
  };

  return (
    <header className="header">
      <div className="nav-icons">
        {isLoggedIn ? (
          <ExitToApp onClick={handleAuth} className="icon" style={{color:'white'}} >Log out</ExitToApp>
        ) : (
          <AccountCircle onClick={() => navigate('/signin')} className="icon" style={{color:'white'}} > Log in</AccountCircle>
        )}
      </div>
    </header>
  );
}

export default Header;
