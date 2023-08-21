import React from "react";
import { Modal } from "react-bootstrap";

function ModalScreen(props) {
  const { body, footer, show, onHide, name, description, price, size, image } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header">
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div>
          <img src={image} alt={name} style={{ maxWidth: "100%", maxHeight: "200px" }} />
        </div>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Price: ksh</strong> {price}</p>
        <p><strong>Size:</strong> {size}</p>

      </Modal.Body>
      <Modal.Footer className="modal.footer">{footer}</Modal.Footer>
    </Modal>
  );
}

export default ModalScreen;
