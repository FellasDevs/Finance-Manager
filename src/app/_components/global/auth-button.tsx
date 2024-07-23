import { createSupabaseServerClient } from '~/utils/supabase/server';
import { api } from '~/trpc/server';
import { SignOutForm } from '~/app/_components/global/signout-form';
import { UserPicture } from '~/app/_components/global/user-picture';
import { Suspense } from 'react';

export async function AuthButton() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await api.users.getProfile();

  if (!profile) console.error('Profile not found');

  return (
    <div className="flex items-center gap-4 text-lg font-semibold">
      <p>Olá {profile?.name || 'novo usuário'}</p>

      {profile?.picture && (
        <Suspense>
          <UserPicture picture={profile.picture} alt={profile.name} />
        </Suspense>
      )}

      <SignOutForm />
    </div>
  );
}
