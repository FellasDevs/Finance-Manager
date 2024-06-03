import { createSupabaseServerClient } from '~/utils/supabase/server';
import { NextResponse } from 'next/server';
import { api } from '~/trpc/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    try {
      const profile = await api.users.getProfile();

      if (!profile) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        await api.users.create({
          id: user.id,
          email: user.email || '',
          name: String(user.user_metadata.name) || '',
          picture: String(user.user_metadata.picture) || '',
          password: 'senha falsa',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  // URL to redirect to after sign in process completes
  // return NextResponse.redirect(requestUrl.origin);
  return NextResponse.redirect(requestUrl.origin + '/accounts');
}
