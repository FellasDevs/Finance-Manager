import React, { type ReactNode } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return <>{children}</>;
}
