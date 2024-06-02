import React, { type FC, type ReactNode } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Finance Manager - Entrar',
  description: 'Entre em sua conta',
};

const AuthLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/accounts');

  return <>{children}</>;
};

export default AuthLayout;
