const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Define allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  },
});

module.exports = {io,server,app}

