import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CryptoJS from "crypto-js";

function LikeButton({ cloth }) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const secretKey = "wabebee_x1_levick";

    const encryptedUserID = localStorage.getItem("user_id");

    const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
    const decryptedUserID = bytes.toString(CryptoJS.enc.Utf8);

    const currentUser = decryptedUserID


    useEffect(() => {
        // Fetch likes for the specific cloth when the component mounts
        const fetchLikes = async () => {
            try {
                const response = await fetch(`/cloth/${cloth.id}/likes`);
                if (!response.ok) {
                    throw new Error("Failed to fetch likes");
                }
                const data = await response.json();
                const userHasLiked = data.some((like) => like.user_id === currentUser.id);
                setLikesCount(data.length);
                setLiked(userHasLiked);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    },);

    const handleLikeClick = async () => {
        try {
            // Perform the like/unlike action
            if (liked) {
                // Unlike the cloth
                await fetch(`/cloth/${cloth.id}/likes/${currentUser.id}`, {
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
