import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { AccountCircle, ExitToApp, Home, Mail, ShoppingBag } from '@mui/icons-material';
import '../Assets/Styles/Header.css';

function Header({ user }) {
  const sessionCookie = localStorage.getItem('session_id');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);

    if (!!sessionCookie) {
      axios.get(`http://127.0.0.1:3000/users/${user}`)
        .then(response => {
          setProfilePicture(response.data.profile_picture);
        })
        .catch(error => console.error('Error fetching profile picture:', error));
    }
  }, [sessionCookie, user]);

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
            <div >
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  roundedCircle
                  width={50}
                  height={50}
                  className="profile-picture"
                />
              ) : (
                <AccountCircle className="icon" />
              )}
              <ExitToApp onClick={handleAuth} className="icon" />
            </div>
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
