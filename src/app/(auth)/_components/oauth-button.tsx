'use client';

import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import React, { type FC } from 'react';
import { type Provider } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '~/utils/supabase/client';
import { Button } from '~/app/_components/ui/button';

export const OauthButton: FC<{ provider: Provider }> = ({ provider }) => {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: location.origin + '/auth/callback' },
    });

    if (error)
      return redirect(
        '/login?error-message=Não foi possível entrar em sua conta',
      );
  };

  return (
    <Button
      variant="outline"
      className="w-full font-normal text-muted-foreground"
      onClick={() => handleLogin().catch(console.error)}
    >
      <div className="flex items-center gap-2">
        <FcGoogle className="h-5 w-5" />
        <p>Entrar com o Google</p>
      </div>
    </Button>
  );
};
