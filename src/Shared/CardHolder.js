import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "./Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore }) {
  const [showImages, setShowImages] = useState(false);
  const imageUrls = cloth.image.split(",");

  const showAdditionalImages = () => {
    setShowImages(true);
  };

  const hideAdditionalImages = () => {
    setShowImages(false);
  };

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    horizontal: true,
  };

  return (
    <Card className="card-container">
      <div className="responsive-image">
        <img
          className="image"
          src={imageUrls[0]}
          alt={`${cloth.name}`}
          style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
        />
        {showImages && (
          <div className="image-popup" onClick={hideAdditionalImages}>
            <Slider {...sliderSettings}>
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="popup-image-container">
                  <img
                    className="popup-image"
                    src={imageUrl}
                    alt={`${cloth.name}`}
                    style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      {imageUrls.length > 1 && !showImages && (
        <div className="overlay-text" onClick={showAdditionalImages}>
          +{imageUrls.length - 1}
        </div>
      )}
      <Card.Body className="text-center">
        <Card.Title style={{ fontSize: "small", fontWeight: "600" }}>
          {cloth.name}
        </Card.Title>
        <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
