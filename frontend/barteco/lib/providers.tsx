"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {

  //refetch props prevent session from reloaing or refetching auth data
  return <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>{children}</SessionProvider>;
}
