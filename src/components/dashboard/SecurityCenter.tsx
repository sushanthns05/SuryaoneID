'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Smartphone, Key, MonitorSmartphone, AlertOctagon } from 'lucide-react';

export function SecurityCenter() {
  return (
    <div className="glass-card p-6 md:p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-green-400" />
          Security Center
        </h3>
        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
          Excellent
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Password Strength</p>
              <p className="text-xs text-slate-400">Last changed 4 months ago</p>
            </div>
          </div>
          <span className="text-xs font-medium text-green-400">Strong</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Two-Factor Auth</p>
              <p className="text-xs text-slate-400">Authenticator App</p>
            </div>
          </div>
          <span className="text-xs font-medium text-green-400">Enabled</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Passkeys</p>
              <p className="text-xs text-slate-400">Biometric Login</p>
            </div>
          </div>
          <span className="text-xs font-medium text-green-400">2 Enrolled</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <MonitorSmartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Trusted Devices</p>
              <p className="text-xs text-slate-400">Manage signed-in devices</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-300">2 Active</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 flex gap-4 items-start">
        <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-200">No Fraud Alerts</p>
          <p className="text-xs text-red-200/70 mt-1">Your account shows no suspicious activity in the last 30 days.</p>
        </div>
      </div>
    </div>
  );
}
