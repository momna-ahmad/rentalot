"use client";

import { useEffect, useState, useRef, use } from "react";
import { io, Socket } from "socket.io-client";
import { useChat } from "@/context/useChatContext";

type ChatMessage = {
  sent: boolean;
  message: string;
};

export default function Chat({ current }: { current: string | undefined }) {
  const { selectedChat } = useChat();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        auth: { userId: current },
      });

      socketRef.current.on("connect", () => {
        console.log("Connected with socket id:", socketRef.current?.id);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedChat && socketRef.current) {
      socketRef.current.on("receive_private_message", ({ message }) => {
        setChat((prev) => [...prev, { sent: false , message }]);
      });

      return () => {
        socketRef.current?.off("receive_private_message");
      };
    }
  }, [selectedChat]);

  const sendMessage = async(e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    socketRef.current?.emit("send_private_message", {
      message,
      to: selectedChat?.id,
    });

    //save message to backend
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
      method: "POST",
      body: JSON.stringify({
        message,
        sender : current,
        user1: current,
        user2: selectedChat?.id,
        chat : selectedChat?.inbox
      })
    });

    setChat((prev) => [...prev, { sent: true , message }]);
    setMessage("");
  };

  // ✅ Skeleton when no chat selected
  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 rounded-xl shadow-md">
        <div className="animate-pulse w-full max-w-md space-y-4 px-6">
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <p className="mt-6 text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 flex flex-col h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedChat?.name}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-gray-50">
  {chat.map((msg, idx) => (
    <div
      key={idx}
      className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm ${
          msg.sent
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{msg.message}</p>
      </div>
    </div>
  ))}
</div>


      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 p-3 bg-white shadow-inner"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition shadow-md"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
