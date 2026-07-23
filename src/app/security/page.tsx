'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Lock, Server, Key, Eye, Clock, CheckCircle2, AlertTriangle, 
  Fingerprint, Activity, Database, FileKey, Smartphone, Users, ChevronDown,
  Building, Globe, Cpu, Laptop, BadgeCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black -z-10"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-8 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative"
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl animate-ping opacity-75"></div>
              <Shield className="w-12 h-12 text-blue-400 relative z-10" />
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
              <Link href="/create-oneid" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Secure Your Identity
              </Link>
              <Link href="#architecture" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                View Architecture
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-6 font-semibold">Protected by Enterprise Standards</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="flex items-center gap-2"><Lock className="w-5 h-5"/> AES-256 Encrypted</div>
            <div className="flex items-center gap-2"><BadgeCheck className="w-5 h-5"/> ISO 27001 Compliant</div>
            <div className="flex items-center gap-2"><Shield className="w-5 h-5"/> Zero Trust Architecture</div>
            <div className="flex items-center gap-2"><Fingerprint className="w-5 h-5"/> FIDO2 Ready</div>
          </div>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Uptime SLA', value: '99.99%' },
              { label: 'Threats Blocked', value: '1.2M+' },
              { label: 'Data Centers', value: 'Tier 4' },
              { label: 'Monitoring', value: '24/7/365' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Security Features */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-900/10" id="architecture">
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
              title="Selective Disclosure"
              desc="Verify credentials without exposing underlying personal identifiable information (PII) to third-party validators."
            />
          </div>
        </div>
      </section>

      {/* Architecture Timeline */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Authentication Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">How your identity is secured from login to verification.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            <TimelineItem 
              icon={Smartphone}
              title="1. Hardware Authentication"
              desc="The process begins with biometric verification (FaceID/TouchID) bound to your device's secure enclave."
              align="left"
            />
            <TimelineItem 
              icon={Cpu}
              title="2. Client-Side Encryption"
              desc="Your device generates an ephemeral key pair and encrypts the authentication payload before it ever leaves the device."
              align="right"
            />
            <TimelineItem 
              icon={Globe}
              title="3. Encrypted Transport"
              desc="Data is transmitted over TLS 1.3 with perfect forward secrecy to the Surya OneID validation servers."
              align="left"
            />
            <TimelineItem 
              icon={CheckCircle2}
              title="4. Verification & Issuance"
              desc="Servers validate the payload, record the immutable audit log, and issue a digitally signed organizational credential."
              align="right"
            />
          </div>
        </div>
      </section>

      {/* Data Protection & Privacy */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" /> Privacy-First
                </div>
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
              <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FileKey className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Encrypted Payload</h3>
                    <p className="text-gray-400 text-sm">AES-GCM 256-bit</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                      <span>Personal Data</span>
                      <span>Encrypted</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded overflow-hidden">
                      <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                      <span>Biometric Data</span>
                      <span>Never leaves device</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded overflow-hidden">
                      <motion.div className="h-full bg-purple-500" initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1, delay: 0.2 }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                      <span>Location Data</span>
                      <span>Anonymized</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded overflow-hidden">
                      <motion.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1, delay: 0.4 }} />
                    </div>
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

      {/* 24x7 Monitoring Dashboard Concept */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-900/5 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">24x7 Threat Monitoring</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our Security Operations Center (SOC) continuously monitors the Surya OneID infrastructure to detect and neutralize threats in real-time.</p>
          </div>

          <div className="bg-black border border-white/10 rounded-2xl p-2 max-w-5xl mx-auto shadow-2xl relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6 relative z-10 h-80 flex flex-col items-center justify-center text-center">
              <Activity className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">System Status: Optimal</h3>
              <p className="text-gray-400">All authentication nodes are fully operational and secured.</p>
              
              <div className="mt-8 grid grid-cols-3 gap-8 w-full max-w-3xl border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-mono text-green-400">0</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Active Threats</div>
                </div>
                <div>
                  <div className="text-3xl font-mono text-blue-400">12ms</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Auth Latency</div>
                </div>
                <div>
                  <div className="text-3xl font-mono text-purple-400">100%</div>
                  <div className="text-xs text-gray-500 uppercase mt-1">Node Integrity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Disclaimer */}
      <section className="py-12 border-y border-yellow-500/20 bg-yellow-500/5">
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

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security FAQ</h2>
          </div>
          <div className="space-y-4">
            <FaqItem 
              question="Are my credentials stored on my device or in the cloud?"
              answer="Surya OneID utilizes a hybrid approach. The cryptographic keys required to prove your identity are stored securely in your device's hardware enclave (like Secure Enclave on iOS). The encrypted credential payload is stored in our distributed cloud, but can only be decrypted when you authenticate on your recognized device."
            />
            <FaqItem 
              question="What happens if I lose my phone?"
              answer="Since your credentials are bound to your specific device hardware, a lost phone cannot be used by someone else without your biometrics or device passcode. You should immediately log in to the Surya OneID Security Center from another device to revoke the lost device's access."
            />
            <FaqItem 
              question="Can Surya Group administrators read my passwords?"
              answer="No. Surya OneID uses Zero-Knowledge architecture for authentication. We never store or transmit your passwords in plaintext. All authentication is handled via securely hashed tokens and biometric challenges."
            />
            <FaqItem 
              question="How do I report a security vulnerability?"
              answer="We take security seriously. If you believe you have found a vulnerability in Surya OneID, please refer to our Responsible Disclosure program below and contact our security team immediately. Do not disclose the vulnerability publicly."
            />
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Responsible Disclosure</h2>
          <p className="text-gray-400 mb-8">
            The Surya Group Security Team welcomes reports from security researchers and experts. If you have discovered a potential security vulnerability in the Surya OneID platform, please report it to us securely. We will investigate all legitimate reports and make every effort to quickly resolve any issues.
          </p>
          <a href="mailto:security@suryagroup.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors font-medium">
            Contact Security Team
          </a>
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
      className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
}

function PracticeCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 border border-white/10 rounded-2xl bg-black hover:border-white/20 transition-colors">
      <Icon className="w-8 h-8 text-gray-400 mb-4" />
      <h4 className="text-lg font-medium text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function TimelineItem({ icon: Icon, title, desc, align }: { icon: any, title: string, desc: string, align: 'left' | 'right' }) {
  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] relative z-10 ml-[2px] md:ml-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <motion.div 
        initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
      >
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </motion.div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-black hover:bg-white/[0.02] transition-colors text-left"
      >
        <span className="font-medium text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 pt-0 bg-black text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-1">
          {answer}
        </div>
      )}
    </div>
  );
}
