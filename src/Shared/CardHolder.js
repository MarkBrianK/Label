import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore }) {
  const [showImages, setShowImages] = useState(false);
  const imageUrls = cloth.image.split(',');

  const showAdditionalImages = () => {
    setShowImages(true);
  };

  return (
    <Card className="card-container">
      <div className="responsive-image">
        {showImages ? (
          imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              className="image"
              src={imageUrl}
              alt={`${cloth.name}`}
              style={{ width: `${100 / imageUrls.length}%`, height: `${100 / imageUrls.length}%` }}
            />
          ))
        ) : (
          <div onClick={showAdditionalImages} className="show-more-overlay">
            <img
              className="image"
              src={imageUrls[0]}
              alt={`${cloth.name}`}
              style={{ width: `${100 / imageUrls.length}%`, height: `${100 / imageUrls.length}%` }}
            />
            {imageUrls.length > 1 && <div className="overlay-text">+{imageUrls.length - 1}</div>}
          </div>
        )}
      </div>
      <Card.Body className="text-center">
        <Card.Title style={{ fontSize: "small", fontWeight: "600" }}>{cloth.name}</Card.Title>
        <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
