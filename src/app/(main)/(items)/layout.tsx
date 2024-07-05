import React, { type ReactNode } from 'react';
import Link from 'next/link';

export default async function DashboardItemsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Link href={'/dashboard'}>
        <p>Voltar ao início</p>
      </Link>

      {children}
    </div>
  );
}
