import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chatSocket from "../chat/src/controllers/chatController";
import dotenv from "dotenv";
import authRouter, { init } from "./src/controllers/authController";

dotenv.config();

init();
const app = express();
app.use(authRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins (change as needed)
});
chatSocket(io);

console.log("Server running on port 5000");