import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMail } from "../redux/mailSlice";
import { useNavigate } from "react-router-dom";

const ComposeModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [composeForm, setComposeForm] = useState({
    receiver: "",
    subject: "",
    body: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setComposeForm((prevForm) => ({ ...prevForm, [name]: value }));

  const handleSendMail = async () => {
    try {
      await dispatch(sendMail(composeForm)).unwrap(); // Using `unwrap` for better error handling
      alert("Mail sent successfully!");
    //   navigate("/send");

      resetForm();
      handleClose();
    } catch (err) {
      alert(`Failed to send mail: ${err.message}`);
    }
  };

  const resetForm = () =>
    setComposeForm({ receiver: "", subject: "", body: "" });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Compose Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {["receiver", "subject", "body"].map((field) => (
            <Form.Group
              key={field}
              className="mb-3"
              controlId={`compose${field}`}
            >
              <Form.Label>{capitalize(field)}</Form.Label>
              <Form.Control
                as={field === "body" ? "textarea" : "input"}
                rows={field === "body" ? 4 : undefined}
                type={field === "receiver" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={composeForm[field]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSendMail}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Helper function to capitalize field labels
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default ComposeModal;
