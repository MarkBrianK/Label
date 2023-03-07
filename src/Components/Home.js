import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form'
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import data from "./db.json"
import { FaHeart } from 'react-icons/fa';


function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  function handleLike(){


  }

  return (
    <div className="home-container">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} className="d-block w-100 h-10">
        <Carousel.Item></Carousel.Item>
      </Carousel>
      <Row className="row-container" >
        {data.map((item) => (
          <Col key={item.name} xs={12} style={{ marginBottom: '20px' }}>
            <Card style={{ maxWidth: "70vh", marginTop: "20px" }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
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
                  <Button onClick={handleLike}>

                    <FaHeart className="navbar-icon" />

                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
