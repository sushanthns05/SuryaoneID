'use client';

import { motion } from 'framer-motion';
import { Shield, ChevronRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Animated Light Rays / Grid */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/20 rounded-full blur-2xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Shield Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.3)] backdrop-blur-xl group cursor-default relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          <Shield className="w-24 h-24 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6"
        >
          Surya <span className="text-gradient">OneID</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 font-light leading-relaxed"
        >
          The World-Class Customer Digital Identity Platform for the Surya Ecosystem.
        </motion.p>

        {/* Trust Statistics */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            '1M+ Credentials Issued',
            '99.99% Platform Availability',
            'AES-256 Encryption',
            'QR Verified Credentials'
          ].map((stat, i) => (
            <div key={i} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-slate-200">{stat}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/dashboard" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] flex items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative">Access My Portal</span>
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
          </Link>
          <Link href="/verify" className="px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold text-lg transition-all flex items-center justify-center hover:border-white/20">
            Verify a Credential
          </Link>
        </motion.div>

      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
