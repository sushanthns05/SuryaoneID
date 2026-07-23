'use client';

import { motion } from 'framer-motion';
import { WalletCards, ShieldCheck, Clock, AlertTriangle, Share2 } from 'lucide-react';

const stats = [
  { id: 1, name: 'Total Credentials', value: '12', icon: WalletCards, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, name: 'Verified Active', value: '9', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 3, name: 'Pending Review', value: '2', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 4, name: 'Expired/Revoked', value: '1', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 5, name: 'Shared Copies', value: '34', icon: Share2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export function CredentialSummary() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-6 text-white">Credential Summary</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-5 relative overflow-hidden group hover:border-white/20 transition-colors"
          >
            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-xl ${stat.bg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="block text-3xl font-bold text-white mb-1"
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.name}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
