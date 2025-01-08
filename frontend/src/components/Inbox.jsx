import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox, deleteMail, markMailAsRead, reciveMail } from "../redux/mailSlice";
import { Table, Badge, Button } from "react-bootstrap";
import ReadMessageModal from "./ReadMessageModal"; // Import ReadMessageModal


const Inbox = () => {
  const dispatch = useDispatch();
  const { inbox } = useSelector((state) => state.mail);
  const [selectedMail, setSelectedMail] = useState(null);
  const [showModal, setShowModal] = useState(false);


 

  




  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this mail?")) {
      dispatch(deleteMail(id)).then(() => {
        dispatch(fetchInbox());
      });
    }
  };

  const handleOpenMail = (mail) => {
    setSelectedMail(mail);
    setShowModal(true);
    if (!mail.isRead) {
      dispatch(markMailAsRead(mail._id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMail(null);
  };

  return (
    <div className="container mt-4">
      <h2>Inbox</h2>
      {inbox && inbox.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Sent At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inbox.map((mail, index) => (
              <tr key={mail._id}>
                <td>{index + 1}</td>
                <td>{mail.senderEmail}</td>
                <td>
                  <Button variant="link" onClick={() => handleOpenMail(mail)}>
                    {mail.subject}
                  </Button>
                </td>
                <td>
                  {mail.isRead ? (
                    <Badge bg="success">Read</Badge>
                  ) : (
                    <Badge bg="warning">Unread</Badge>
                  )}
                </td>
                <td>{new Date(mail.sentAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(mail._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No messages in your inbox.</p>
      )}

      {/* Replace MailModal with ReadMessageModal */}
      <ReadMessageModal
        show={showModal}
        message={selectedMail}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default React.memo(Inbox);
