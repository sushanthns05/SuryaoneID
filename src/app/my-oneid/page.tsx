'use client';

import { motion } from 'framer-motion';
import { HeroProfileSection } from '@/components/dashboard/HeroProfileSection';
import { DigitalWallet } from '@/components/dashboard/DigitalWallet';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { CredentialSummary } from '@/components/dashboard/CredentialSummary';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { SecurityCenter } from '@/components/dashboard/SecurityCenter';
import { ConnectedServices } from '@/components/dashboard/ConnectedServices';
import { StorageDashboard } from '@/components/dashboard/StorageDashboard';
import { DeviceManagement } from '@/components/dashboard/DeviceManagement';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">My OneID</h1>
          <p className="text-slate-400">Manage your digital credentials and security preferences.</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="space-y-10 relative z-10">
        
        {/* Section 1: Hero & Profile */}
        <section>
          <HeroProfileSection />
        </section>

        {/* Section 2: Credential Summary */}
        <section>
          <CredentialSummary />
        </section>

        {/* Section 3: Digital Wallet & Quick Actions */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 h-full">
            <DigitalWallet />
          </div>
          <div className="xl:col-span-2 h-full flex flex-col justify-end">
            <QuickActions />
          </div>
        </section>

        {/* Section 4: Security, Activity & Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <ActivityTimeline />
          </div>
          <div className="xl:col-span-1">
            <SecurityCenter />
          </div>
          <div className="xl:col-span-1">
            <DashboardCharts />
          </div>
        </section>

        {/* Section 5: Services & Storage */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ConnectedServices />
          <StorageDashboard />
        </section>

        {/* Section 6: Devices & Settings */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DeviceManagement />
          <AccountSettings />
        </section>

      </div>
    </div>
  );
}
