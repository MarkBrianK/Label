import React from "react";
import { Modal } from "react-bootstrap";

function ModalScreen(props) {
  const { body, footer, show, onHide, name, description, price, size, image } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header">
        {/* Header content */}
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-content" style={{display:"flex"}}>
          {/* Image displayed alone on the left */}
          <div className="image-container" style={{flex:"1", padding:"10px"}}>
            <img src={image} alt={name} style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
          {/* Other details displayed on the right */}
          <div className="details-container" style={{flex:"2", padding:"10px"}}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price: ksh</strong> {price}</p>
            <p><strong>Size:</strong> {size}</p>
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
