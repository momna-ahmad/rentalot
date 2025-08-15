import Chat from "@/components/chat";
import { auth } from "@/auth";
interface PageProps {
  params: { id: string };
}
export default async function ChatWithUser({ params }: PageProps){
    const {id} = params ;
    const session = await auth() ;
    const currentUser = session?.user?.id as string ;
    return (
        <>
        <Chat currentUser={currentUser} targetUser={id}/>
        </>
    );
}