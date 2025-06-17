import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Badge } from "react-bootstrap";
import { deleteMail, fetchSentBox } from "../redux/mailSlice";

const ReadMessageModal = React.lazy(() => import("./ReadMessageModal"));

const SentBox = () => {
  const dispatch = useDispatch();
  const sentMessageData = useSelector((state) => state.mail.sent);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSentBox());
  }, [dispatch]);

  const handleOpenMessage = useCallback((message) => {
    setSelectedMessage(message);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedMessage(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this message?")) {
        dispatch(deleteMail(id));
      }
    },
    [dispatch]
  );

  const handleTableClick = useCallback(
    (e) => {
      const action = e.target.dataset.action;
      const row = e.target.closest("tr[data-id]");
      if (!row) return;
      const id = row.dataset.id;
      const message = sentMessageData.find((msg) => msg._id === id);
      if (!message) return;

      if (action === "open") handleOpenMessage(message);
      else if (action === "delete") handleDelete(id);
    },
    [sentMessageData, handleOpenMessage, handleDelete]
  );

  return (
    <div className="container mt-4">
      <h2>Sent Messages</h2>
      {sentMessageData?.length > 0 ? (
        <Table striped bordered hover onClick={handleTableClick}>
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
              <tr key={message._id} data-id={message._id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    data-action="open"
                  >
                    {message.subject}
                  </button>
                </td>
                <td>
                  <Badge bg={message.isRead ? "success" : "warning"}>
                    {message.isRead ? "Read" : "Unread"}
                  </Badge>
                </td>
                <td>{message.receiverEmail}</td>
                <td>{new Date(message.sentAt).toLocaleString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    data-action="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No sent messages available.</p>
      )}

      {showModal && (
        <Suspense fallback={<div>Loading message...</div>}>
          <ReadMessageModal
            show={showModal}
            message={selectedMessage}
            handleClose={handleCloseModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(SentBox);
