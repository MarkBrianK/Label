import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Styles/About.css";

function About() {
  const backgroundStyle = {
    background: 'rgba(142, 121, 62, 0.5) url("https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/black-paper-background.jpg") no-repeat center center fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle}>
      <Container className="py-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="text-white text-center">
            <h1 className="display-3 mb-4">About Us</h1>

            <Row>
              <Col xs={12} md={6}>
                <p>
                  Label is a fashion e-commerce website that offers a curated selection of clothing, accessories, and footwear for men and women. Our products are carefully selected from top brands and designers, ensuring that our customers have access to the latest trends and styles.
                </p>
                <p>
                  We believe that fashion should be accessible to everyone, which is why we offer a wide range of sizes and styles to suit every body type and personal preference. Whether you're looking for casual wear or formal attire, Label has something for everyone.
                </p>
              </Col>
              <Col xs={12} md={6}>
                <p>
                  Our website is designed to provide a seamless shopping experience for our customers. You can easily browse our products, filter by size or color, and add items to your cart with just a few clicks. We also offer free shipping and returns to make your shopping experience even more convenient.
                </p>
                <p>
                  At Label, we are committed to providing excellent customer service. If you have any questions or concerns, our friendly and knowledgeable team is always here to help. We strive to make every customer feel valued and satisfied with their purchase.
                </p>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
