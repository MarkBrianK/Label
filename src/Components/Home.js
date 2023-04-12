import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import cloth from './db.json';
import { FaHeart } from 'react-icons/fa';

function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(
    cloth.map((item) => ({
      ...item,
      liked: false,
    }))
  );

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleLike = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            liked: !item.liked,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="home-container">
      <Row className="row-container">
        <Col xs={12} md={8} lg={9} className="cards-container">
          {data.map((item) => (
            <Card key={item.name} style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                  Category: {item.category}
                  <br />
                  Price: {item.price}
                  <br />
                  Size: {item.size}
                  <br />
                <Button variant="primary">Add to Cart</Button>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Comment" />
                    <Button variant="primary" type="submit">
                    Comment
                  </Button>
                  </Form.Group>

                  <Button onClick={() => handleLike(item.id)}>
                    <FaHeart
                      className={`navbar-icon ${
                        item.liked ? 'liked' : ''
                      }`}
                    />
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col xs={12} md={4} lg={3}>
          <div className="user-data">
            {/* user data content goes here */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
