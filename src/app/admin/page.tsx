'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, doc, updateDoc, orderBy, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Clock, Eye, AlertCircle, X } from 'lucide-react';

interface Application {
  id: string;
  userId: string;
  credentialType: string;
  status: string;
  submittedAt: any;
  applicantName: string;
  email: string;
  credentialData?: Record<string, string>;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewingApp, setViewingApp] = useState<Application | null>(null);

  useEffect(() => {
    // Basic protection (Rules should handle real security)
    if (!user || user.role !== 'admin') {
      setError('Unauthorized access. Admin privileges required.');
      setIsLoading(false);
      return;
    }
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'applications'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const apps: Application[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(apps);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch applications. Ensure you have admin access.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, status: string) => {
    try {
      const app = applications.find(a => a.id === applicationId);
      if (!app) return;

      const appRef = doc(db, 'applications', applicationId);
      
      if (status === 'Approved') {
        const response = await fetch('/api/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationId,
            adminUid: user?.uid
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to approve application via API');
        }
      } else {
        // For Rejection, just update status directly
        await updateDoc(appRef, { status, updatedAt: new Date() });
      }
      setApplications(apps => apps.map(a => a.id === applicationId ? { ...a, status } : a));
      if (viewingApp?.id === applicationId) {
        setViewingApp({ ...viewingApp, status });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 border-red-500/20 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            Admin Control Center
          </h1>
          <p className="text-slate-400">Manage identity applications and organizational approvals.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-mono text-blue-400">
          Admin: {user?.email}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No applications found.</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{app.applicantName}</div>
                      <div className="text-sm text-slate-400">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-blue-400 tracking-wide">{app.credentialType}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {app.submittedAt?.toDate().toLocaleDateString() || 'Just now'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {app.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {app.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                        {app.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {app.status === 'Pending' && (
                          <>
                            <button onClick={() => updateStatus(app.id, 'Approved')} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button onClick={() => updateStatus(app.id, 'Rejected')} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Reject">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button onClick={() => setViewingApp(app)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {viewingApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-lg p-8 relative"
            >
              <button 
                onClick={() => setViewingApp(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Application Details</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-slate-400">Applicant Name</p>
                  <p className="text-lg font-medium text-white">{viewingApp.applicantName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email Address</p>
                  <p className="text-lg font-medium text-white">{viewingApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Requested Credential</p>
                  <p className="text-lg font-bold text-blue-400">{viewingApp.credentialType}</p>
                </div>

                {viewingApp.credentialData && Object.keys(viewingApp.credentialData).length > 0 && (
                  <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-sm font-bold text-slate-300 uppercase mb-3">Credential Specific Data</h3>
                    <div className="space-y-3">
                      {Object.entries(viewingApp.credentialData).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-slate-500 uppercase">{key}</p>
                          <p className="font-medium text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {viewingApp.status === 'Pending' && (
                <div className="flex gap-4">
                  <button 
                    onClick={() => updateStatus(viewingApp.id, 'Rejected')}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => updateStatus(viewingApp.id, 'Approved')}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
                  >
                    Approve Issue
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
