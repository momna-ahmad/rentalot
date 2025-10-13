import ProfileForm from "@/components/profile-form";

export default async function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* Profile Form */}
        <section className="md:w-1/3 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
          <ProfileForm />
        </section>
      </div>
    </div>
  );
}
