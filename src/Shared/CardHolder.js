import React from "react";
import { Card } from "react-bootstrap";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css"; // Update the import path

function CardHolder({ cloth, handleViewMore }) {
  return (
    <Card className="card-container">
      <div className="responsive-image">
        <Card.Img
          className="image"
          variant="top"
          src={cloth.image}
          alt={cloth.title}
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title>{cloth.title}</Card.Title>
        <Card.Text className="description">{cloth.description}</Card.Text>
        <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
