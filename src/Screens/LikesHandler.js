import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeButton({ cloth }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    // Fetch likes for the specific cloth when the component mounts
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/cloth/${cloth.id}/likes`);
        if (!response.ok) {
          throw new Error("Failed to fetch likes");
        }
        const data = await response.json();
        const userHasLiked = data;
        setLikesCount(data.length);
        setLiked(userHasLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [cloth.id]);

  const handleLikeClick = async () => {
    try {
      // Perform the like/unlike action
      if (liked) {
        // Unlike the cloth
        await fetch(`/cloth/${cloth.id}/likes`, {
          method: "DELETE",
        });
      } else {
        // Like the cloth
        await fetch(`/cloth/${cloth.id}/likes`, {
          method: "POST",
        });
      }
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div onClick={handleLikeClick}>
      {liked ? <FaHeart color="red" /> : <FaRegHeart />}
      {likesCount} Likes
    </div>
  );
}

export default LikeButton;
