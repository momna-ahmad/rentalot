// /lib/getProfile.ts
import { redirect } from "next/navigation";
import { auth } from '@/auth';

export async function getProfile() {
    const session = await auth();
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user-profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session?.user as any).token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Profile fetch failed:", res.status);
      redirect("/sign-in");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    redirect("/sign-in");
  }
}
