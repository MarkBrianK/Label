import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image } from "react-bootstrap";
import { AccountCircle, Home, Mail, ShoppingBag } from "@mui/icons-material";
import "../Assets/Styles/Header.css";

function Header({ user,username  }) {
  const sessionCookie = localStorage.getItem("session_id");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);


  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);

    if (!!sessionCookie) {
      axios
        .get(`https://levick-7b15defb7ee9.herokuapp.com/users/${user}`)
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
            <Link to={`/profile/${username}`} className="icon-link">
              <div
                className="d-flex align-items-center"
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "1px solid goldenrod",

                  width: "40px",
                  height: "44px",
                  minWidth: "40px",
                  minHeight: "40px",
                  padding: 0,
                }}
              >
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt={user}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius:"50%"

                    }}
                  />
                ) : (
                  <AccountCircle
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                   className="icon" />
                )}
              </div>
            </Link>
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
