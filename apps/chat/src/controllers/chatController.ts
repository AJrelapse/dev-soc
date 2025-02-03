
import { DefaultEventsMap, Server, Socket } from "socket.io";
import { prisma } from "../../../../db/dbController";

// Client connects

export default (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_private", ({ sender, receiver }) => {
      const room = [sender, receiver].sort().join("_");
      socket.join(room);
    });

    socket.on("join_group", (chatGroupId) => {
      socket.join(chatGroupId);
    });

    socket.on("send_message", async (data) => {
      const { sender, receiver, chatGroupId, message, chatType } = data;

      try {
        const chat = await prisma.chats.create({
          data: { sender, receiver, chatGroupId, message, chatType },
        });

        if (chatType === "PRIVATE") {
          const room = [sender, receiver].sort().join("_");
          io.to(room).emit("receive_message", chat);
        } else if (chatType === "GROUP") {
          io.to(chatGroupId).emit("receive_message", chat);
        }
      } catch (error) {
        console.error("Message error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};