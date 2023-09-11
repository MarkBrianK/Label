import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CryptoJS from "crypto-js";

function LikeButton({ cloth }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the encrypted user ID from localStorage
    try {
      const secretKey = "wabebee_x1_levick";
      const encryptedUserID = localStorage.getItem("user_id");
      if (encryptedUserID) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
        const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedUserData) {
          const currentUser = JSON.parse(decryptedUserData);
          setUser(currentUser); // Set user here
        } else {
          console.error("Please log in.");
        }
      } else {
        console.error("Please log in.");
      }
    } catch (error) {
      console.error("Please log in", error);
    }
  }, []);

  useEffect(() => {
    // Fetch likes for the specific cloth when the component mounts or when cloth.id changes
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/cloths/${cloth.id}/likes`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch likes");
        }
        const data = await response.json();
        const userHasLiked = data.some((like) => like.user_id === user)
        setLikesCount(data.length);
        setLiked(userHasLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [cloth.id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      console.error("Please log in.");
      return;
    }

    try {
      const requestData = { user_id: user, cloth_id: cloth.id };

      if (liked) {
        // Unlike the cloth
        await fetch(`http://127.0.0.1:3000/cloths/${cloth.id}/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      } else {
        // Like the cloth
        await fetch(`http://127.0.0.1:3000/cloths/${cloth.id}/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      }
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div onClick={handleLikeClick} style={{ fontSize: "small" }}>
      {liked ? <FaHeart color="red" /> : <FaRegHeart />}
      {likesCount} Likes
    </div>
  );
}

export default LikeButton;
