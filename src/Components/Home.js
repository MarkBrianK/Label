import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Home.css';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios('http://127.0.0.1:3000/cloths');
      setData(result.data);
      console.log(data)
    }
    fetchData();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleLike = async (id) => {
    const response = await axios.post(`http://127.0.0.1:3000/cloths/${id}/likes`);
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: response.data.likes,
            liked: !item.liked,
          };
        }
        return item;
      })
    );
  };

  const handleComment = async (id, comment) => {
    const response = await axios.post(`http://127.0.0.1:3000/cloths/${id}/comments`, {
      comment: comment,
    });
    setComments((prevComments) => ({
      ...prevComments,
      [id]: response.data.comments,
    }));
  };

  return (
    <div className="home-container">
      <Row className="row-container">
        <Col xs={12} md={8} lg={9} className="cards-container">
          {data.map((item) => (
            <Card key={item.id} style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                Category: {item.category.name}
                <br />
                Price: {item.price}
                <br />
                Size: {item.size}
                <br />
                <Button variant="primary">Add to Cart</Button>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleComment(item.id, e.target.elements.comment.value);
                    e.target.elements.comment.value = '';
                  }}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      name="comment"
                      placeholder="Comment"
                    />
                    <Button variant="primary" type="submit">
                      Comment
                    </Button>
                  </Form.Group>
                </Form>
                <div className="comments">
                {Array.isArray(comments[item.id]) &&
                  comments[item.id].map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.comment}</p>
                    </div>
                ))}

                </div>
                <Button onClick={() => handleLike(item.id)}>
                  <FaHeart
                    className={`navbar-icon ${item.liked ? 'liked' : ''}`}
                  />
                  {item.likes}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col xs={12} md={4} lg={3}>
          <div className="user-data">{/* user data content goes here */}</div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
