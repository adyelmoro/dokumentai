import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Exclude: Next.js internals, static assets, AND /auth/callback.
    // /auth/callback must not go through the session middleware — getUser() runs
    // before the route handler and can overwrite the PKCE code-verifier cookie,
    // causing exchangeCodeForSession to fail. The route handles auth itself.
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
