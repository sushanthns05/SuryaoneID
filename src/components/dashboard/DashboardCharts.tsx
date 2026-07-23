'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export function DashboardCharts() {
  // Mock data for the chart (e.g., Logins over 7 days)
  const data = [
    { day: 'Mon', value: 40 },
    { day: 'Tue', value: 65 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 45 },
    { day: 'Sat', value: 20 },
    { day: 'Sun', value: 90 },
  ];
  
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          Activity Overview
        </h3>
        <select className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-1 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-48 flex items-end justify-between gap-2 px-2">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={item.day} className="flex flex-col items-center flex-1 group">
              <div className="w-full relative h-full flex flex-col justify-end pb-2 group-hover:brightness-125 transition-all">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0a0f24] border border-white/10 text-xs font-bold text-white px-2 py-1 rounded-md pointer-events-none transition-opacity z-10">
                  {item.value}
                </div>
                
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                  className="w-full bg-gradient-to-t from-blue-600/20 to-blue-400 rounded-t-md relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
