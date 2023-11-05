import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import styles from "../../src/Assets/Styles/EditProfile.module.css";

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    county: "",
    profilePicture: null,
  });

  const editorRef = useRef();

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const response = await axios.get(
          `https://levick-6ab9bbf8750f.herokuapp.com/users/${user}`
        );
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
      fetchUserData(user);
    }
  }, [user]);

  const handleFileChange = (event) => {
    setFormData({ ...formData, profilePicture: event.target.files[0] });
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

    if (formData.profilePicture) {
      updatedFormData.append("user[profile_picture]", formData.profilePicture);
    }

    try {
      await axios.patch(
        `https://levick-6ab9bbf8750f.herokuapp.com/users/${user}`,
        updatedFormData
      );
      console.log("Profile updated successfully.");
      window.location.reload();
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
        <div className={styles.avatarContainer}>
          {formData.profilePicture ? (
            <AvatarEditor
              ref={editorRef}
              image={formData.profilePicture}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              scale={1.2}
            />
          ) : (
            <img
              src={formData.profilePicture || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"}
              alt="Default Profile"
              className={styles.defaultProfilePicture}
            />
          )}
        </div>

        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          className={styles.profilePictureInput}
          onChange={handleFileChange}
        />
        <label className={styles.profilePictureLabel} htmlFor="profilePicture">
          Upload Profile Picture
        </label>
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
      </div>
    </div>
  );
}

export default EditProfile;
