'use client';

import Link from 'next/link';
import { Button } from '~/app/_components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/app/_components/ui/form';

import { Input } from '~/app/_components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { logIn } from '~/app/(auth)/actions';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginInput) => {
    const result = await logIn(data);

    if (result?.error) setError(result.error);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-5">
      <div className="flex w-[35em] flex-col gap-6 rounded-lg px-10 py-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Entre em sua conta</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 flex-col justify-center gap-2 text-muted-foreground animate-in"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    E-mail
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Insira seu endereço de e-mail"
                      {...field}
                      autoComplete="on"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Senha</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Insira sua senha"
                      type="password"
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" className="my-3 w-full" type="submit">
              Entrar
            </Button>

            {error && (
              <div className="text-center text-sm font-medium">
                <div className="rounded-md border border-destructive bg-red-100 p-3">
                  <p className="text-destructive">{error}</p>
                </div>
              </div>
            )}
          </form>
        </Form>

        <div className="flex items-center gap-2">
          <hr className="w-full" />
          <p className="text-xs text-muted-foreground">OU</p>
          <hr className="w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="flex w-full items-center gap-2 font-normal text-muted-foreground"
          >
            <FcGoogle className="h-5 w-5" />
            <p>Entre com o Google</p>
          </Button>

          <Link href="/signup">
            <p className="text-center text-sm text-muted-foreground underline">
              Ainda não possúi uma conta? Clique aqui para criar
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
