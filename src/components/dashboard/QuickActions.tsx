'use client';

import { motion } from 'framer-motion';
import { Download, Share2, QrCode, UserCog, UploadCloud, ShieldCheck, LifeBuoy, FileCheck2 } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { id: 1, name: 'Download Credential', icon: Download, href: '#', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400', hoverBorder: 'group-hover:border-blue-500/50' },
  { id: 2, name: 'Share Securely', icon: Share2, href: '#', color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-400', hoverBorder: 'group-hover:border-purple-500/50' },
  { id: 3, name: 'Generate QR', icon: QrCode, href: '/profile', color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-400', hoverBorder: 'group-hover:border-cyan-500/50' },
  { id: 4, name: 'Update Profile', icon: UserCog, href: '/profile', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-400', hoverBorder: 'group-hover:border-green-500/50' },
  { id: 5, name: 'Request Credential', icon: UploadCloud, href: '/vault', color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-400', hoverBorder: 'group-hover:border-orange-500/50' },
  { id: 6, name: 'Verify Document', icon: FileCheck2, href: '/verify', color: 'from-pink-500/20 to-pink-500/5', iconColor: 'text-pink-400', hoverBorder: 'group-hover:border-pink-500/50' },
  { id: 7, name: 'Security Center', icon: ShieldCheck, href: '#', color: 'from-red-500/20 to-red-500/5', iconColor: 'text-red-400', hoverBorder: 'group-hover:border-red-500/50' },
  { id: 8, name: 'Contact Support', icon: LifeBuoy, href: '#', color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-400', hoverBorder: 'group-hover:border-indigo-500/50' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function QuickActions() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        Quick Actions
      </h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.id} variants={item}>
              <Link href={action.href} className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden ${action.hoverBorder}`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent"></div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <Icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors text-center relative z-10">
                  {action.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
