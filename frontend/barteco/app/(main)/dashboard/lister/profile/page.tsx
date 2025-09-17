import ProfileForm from "@/components/profile-form";
import MyBookings from "@/components/my-bookings";
import { auth } from "@/auth";

export default async function Profile() {
  // fetch user bookings 
  const session = await auth();
  console.log("session", session);

  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`, {
    headers: {
      Authorization: `Bearer ${(session?.user as any).token}`,
    },
  }).then((res) => res.json());

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Profile Form */}
        <section className="md:w-1/3 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          <ProfileForm />
        </section>

        {/* Bookings */}
        <section className="md:w-2/3 bg-white rounded-lg shadow p-6">
          <MyBookings bookingsPromise={res} />
        </section>
      </div>
    </div>
  );
}
