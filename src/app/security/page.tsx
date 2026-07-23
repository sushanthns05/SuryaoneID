'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Server, Key, Eye, Clock, CheckCircle2, AlertTriangle, Fingerprint, Activity, Database, FileKey, Smartphone, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-8 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <Shield className="w-12 h-12 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Protection</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Surya OneID utilizes advanced cryptographic architecture to secure your organizational identity. Your credentials are encrypted, immutable, and strictly bound to the Surya Group ecosystem.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/create-oneid" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                Secure Your Identity
              </Link>
              <Link href="#architecture" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                View Architecture
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { label: 'Uptime SLA', value: '99.99%' },
              { label: 'Encryption', value: 'AES-256' },
              { label: 'Data Centers', value: 'Tier 4' },
              { label: 'Threat Monitoring', value: '24/7/365' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Security Features */}
      <section className="py-24" id="architecture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Defense in Depth</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Multi-layered security infrastructure designed to protect organizational credentials against modern threats.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Lock}
              title="Zero-Knowledge Architecture"
              desc="Your sensitive credential data is encrypted client-side before transmission. We cannot read or access your private payload."
            />
            <FeatureCard 
              icon={Server}
              title="Immutable Audit Logs"
              desc="Every authentication attempt and credential issuance is recorded on a tamper-proof cryptographic ledger."
            />
            <FeatureCard 
              icon={Fingerprint}
              title="Biometric Binding"
              desc="Credentials are cryptographically bound to your specific device hardware and biometric enclave."
            />
            <FeatureCard 
              icon={Database}
              title="Distributed Storage"
              desc="Identity fragments are dispersed across geographically isolated clusters to prevent single-point compromise."
            />
            <FeatureCard 
              icon={Activity}
              title="Behavioral Analytics"
              desc="AI-driven threat detection models analyze authentication patterns to instantly block anomalous login attempts."
            />
            <FeatureCard 
              icon={Eye}
              title="Privacy Preserving"
              desc="Selective disclosure allows you to verify credentials without exposing underlying personal identifiable information (PII)."
            />
          </div>
        </div>
      </section>

      {/* Data Protection & Privacy */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Absolute Privacy Control</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Surya OneID operates on a strict privacy-first mandate. As an internal organizational identity platform, we collect only what is necessary to issue and verify your credentials within the Surya Group.
                </p>
                <ul className="space-y-4">
                  {[
                    "No unauthorized data sharing with third parties",
                    "Complete transparency over what data is accessed",
                    "Right to revoke credential access instantly",
                    "Compliance with global enterprise data protection standards"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FileKey className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Encrypted Payload</h3>
                    <p className="text-gray-400 text-sm">AES-GCM 256-bit</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-white/10 rounded overflow-hidden">
                    <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} />
                  </div>
                  <div className="h-2 bg-white/10 rounded overflow-hidden">
                    <motion.div className="h-full bg-purple-500" initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1, delay: 0.2 }} />
                  </div>
                  <div className="h-2 bg-white/10 rounded overflow-hidden">
                    <motion.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1, delay: 0.4 }} />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
                  <span>Status: Secure</span>
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> End-to-End Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Disclaimer */}
      <section className="py-12 border-y border-white/5 bg-blue-900/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Scope of Authority</h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm leading-relaxed">
            Credentials issued through the Surya OneID platform are internal organizational credentials intended strictly for use within the Surya Group of Industries and its affiliated ecosystem. 
            They are highly secure digital representations of your organizational status, but they <strong>do not replace, and are not legally equivalent to</strong>, government-issued identity documents (such as passports, driving licenses, or national IDs).
          </p>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shared Responsibility</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Security requires collaboration. Follow these best practices to keep your organizational identity safe.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PracticeCard icon={Smartphone} title="Use Biometrics" desc="Enable FaceID or Fingerprint on your device to ensure only you can unlock your Digital Wallet." />
            <PracticeCard icon={Eye} title="Beware of Phishing" desc="Surya Group will never ask for your passwords or OTPs via email or SMS." />
            <PracticeCard icon={Lock} title="Lock Devices" desc="Ensure devices holding your active credentials are password protected and lock automatically." />
            <PracticeCard icon={Activity} title="Monitor Activity" desc="Regularly check your Security Center for recognized devices and active sessions." />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group"
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PracticeCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 border border-white/10 rounded-2xl bg-black">
      <Icon className="w-8 h-8 text-gray-400 mb-4" />
      <h4 className="text-lg font-medium text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
