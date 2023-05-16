import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentList = ({ comments, onComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentText.trim() !== '') {
      onComment(commentText);
      setCommentText('');
    }
  };

  return (
    <>
      <Card.Body>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Card.Title>{comment.author}</Card.Title>
            <Card.Text>{comment.text}</Card.Text>
          </div>
        ))}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="comment">
            <Form.Control
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add comment
          </Button>
        </Form>
      </Card.Footer>
    </>
  );
};

export default CommentList;
