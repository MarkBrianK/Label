import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import Header from "../Components/Header";

function EditProfile({ user }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const editorRef = useRef();

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
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) {
      console.error("User is null. Cannot update profile.");
      return;
    }

    const formData = new FormData();
    formData.append("user[username]", username);
    if (profilePicture) {
      formData.append("user[profile_picture]", profilePicture);
    }

    try {
      await axios.patch(
        `https://seal-app-p8ntf.ondigitalocean.app/users/${user}`,
        formData
      );
      console.log("Profile updated successfully.");

      // Reload the page after updating the profile
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <div>
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
      <input
        type="file"
        id="profilePicture"
        accept="image/*"
        className="form-control"
        onChange={handleFileChange}
      />
      <div className="mb-3">
        <label htmlFor="profilePicture" className="form-label">
          Profile Picture:
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      <div className="row mt-4">
        <div className="col-md-12">
          <Header user={user} />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
