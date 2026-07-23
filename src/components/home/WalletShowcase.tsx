'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, QrCode } from 'lucide-react';

const cards = [
  { id: 1, type: 'Customer Identity', color: 'from-blue-600 to-blue-900', label: 'SCID' },
  { id: 2, type: 'Membership Card', color: 'from-purple-600 to-purple-900', label: 'SMC' },
  { id: 3, type: 'Access Badge', color: 'from-emerald-600 to-emerald-900', label: 'Badge' },
];

export function WalletShowcase() {
  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Digital Wallet, Redefined.</h2>
          <p className="text-slate-400 text-lg mb-8">Access all your Surya credentials in a beautiful, Apple Wallet style interface. Swipe, tap, and share securely with zero friction.</p>
          
          <ul className="space-y-4 mb-8">
            {['Instantly accessible offline via PWA.', 'Cryptographically signed for zero fraud.', 'One-tap sharing with organizational partners.'].map((item, i) => (
              <li key={i} className="flex items-center text-slate-300">
                <ShieldCheck className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-1/2 relative h-[400px] w-full max-w-md flex justify-center items-center perspective-1000">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ rotateX: 10, y: 50, opacity: 0 }}
              whileInView={{ 
                rotateX: 0, 
                y: index * -20, 
                z: index * -30,
                scale: 1 - (index * 0.05),
                opacity: 1 - (index * 0.15)
              }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: (index * -20) - 20,
                rotateX: 5,
                scale: 1 - (index * 0.05) + 0.02,
                cursor: 'pointer'
              }}
              className={`absolute w-full max-w-[340px] aspect-[1.6/1] rounded-[24px] bg-gradient-to-br ${card.color} p-6 border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden`}
              style={{ zIndex: 30 - index }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">{card.label}</div>
                  <div className="text-white font-bold text-xl">{card.type}</div>
                </div>
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <div className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Credential Number</div>
                  <div className="text-white font-mono text-sm tracking-widest">SOID-XXXX-{8921 + index}</div>
                </div>
                <div className="p-1 bg-white rounded-lg">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
