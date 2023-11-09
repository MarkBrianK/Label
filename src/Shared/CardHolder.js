import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore, user, children }) {
  const imageUrls = JSON.parse(cloth.image);
  const showImageCarousel = imageUrls.length > 1;

  const [imagesLoaded, setImagesLoaded] = useState(Array(imageUrls.length).fill(false));

  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const handleImageLoad = (index) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  return (
    <Card className="card-container">
      <div className="responsive-image">
        {showImageCarousel && (
          <Carousel
            showStatus={false}
            showThumbs={false}
            swipeable={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    ...iconButtonStyle,
                    left: "15px",
                    color: "white",
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
                    color: "white",
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
                  className={`popup-image ${imagesLoaded[index] ? 'loaded' : 'hidden'}`}
                  src={imageUrl}
                  alt={`${cloth.name}`}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                  onLoad={() => handleImageLoad(index)}
                  loading="lazy" // Add the lazy loading attribute
                />
              </div>
            ))}
          </Carousel>
        )}
        {!showImageCarousel && (
          <img
            className={`image ${imagesLoaded[0] ? 'loaded' : 'hidden'}`}
            src={imageUrls[0]}
            alt={`${cloth.name}`}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: "6px 6px 0 0",
            }}
            onLoad={() => handleImageLoad(0)}
            loading="lazy" // Add the lazy loading attribute
          />
        )}
      </div>
      <Card.Body className="text-center">
        <Card.Title style={{ fontSize: "small", fontWeight: "600" }}>
          {cloth.name}
        </Card.Title>
        {children}
        <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
