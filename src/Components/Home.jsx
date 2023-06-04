import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';
import Navigation from './Navigation';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cloths, setCloths] = useState([]);
  const sessionCookie = sessionStorage.getItem('session_id');
  const userId = parseInt(sessionStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get('http://localhost:3000/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCloths = async () => {
      try {
        let url = 'http://localhost:3000/cloths';
        if (selectedCategory) {
          url += `?categoryID=${selectedCategory}`;
        }
        const clothsResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionCookie}`
          }
        });
        setCloths(clothsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCloths();
  }, [sessionCookie, selectedCategory]);

  useEffect(() => {
    if (!sessionCookie) {
      navigate('/signin');
    }
  }, [sessionCookie, navigate]);

  const handleViewMore = (clothId) => {
    navigate(`/handle-cloth/${clothId}`);
  };

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const sortedCloths = selectedCategory
    ? cloths.filter((cloth) => cloth.category.id === selectedCategory)
    : cloths;

  return (
    <div className="home-page">
      <div className="container">

        <div className="row">

          <div className="col-md-2">
            <Navigation />
          </div>
          <div className="col-md-10 content">
            <div>
            {categories.length > 0 ? (
              <div className="category-buttons">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                    onClick={() => handleCategorySelection(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            ) : (
              <p>No categories found.</p>
            )}
            </div>

            <Row className="row">
              {sortedCloths.map((cloth) => (
                <Col key={cloth.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="card-container">
                    <Card.Img className="image" variant="top" src={cloth.image} alt={cloth.title} />
                    <Card.Body>
                      <Card.Title>{cloth.title}</Card.Title>
                      <Card.Text className="description">{cloth.description}</Card.Text>
                      <Button className="custom-button" onClick={() => handleViewMore(cloth.id)}>View More</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
