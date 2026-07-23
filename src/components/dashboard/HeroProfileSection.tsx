'use client';

import { motion } from 'framer-motion';
import { UserCircle, ShieldCheck, QrCode, Medal, Calendar, CheckCircle2, Award, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/lib/auth-context';

export function HeroProfileSection() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 text-center md:text-left">
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full bg-[#0a0f24] rounded-[22px] flex items-center justify-center overflow-hidden relative">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-20 h-20 text-slate-400" />
                )}
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0a0f24] to-transparent"></div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-[#0a0f24] p-1.5 rounded-full border border-white/10">
              <div className="bg-green-500/20 text-green-400 p-1.5 rounded-full">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 mt-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
              <h2 className="text-3xl font-bold tracking-tight text-white">{user.displayName || 'Surya Customer'}</h2>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="text-blue-400 font-medium bg-blue-500/10 px-3 py-1 rounded-full text-sm border border-blue-500/20 inline-flex items-center w-fit mx-auto md:mx-0">
                <Medal className="w-4 h-4 mr-1.5" /> Surya {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member'}
              </span>
            </div>
            <p className="text-slate-400 mb-6 text-lg">{user.email}</p>
            
            <div className="grid grid-cols-2 md:flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[140px]">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">OneID Number</p>
                {user.oneId ? (
                  <p className="font-mono font-bold text-white text-sm">{user.oneId}</p>
                ) : (
                  <p className="font-medium text-yellow-400 text-sm flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending Approval</p>
                )}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[140px]">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider flex items-center justify-center md:justify-start gap-1"><Calendar className="w-3 h-3"/> Issue Date</p>
                <p className="font-medium text-slate-200 text-sm">{user.oneId ? new Date().toLocaleDateString() : '---'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[140px]">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider flex items-center justify-center md:justify-start gap-1"><Calendar className="w-3 h-3"/> Expiry Date</p>
                <p className="font-medium text-slate-200 text-sm">---</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code and Stats */}
        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto shrink-0 justify-center items-center">
          
          {/* Profile Completion & Security Score */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[180px]">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="85, 100" />
                </svg>
                <span className="absolute text-xs font-bold text-white">85%</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Profile</p>
                <p className="text-xs text-slate-400">Completion</p>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[180px]">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">98 / 100</p>
                <p className="text-xs text-slate-400">Security Score</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          {user.oneId && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="bg-white p-2 rounded-xl mb-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform">
                <QRCodeSVG 
                  value={`https://oneid.suryagroup.com/verify/${user.oneId}`} 
                  size={96}
                  level="H"
                  className="w-24 h-24"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest text-slate-300">SCAN TO VERIFY</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-green-400">
                  <CheckCircle2 className="w-3 h-3" /> Digital Signature Valid
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
