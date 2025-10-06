"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface Chat {
  id: string; // target user id
  name: string;
  inbox?: string; // inbox id for when user is chatting for the first time
}

export type ChatMessage = {
  sent: boolean;
  content: string;
};

interface ChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Add a message
  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Clear when switching chats
  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider
      value={{ selectedChat, setSelectedChat, messages, addMessage, setMessages, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook for easy access
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
}
