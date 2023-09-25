import React,{useState} from "react";
import axios from "axios";

function EditProfile ({user}){

  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);




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
            <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture:
            </label>

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

            <button className="btn btn-primary" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
    )
}

export default EditProfile
