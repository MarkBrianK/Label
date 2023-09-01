import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore }) {
  const imageUrls = cloth.image.split(",");
  const showImageCarousel = imageUrls.length > 1;

  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  return (
    <Card className="card-container">
      <div className="responsive-image">
        {showImageCarousel && (
          <Carousel
            showStatus={false}
            showThumbs={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    ...iconButtonStyle,
                    left: "15px",
                    color: "white", // Set the color to white
                  }}
                >
                  <IoIosArrowBack size={30} />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    ...iconButtonStyle,
                    right: "15px",
                    color: "white", // Set the color to white
                  }}
                >
                  <IoIosArrowForward size={30} />
                </button>
              )
            }
          >
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="popup-image-container">
                <img
                  className="popup-image"
                  src={imageUrl}
                  alt={`${cloth.name}`}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        )}
        {!showImageCarousel && (
          <img
            className="image"
            src={imageUrls[0]}
            alt={`${cloth.name}`}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: "15px 15px 0 0",
            }}
          />
        )}
      </div>
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
