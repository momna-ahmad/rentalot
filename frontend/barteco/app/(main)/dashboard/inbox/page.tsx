import { auth } from "@/auth";
import InboxUsers from "@/components/inbox-users";
import Chat from "@/components/chat";
import { CustomSessionUser } from "@/auth.config";

export default async function Inbox() {
  const session = await auth();
  const user = session?.user as CustomSessionUser;

  const inboxPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/inbox`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  }).then((res) => res.json());

  //fetch previous messages
  

  return (
    
      <div className="flex h-[85vh] max-w-6xl mx-auto mt-10 bg-white rounded shadow-lg overflow-hidden">
        {/* Left: Inbox users */}
        <div className="w-1/3 border-r overflow-y-auto">
          <InboxUsers inbox={inboxPromise} />
        </div>

        {/* Right: Chat */}
        <div className="flex-1">
          <Chat current={session?.user?.id} />
        </div>
      </div>
    
  );
}
