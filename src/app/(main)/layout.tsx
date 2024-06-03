import React, { type FC, type ReactNode, Suspense } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { redirect } from 'next/navigation';
import { AuthButton } from '~/app/(main)/_components/auth-button';

const MainLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <>
      <nav className="flex h-[4em] items-center justify-between border-b px-5">
        <span className="text-2xl font-bold">Finance Manager</span>

        <Suspense>
          <AuthButton />
        </Suspense>
      </nav>

      {children}
    </>
  );
};

export default MainLayout;
