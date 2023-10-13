import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Alert } from "react-bootstrap";

function LikeButton({ cloth, onLikeError, user }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [like, setLike] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `https://seal-app-p8ntf.ondigitalocean.app/${cloth.id}`
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
        setErrorMessage("Error fetching likes.");
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
          `https://seal-app-p8ntf.ondigitalocean.app/${cloth.id}/likes/${like}`,
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
          `https://seal-app-p8ntf.ondigitalocean.app/${cloth.id}/likes`,
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
      <span>{likesCount}</span>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
}

export default LikeButton;
