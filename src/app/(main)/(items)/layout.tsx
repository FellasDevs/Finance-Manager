import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function DashboardItemsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <Link href={'/dashboard'} className="flex items-center gap-1">
        <ArrowLeft />
        <p className="text-lg font-semibold underline">Voltar ao início</p>
      </Link>

      {children}
    </div>
  );
}
