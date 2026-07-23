'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const timeline = [
  { step: 1, title: 'Create OneID', desc: 'Register with your organizational details.' },
  { step: 2, title: 'Verification', desc: 'Identity is verified by administrators.' },
  { step: 3, title: 'Credential Issued', desc: 'Digital ID is cryptographically signed.' },
  { step: 4, title: 'Stored Securely', desc: 'Encrypted and stored in your vault.' },
  { step: 5, title: 'Digital Wallet', desc: 'Access instantly via web or mobile.' },
];

const faqs = [
  { q: 'How do I create a Surya OneID?', a: 'You must be invited by an administrator or apply through the Applications portal with your organizational details.' },
  { q: 'How do I verify credentials?', a: 'Use the Verify portal to scan the QR code on any credential or manually enter the SOID number.' },
  { q: 'How secure is my information?', a: 'We use military-grade AES-256 encryption. Your private keys never leave your secure enclave.' },
  { q: 'How do I recover my account?', a: 'Contact your department administrator or use the automated biometric recovery process if enrolled.' },
];

export function TimelineFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 w-full bg-[#060918]/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/50 before:to-transparent">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0f24] text-blue-400 font-bold group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-4 rounded-xl group-hover:border-white/20 transition-colors">
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden border border-white/5"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-medium text-slate-200">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
