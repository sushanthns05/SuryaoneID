'use client';

import { motion } from 'framer-motion';
import { LogIn, FileCheck2, Share2, ShieldAlert, KeyRound } from 'lucide-react';

const activities = [
  { id: 1, title: 'New Login', desc: 'MacBook Pro • Chrome • Mumbai, IN', time: 'Today, 09:41 AM', icon: LogIn, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 2, title: 'Credential Verified', desc: 'Surya HQ Entrance A', time: 'Yesterday, 08:30 AM', icon: FileCheck2, color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 3, title: 'Password Changed', desc: 'Successfully updated password', time: 'Oct 14, 2026', icon: KeyRound, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 4, title: 'Document Shared', desc: 'Shared NDA with Legal Dept', time: 'Oct 12, 2026', icon: Share2, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 5, title: 'Failed Login Attempt', desc: 'Unknown Device • Delhi, IN', time: 'Oct 10, 2026', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/20' },
];

export function ActivityTimeline() {
  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>

      <div className="relative flex-1">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10"></div>
        
        <div className="space-y-6 relative">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-4 relative z-10"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-[#0a0f24] ${activity.bg}`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-semibold text-slate-200">{activity.title}</h4>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{activity.time}</span>
                </div>
                <p className="text-sm text-slate-400">{activity.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
