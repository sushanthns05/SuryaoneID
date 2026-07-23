'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Award, Key, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const cards = [
  {
    id: 1,
    type: 'Identity',
    title: 'Surya Employee ID',
    issuer: 'Surya Technologies',
    color: 'from-blue-600 to-indigo-800',
    icon: ShieldCheck,
    number: 'SEID-992-8172',
    date: '10/2028',
    z: 30,
  },
  {
    id: 2,
    type: 'Access',
    title: 'HQ Building Access',
    issuer: 'Surya Admin',
    color: 'from-purple-600 to-fuchsia-800',
    icon: Key,
    number: 'PASS-HQ-102',
    date: '01/2026',
    z: 20,
  },
  {
    id: 3,
    type: 'Membership',
    title: 'Surya Elite Club',
    issuer: 'Surya Group',
    color: 'from-amber-600 to-orange-800',
    icon: Award,
    number: 'ELITE-8812',
    date: 'Life',
    z: 10,
  },
];

export function DigitalWallet() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
          Digital Wallet
        </h3>
        {expandedId !== null && (
          <button 
            onClick={() => setExpandedId(null)}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Close Stack
          </button>
        )}
      </div>

      <div className="relative h-[300px] w-full max-w-sm mx-auto perspective-1000">
        {cards.map((card, index) => {
          const isExpanded = expandedId === card.id;
          const isStacked = expandedId === null;
          const Icon = card.icon;
          
          return (
            <motion.div
              key={card.id}
              onClick={() => setExpandedId(isExpanded ? null : card.id)}
              layout
              initial={false}
              animate={{
                top: isExpanded ? 0 : index * 40,
                scale: isExpanded ? 1.05 : 1 - (index * 0.05),
                zIndex: isExpanded ? 50 : card.z,
                opacity: expandedId !== null && !isExpanded ? 0 : 1,
                rotateX: isStacked ? 10 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`absolute w-full h-56 rounded-2xl p-6 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/20 bg-gradient-to-br ${card.color} overflow-hidden group`}
            >
              {/* Card Texture/Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 rounded-md text-white/90 backdrop-blur-sm">
                      {card.type}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">{card.title}</h4>
                    <p className="text-sm text-white/70">{card.issuer}</p>
                  </div>
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">ID Number</p>
                    <p className="font-mono text-white/90 font-medium tracking-wider">{card.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Valid Thru</p>
                    <p className="font-medium text-white/90">{card.date}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Back Face or Extra Detail (Simulated via AnimatePresence) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 bg-[#0a0f24]/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl"
                  >
                    <div className="bg-white p-2 rounded-xl mb-4">
                      <QRCodeSVG value={card.number} size={80} level="M" />
                    </div>
                    <p className="font-mono text-sm text-white mb-4">{card.number}</p>
                    <p className="text-xs text-slate-400 text-center mb-4">Show this QR code at any Surya facility for instant verification.</p>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors w-full border border-white/5">
                      View Full Details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
