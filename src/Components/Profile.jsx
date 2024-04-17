import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import axios from "axios";
import Header from "./Header";
import Button from "../Shared/Button";
import camera from "../Assets/Image/239220.png";
import Styles from "../Assets/Styles/Profile.module.css";

export default function Profile({ user, userdetails }) {
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [county, setCounty] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sessionCookie = localStorage.getItem("session_id");
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate("/profile/edit");
  };

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/users/${user}`
        );

        setUsername(response.data.username);
        setMobileNumber(response.data.mobile_number);
        setCounty(response.data.county);
        setProfilePicture(response.data.profile_picture);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user) {
      fetchUserData(user);
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleAuth = async () => {
    if (isLoggedIn) {
      try {
        await axios.delete(
          "http://127.0.0.1:3000/users/sign_out",
          {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
            withCredentials: true,
          }
        );
        localStorage.removeItem("session_id");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");

        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`${Styles.containerMain} mt-2`}>
      <label
        className="col-md-4 mt-2 d-flex justify-content-center align-items-center"
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #000",
          width: "100%",
          lineHeight: " 2.5"
        }}
      >
        My Profile
      </label>

      <Helmet className="mt-5">
        <title>
          {username ? `${username} - Profile | Levick 23` : "Levick 23"}
        </title>
        <meta
          name="description"
          content={
            username
              ? `${username}'s profile on Levick 23`
              : "Levick 23 profile page"
          }
        />
      </Helmet>
      <div className="column" style={{ minHeight: "100%" }}>
        <div className="col-md-12 mt-1 d-flex justify-content-center align-items-center">
        <div className="text-center">
          {profilePicture ? (
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(true)}
            >
              <img
                src={profilePicture}
                alt="Profile_picture"
                className="profileimage"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                <svg
                  xmlns={camera}
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* Camera icon */}
                </svg>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <AccountCircle
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="col-md-12 text-center">
        <div className="user-details mt-3">
          <h3 className={` ${Styles.userInfo}`}>{username}</h3>
          <div className={`font-weight-bold mt-3 ${Styles.userInfo}`}>
            Mobile Number: <span>{mobileNumber}</span>
          </div>
          <div className={`font-weight-bold mt-3 ${Styles.userInfo}`}>
            County: <span>{county}</span>
          </div>
          <div className={`font-weight-bold mt-3 ${Styles.userInfo}`}>
            Email: <span>{email}</span>
          </div>
          <div className="button-container d-flex justify-content-center col-md-12 gap-2">
            <button onClick={handleProfileEdit} className={Styles.profileButton}>
              Edit Profile
            </button>
            <button onClick={handleAuth} className={Styles.profileButton}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
      {
    profilePicture && (
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img
                src={profilePicture}
                alt="Profile_picture"
                className="img-fluid"
                style={{ maxWidth: "100%", maxHeight: "80vh" }}
              />
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  <div>
    <div className="">
      <Header username={userdetails} user={user} />
    </div>
  </div>
    </div >
  );
}
