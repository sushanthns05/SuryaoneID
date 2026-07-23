'use client';

import { motion } from 'framer-motion';
import { Folder, FileText, Download, Eye, Clock, Search, Filter } from 'lucide-react';

const folders = [
  { name: 'Certificates', count: 4, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Employee Documents', count: 12, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Training Records', count: 7, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'Contracts', count: 2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const documents = [
  { id: 1, name: 'Offer Letter - 2024.pdf', type: 'Employee Documents', size: '245 KB', date: '12 Jan 2024' },
  { id: 2, name: 'Information Security Training.cert', type: 'Certificates', size: '1.2 MB', date: '15 Feb 2024' },
  { id: 3, name: 'NDA - Surya Group.pdf', type: 'Contracts', size: '450 KB', date: '10 Jan 2024' },
  { id: 4, name: 'Annual Health Record.pdf', type: 'Medical Records (Organization)', size: '3.4 MB', date: '01 Mar 2024' },
  { id: 5, name: 'Project Alpha Clearance.pdf', type: 'Projects', size: '150 KB', date: '20 Mar 2024' },
];

export default function Vault() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Vault</h1>
          <p className="text-slate-400">Secure storage for your organizational records</p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search vault..." 
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Folders Section */}
      <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {folders.map((folder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 cursor-pointer group hover:-translate-y-1 transition-all"
          >
            <div className={`p-3 rounded-xl w-fit mb-4 ${folder.bg}`}>
              <Folder className={`w-8 h-8 ${folder.color}`} />
            </div>
            <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">{folder.name}</h3>
            <p className="text-sm text-slate-400">{folder.count} files</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Documents */}
      <h2 className="text-xl font-semibold mb-6">Recent Documents</h2>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-sm text-slate-400">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Category</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Size</th>
                <th className="px-6 py-4 font-medium">Modified</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-slate-400">
                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-slate-400">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 flex items-center">
                    <Clock className="w-3 h-3 mr-2" />
                    {doc.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
