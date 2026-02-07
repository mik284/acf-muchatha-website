"use client";

import { usePathname } from 'next/navigation';

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <div className={isHomePage ? '' : 'pt-20'}>
      {children}
    </div>
  );
}
