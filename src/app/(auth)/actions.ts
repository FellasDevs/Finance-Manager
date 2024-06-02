'use server';

import { cookies, headers } from 'next/headers';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { type SignupInput } from '~/app/(auth)/signup/page';
import { type LoginInput } from '~/app/(auth)/login/page';
import { api } from '~/trpc/server';

const supabase = createSupabaseServerClient(cookies());
const origin = headers().get('origin');

export const signUp = async (data: SignupInput) => {
  'use server';

  const { data: createdUser, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) return { error: error.message };

  if (!createdUser.user?.id || !createdUser.user.email)
    return { error: 'Algo deu errado' };

  await api.users.create({
    id: createdUser.user.id,
    email: data.email,
    name: data.name,
    password: 'exemplo',
  });
};

export const logIn = async (data: LoginInput) => {
  'use server';

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    return {
      error: error.message,
    };
  }
};
