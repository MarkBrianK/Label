import React from "react";


function EditProfile ({user}){




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
        `https://levick-7b15defb7ee9.herokuapp.com/users/${user}`,
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
    return(
        <div>
        <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />


        </div>
    )
}

export default EditProfile