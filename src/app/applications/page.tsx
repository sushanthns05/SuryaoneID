'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CreditCard, Car, User, Globe, GraduationCap, Briefcase, HeartPulse, X, Upload } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const credentials = [
  { id: 'SOID', name: 'Surya OneID', desc: 'Primary organizational identity.', icon: Shield, fields: [] },
  { id: 'SFID', name: 'Surya Financial ID', desc: 'Customer financial relationship and services.', icon: CreditCard, fields: ['Membership Tier'] },
  { id: 'SMA', name: 'Mobility Authorization', desc: 'Fleet access and mobility services.', icon: Car, fields: ['Vehicle Category'] },
  { id: 'SMID', name: 'Member Identity', desc: 'Official membership credential.', icon: User, fields: ['Membership Type'] },
  { id: 'SGP', name: 'Global Pass', desc: 'Travel and visitor credential.', icon: Globe, fields: ['Destination', 'Access Level'] },
  { id: 'SAID', name: 'Academic ID', desc: 'Academic identity for institutions.', icon: GraduationCap, fields: ['Institution', 'Program'] },
  { id: 'SWID', name: 'Workforce ID', desc: 'Official employee credential.', icon: Briefcase, fields: ['Department', 'Designation'] },
  { id: 'SHID', name: 'Health ID', desc: 'Healthcare identity for hospitals.', icon: HeartPulse, fields: ['Blood Group', 'Allergy Information'] },
];

export default function ApplicationsPage() {
  const [selectedCred, setSelectedCred] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !selectedCred) return;

    setStatus('submitting');
    
    try {
      // @ts-ignore
      await addDoc(collection(db, 'applications'), {
        userId: auth.currentUser.uid,
        applicantName: auth.currentUser.displayName || 'Unknown User',
        email: auth.currentUser.email,
        credentialType: selectedCred.id,
        credentialData: formData,
        status: 'Pending',
        submittedAt: serverTimestamp(),
      });
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setSelectedCred(null);
        setFormData({});
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Credential Marketplace</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Apply for official organizational credentials issued by Surya Group of Industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {credentials.map((cred, index) => {
          const Icon = cred.icon;
          return (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCred(cred)}
              className="glass-card p-6 cursor-pointer hover:border-blue-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Icon className="w-6 h-6 text-slate-300 group-hover:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cred.name}</h3>
              <p className="text-slate-400 text-sm">{cred.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCred && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-md p-8 relative"
            >
              <button 
                onClick={() => setSelectedCred(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <selectedCred.icon className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Apply for {selectedCred.id}</h2>
              </div>

              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-slate-400">Your application is now under review by an administrator.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedCred.fields.map((field: string) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-400 mb-2">{field}</label>
                      <input 
                        type="text"
                        required
                        value={formData[field] || ''}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer mb-6 bg-white/5">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-300">Upload Supporting Documents</p>
                      <p className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB</p>
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
