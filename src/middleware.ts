import { type NextRequest } from 'next/server';
import { createSupabaseServerClientMiddleware } from '~/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createSupabaseServerClientMiddleware(request);

  await supabase.auth.getSession();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
