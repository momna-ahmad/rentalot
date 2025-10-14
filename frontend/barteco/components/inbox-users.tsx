'use client';

import { use } from 'react';
import { useChat } from '@/context/useChatContext';
import api from '@/hooks/axiosInstance';
import { useSession } from 'next-auth/react';
import { CustomSessionUser } from '@/auth.config';

// ✅ Define the custom hook (in the same file)
export function useHandleInboxChange() {
  const { setSelectedChat, selectedChat, setMessages } = useChat();
  const { data: session } = useSession(); // ✅ must be inside the hook
  const user = session?.user as CustomSessionUser;
  
  const handleInboxChange = (inbox: InboxUser) => async () => {
    console.log(inbox)
    setSelectedChat({
      id: inbox.otherUser.id,
      name: inbox.otherUser.name,
      inbox: inbox.id? inbox.id : undefined,
    });
    
    if(inbox.id){
      // fetch previous messages
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/${inbox.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      } 
    );

    setMessages(res.data);
    }
    
  };

  return handleInboxChange;
}

interface InboxUser{
  id: string;
  otherUser: {
    id: string;
    name: string;
  };
}

// ✅ Your main component
export default function InboxUsers({ inbox }: { inbox: Promise<InboxUser[]> }) {
  const inboxData = use(inbox);
  const { selectedChat } = useChat();
  const handleInboxChange = useHandleInboxChange(); // use custom hook

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      <div className="grid gap-4">
        {inboxData.map((chat) => {
          const isSelected = selectedChat?.inbox === chat.id;

          return (
            <div
              key={chat.id}
              onClick={handleInboxChange(chat)}
              className={`flex items-center justify-between p-4 rounded-lg transition-shadow duration-200 cursor-pointer
                ${
                  isSelected
                    ? 'bg-blue-50 shadow-lg border border-blue-200'
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
            >
              <div>
                <p className="text-lg font-medium">
                  {chat.otherUser?.name ?? 'Unknown User'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
