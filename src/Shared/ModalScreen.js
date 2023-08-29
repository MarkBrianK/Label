import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function ModalScreen(props) {
  const { body, footer, show, onHide, name, description, price, size, image } = props;

  const handleContactWhatsApp = () => {
    const phoneNumber = "+254719435030";

    // Generate the WhatsApp message
    const message = `Hi, I'm interested in the ${name} cloth.`;

    // Create the WhatsApp link for mobile application
    const mobileWhatsAppLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Create the WhatsApp link for WhatsApp Web
    const webWhatsAppLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open either the mobile WhatsApp or WhatsApp Web chat in a new tab
    if (navigator.userAgent.match(/(android|iphone|ipad)/i)) {
      // If the user is on a mobile device, open the mobile WhatsApp link
      window.open(mobileWhatsAppLink, "_blank");
    } else {
      // If the user is not on a mobile device, open the WhatsApp Web link
      window.open(webWhatsAppLink, "_blank");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header">
        {/* Header content */}
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-content" style={{ display: "flex" }}>
          {/* Image displayed alone on the left */}
          <div className="image-container" style={{ flex: "1", padding: "10px" }}>
            <img src={image} alt={name} style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
          {/* Other details displayed on the right */}
          <div className="details-container" style={{ flex: "2", padding: "10px" }}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Size:</strong> {size}</p>
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "5px",
                  backgroundColor: "#25D366",  // WhatsApp Green Color
                  color: "white",
                  padding: "5px",
                }}
                icon={faWhatsapp}
              />
              <span style={{ marginLeft: "5px" }}>Contact via WhatsApp</span>
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
