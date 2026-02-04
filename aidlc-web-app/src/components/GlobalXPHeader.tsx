'use client';

import { usePathname } from 'next/navigation';
import MiniXPIndicator from './MiniXPIndicator';

export default function GlobalXPHeader() {
  const pathname = usePathname();
  
  // Don't show on home page (it has the full XPBar)
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-40 lg:right-8">
      <MiniXPIndicator variant="header" showProgress={true} />
    </div>
  );
}
