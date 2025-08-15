"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type ChatMessage = {
  sender: string;
  message: string;
};

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function Chat({
  currentUser,
  targetUser,
  inbox,
}: {
  currentUser: string;
  targetUser: string;
  inbox?: string;
}) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState(inbox);

  const roomId = [currentUser, targetUser].sort().join('_');

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('receive_private_message', ({ message, sender }) => {
      setChat((prev) => [...prev, { sender, message }]);
    });

    return () => {
      socket.off('receive_private_message');
    };
  }, [roomId]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.trim() === '') return;

    socket.emit('send_private_message', {
      roomId,
      message,
      sender: currentUser,
    });

    setChat((prev) => [...prev, { sender: currentUser, message }]);
    setMessage('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        user: currentUser,
        user2: targetUser,
        chat: chatId,
      }),
    });

    const data = await res.json();
    setChatId(data.chat);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow-lg flex flex-col h-[80vh]">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Chat between <span className="text-blue-600">{currentUser}</span> and <span className="text-green-600">{targetUser}</span>
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 px-2 py-4 border rounded mb-4 bg-gray-50">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
              msg.sender === currentUser
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-200 text-gray-800'
            }`}
          >
            <p>{msg.message}</p>
            <span className="text-xs opacity-70 block mt-1">
              {msg.sender === currentUser ? 'You' : msg.sender}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
