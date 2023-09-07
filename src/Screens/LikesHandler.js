import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CryptoJS from "crypto-js";

function LikeButton({ cloth }) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [user, setUser] = useState(null)


    // Retrieve the encrypted user ID from localStorage
    useEffect(() => {
        try {
          const secretKey = "wabebee_x1_levick";
          const encryptedUserID = localStorage.getItem("user_id");
          if (encryptedUserID) {
            const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
            const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);

            // Check if the decrypted data is not empty
            if (decryptedUserData) {
              // Parse the decrypted JSON string into a JavaScript object
              const currentUser = JSON.parse(decryptedUserData);
              setUser(currentUser)
            } else {
              console.error("Please log in.");
            }
          } else {
            console.error("Please log in.");
          }
        } catch (error) {
          console.error("Please log in");
        }
      }, []);




    useEffect(() => {
        // Fetch likes for the specific cloth when the component mounts
        const fetchLikes = async () => {
            try {
                const response = await fetch(`https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}/likes`);
                if (!response.ok) {
                    throw new Error("Failed to fetch likes");
                }
                const data = await response.json();
                const userHasLiked = data.some((like) => like.user_id === user);
                setLikesCount(data.length);
                setLiked(userHasLiked);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    },);

    const handleLikeClick = async () => {
        // Check if there is no user, and return early if so
        if (!user) {
          return;
        }

        try {
          // Perform the like/unlike action
          if (liked) {
            // Unlike the cloth
            await fetch(
              `https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}/likes/${user}`,
              {
                method: "DELETE",
              }
            );
          } else {
            // Like the cloth
            await fetch(
              `https://levick-7b15defb7ee9.herokuapp.com/cloths/${cloth.id}/likes`,
              {
                method: "POST",
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
        <div onClick={handleLikeClick} style={{fontSize:"small"}}>
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            {likesCount}  Likes
        </div>
    );
}

export default LikeButton;
