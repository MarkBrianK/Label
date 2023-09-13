import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Button from "../Shared/Button";

function CommentHandler({ cloth }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  // Define fetchComments function in the outer scope
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://levick-7b15defb7ee9.herokuapp.com/${cloth.id}/comments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      console.log(data)
      setComments(data);
      console.log(comments)

    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
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
    // Fetch comments for the specific cloth when the component mounts or when cloth.id changes
    fetchComments(); // Call the fetchComments function here

  });
  const handleCommentSubmit = async () => {
    if (!user) {
      console.error("Please log in to comment.");
      return;
    }

    try {
      const requestData = {
        user_id: user, // Use the user's ID
        cloth_id: cloth.id,
        body: newComment,
      };

      await fetch(`https://levick-7b15defb7ee9.herokuapp.com/${cloth.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Refresh the comments after adding a new comment
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <Button onClick={handleCommentSubmit}>Submit</Button>
      </div>
      <div>
        {comments && comments.length > 0 ? ( // Check if comments exist and are not empty
          comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.body}</p>
              {/* Display other comment details as needed */}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
export default CommentHandler;
