import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chatSocket from "../chat/src/controllers/chatController";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins (change as needed)
});
chatSocket(io);

console.log("Server running on port 5000");