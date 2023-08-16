import React from "react";
import { Modal } from "react-bootstrap";


function ModalScreen(props) {
    const { title, body, footer, show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header className="modal-header">
            <Modal.Title className="modal.title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">{body}</Modal.Body>
        <Modal.Footer className="modal.footer">{footer}</Modal.Footer>
    </Modal>
    )
}
export default ModalScreen
