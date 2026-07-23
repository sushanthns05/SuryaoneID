'use client';

import { motion } from 'framer-motion';
import { FilePlus, ShieldCheck, Wallet, FileText, KeyRound, LayoutGrid, HeadphonesIcon, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const services = [
  { title: 'Create Document', icon: <FilePlus className="w-8 h-8" />, color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/vault' },
  { title: 'Verify Credential', icon: <ShieldCheck className="w-8 h-8" />, color: 'text-green-400', bg: 'bg-green-500/10', link: '/verify' },
  { title: 'Digital Wallet', icon: <Wallet className="w-8 h-8" />, color: 'text-purple-400', bg: 'bg-purple-500/10', link: '/dashboard' },
  { title: 'Document Vault', icon: <FileText className="w-8 h-8" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: '/vault' },
  { title: 'Recover Account', icon: <KeyRound className="w-8 h-8" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', link: '#' },
  { title: 'Applications', icon: <LayoutGrid className="w-8 h-8" />, color: 'text-pink-400', bg: 'bg-pink-500/10', link: '#' },
  { title: 'Customer Support', icon: <HeadphonesIcon className="w-8 h-8" />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', link: '#' },
  { title: 'Security Center', icon: <ShieldAlert className="w-8 h-8" />, color: 'text-red-400', bg: 'bg-red-500/10', link: '#' },
];

export function QuickServices() {
  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Quick Services</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Everything you need to manage your Surya organizational identity, all in one place.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {services.map((service, index) => (
          <Link href={service.link} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 md:p-8 group relative overflow-hidden flex flex-col items-center justify-center text-center h-full border border-white/5 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-transparent group-hover:to-transparent transition-all duration-500"></div>
              
              <div className={`p-4 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${service.bg} ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors text-sm md:text-base">{service.title}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
