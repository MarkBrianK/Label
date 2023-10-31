import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import Header from "../Components/Header";

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
          `https://levick-29ef28f8e880.herokuapp.com/users/${user}`
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
        `https://levick-29ef28f8e880.herokuapp.com/users/${user}`,
        updatedFormData
      );
      console.log("Profile updated successfully.");

      // Reload the page after updating the profile (You might want to use a different approach for a better user experience)
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">
          Mobile Number:
        </label>
        <input
          type="text"
          id="mobileNumber"
          className="form-control"
          value={formData.mobileNumber}
          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="county" className="form-label">
          County:
        </label>
        <input
          type="text"
          id="county"
          className="form-control"
          value={formData.county}
          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
        />
      </div>
      {formData.profilePicture && (
        <AvatarEditor
          ref={editorRef}
          image={formData.profilePicture}
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
