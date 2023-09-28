import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Button from "../Shared/Button";

export default function Profile({ user, userdetails }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionCookie = localStorage.getItem("session_id");
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate("/profile/edit");
  };

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const response = await axios.get(
          `https://levick-7b15defb7ee9.herokuapp.com/users/${user}`
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
          "https://levick-7b15defb7ee9.herokuapp.com/users/sign_out",
          {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
            withCredentials: true,
          }
        );
        localStorage.removeItem("session_id");
        localStorage.removeItem("user_id");
        setIsLoggedIn(false);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile_picture"
                className="img-fluid rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
        </div>

        <div className="col-md-8">
          <div className="user-details">
            <h3 className="font-weight-bold">{username}</h3>
            <div
              className="button-container mt-3"
              style={{ display: "flex", gap: "10px" }}
            >
              <Button onClick={handleAuth}>Log Out</Button>
              <Button onClick={handleProfileEdit}>Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <Header username={userdetails} user={user} />
        </div>
      </div>
    </div>
  );
}
