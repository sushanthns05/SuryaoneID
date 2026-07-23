'use client';

import { Settings, Bell, Lock, Eye, Languages, UserMinus } from 'lucide-react';

export function AccountSettings() {
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-slate-400" />
            Account Settings
          </h3>
          <p className="text-sm text-slate-400 mt-1">Manage your preferences and privacy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-4 cursor-pointer group">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Notifications</h4>
              <p className="text-xs text-slate-400 mt-1">Email, SMS, and Push alerts.</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-4 cursor-pointer group">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Appearance</h4>
              <p className="text-xs text-slate-400 mt-1">Dark mode, light mode, system.</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-4 cursor-pointer group">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Language & Region</h4>
              <p className="text-xs text-slate-400 mt-1">English (US), IST Timezone.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-4 cursor-pointer group">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Privacy Controls</h4>
              <p className="text-xs text-slate-400 mt-1">Manage data sharing and visibility.</p>
            </div>
          </div>

          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-colors flex items-start gap-4 cursor-pointer group mt-auto h-[90px]">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 group-hover:bg-red-500/20">
              <UserMinus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-red-400">Account Deletion</h4>
              <p className="text-xs text-red-300/70 mt-1">Request permanent deletion of your OneID.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
