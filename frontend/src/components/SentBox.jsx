import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Badge } from "react-bootstrap"; // Added Badge import
import { deleteMail, fetchSentBox } from "../redux/mailSlice";

// Lazy load the ReadMessageModal
const ReadMessageModal = React.lazy(() => import("./ReadMessageModal"));

const SentBox = () => {
  const sentMessageData = useSelector((state) => state.mail.sent);
  const dispatch = useDispatch();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSentBox());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMail(id));
    }
  };

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className="container mt-4">
      <h2>Sent Messages</h2>
      {sentMessageData && sentMessageData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Receiver</th>
              <th>Sent At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sentMessageData.map((message, index) => (
              <tr key={message._id}>
                <td>{index + 1}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleOpenMessage(message)}
                  >
                    {message.subject}
                  </Button>
                </td>
                <td>
                  {message.isRead ? (
                    <Badge bg="success">Read</Badge>
                  ) : (
                    <Badge bg="warning">Unread</Badge>
                  )}
                </td>
                <td>{message.receiverEmail}</td>
                <td>{new Date(message.sentAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(message._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No sent messages available.</p>
      )}

      {/* Suspense with fallback for ReadMessageModal */}
      <Suspense fallback={<div>Loading message...</div>}>
        <ReadMessageModal
          show={showModal}
          message={selectedMessage}
          handleClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
};

export default React.memo(SentBox);
