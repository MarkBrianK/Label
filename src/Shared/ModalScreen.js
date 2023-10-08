import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ModalScreen(props) {
  const { footer, show, onHide, name, description, size, image } = props;

  const handleContactWhatsApp = () => {
    const phoneNumber = "+254719435030";
    const message = `Hi, I'm interested in the ${name}`;
    const encodedMessage = encodeURIComponent(message);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let whatsappLink;
    if (isMobile) {
      whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    } else {
      whatsappLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    }

    window.open(whatsappLink, "_blank");
  };

  const iconButtonStyle = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const imageUrls = image ? JSON.parse(image) : [];
  const showImageCarousel = imageUrls.length > 1;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header">
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-content" style={{ display: "flex" }}>
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
                        color: "white"
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
                      alt={`logo`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
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
                alt={`logo`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "15px 15px 0 0",
                }}
              />
            )}
          </div>
          {/* Other details displayed on the right */}
          <div className="details-container" style={{ flex: "2", padding: "10px" }}>
            <p style={{fontSize:"small"}}><strong>Name:</strong> {name}</p>
            <p style={{fontSize:"small"}}><strong>Description:</strong> {description}</p>
            <p style={{fontSize:"small"}}> <strong>Size:</strong> {size}</p>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
                border: "none",
                marginRight: "10px",
                width: "auto",
                padding: "5px",
                backgroundColor: "transparent",
              }}
              className="whatsapp-button"
              onClick={handleContactWhatsApp}
            >
              <FontAwesomeIcon
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginRight: "5px",
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "5px",
                }}
                icon={faWhatsapp}
              />
              <span style={{ marginLeft: "5px", fontWeight: "600", color: "#1a474a", fontSize: "small" }}>Contact via WhatsApp</span>
            </button>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        {footer}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalScreen;
