import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import axios from "axios";
import Header from "./Header";
import Button from "../Shared/Button";

export default function Profile({ user, userdetails }) {
  const [username, setUsername] = useState("");
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
          `https://seal-app-p8ntf.ondigitalocean.app/users/${user}`
        );
        setUsername(response.data.username);
        setProfilePicture(response.data.profile_picture);
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
          "https://seal-app-p8ntf.ondigitalocean.app/users/sign_out",
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
    <div style={{ minHeight: "100vh", width: "100%", position: "fixed" }}>
      <Helmet>
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

      {/* Profile Picture */}
      <div
        className="text-center"
        style={{
          width: "100%",
          cursor: "pointer",

        }}
        onClick={() => setShowModal(true)}
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile_picture"
            className=""
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%", // Make image responsive
            }}
          />
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              marginTop: "10px",
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

      <div className="row">
        <div className="col-md-12">
          <div className="user-details">
            <h3 className="font-weight-bold" style={{fontSize:"large"}}> <span style={{fontWeight:"600" }}>Username:</span>  {username}</h3>
            <h3 className="font-weight-bold" style={{fontSize:"large"}}> <span style={{fontWeight:"600" }}>Name:</span>  {username}</h3>
            <div className="button-container mt-3 d-flex gap-2">
              <Button onClick={handleProfileEdit} style={{ marginTop: "10px" }}>
                Edit Profile
              </Button>
              <Button onClick={handleAuth}>Log Out</Button>
            </div>
          </div>
        </div>
      </div>

      {profilePicture && (
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
      )}

      <div className="row mt-4">
        <div className="col-md-12">
          <Header
            username={userdetails}
            user={user}
            style={{
              position: "fixed",
            }}
          />
        </div>
      </div>
    </div>
  );
}
