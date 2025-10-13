
import Bookings from "@/components/bookings";
import { auth } from "@/auth";
import api from "@/hooks/axiosInstance";
import { CustomSessionUser } from "@/auth.config";

export default async function Profile() {
  // fetch user bookings 
   const session = await auth();
   const user = session?.user as CustomSessionUser; 

  const response = await api.get('/my-bookings' , {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Bookings */}
        <section className="md:w-2/3 bg-white rounded-lg shadow p-6">
          <Bookings text={"My Bookings"} bookings={response.data} />
        </section>
      </div>
    </div>
  );
}
