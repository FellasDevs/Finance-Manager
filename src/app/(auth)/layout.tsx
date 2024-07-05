import React, { type ReactNode } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/dashboard');

  return <>{children}</>;
}

export const metadata = {
  title: 'Finance Manager - Login',
  description: 'Entre ou crie sua conta',
};
