import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Image } from "react-bootstrap";
import { AccountCircle, Home } from "@mui/icons-material";
import Styles from "../Assets/Styles/Header.module.css";

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExploreIcon from '@mui/icons-material/Explore';

function Header({ user, username }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionCookie = localStorage.getItem("session_id");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);

    if (!!sessionCookie) {
      axios
        .get(`https://levick-6ab9bbf8750f.herokuapp.com/users/${user}`)
        .then((response) => {
          setProfilePicture(response.data.profile_picture);
        })
        .catch((error) =>
          console.error("Error fetching profile picture:", error)
        );
    }
  }, [sessionCookie, user]);

  const handleIconClick = (path) => {
    navigate(path); // Navigate to the specified path
    if (location.pathname === path) {
      window.location.reload(); // Reload only if on the specified path
    }
  };

  return (
    <header className={`${Styles.header} ${isLoggedIn ? "loggedIn" : ""}`}>
      <Helmet>
        <title>Levick 23 - Your Ultimate Fashion Destination</title>
        <meta
          name="description"
          content="Welcome to Levick 23, your ultimate fashion destination for trendy and affordable clothing. Explore the latest styles and discover your unique fashion statement at Levick 23."
        />
      </Helmet>
      <div className="container">
        <div className={`row ${Styles.navIcons}`}>
          <div className="col-2 col-md-2">
            <Link to="/" className={Styles.iconLink} onClick={() => handleIconClick("/")}>
              <Home className={Styles.icon} />
              <p>Home</p>
            </Link>
          </div>
          <div className="col-2 col-md-2">
            <Link to="/explore" className={Styles.iconLink} onClick={() => handleIconClick("/explore")}>
              <ExploreIcon className={Styles.icon} />
              <p>Explore</p>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="col-2 col-md-2">
              <Link to="/all_sales" className={Styles.iconLink} onClick={() => handleIconClick("/all_sales")}>
                <ReceiptLongIcon className={Styles.icon} />
                <p>Sales</p>
              </Link>
            </div>
          )}

          <div className="col-2 col-md-2">
            <div className={`${Styles.authLink}`}>
              {isLoggedIn ? (
                <Link to={`/profile/${username}`} className={Styles.iconLink} style={{ marginRight: "10px" }} onClick={() => handleIconClick(`/profile/${username}`)}>
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
                        className={Styles.icon}
                      />
                    )}
                  </div>
                  <p>Account</p>
                </Link>
              ) : (
                <Link to="/signin" className={Styles.iconLink} onClick={() => handleIconClick("/signin")}>
                  <AccountCircle className={Styles.icon} />
                  <p>Sign in</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
