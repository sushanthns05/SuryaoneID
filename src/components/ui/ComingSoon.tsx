'use client';

import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function ComingSoon({ title, description }: { title: string, description: string }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-card p-12 border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <ShieldAlert className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/my-oneid" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
              Return to My OneID
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
