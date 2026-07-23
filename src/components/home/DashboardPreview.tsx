'use client';

import { motion } from 'framer-motion';
import { UserCircle, ShieldCheck, Wallet, Activity, Bell } from 'lucide-react';
import Link from 'next/link';

export function DashboardPreview() {
  return (
    <section className="py-24 relative z-10 w-full overflow-hidden bg-[#060918]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Digital Command Center</h2>
            <p className="text-slate-400 text-lg">Experience an ultra-premium dashboard that brings all your organizational credentials, security settings, and notifications into one unified interface.</p>
          </div>
          <Link href="/dashboard" className="mt-6 md:mt-0 text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
            View Live Dashboard <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Dashboard Mockup Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl rounded-[2.5rem] p-[2px] bg-gradient-to-b from-blue-500/30 via-purple-500/10 to-transparent shadow-[0_30px_100px_-15px_rgba(59,130,246,0.3)]"
        >
          <div className="rounded-[2.4rem] bg-[#0a0f24] p-4 md:p-8 overflow-hidden relative">
            
            {/* Top Bar Mockup */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-blue-500/50 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Alex Customer</div>
                  <div className="text-xs text-blue-400 font-mono">SOID-XXXX-8921</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">Secure</span>
                </div>
                <button className="p-2 bg-white/5 rounded-full relative">
                  <Bell className="w-5 h-5 text-slate-300" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#0a0f24]"></span>
                </button>
              </div>
            </div>

            {/* Content Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Wallet Summary Mockup */}
              <div className="md:col-span-2 space-y-6">
                <div className="h-40 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-3xl border border-blue-500/20 p-6 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
                  <div className="flex justify-between items-start z-10">
                    <Wallet className="w-6 h-6 text-blue-400" />
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md font-mono">Active</span>
                  </div>
                  <div className="z-10">
                    <div className="text-2xl font-bold mb-1">Customer Priority Card</div>
                    <div className="text-sm text-slate-400">Surya Group of Industries</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/5 p-5">
                    <div className="text-slate-400 text-sm mb-2">Storage Usage</div>
                    <div className="text-2xl font-bold">45%</div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-4">
                      <div className="bg-purple-500 h-1.5 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/5 p-5">
                    <div className="text-slate-400 text-sm mb-2">Security Score</div>
                    <div className="text-2xl font-bold text-green-400">98/100</div>
                    <div className="text-xs text-slate-500 mt-2">Biometrics Enabled</div>
                  </div>
                </div>
              </div>

              {/* Sidebar Mockup */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl border border-white/5 p-5 h-full">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-purple-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
                          <div className="h-2 bg-white/5 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Overlay Gradient for Mockup Effect */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f24] to-transparent pointer-events-none"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
