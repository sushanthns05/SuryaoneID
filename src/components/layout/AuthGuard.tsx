'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ShieldCheck } from 'lucide-react';

const publicRoutes = ['/', '/about', '/services', '/security', '/support', '/privacy', '/terms', '/contact', '/verify', '/sign-in', '/create-oneid'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f24]">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-blue-500/10 rounded-2xl animate-pulse mb-4 border border-blue-500/20">
            <ShieldCheck className="w-12 h-12 text-blue-400" />
          </div>
          <p className="text-slate-400 font-medium tracking-widest text-sm uppercase">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of protected content before redirect
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
