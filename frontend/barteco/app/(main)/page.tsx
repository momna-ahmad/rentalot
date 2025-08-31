
import Categories from "@/components/categories";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log("Token stored in cookies frontend", token);
  return (
    <>
    
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      Welcome to RentaLot
    </div>
    <Categories/>
    </>
    
  );
}