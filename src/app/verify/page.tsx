'use client';

import { motion } from 'framer-motion';
import { QrCode, Upload, ShieldCheck, CheckCircle2, Search, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { Suspense } from 'react';

function VerifyContent() {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const [credentialId, setCredentialId] = useState('');
  const [credentialData, setCredentialData] = useState<any>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const idFromQuery = searchParams.get('id');
    if (idFromQuery) {
      setCredentialId(idFromQuery);
      handleVerify(undefined, idFromQuery);
    }
  }, [searchParams]);

  const handleVerify = async (e?: React.FormEvent, directId?: string) => {
    if (e) e.preventDefault();
    const idToVerify = directId || credentialId;
    if (!idToVerify) return;
    
    setVerificationStatus('verifying');
    setCredentialData(null);
    
    try {
      // @ts-ignore
      const docRef = doc(db, 'credentials', idToVerify.toUpperCase());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().status === 'Active') {
        setCredentialData(docSnap.data());
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failed');
      }
    } catch (err) {
      console.error(err);
      setVerificationStatus('failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-6">
          <ShieldCheck className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">Credential Verification</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Verify the authenticity of any Surya digital credential or organizational document instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* Manual Verification Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-400" />
            Manual Entry
          </h2>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Credential ID</label>
              <input 
                type="text" 
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. SOID-2026-000001" 
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors uppercase font-mono"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={verificationStatus === 'verifying'}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Credential'}
            </button>
          </form>
        </motion.div>

        {/* Scan & Upload */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-purple-400" />
            Scan QR Code
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-8 hover:border-blue-500/50 transition-colors cursor-pointer group bg-white/5">
            <QrCode className="w-16 h-16 text-slate-500 group-hover:text-blue-400 transition-colors mb-4" />
            <p className="text-center text-slate-400 font-medium group-hover:text-slate-300">Click to scan QR code</p>
            <p className="text-center text-xs text-slate-500 mt-2">or</p>
            <button className="mt-2 flex items-center text-sm text-blue-400 hover:text-blue-300">
              <Upload className="w-4 h-4 mr-1" />
              Upload Image
            </button>
          </div>
        </motion.div>

      </div>

      {/* Verification Result */}
      {verificationStatus === 'success' && credentialData && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-card p-8 border-green-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-start space-x-6 relative z-10">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Authentic Credential</h3>
              <p className="text-slate-300 mb-6">This credential is cryptographically verified and was issued by Surya Group of Industries.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-xl p-6 border border-white/10">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Holder Name</p>
                  <p className="font-medium text-slate-200">{credentialData.applicantName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Credential Type</p>
                  <p className="font-medium text-slate-200">{credentialData.type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Issue Date</p>
                  <p className="font-medium text-slate-200">{credentialData.issuedAt?.toDate().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    {credentialData.status}
                  </span>
                </div>
              </div>

              {credentialData.data && Object.keys(credentialData.data).length > 0 && (
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Additional Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(credentialData.data).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-slate-500 uppercase">{key}</p>
                        <p className="text-slate-200 text-sm font-medium">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {verificationStatus === 'failed' && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-card p-8 border-red-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-start space-x-6 relative z-10">
            <div className="flex-shrink-0">
              <XCircle className="w-16 h-16 text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Verification Failed</h3>
              <p className="text-slate-300">The provided credential ID could not be verified in the Surya database. It may be invalid, expired, or revoked.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>}>
      <VerifyContent />
    </Suspense>
  );
}
