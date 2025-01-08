const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderUsername: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  receiverUsername: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  attachments: [
    {
      type: String,
    },
  ],
  isImportant: {
    type: Boolean,
    default: false,
  },
  tags: [
    {
      type: String,
    },
  ],
  senderDeleted: {
    type: Boolean,
    default: false,
  },
  receiverDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Mail", mailSchema);
