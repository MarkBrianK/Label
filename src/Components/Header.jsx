import "./Styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AccountCircle, ExitToApp, Home, Info, Work, Mail } from '@mui/icons-material';
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
            Authorization: `Bearer ${sessionCookie}`,
          },
          withCredentials: true,
        });

        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('user_id');
        setIsLoggedIn(false);
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
        <Link to="/" className="icon-link">
          <Home className="icon" style={{ color: 'white' }} />
        </Link>
        <Link to="/about" className="icon-link">
          <Info className="icon" style={{ color: 'white' }} />
        </Link>
        <Link to="/services" className="icon-link">
          <Work className="icon" style={{ color: 'white' }} />
        </Link>
        <Link to="/contact" className="icon-link">
          <Mail className="icon" style={{ color: 'white' }} />
        </Link>
        {isLoggedIn ? (
          <Link to="/" className="icon-link">
            <ExitToApp onClick={handleAuth} className="icon" style={{ color: 'white' }} />

          </Link>
        ) : (
          <Link to="/signin" className="icon-link">
            <AccountCircle className="icon" style={{ color: 'white' }} />

          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
