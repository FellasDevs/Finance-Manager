import { Suspense } from 'react';
import { AuthButton } from '~/app/(main)/_components/auth-button';
import { ModeToggle } from '~/app/_components/global/dark-mode-btn';

export async function Navbar() {
  return (
    <nav className="flex h-[4em] items-center justify-between border-b px-5">
      <span className="text-2xl font-bold">Finance Manager</span>

      <div className="ml-auto flex gap-2">
        <Suspense>
          <AuthButton />
        </Suspense>

        <ModeToggle />
      </div>
    </nav>
  );
}
