import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Home.css';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import CommentList from './CommentList';

const Home = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});
  const sessionCookie = parseInt(sessionStorage.getItem('user_id'))

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('http://127.0.0.1:3000/cloths', {
          headers: {
            Authorization: `Bearer ${sessionCookie}` // Set the authorization header with the session cookie
          }
        });
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleLike = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/cloths/${id}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionCookie}` // Set the authorization header with the session cookie
          }
        }
      );
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (id, comment) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/cloths/${id}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${sessionCookie}` // Set the authorization header with the session cookie
          }
        }
      );
      setComments((prevComments) => ({
        ...prevComments,
        [id]: [...(prevComments[id] || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <Row>
      {data.map((item) => (
        <Col key={item.id} sm={4}>
          <Card>
            <Card.Img variant="top" src={item.image} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button variant="primary" onClick={() => handleLike(item.id)}>
                <FaHeart color={item.liked ? 'red' : 'black'} />{' '}
                {item.liked ? 'Unlike' : 'Like'}
              </Button>
              <CommentList
                comments={comments[item.id] || []}
                onComment={(comment) => handleComment(item.id, comment)}
              />
              <div>Total Likes: {item.likes}</div>
              <div>Total Comments: {comments[item.id]?.length || 0}</div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>

  );
};

export default Home;
