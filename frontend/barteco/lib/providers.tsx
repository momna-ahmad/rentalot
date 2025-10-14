"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SocketProvider } from "@/context/useSocketContext";
import ChatProvider from "@/context/useChatContext";
import { Session } from "next-auth";

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session:  Session | null;
}) {

  //refetch props prevent session from reloaing or refetching auth data
  return(
     <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
      <SocketProvider userId={session?.user?.id || null}>
        <ChatProvider>
          {children}
        </ChatProvider>
      </SocketProvider>
    </SessionProvider>
  )
}
