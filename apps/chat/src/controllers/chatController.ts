import { DefaultEventsMap, Server, Socket } from "socket.io";
import { prisma } from "../../../../db/dbController";
import { Request, Response } from "express";

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

// Function to create a new chat group
export async function createChatGroup(req: Request, res: Response) {
  const { name, createdBy } = req.body;
  try {
    const chatGroup = await prisma.chatGroup.create({
      data: {
        name,
        createdBy,
        isAdmin: true, // or true, depending on your requirements
        createdByUser:createdBy},
      },
    );
    res.status(201).json(chatGroup);
  } catch (error) {
    console.error("Error creating chat group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a chat group
export async function updateChatGroup(req: Request, res: Response) {
  const { groupId } = req.params;
  const { name } = req.body;
  try {
    const chatGroup = await prisma.chatGroup.update({
      where: { id: groupId },
      data: { name },
    });
    res.status(200).json(chatGroup);
  } catch (error) {
    console.error("Error updating chat group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a chat group
export async function deleteChatGroup(req: Request, res: Response) {
  const { groupId } = req.params;
  try {
    await prisma.chatGroup.delete({
      where: { id: groupId },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting chat group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to add a member to a chat group
export async function addMemberToGroup(req: Request, res: Response) {
  const { groupId, userId } = req.body;
  try {
    const member = await prisma.chatGroupMember.create({
      data: {
        groupId,
        userId,
      },
    });
    res.status(201).json(member);
  } catch (error) {
    console.error("Error adding member to group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to remove a member from a chat group
export async function removeMemberFromGroup(req: Request, res: Response) {
  const { groupId, userId } = req.body;
  try {
    await prisma.chatGroupMember.deleteMany({
      where: {
        groupId,
        userId,
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error removing member from group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to make a user an admin of a chat group
// export async function makeAdmin(req: Request, res: Response) {
//   const { groupId, userId } = req.body;
//   try {
//     const admin = await prisma.chatGroupMember.update({
//       where: { id: groupId },
//       data: {
//         members: {
//           update: {
//             where: { userId_groupId: { userId, groupId } },
//             data: { isAdmin: true },
//           },
//         },
//       },
//     });
//     res.status(200).json(admin);
//   } catch (error) {
//     console.error("Error making user admin:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// // Function to remove admin rights from a user in a chat group
// export async function removeAdmin(req: Request, res: Response) {
//   const { groupId, userId } = req.body;
//   try {
//     const admin = await prisma.chatGroup.update({
//       where: { id: groupId },
//       data: {
//         members: {
//           update: {
//             where: { userId },
//             data: { isAdmin: false },
//           },
//         },
//       },
//     });
//     res.status(200).json(admin);
//   } catch (error) {
//     console.error("Error removing admin rights:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }