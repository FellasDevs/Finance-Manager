import React, { type FC, type ReactNode } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthButton } from '~/app/_components/auth/logout-button';

const MainLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <>
      <nav className="flex h-[4em] items-center justify-between border-b p-3">
        <span className="text-2xl font-bold">Finance Manager</span>
        <AuthButton />
      </nav>

      {children}
    </>
  );
};

export default MainLayout;
