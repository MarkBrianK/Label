import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import Header from "./Header";
import Button from '../Shared/Button';

export default function Profile({ user, userdetails}) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const editorRef = useRef();
  const sessionCookie = localStorage.getItem('session_id')


  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const response = await axios.get(
          `https://levick-7b15defb7ee9.herokuapp.com/users/${user}`
        );
        setUsername(response.data.username);


        // Set the profile picture from the response
        setProfilePicture(response.data.profile_picture);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


    if (user) {
      fetchUserData(user);
      setIsLoggedIn(true)
    }

  }, [user]);



  const handleAuth = async () => {

    if (isLoggedIn) {
      try {
        await axios.delete('https://levick-7b15defb7ee9.herokuapp.com/users/sign_out', {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
          withCredentials: true,
        });
        localStorage.removeItem('session_id');
        localStorage.removeItem('user_id')
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
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>User Profile</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture:
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            {profilePicture && (
              <AvatarEditor
                ref={editorRef}
                image={profilePicture}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                scale={1.2}
                className="mt-3"
                style={{
                  borderRadius: "50%",
                  border: "1px solid goldenrod",
                }}
              />
            )}
          </div>
          <div className="mb-3">
            <h3>User Details</h3>
            <ul>
              <li>
                <strong>Username:</strong> {username}

            <Button onClick={handleAuth}> Log Out</Button>
              </li>
            </ul>
            {profilePicture && (
              <div>
                <h4>Profile Picture:</h4>
                <img
                  src={profilePicture}
                  alt="Profile_picture"
                  style={{
                    width: "200px",
                    height: "206px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}

          </div>

          <button className="btn btn-primary" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>


        <div className="col-md-6" style={{marginTop:"40px"}}>
          <Header username={userdetails} user={user}/>
        </div>
      </div>
    </div>
  );
}
