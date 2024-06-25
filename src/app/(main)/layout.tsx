import React, { type FC, type ReactNode } from 'react';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { redirect } from 'next/navigation';

const MainLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return <>{children}</>;
};

export default MainLayout;
