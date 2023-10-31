import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Image } from "react-bootstrap";
import { AccountCircle, Home } from "@mui/icons-material";
import "../Assets/Styles/Header.css";
//import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
//import ChatIcon from '@mui/icons-material/Chat';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExploreIcon from '@mui/icons-material/Explore';

function Header({ user, username }) {
  const sessionCookie = localStorage.getItem("session_id");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);

    if (!!sessionCookie) {
      axios
        .get(`https://levick-29ef28f8e880.herokuapp.com/users/${user}`)
        .then((response) => {
          setProfilePicture(response.data.profile_picture);
        })
        .catch((error) =>
          console.error("Error fetching profile picture:", error)
        );
    }
  }, [sessionCookie, user]);

  return (
    <header className={`header ${isLoggedIn ? "loggedIn" : ""}`}>
      <Helmet>
        <title>Levick 23 - Your Ultimate Fashion Destination</title>
        <meta
          name="description"
          content="Welcome to Levick 23, your ultimate fashion destination for trendy and affordable clothing. Explore the latest styles and discover your unique fashion statement at Levick 23."
        />
      </Helmet>
      <div className="nav-icons">
        <Link to="/" className="icon-link">
          <Home className="icon" />
          <p>Home</p>
        </Link>

        <Link to="/" className="icon-link">
          <ExploreIcon className="icon" />
          <p>Explore</p>
        </Link>
        {/* {isLoggedIn && (
          <Link to="/" className="icon-link">
            <ChatIcon className="icon" />
            <p>Chat</p>
          </Link>

        )} */}


        {isLoggedIn && (
          <Link to="/sales" className="icon-link">
            <MonetizationOnIcon className="icon" />
            <p>Earn</p>
          </Link>
        )}

        <div className="auth-link">
          {isLoggedIn ? (
            <Link to={`/profile/${username}`} className="icon-link">
              <div
                className=""
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "1px solid goldenrod",

                  width: "30px",
                  height: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                }}
              >
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt={user}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                ) : (
                  <AccountCircle
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    className="icon"
                  />
                )}
              </div>
              <p> Account</p>
            </Link>
          ) : (
            <Link to="/signin" className="icon-link">
              <AccountCircle className="icon" />
              <p>Sign in</p>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
