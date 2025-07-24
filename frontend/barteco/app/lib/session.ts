
//not enncrypting session data for now
import 'server-only'
import { cookies } from 'next/headers'
 
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = JSON.stringify({
    userId,
    expiresAt: expiresAt.toISOString(),
  });
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}