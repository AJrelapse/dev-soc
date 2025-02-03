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
    const updatedChat = {
      ...chat,
      messages: chat.lastMessage ? [chat.lastMessage] : [],
    };

    setSelectedChat(updatedChat);
  };

  const handleSendMessage = async () => {
    if (messageInput && selectedChat) {
      const newMessage = {
        content: messageInput,
        timestamp: new Date().toISOString(),
        type: "text",
        sender: "user",
      };

      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat.messages || []), newMessage],
      }));

      const receivedMessage = {
        content: "This is a reply from the receiver",
        timestamp: new Date().toISOString(),
        type: "text",
        sender: "receiver",
      };

      setTimeout(() => {
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [...(prevChat.messages || []), receivedMessage],
        }));
      }, 1000);

      setMessageInput("");
    }
  };

  const getAvatarImage = (avatarUrl: string | null) => {
    return avatarUrl || "/default-avatar.png";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <Breadcrumb pageName="Chats" />

      <div className="flex h-screen p-4">
        <div className="w-1.25/4 overflow-y-auto rounded-lg border-r bg-white p-4 shadow-md dark:border-stroke-dark dark:bg-dark-2">
          <h2 className="mb-4 text-lg font-semibold text-primary dark:text-primary-light">
            Active Chats
          </h2>
          <Input
            isClearable
            placeholder="Search..."
            className="mb-4 border-blue-300 dark:border-gray-5"
          />
          <div>
            {chats.map((chat) => (
              <div
                key={chat.name}
                onClick={() => handleChatClick(chat)}
                className={`flex cursor-pointer items-center rounded-lg p-3 shadow-sm transition duration-300 hover:bg-blue-100 dark:hover:bg-blue-900 ${selectedChat?.name === chat.name ? "bg-blue-200 dark:bg-blue-800" : ""}`}
              >
                <Image
                  src={getAvatarImage(chat.profile)}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  alt={"Avatar for " + chat.name}
                />
                <div className="ml-3 min-w-0 flex-grow">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {chat.name}
                  </h3>
                  <p className="overflow-hidden truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {chat.lastMessage?.content || "No messages yet"}
                  </p>
                </div>

                {chat.unreadCount > 0 && (
                  <Badge color="primary">{chat.unreadCount}</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-3/4 flex-col rounded-lg bg-white shadow-md dark:bg-dark">
          {selectedChat ? (
            <>
              <div className="flex items-center rounded-t-lg border-b bg-blue-500 p-4 text-white dark:bg-blue-800">
                <Image
                  src={getAvatarImage(selectedChat.profile)}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  alt={"Avatar for " + selectedChat.name}
                />
                <h2 className="ml-3 text-lg font-bold">{selectedChat.name}</h2>
              </div>

              <div className="flex-1 overflow-y-auto rounded-b-lg bg-gray-100 p-4 dark:bg-dark-3">
                {selectedChat.messages ? (
                  selectedChat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`my-2 flex overflow-hidden ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md rounded-lg p-3 shadow-sm ${message.sender === "user" ? "bg-blue-500 text-white dark:bg-blue-700" : "bg-gray-200 dark:bg-gray-700"}`}
                      >
                        <p>{message.content}</p>
                        <span className="mt-1 block overflow-hidden text-xs text-gray-500 dark:text-gray-400">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No messages yet.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-b-lg border-t bg-white px-4 py-3 dark:bg-dark-2">
                <Button isIconOnly className="flex-shrink-0">
                  <Paperclip size={20} />
                </Button>

                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type something here..."
                  className="flex-grow rounded-lg border border-blue-300 px-3 py-2 dark:border-gray-600"
                />

                <Button isIconOnly className="flex-shrink-0">
                  <Smile size={20} />
                </Button>

                <Button
                  onClick={handleSendMessage}
                  className="flex-shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
              Select a chat to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
