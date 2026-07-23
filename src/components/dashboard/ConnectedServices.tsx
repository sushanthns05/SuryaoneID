'use client';

import { motion } from 'framer-motion';
import { Building2, Landmark, Stethoscope, Laptop, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

const services = [
  { id: 1, name: 'Surya Technologies', icon: Laptop, color: 'text-blue-400', bg: 'bg-blue-500/20', status: 'Connected' },
  { id: 2, name: 'Surya Bank', icon: Landmark, color: 'text-indigo-400', bg: 'bg-indigo-500/20', status: 'Connected' },
  { id: 3, name: 'Surya Healthcare', icon: Stethoscope, color: 'text-teal-400', bg: 'bg-teal-500/20', status: 'Action Needed' },
  { id: 4, name: 'Surya Finance', icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/20', status: 'Connected' },
  { id: 5, name: 'Surya University', icon: GraduationCap, color: 'text-orange-400', bg: 'bg-orange-500/20', status: 'Not Connected' },
  { id: 6, name: 'Surya Real Estate', icon: Building2, color: 'text-cyan-400', bg: 'bg-cyan-500/20', status: 'Connected' },
];

export function ConnectedServices() {
  return (
    <div className="glass-card p-6 md:p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Connected Services</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">Manage</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className={`p-3 rounded-lg ${service.bg} mr-4 group-hover:scale-110 transition-transform`}>
              <service.icon className={`w-5 h-5 ${service.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{service.name}</h4>
              <div className="flex items-center mt-1">
                {service.status === 'Connected' ? (
                  <span className="text-[10px] uppercase tracking-wider text-green-400 flex items-center font-medium">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> SSO Active
                  </span>
                ) : service.status === 'Action Needed' ? (
                  <span className="text-[10px] uppercase tracking-wider text-yellow-400 font-medium">
                    Setup Required
                  </span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                    Link Account
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
