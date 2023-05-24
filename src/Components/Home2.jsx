import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const sessionCookie = sessionStorage.getItem('session');
  const userId = parseInt(sessionStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('http://127.0.0.1:3000/cloths', {
          headers: {
            Authorization: `Bearer ${sessionCookie}`
          },
          data: {
            userId: userId
          }
        });
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [sessionCookie, userId]);
  const handleLogin= ()=> {
    navigate(`/signin`)
  }

  return (
    <div>
        <div>
            <Button onClick={handleLogin}  > Log in </Button>
        </div>
      <Row>
        {data.map((item) => (
          <Col key={item.id} sm={4}>
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
