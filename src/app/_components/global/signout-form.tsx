'use client';

import { signOut } from '~/app/(auth)/_actions/auth';
import { Button } from '~/app/_components/ui/button';

export function SignOutForm() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="outline">
        Sair
      </Button>
    </form>
  );
}
