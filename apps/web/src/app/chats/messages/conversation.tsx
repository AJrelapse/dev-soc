export interface MessageType {
    id: string;
    content: string;
    isSender: boolean;
  }
  
  export interface ConversationType {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: MessageType;
    messages: MessageType[];
  }
  