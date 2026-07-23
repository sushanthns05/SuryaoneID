'use client';

import { motion } from 'framer-motion';
import { Shield, CreditCard, Car, User, Globe, GraduationCap, Briefcase, HeartPulse } from 'lucide-react';

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
              onClick={() => window.location.href = `/apply/${cred.id}`}
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

    </div>
  );
}
