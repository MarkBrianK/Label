import React from "react";
import { Card } from "react-bootstrap";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore }) {
  // Split the image string into an array of image URLs
  const imageUrls = cloth.image.split(',');

  return (
    <Card className="card-container">
      <div className="responsive-image">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            className="image"
            src={imageUrl}
            alt={`${cloth.name}`}
            style={{ width: `${100 / imageUrls.length}%`, height: `${100/ imageUrls.length}%`  }} // Evenly distribute width
          />
        ))}
      </div>
      <Card.Body className="text-center">
        <Card.Title style={{fontSize:"small", fontWeight:"600"}}>{cloth.name}</Card.Title>
        <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
