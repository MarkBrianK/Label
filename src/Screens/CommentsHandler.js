import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from "../Shared/Button";
import { Container, Row, Col, Image } from "react-bootstrap";
import defaultProfilePicture from "../Assets/Image/user.jpg";

function CommentHandler({user}) {
  const { clothId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if(user){
    setLoggedIn(true)
  }

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/cloths/${clothId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      // Filter out comments with null or empty body
      const filteredComments = data.comments.filter(comment => comment.body && comment.body.trim() !== '');
      setComments(filteredComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [clothId]);



  useEffect(() => {
    fetchComments();
  }, [fetchComments, clothId]);

  const handleCommentSubmit = async () => {
    if (!loggedIn) {
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
        `http://127.0.0.1:3000/cloths/${clothId}/comments`,
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
            {comments.map((comment) => {
              return comment.body ? (
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
                      <span className="comment-username" style={{ fontWeight: "700" }}>
                        {comment.user.name}
                      </span>
                    </div>
                    <div className="comment-body">{comment.body}</div>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        </Col>
      </Row>
      {loggedIn ? (
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
      ) : (
        <Row>
          <Col xs={12}>
            <p>Please log in to comment.</p>
          </Col>
        </Row>
      )}
      {loggedIn && (
        <Row style={{ margin: "10px 0px 0px 10px" }}>
          <Button onClick={handleCommentSubmit}>Submit</Button>
        </Row>
      )}
    </Container>
  );
}

export default CommentHandler;
