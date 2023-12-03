import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import styles from "../../src/Assets/Styles/EditProfile.module.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    county: "",
    profilePicture: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${user}`);
        const { username, mobile_number, county, profile_picture } = response.data;
        setFormData({
          username,
          mobileNumber: mobile_number || "",
          county: county || "",
          profilePicture: profile_picture,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setFormData({ ...formData, profilePicture: dataURL });
      };

      reader.readAsDataURL(file);
    }

    setSelectedFile(file);
    setIsEditing(true);
  };

  const handleSaveImage = () => {
    // Perform any necessary actions when the image is saved
    setIsEditing(false);
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      console.error("User is null. Cannot update profile.");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("user[username]", formData.username);
    updatedFormData.append("user[mobile_number]", formData.mobileNumber);
    updatedFormData.append("user[county]", formData.county);

    if (selectedFile) {
      updatedFormData.append("user[profile_picture]", selectedFile);
    }

    try {
      await axios.patch(`https://levick-6ab9bbf8750f.herokuapp.com/users/${user}`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect to the user's profile page on successful update
      navigate(`/profile/${user}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };




  return (
    <div className={styles.centeredContainer}>
      <label htmlFor="profilePicture" className={styles.editProfileLabel}>
        Edit Profile
      </label>
      <div className={styles.formContainer}>
        {isEditing && (
          <div className={styles.avatarContainer}>
            {formData.profilePicture && (
              <AvatarEditor
                ref={editorRef}
                image={formData.profilePicture}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                scale={1.2}
              />
            )}
            <button className={styles.saveButton} onClick={handleSaveImage}>
              Save
            </button>
          </div>
        )}
        {!isEditing && (
          <img
            src={
              formData.profilePicture ||
              "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
            }
            alt="Default Profile"
            className={styles.defaultProfilePicture}
          />
        )}
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          className={styles.profilePictureInput}
          onChange={handleFileChange}
        />
        <div class="mb-3">
          <label for="formFile" className={styles.uploadName}>
            Upload Profile Picture:
          </label>
          <input class="form-control" type="file" id="formFile" onChange={handleFileChange} />
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="username" className={styles.formLabel}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          className={styles.formInput}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>
      <div className={styles.formElement}>
        <label htmlFor="mobileNumber" className={styles.formLabel}>
          Mobile Number:
        </label>
        <input
          type="text"
          id="mobileNumber"
          className={styles.formInput}
          value={formData.mobileNumber}
          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
        />
      </div>
      <div className={styles.formElement}>
        <label htmlFor="county" className={styles.formLabel}>
          County:
        </label>
        <br />
        <input
          type="text"
          id="county"
          className={styles.formInput}
          value={formData.county}
          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
        />
      </div>
      <button className={styles.updateButton} onClick={handleUpdateProfile}>
        Update Profile
      </button>
      <Header user={user} />
    </div>
  );
}

export default EditProfile;
