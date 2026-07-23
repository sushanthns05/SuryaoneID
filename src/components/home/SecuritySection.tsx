'use client';

import { motion } from 'framer-motion';
import { Lock, Fingerprint, KeyRound, ShieldAlert, FileDigit, MonitorSmartphone } from 'lucide-react';

const securityFeatures = [
  { icon: <Lock className="w-6 h-6" />, title: 'AES-256 Encryption', desc: 'Data is encrypted at rest and in transit.' },
  { icon: <FileDigit className="w-6 h-6" />, title: 'Digital Signatures', desc: 'Tamper-evident verification.' },
  { icon: <Fingerprint className="w-6 h-6" />, title: 'Biometric Ready', desc: 'FaceID & TouchID support.' },
  { icon: <KeyRound className="w-6 h-6" />, title: 'Passkeys', desc: 'Passwordless authentication.' },
  { icon: <ShieldAlert className="w-6 h-6" />, title: 'Fraud Protection', desc: 'Real-time anomaly detection.' },
  { icon: <MonitorSmartphone className="w-6 h-6" />, title: 'Device Management', desc: 'Control active sessions.' },
];

export function SecuritySection() {
  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Grade Security</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Your organizational identity is protected by industry-leading security protocols and cryptographic signatures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 flex items-start space-x-4 group hover:bg-white/10 transition-colors"
          >
            <div className="p-3 bg-white/5 rounded-xl text-blue-400 group-hover:text-white group-hover:bg-blue-500/20 transition-colors shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
