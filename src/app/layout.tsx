import '~/app/_styles/globals.css';

import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '~/trpc/react';
import { type ReactNode } from 'react';

export const metadata = {
  title: 'Finance Manager',
  description: 'O seu gerenciador de finanças',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
