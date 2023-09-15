import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { Alert } from "react-bootstrap";

function LikeButton({ cloth, onLikeError }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [like, setLike] = useState(null);
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
          setUser(currentUser);
        } else {
          setErrorMessage("Please Log in.");

        }
      } else {
      }
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    // Fetch likes for the specific cloth when the component mounts or when cloth.id changes
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch likes");
        }

        const data = await response.json();
        const individualLikeData = data.likes;
        const totalLikes = individualLikeData.length;
        setLikesCount(totalLikes);
        const likeId = individualLikeData.map((like) => like.id);
        setLike(parseInt(likeId));
        const likeUserId = individualLikeData.map((like) => like.user_id);
        if (likeUserId.includes(user)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [cloth.id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      const errorMessage = "Please log in to like.";
      onLikeError(errorMessage);
      setTimeout(() => {
        onLikeError(""); // Clear the error message after 2 seconds
      }, 2000);
      return;
    }

    try {
      const requestData = { user_id: user, cloth_id: cloth.id };

      if (liked) {
        // Unlike the cloth
        await fetch(
          `https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}/likes/${like}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
      } else {
        // Like the cloth
        await fetch(
          `https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
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
      {likesCount}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
}

export default LikeButton;
