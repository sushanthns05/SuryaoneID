'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { QuickServices } from '@/components/home/QuickServices';
import { DashboardPreview } from '@/components/home/DashboardPreview';
import { WalletShowcase } from '@/components/home/WalletShowcase';
import { VerificationDemo } from '@/components/home/VerificationDemo';
import { SecuritySection } from '@/components/home/SecuritySection';
import { TimelineFAQ } from '@/components/home/TimelineFAQ';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <HeroSection />
      <QuickServices />
      <DashboardPreview />
      <WalletShowcase />
      <VerificationDemo />
      <SecuritySection />
      <TimelineFAQ />
    </div>
  );
}
