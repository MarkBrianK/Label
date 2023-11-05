import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import axios from "axios";
import Header from "./Header";
import Button from "../Shared/Button";
import camera from "../Assets/Image/239220.png";
import "../Assets/Styles/Profile.css";

export default function Profile({ user, userdetails }) {
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // Add mobileNumber state
  const [county, setCounty] = useState(""); // Add county state
  const [ email, setEmail] = useState("")
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
          `https://levick-6ab9bbf8750f.herokuapp.com/users/${user}`
        );

        setUsername(response.data.username);
        setMobileNumber(response.data.mobile_number); // Set mobile number
        setCounty(response.data.county); // Set county
        setProfilePicture(response.data.profile_picture);
        setEmail(response.data.email)
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
          "https://levick-6ab9bbf8750f.herokuapp.com/users/sign_out",
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
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            {/* Profile Picture Section */}
            {profilePicture ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
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
        <div className="col-md-8">
          <div className="user-details">
            <h3 className="font-weight-bold">{username}</h3>
            {/* Display Mobile Number and County */}
            <p>Mobile Number: {mobileNumber}</p>
            <p>County: {county}</p>
            <p> Email: {email} </p>
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
          {/* Link to User's Sales */}
          <Header username={userdetails} user={user} >
          </Header>
        </div>
      </div>
    </div>
  );
}
