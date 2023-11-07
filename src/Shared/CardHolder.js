import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";
import LoadingSpinner from "./LoadingSpinner";

function CardHolder({ cloth, handleViewMore, user, children }) {
  const imageUrls = JSON.parse(cloth.image);
  const showImageCarousel = imageUrls.length > 1;

  const [imagesLoaded, setImagesLoaded] = useState(Array(imageUrls.length).fill(false));
  const [isLoading, setIsLoading] = useState(true);

  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  function isWithinLastTwoWeeks(dateString) {
    const today = new Date();
    const creationDate = new Date(dateString);
    const twoWeeksAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return creationDate >= twoWeeksAgo;
  }

  const handleImageLoad = (index) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);

    // Check if all images have loaded
    if (!newImagesLoaded.includes(false)) {
      setIsLoading(false); // Set isLoading to false when all images have loaded
    }
  };

  return (
    <Card className="card-container">
      <div className="responsive-image">
        {showImageCarousel && (
          <>
            {isLoading && <LoadingSpinner/> }
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
                  />
                </div>
              ))}
            </Carousel>
          </>
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
              borderRadius: "15px 15px 0 0",
            }}
            onLoad={() => handleImageLoad(0)}
          />
        )}

        {isWithinLastTwoWeeks(cloth.created_at) && (
          <div
            className="new-arrival-mark"
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <span
              style={{
                backgroundColor: "black",
                color: "goldenrod",
                borderRadius: "50%",
                padding: "4px",
                display: "inline-block",
                width: "100%",
                height: "100%",
                textAlign: "center",
                lineHeight: "1",
                fontSize: "x-small",
              }}
            >
              &#9733; New
            </span>
          </div>
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
