'use client';

import { Laptop, Smartphone, Monitor, Globe, MoreVertical } from 'lucide-react';

const devices = [
  { id: 1, type: 'Laptop', name: 'MacBook Pro 16"', location: 'Mumbai, India', active: true, browser: 'Chrome 120.0', icon: Laptop },
  { id: 2, type: 'Smartphone', name: 'iPhone 15 Pro', location: 'Mumbai, India', active: false, browser: 'Safari Mobile', icon: Smartphone, lastActive: '2 hours ago' },
  { id: 3, type: 'Desktop', name: 'Windows Workstation', location: 'Delhi, India', active: false, browser: 'Edge 119.0', icon: Monitor, lastActive: '3 days ago' },
];

export function DeviceManagement() {
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Device Management</h3>
          <p className="text-sm text-slate-400">You are currently signed in on these devices.</p>
        </div>
        <button className="text-sm px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20">
          Sign out all
        </button>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <device.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                  {device.name}
                  {device.active && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                      Current Session
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {device.location}</span>
                  <span>•</span>
                  <span>{device.browser}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {!device.active && (
                <span className="text-xs text-slate-500">{device.lastActive}</span>
              )}
              {!device.active && (
                <button className="text-sm text-red-400 hover:text-red-300 font-medium">
                  Sign out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
