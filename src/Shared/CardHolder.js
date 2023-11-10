import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { Image } from "cloudinary-react";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore, user, children }) {
  const imageUrls = JSON.parse(cloth.image);
  const showImageCarousel = imageUrls.length > 1;

  const [imagesLoaded, setImagesLoaded] = useState(Array(imageUrls.length).fill(false));

  const handleImageLoad = (index) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  return (
    <Card className={`card-container ${!imagesLoaded.every(Boolean) ? 'loading' : ''}`}>
      <div className="responsive-image">
        {showImageCarousel && (
          <Carousel
            showStatus={false}
            showThumbs={false}
            swipeable={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && renderArrow("left", onClickHandler, label)}
            renderArrowNext={(onClickHandler, hasNext, label) => hasNext && renderArrow("right", onClickHandler, label)}
          >
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="popup-image-container">
                <Image
                  cloudName="djmvocl1y"
                  publicId={imageUrl}
                  alt={`${cloth.name}`}
                  className={`popup-image ${imagesLoaded[index] ? 'loaded' : 'hidden'}`}
                  onLoad={() => handleImageLoad(index)}
                  loading="lazy"
                />
              </div>
            ))}
          </Carousel>
        )}
        {!showImageCarousel && (
          <div className="popup-image-container">
            <Image
              cloudName="djmvocl1y"
              publicId={imageUrls[0]}
              alt={`${cloth.name}`}
              className={`popup-image ${imagesLoaded[0] ? 'loaded' : 'hidden'}`}
              onLoad={() => handleImageLoad(0)}
              loading="lazy"
            />
          </div>
        )}
        {!imagesLoaded.every(Boolean) && <LoadingSpinner />}
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

function renderArrow(direction, onClickHandler, label) {
  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "white",
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      title={label}
      style={{
        ...iconButtonStyle,
        [direction]: "15px",
      }}
    >
      {direction === "left" ? <IoIosArrowBack size={30} /> : <IoIosArrowForward size={30} />}
    </button>
  );
}

export default CardHolder;
