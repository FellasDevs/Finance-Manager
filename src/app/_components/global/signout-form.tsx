'use client';

import { Button } from '~/app/_components/ui/button';
import { createSupabaseBrowserClient } from '~/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutForm() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <form onSubmit={signOut}>
      <Button type="submit" variant="outline">
        Sair
      </Button>
    </form>
  );
}
