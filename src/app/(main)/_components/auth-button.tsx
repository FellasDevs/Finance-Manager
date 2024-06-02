import Link from 'next/link';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/server';
import { SignOutForm } from '~/app/(main)/_components/signout-form';

export async function AuthButton() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/login" passHref>
        <Button variant="outline">Entrar</Button>
      </Link>
    );
  }

  const profile = await api.users.getProfile();

  return (
    <div className="flex items-center gap-4">
      Olá, {profile.name}!
      <SignOutForm />
    </div>
  );
}
