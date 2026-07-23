'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Shield, CheckCircle2, XCircle, Clock, Hash, Fingerprint, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

function VerifyContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [credential, setCredential] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyCredential = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'credentials', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCredential({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyCredential();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-2 border-cyan-400 rounded-full animate-spin-reverse"></div>
            <Shield className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-medium text-white tracking-widest uppercase animate-pulse">Verifying Cryptographic Signature...</h2>
        </div>
      </div>
    );
  }

  if (error || !credential) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md w-full p-8 border-red-500/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
            <p className="text-slate-400 mb-6">
              The credential ID <span className="font-mono text-red-400">{id || 'Unknown'}</span> could not be verified in the Surya OneID registry. It may be invalid, expired, or fraudulent.
            </p>
            <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div className="text-left text-sm text-red-200">
                <p className="font-semibold mb-1">Cryptographic Signature Match Failed</p>
                <p className="opacity-80">This credential does not exist in the official blockchain-backed ledger.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-green-500/30 p-1 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.15)]"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/50 to-green-500/0 opacity-50 blur-md"></div>
          
          <div className="bg-[#0a0f24]/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Status Icon */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/30 relative">
                  <div className="absolute inset-0 rounded-full animate-ping bg-green-400/20"></div>
                  <ShieldCheck className="w-12 h-12 text-green-400 relative z-10" />
                </div>
                <span className="bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  {credential.status}
                </span>
              </div>

              {/* Credential Details */}
              <div className="flex-1 w-full">
                <div className="text-center md:text-left mb-8 border-b border-white/10 pb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Verified Authentic</h1>
                  <p className="text-slate-400">This credential has been verified against the official Surya OneID registry.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><User className="w-3 h-3" /> Holder Name</p>
                      <p className="text-xl font-bold text-white">{credential.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Hash className="w-3 h-3" /> Credential Number</p>
                      <p className="text-lg font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md inline-block border border-blue-500/20">
                        {credential.credentialNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Fingerprint className="w-3 h-3" /> Credential Type</p>
                      <p className="text-white font-medium">{credential.type}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Issue Date</p>
                      <p className="text-white font-medium">{new Date(credential.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Valid Until</p>
                      <p className="text-white font-medium">{new Date(credential.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Digital Signature Panel */}
                <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1 text-sm">Digital Signature Verified</p>
                      <p className="font-mono text-xs text-slate-500 break-all leading-relaxed">
                        {credential.digitalSignature}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      }>
        <VerifyContent />
      </Suspense>
      <Footer />
    </>
  );
}
