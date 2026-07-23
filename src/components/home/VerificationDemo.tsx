'use client';

import { motion } from 'framer-motion';
import { Search, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';

export function VerificationDemo() {
  const [demoState, setDemoState] = useState(0); // 0: Idle, 1: Scanning, 2: Verified

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoState((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0a0f24]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Instant Cryptographic Verification</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Every credential issued on Surya OneID can be verified instantly by anyone, ensuring zero fraud and absolute trust within the ecosystem.</p>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-2 rounded-[2rem] overflow-hidden">
        <div className="bg-[#060918] rounded-[1.8rem] p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          
          {/* Animated Background Rings for Demo */}
          <motion.div 
            animate={{ scale: demoState === 1 ? [1, 1.5, 2] : 1, opacity: demoState === 1 ? [0.5, 0.2, 0] : 0 }}
            transition={{ duration: 1.5, repeat: demoState === 1 ? Infinity : 0 }}
            className="absolute w-64 h-64 border-2 border-blue-500 rounded-full pointer-events-none"
          />

          <div className="relative z-10 w-full max-w-md">
            {demoState === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Verify</h3>
                <p className="text-slate-400 text-sm">Waiting for credential input or QR scan...</p>
              </motion.div>
            )}

            {demoState === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="w-20 h-20 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                  <motion.div 
                    animate={{ y: ['-100%', '100%'] }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-b-2 border-blue-400 w-full"
                  />
                  <Search className="w-8 h-8 text-blue-400 relative z-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">Verifying Signature...</h3>
                <p className="text-slate-400 text-sm font-mono">HASH: 0x9f8c...4b2a</p>
              </motion.div>
            )}

            {demoState === 2 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-start space-x-4 relative z-10">
                  <CheckCircle2 className="w-12 h-12 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-1">Authentic Credential</h3>
                    <p className="text-slate-300 text-sm mb-4">Issued by Surya Group of Industries.</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block uppercase tracking-wider">Holder</span>
                        <span className="font-medium text-slate-200">Alex Customer</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase tracking-wider">Status</span>
                        <span className="font-medium text-green-400">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
