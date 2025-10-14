"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({
  userId,
  children,
}: {
  userId: string | null;
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL!, {
      auth: { userId },
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
