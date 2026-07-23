'use client';

import { motion } from 'framer-motion';
import { HardDrive, FileText, Image as ImageIcon, Archive } from 'lucide-react';

export function StorageDashboard() {
  const totalStorage = 5000; // MB (5GB)
  const usedStorage = 3240; // MB
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <HardDrive className="w-5 h-5 mr-2 text-blue-400" />
          Document Vault Storage
        </h3>
        <span className="text-sm font-medium text-slate-300">Upgrade</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-3xl font-bold text-white">3.24 <span className="text-lg text-slate-400">GB</span></span>
            <p className="text-sm text-slate-400">used of 5 GB</p>
          </div>
          <span className="text-lg font-medium text-blue-400">{percentage.toFixed(0)}%</span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6 mt-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 relative"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
          </motion.div>
        </div>

        {/* Storage Types Breakdown */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
            <FileText className="w-5 h-5 text-blue-400 mb-2" />
            <span className="text-xs text-slate-400">Documents</span>
            <span className="text-sm font-semibold text-slate-200">2.1 GB</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
            <ImageIcon className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-xs text-slate-400">Media</span>
            <span className="text-sm font-semibold text-slate-200">0.8 GB</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
            <Archive className="w-5 h-5 text-cyan-400 mb-2" />
            <span className="text-xs text-slate-400">Archives</span>
            <span className="text-sm font-semibold text-slate-200">0.3 GB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
