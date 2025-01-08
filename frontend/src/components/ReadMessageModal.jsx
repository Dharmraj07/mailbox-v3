import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReadMessageModal = ({ show, message, handleClose }) => {
  if (!message) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{message.subject}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>From:</strong> {message.senderEmail || "You"}</p>
        <p><strong>To:</strong> {message.receiverEmail}</p>
        <p><strong>Sent At:</strong> {new Date(message.sentAt).toLocaleString()}</p>
        <hr />
        <p>{message.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadMessageModal;
