import '~/app/_styles/globals.css';

import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '~/trpc/react';
import { type ReactNode } from 'react';
import { Navbar } from '~/app/_components/global/navbar';
import { ThemeProvider } from '~/app/_components/global/theme-provider';

export const metadata = {
  title: 'Finance Manager',
  description: 'O seu gerenciador de finanças',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
