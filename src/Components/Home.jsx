import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';
import Header from './Header';

const Home = () => {
  const [data, setData] = useState([]);
  const sessionCookie = sessionStorage.getItem('session_id');
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

  useEffect(() => {
    if (!sessionCookie) {
      navigate('/signin');
    }
  }, [sessionCookie, navigate]);

  const handleViewMore = (clothId) => {
    navigate(`/handle-cloth/${clothId}`);
  };

  return (
    <div>
      <div>
        <Header>

        </Header>
      </div>
      <Row className='row'>
        {data.map((item) => (
          <Col key={item.id} sm={4}>
            <Card className='cards-container'>
              <Card.Img className='image' variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className='description'>{item.description}</Card.Text>
                <Button className="custom-button" onClick={() => handleViewMore(item.id)}>View More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
