import "../Assets/Styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AccountCircle, ExitToApp, Home, Mail, Search, ShoppingBag } from '@mui/icons-material';

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
      navigate('/');
    }
  };

  return (
    <header className={`header ${isLoggedIn ? 'loggedIn' : ''}`}>
      <div className="nav-icons">
        <Link to="/" className="icon-link">
          <Home className="icon" />
        </Link>

        <Link to="/" className="icon-link">
          <ShoppingBag className="icon" />
        </Link>
        <Link to="/" className="icon-link">
          <Mail className="icon" />
        </Link>
        <div className="auth-link">
          {isLoggedIn ? (
            <ExitToApp onClick={handleAuth} className="icon" />
          ) : (
            <Link to="/" className="icon-link">
              <AccountCircle className="icon" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
