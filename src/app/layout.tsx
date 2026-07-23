import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context';
import { AuthGuard } from '@/components/layout/AuthGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Surya OneID | Secure Digital Identity Platform',
  description: 'Private organizational identity and document management system for the Surya ecosystem.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col aurora-bg`}>
        <AuthProvider>
          <AuthGuard>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
