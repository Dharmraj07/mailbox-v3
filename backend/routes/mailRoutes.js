const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { sendMail, getInbox, getSentBox, markAsRead, deleteMail } = require("../controllers/mailController");


// routes
// mail routes

// Mail Routes
router.post("/send", authMiddleware, sendMail); // Send a new mail
router.get("/inbox", authMiddleware, getInbox); // Fetch inbox mails with total unread messages
router.get("/sent", authMiddleware, getSentBox); // Fetch sent mails
router.put("/mark-as-read/:id", authMiddleware, markAsRead); // Mark a mail as read
router.delete("/delete/:id", authMiddleware, deleteMail); // Delete a mail

module.exports = router;
