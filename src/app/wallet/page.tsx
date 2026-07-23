'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Shield, ShieldCheck, User, QrCode, CreditCard, Building, Car, GraduationCap, Briefcase, HeartPulse, Globe, CheckCircle2, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Credential Types Map
const credentialStyles: Record<string, any> = {
  SOID: { name: 'Surya OneID', icon: Shield, gradient: 'from-blue-600 to-cyan-600', text: 'text-blue-100' },
  SFID: { name: 'Financial ID', icon: CreditCard, gradient: 'from-emerald-600 to-teal-600', text: 'text-emerald-100' },
  SMA: { name: 'Mobility Auth', icon: Car, gradient: 'from-orange-500 to-red-600', text: 'text-orange-100' },
  SMID: { name: 'Member ID', icon: User, gradient: 'from-purple-600 to-fuchsia-600', text: 'text-purple-100' },
  SGP: { name: 'Global Pass', icon: Globe, gradient: 'from-sky-500 to-indigo-600', text: 'text-sky-100' },
  SAID: { name: 'Academic ID', icon: GraduationCap, gradient: 'from-pink-600 to-rose-600', text: 'text-pink-100' },
  SWID: { name: 'Workforce ID', icon: Briefcase, gradient: 'from-slate-700 to-slate-900', text: 'text-slate-300' },
  SHID: { name: 'Health ID', icon: HeartPulse, gradient: 'from-red-500 to-rose-700', text: 'text-red-100' },
};

export default function WalletPage() {
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          // @ts-ignore
          collection(db, 'credentials'), 
          where('userId', '==', user.uid)
        );
        // @ts-ignore
        const snapshot = await getDocs(q);
        const creds = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        setCredentials(creds);
      } catch (err) {
        console.error("Error fetching credentials:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Quick polling to handle auth state initialization
    const interval = setInterval(() => {
      if (auth.currentUser) {
        clearInterval(interval);
        fetchCredentials();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const selectedCredential = credentials.find(c => c.id === selectedId);

  return (
    <div className="max-w-md mx-auto px-4 py-8 min-h-[calc(100vh-80px)] relative">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Digital Wallet</h1>
        <p className="text-slate-400">Manage your Surya organizational credentials.</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/10"></div>
          ))}
        </div>
      ) : credentials.length === 0 ? (
        <div className="glass-card p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Wallet is Empty</h3>
          <p className="text-slate-400 text-sm mb-6">You haven't been issued any credentials yet.</p>
          <a href="/applications" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-medium transition-colors">
            Apply Now
          </a>
        </div>
      ) : (
        <div className="relative">
          <div className={`transition-all duration-500 ${selectedId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {credentials.map((cred, index) => {
              const style = credentialStyles[cred.type] || credentialStyles.SOID;
              const Icon = style.icon;
              
              return (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedId(cred.id)}
                  className={`relative w-full h-48 rounded-2xl p-6 cursor-pointer mb-[-60px] shadow-[0_-10px_20px_rgba(0,0,0,0.3)] bg-gradient-to-br ${style.gradient} border border-white/20 overflow-hidden group hover:-translate-y-4 transition-transform duration-300`}
                  style={{ zIndex: index }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-white tracking-wide">{style.name}</span>
                    </div>
                    {cred.status === 'Active' && (
                      <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Authentic
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                    <div>
                      <p className={`text-xs uppercase tracking-widest ${style.text} mb-1 opacity-80`}>Holder</p>
                      <p className="font-semibold text-white truncate max-w-[150px]">{cred.applicantName}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs uppercase tracking-widest ${style.text} mb-1 opacity-80`}>ID Number</p>
                      <p className="font-mono font-medium text-white">{cred.credentialId}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedCredential && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              >
                <div className="w-full max-w-sm relative">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="[perspective:1000px] w-full h-[550px] group">
                    <div className="w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      
                      {/* FRONT OF CARD */}
                      <div className={`absolute inset-0 rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${credentialStyles[selectedCredential.type]?.gradient || credentialStyles.SOID.gradient} border border-white/20 [backface-visibility:hidden]`}>
                        <div className="flex justify-between items-start mb-10">
                          <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                              {(() => {
                                const Icon = credentialStyles[selectedCredential.type]?.icon || Shield;
                                return <Icon className="w-6 h-6 text-white" />;
                              })()}
                            </div>
                            <div>
                              <span className="block text-xs uppercase tracking-widest text-white/70">Surya Group</span>
                              <span className="font-bold text-lg text-white">{credentialStyles[selectedCredential.type]?.name || 'Credential'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center mb-10 shadow-inner">
                          <QRCodeSVG 
                            value={`https://oneid-suryagroup.web.app/verify?id=${selectedCredential.credentialId}`} 
                            size={160}
                            level="H"
                          />
                          <div className="mt-3 flex items-center text-xs font-semibold text-green-600 uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Scan to Verify
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/70 mb-1">Holder Name</p>
                            <p className="font-bold text-white text-lg">{selectedCredential.applicantName}</p>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF CARD */}
                      <div className={`absolute inset-0 rounded-3xl p-6 shadow-2xl bg-[#0a0f24] border border-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col`}>
                        <div className="border-b border-white/10 pb-4 mb-4">
                          <h3 className="text-lg font-bold text-white mb-1">Credential Details</h3>
                          <p className="font-mono text-blue-400 text-sm">{selectedCredential.credentialId}</p>
                        </div>
                        
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                          <div>
                            <p className="text-xs text-slate-500 uppercase">Status</p>
                            <p className="text-green-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> {selectedCredential.status}
                            </p>
                          </div>
                          
                          {selectedCredential.data && Object.entries(selectedCredential.data).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-xs text-slate-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-white font-medium">{String(value)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/10">
                          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                            This credential is the property of Surya Group of Industries. It is intended for internal organizational use only and does not replace government-issued identification.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  <div className="text-center mt-6 text-slate-400 text-sm animate-pulse flex items-center justify-center gap-2">
                    Hover to flip card <ChevronRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
