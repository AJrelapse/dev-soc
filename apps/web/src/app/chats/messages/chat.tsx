export type MessageType = {
    id: string;
    content: string;
    isSender: boolean;
  };
  
  export type ConversationType = {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: MessageType;
    messages?: MessageType[];
  };
  
  // Mock conversations
  let conversations: ConversationType[] = [
    {
      id: "1",
      name: "John Doe",
      avatar: "https://via.placeholder.com/40",
      lastMessage: { id: "101", content: "Hey there!", isSender: false },
      messages: [
        { id: "101", content: "Hey there!", isSender: false },
        { id: "102", content: "Hello! How are you?", isSender: true },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/40",
      lastMessage: { id: "201", content: "Let's catch up soon!", isSender: false },
      messages: [
        { id: "201", content: "Let's catch up soon!", isSender: false },
        { id: "202", content: "Sure! When are you free?", isSender: true },
      ],
    },
  ];
  
  export const getConversations = async (): Promise<ConversationType[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(conversations), 500));
  };
  
  export const sendMessage = async (conversationId: string, message: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId);
    if (conversation) {
      const newMessage: MessageType = {
        id: Date.now().toString(),
        content: message,
        isSender: true,
      };
      conversation.messages?.push(newMessage);
      conversation.lastMessage = newMessage;
    }
  };
  
  export const markConversationAsRead = async (conversationId: string) => {
    console.log(`Conversation ${conversationId} marked as read.`);
  };
  