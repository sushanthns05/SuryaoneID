'use client';

import { motion } from 'framer-motion';
import { Shield, Fingerprint, Mail, KeyRound, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticating(true);
      setError('');
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/my-oneid');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsAuthenticating(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/my-oneid');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sign in to OneID</h1>
            <p className="text-slate-400 text-sm">Secure access to your enterprise credentials</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {step === 1 ? (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleEmailSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your Surya work email" 
                      className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center group">
                  Continue <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePasswordSubmit}
                className="space-y-4"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-xl border border-white/10 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Signing in as</span>
                    <span className="text-sm font-medium text-slate-300 truncate max-w-[200px]">{email}</span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password" 
                      className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <button type="submit" disabled={isAuthenticating} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50">
                  {isAuthenticating ? 'Authenticating...' : 'Sign In'}
                </button>
              </motion.form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-slate-500 bg-[#0c1226]">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                <Fingerprint className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 mr-2 transition-colors" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Passkey</span>
              </button>
              <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.73 22.36 10.02H12V14.24H17.92C17.67 15.61 16.89 16.78 15.74 17.55V20.28H19.3C21.38 18.36 22.56 15.57 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.3 20.28L15.74 17.55C14.75 18.22 13.48 18.62 12 18.62C9.13 18.62 6.7 16.68 5.84 14.07H2.17V16.92C4.01 20.57 7.7 23 12 23Z" fill="#34A853"/>
                  <path d="M5.84 14.07C5.62 13.4 5.49 12.71 5.49 12C5.49 11.29 5.62 10.6 5.84 9.93V7.08H2.17C1.41 8.59 1 10.24 1 12C1 13.76 1.41 15.41 2.17 16.92L5.84 14.07Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.07 5.94 16.21 7.03L19.38 3.86C17.45 2.05 14.96 1 12 1C7.7 1 4.01 3.43 2.17 7.08L5.84 9.93C6.7 7.32 9.13 5.38 12 5.38Z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Google</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Forgot your password?</Link>
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/create-oneid" className="text-blue-400 hover:text-blue-300 font-medium">Create OneID</Link>
            </p>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> End-to-end Encrypted</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Enterprise Grade</span>
        </div>
      </div>
    </div>
  );
}
