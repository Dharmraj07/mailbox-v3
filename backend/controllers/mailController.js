const Mail = require("../models/Mail");
const User = require("../models/User");

const express = require("express");
const { io } = require("../socket");
const app = express();




// Send a new mail
exports.sendMail = async (req, res) => {
  try {
    const { receiver, subject, body, attachments } = req.body;
    const sender = req.user.id;

    // Validate receiver's email
    const recipient = await User.findOne({ email: receiver });
    if (!recipient) {
      return res.status(404).json({ 
        success: false, 
        message: "Recipient not found" 
      });
    }

    // Create the mail object
    const mailData = {
      sender,
      senderUsername: req.user.username,
      senderEmail: req.user.email,
      receiver: recipient._id,
      receiverUsername: recipient.username,
      receiverEmail: recipient.email,
      subject,
      body,
      attachments,
    };

    // Save the mail to the database
    const mail = await Mail.create(mailData);

    // Emit the mail to the recipient's email in real time
    io.emit(recipient.email, {
      message: "You have received a new mail",
      mail,
    });

    res.status(201).json({
      success: true,
      message: "Mail sent successfully",
      mail,
    });
  } catch (err) {
    console.error("Error sending mail:", err.message);
    res.status(500).json({ 
      success: false, 
      error: "An error occurred while sending the mail. Please try again." 
    });
  }
};


// Fetch inbox mails with total unread messages
exports.getInbox = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve received mails that are not deleted
    const mails = await Mail.find({
      receiver: userId,
      receiverDeleted: false,
    }).sort({ sentAt: -1 });
    const unreadCount = await Mail.countDocuments({
      receiver: userId,
      isRead: false,
      receiverDeleted: false,
    });

    res.status(200).json({ success: true, mails, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Fetch sent mails
exports.getSentBox = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve sent mails that are not deleted
    const mails = await Mail.find({
      sender: userId,
      senderDeleted: false,
    }).sort({ sentAt: -1 });

    res.status(200).json({ success: true, mails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Mark a mail as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Update mail's read status
    const mail = await Mail.findOneAndUpdate(
      { _id: id, receiver: userId },
      { isRead: true },
      { new: true }
    );

    if (!mail) {
      return res
        .status(404)
        .json({ success: false, message: "Mail not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Mail marked as read", mail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a mail
exports.deleteMail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if the mail belongs to the sender or the receiver
    const mail = await Mail.findOne({ _id: id });

    // If the mail is found, delete for sender or receiver
    if (
      mail.sender.toString() === userId ||
      mail.receiver.toString() === userId
    ) {
      // Only delete for the current user
      if (mail.sender.toString() === userId) {
        // If the user is the sender, delete from sent box
        await Mail.findOneAndUpdate(
          { _id: id },
          { $set: { senderDeleted: true } },
          { new: true }
        );
      } else {
        // If the user is the receiver, delete from inbox
        await Mail.findOneAndUpdate(
          { _id: id },
          { $set: { receiverDeleted: true } },
          { new: true }
        );
      }

      return res
        .status(200)
        .json({ success: true, message: "Mail marked as deleted" });
    }

    return res.status(404).json({ success: false, message: "Mail not found" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
