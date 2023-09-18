import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import Button from "../Shared/Button";
import { Container, Row, Col, Image } from "react-bootstrap";
import defaultProfilePicture from "../Assets/Image/user.jpg";

function CommentHandler() {
  const { clothId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `https://levick-7b15defb7ee9.herokuapp.com/cloths/${clothId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [clothId]);

  useEffect(() => {
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
          console.error("Please log in.");
        }
      } else {
        console.error("Please log in.");
      }
    } catch (error) {
      console.error("Error decrypting user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, clothId]);

  const handleCommentSubmit = async () => {
    if (!user) {
      console.error("Please log in to comment.");
      return;
    }

    try {
      const requestData = {
        user_id: user,
        cloth_id: clothId,
        body: newComment,
      };

      await fetch(
        `https://levick-7b15defb7ee9.herokuapp.com/cloths/${clothId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <ul className="comment-list list-unstyled">
            {comments.map((comment) => (
              <li key={comment.id}>
                <div className="comment-content">
                  <div className="comment-user-info">
                    {comment.user.profile_picture ? (
                      <Image
                        src={comment.user.profile_picture}
                        roundedCircle
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        src={defaultProfilePicture}
                        roundedCircle
                        width={30}
                        height={30}
                      />
                    )}
                    <span className="comment-username" style={{ fontWeight: "700" }}>{comment.user.name}</span>
                  </div>
                  <div className="comment-body">{comment.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <textarea
            className="form-control comment-textarea"
            rows="4"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </Col>
      </Row>
      <Row style={{ margin: "10px 0px 0px 10px" }}>
        <Button onClick={handleCommentSubmit}>Submit</Button>
      </Row>
    </Container>
  );
}

export default CommentHandler;
