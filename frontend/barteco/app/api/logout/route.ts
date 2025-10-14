// app/api/logout/route.ts
//logs user out in case jwt has expired 
import { signOut } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  await signOut({ redirect: false });
   const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/`);
}
