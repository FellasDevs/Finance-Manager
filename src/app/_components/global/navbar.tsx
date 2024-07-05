import { Suspense } from 'react';
import { AuthButton } from '~/app/_components/global/auth-button';
import { ModeToggle } from '~/app/_components/global/dark-mode-btn';

export async function Navbar() {
  return (
    <nav className="flex h-[4em] items-center justify-between border-b px-5">
      <p className="text-2xl font-bold">Finance Manager</p>

      <div className="ml-auto flex gap-2">
        <Suspense>
          <AuthButton />
        </Suspense>

        <ModeToggle />
      </div>
    </nav>
  );
}
