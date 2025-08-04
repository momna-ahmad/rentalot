import Listings from "@/components/listings";
import Navbar from "../../components/navbar";

export default function Page() {
  return (
    <>
    <Navbar>
      
    </Navbar>
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      Welcome to RentaLot
    </div>
    <Listings/>
    </>
    
  );
}