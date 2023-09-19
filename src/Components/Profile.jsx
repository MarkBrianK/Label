import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function Profile({ user }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${user}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user) {
      fetchUserData(user);
    }
  }, [user]); // Added user as a dependency to refetch data if user changes

  const handleUpdateProfile = () => {
    if (!user) {
      console.error("User is null. Cannot update profile.");
      return;
    }

    const formData = new FormData();
    formData.append("user[username]", username);
    formData.append("user[profile_picture]", profilePicture);

    axios
      .patch(`http://127.0.0.1:3000/users/${user}`, formData)
      .then((response) =>
        console.log("Profile updated successfully:", response.data)
      )
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button onClick={handleUpdateProfile}>Update Profile</button>

          <div>
            <h3>User Details</h3>
            <ul>
              <li>
                <strong>Username:</strong> {username}
              </li>
            </ul>
            <button>Edit Details</button>
          </div>

          <Header user={user} />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}
