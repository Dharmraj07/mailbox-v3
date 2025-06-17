import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInbox,
  deleteMail,
  markMailAsRead,
} from "../redux/mailSlice";
import { Table, Badge, Button } from "react-bootstrap";
import ReadMessageModal from "./ReadMessageModal";

const Inbox = () => {
  const dispatch = useDispatch();
  const { inbox } = useSelector((state) => state.mail);
  const [selectedMail, setSelectedMail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  const handleOpenMail = useCallback((mail) => {
    setSelectedMail(mail);
    setShowModal(true);
    if (!mail.isRead) {
      dispatch(markMailAsRead(mail._id));
    }
  }, [dispatch]);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this mail?")) {
        dispatch(deleteMail(id));
      }
    },
    [dispatch]
  );

  const handleTableClick = useCallback(
    (e) => {
      const row = e.target.closest("tr[data-id]");
      if (!row) return;

      const mailId = row.dataset.id;
      const action = e.target.dataset.action;
      const selected = inbox.find((mail) => mail._id === mailId);
      if (!selected) return;

      if (action === "open") {
        handleOpenMail(selected);
      } else if (action === "delete") {
        handleDelete(mailId);
      }
    },
    [inbox, handleOpenMail, handleDelete]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedMail(null);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inbox</h2>

      {inbox && inbox.length > 0 ? (
        <Table striped bordered hover onClick={handleTableClick}>
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
              <tr key={mail._id} data-id={mail._id}>
                <td>{index + 1}</td>
                <td>{mail.senderEmail}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    data-action="open"
                  >
                    {mail.subject}
                  </button>
                </td>
                <td>
                  <Badge bg={mail.isRead ? "success" : "warning"}>
                    {mail.isRead ? "Read" : "Unread"}
                  </Badge>
                </td>
                <td>{new Date(mail.sentAt).toLocaleString()}</td>
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
        <p>No messages in your inbox.</p>
      )}

      <ReadMessageModal
        show={showModal}
        message={selectedMail}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default React.memo(Inbox);
