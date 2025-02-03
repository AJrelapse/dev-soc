"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Input, Badge } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getChatsData } from "./fetch";
import { Paperclip, Smile } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function Chat() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getChatsData();
      setChats(data);
    };
    fetchChats();
  }, []);

  const handleChatClick = async (chat: any) => {
    // Add the last message as the first message in the selected chat
    const updatedChat = {
      ...chat,
      messages: chat.lastMessage ? [chat.lastMessage] : [], // Add the last message to the chat's messages array
    };
    
    setSelectedChat(updatedChat); // Set the selected chat with the last message
  };
  

  const handleSendMessage = async () => {
    if (messageInput && selectedChat) {
      const newMessage = {
        content: messageInput,
        timestamp: new Date().toISOString(),
        type: "text",
        sender: "user", // Mark the message as sent by the user
      };
  
      // Add the sent message to the selectedChat messages
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat.messages || []), newMessage], // Append new message
      }));
  
      // Simulate a receiver's message (you can replace this with actual logic to fetch received messages)
      const receivedMessage = {
        content: "This is a reply from the receiver",
        timestamp: new Date().toISOString(),
        type: "text",
        sender: "receiver", // Message sent by the receiver
      };
  
      // Simulate adding the receiver's message after a delay (or based on actual logic)
      setTimeout(() => {
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [
            ...(prevChat.messages || []),
            receivedMessage, // Add receiver's message
          ],
        }));
      }, 1000); // Simulate delay for the receiver's message (adjust as needed)
  
      setMessageInput(""); // Clear the input field after sending
    }
  };
  

  // Fallback avatar in case no avatar is available
  const getAvatarImage = (avatarUrl: string | null) => {
    return avatarUrl || "/default-avatar.png"; // Replace with your default avatar image path
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Breadcrumb pageName="Chats" />

      <div className="flex h-screen">
 {/* Sidebar - Active Chats */}
        <div className="w-1.25/4 bg-white p-4 border-r overflow-y-auto shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Active Chats</h2>
          <Input isClearable placeholder="Search..." className="mb-4 border-blue-300" />
          <div>
            {chats.map((chat) => (
              <div
                key={chat.name}
                onClick={() => handleChatClick(chat)}
                className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200 ${selectedChat?.name === chat.name ? "bg-blue-200" : ""}`}
              >
                <Image
                  src={getAvatarImage(chat.profile)}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                  alt={"Avatar for " + chat.name}
                />
                <div className="ml-3 flex-grow">
                  <h3 className="font-medium text-gray-800">{chat.name}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage?.content || "No messages yet"}</p>
                </div>
                {chat.unreadCount > 0 && <Badge color="primary">{chat.unreadCount}</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-3/4 flex flex-col bg-white shadow-lg">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b bg-blue-500 text-white">
                <Image
                  src={getAvatarImage(selectedChat.profile)}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                  alt={"Avatar for " + selectedChat.name}
                />
                <h2 className="ml-3 font-bold text-lg">{selectedChat.name}</h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
  {selectedChat.messages ? (
    selectedChat.messages.map((message, index) => (
      <div
        key={index}
        className={`flex my-2 ${
          message.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`p-3 rounded-xl max-w-md ${
            message.sender === "user"
              ? "bg-blue-500 text-white"
              : "bg-blue-100"
          }`}
        >
          <p>{message.content}</p>
          <span className="block text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
          </div>

              {/* Message Input */}
              <div className="flex items-center p-4 border-t bg-white">
                <Button isIconOnly><Paperclip size={20} /></Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type something here..."
                  className="flex-grow mx-2 border-blue-300"
                />
                <Button isIconOnly><Smile size={20} /></Button>
                <Button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200">Send</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Select a chat to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}