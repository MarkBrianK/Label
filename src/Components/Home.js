import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import cloth from "./db.json"
import { FaHeart } from 'react-icons/fa';


function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(cloth.map(item => ({
    ...item,
    liked: false
  })));

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleLike = (id) => {
    setData(prevData => prevData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked
        }
      }
      return item;
    }));
  }



  return (
    <div className="home-container">


      <div className="cards-container">
        <Row className="row-container" >
          {data.map((item) => (
            <Col key={item.name} xs={12} style={{ marginBottom: '20px' }}>
              <Card style={{ maxWidth: "100vh", marginTop: "20px", color: "black" }}>
                <Card.Body>
                  <Card.Img src={item.image} style={{ maxWidth: "120vh" }} />
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text style={{ color: "black" }}>
                    Category: {item.category}<br />
                    Price: {item.price}<br />
                    Size: {item.size}
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="comment" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Comment
                    </Button>
                    <Button onClick={() => handleLike(item.id)}>
                      <FaHeart className={`navbar-icon ${item.liked ? 'liked' : ''}`} />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>

  );
}

export default Home;
