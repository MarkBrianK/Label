import "../Assets/Styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AccountCircle, ExitToApp, Home, Mail,ShoppingBag } from '@mui/icons-material';
function Header() {
  const sessionCookie = localStorage.getItem('session_id');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);
  }, [sessionCookie]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        await axios.delete('http://127.0.0.1:3000/users/sign_out', {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
          withCredentials: true,
        });

        localStorage.removeItem('session_id');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        window.location.reload();
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
            <Link to="/signin" className="icon-link">
              <AccountCircle className="icon" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
