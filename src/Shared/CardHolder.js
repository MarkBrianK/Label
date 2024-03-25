import React from "react";
import { Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../Assets/Styles/CardHolder.css";

function CardHolder({ cloth, handleViewMore, user, children }) {
  const imageUrls = JSON.parse(cloth.image);
  const showImageCarousel = imageUrls.length > 1;
  const navigate = useNavigate();

  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const handleMakeSale = () => {
    if (user) {
      navigate(`/sales/${cloth.id}`);
    } else {
      alert("User not authenticated. Show login prompt or handle accordingly.");
    }
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
                <Image
                  cloudName="djmvocl1y"
                  publicId={imageUrl}
                  alt={`${cloth.name}`}
                  className="popup-image"
                  loading="lazy"
                />
              </div>
            ))}
          </Carousel>
        )}
        {!showImageCarousel && (
          <div className="responsive-image">
            <Image
              cloudName="djmvocl1y"
              publicId={imageUrls[0]}
              alt={`${cloth.name}`}
              className="image"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <Card.Body className="text-center">
        <Card.Title style={{ fontSize: "small", fontWeight: "600" }}>
          {cloth.name}
        </Card.Title>
        {children}
        <div className="button-container">
          <Button className="custom-button" onClick={() => handleViewMore(cloth)}>
            More Details
          </Button>
          {user && (
            <button className="make-sale-button" onClick={handleMakeSale}>
              <div className="button-content">
                <MonetizationOnIcon />
              </div>
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardHolder;
