import { auth } from "@/auth";
import InboxUsers from "@/components/inbox-users";
import Chat from "@/components/chat";
import ChatProvider from "@/context/useChatContext";
import Providers from "@/lib/providers";

export default async function Inbox() {
  const session = await auth();
  console.log("session", session);

  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/inbox`, {
    headers: {
      Authorization: `Bearer ${(session?.user as any).token}`,
    },
  }).then((res) => res.json());

  //fetch previous messages
  

  return (
    <Providers session={session}>
    <ChatProvider>
      <div className="flex h-[85vh] max-w-6xl mx-auto mt-10 bg-white rounded shadow-lg overflow-hidden">
        {/* Left: Inbox users */}
        <div className="w-1/3 border-r overflow-y-auto">
          <InboxUsers inbox={res} />
        </div>

        {/* Right: Chat */}
        <div className="flex-1">
          <Chat current={session?.user?.id} />
        </div>
      </div>
    </ChatProvider>
    </Providers>
  );
}
