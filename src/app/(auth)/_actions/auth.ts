'use server';

import { headers } from 'next/headers';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { type SignupInput } from '~/app/(auth)/signup/page';
import { type LoginInput } from '~/app/(auth)/login/page';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

const supabase = createSupabaseServerClient();

export const signUp = async (data: SignupInput) => {
  const { data: createdUser, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo: headers().get('origin') + '/auth/callback' },
  });

  if (error?.code) {
    console.error(error);
    return error.message;
  }

  if (!createdUser.user?.id || !createdUser.user.email) {
    console.error('Failed to create user');
    return 'Ocorreu um erro ao criar seu perfil, por favor contate um administrador';
  }

  await api.users.create({
    id: createdUser.user.id,
    email: data.email,
    name: data.name,
  });

  redirect('/dashboard');

  return undefined;
};

export const logIn = async (data: LoginInput) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error(error);
    return error.message;
  }

  redirect('/dashboard');

  return undefined;
};

export const signOut = async () => {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
