'use server';

import { headers } from 'next/headers';
import { createSupabaseServerClient } from '~/utils/supabase/server';
import { type SignupInput } from '~/app/(auth)/signup/page';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

export async function signUp(data: SignupInput) {
  const supabase = createSupabaseServerClient();

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

  redirect('/');
}

export async function redirectFromClient(url: string) {
  redirect(url);
}
