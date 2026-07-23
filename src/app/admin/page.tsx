'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Clock, Eye, AlertCircle, X, Search, FileText, CheckCircle2, Loader2, Filter } from 'lucide-react';
import { CREDENTIAL_SCHEMAS } from '@/lib/credential-schema';

interface Application {
  id: string;
  applicationId: string;
  userId: string;
  credentialType: string;
  status: string;
  submittedAt: any;
  applicantName: string;
  email: string;
  phone: string;
  formData: Record<string, string>;
  documents: Record<string, string>;
  trackingTimeline: any[];
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
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

  const updateStatus = async (applicationId: string, status: string, note: string) => {
    setActionLoading(true);
    try {
      const app = applications.find(a => a.id === applicationId);
      if (!app) return;

      const appRef = doc(db, 'applications', applicationId);
      
      if (status === 'Approved') {
        const response = await fetch('/api/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ applicationId, adminUid: user?.uid })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to approve application via API');
        }
        
        // Wait for a second so Firestore triggers the route changes
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchApplications(); // Refresh to get timeline changes from backend
      } else {
        const newTimeline = [...(app.trackingTimeline || []), {
          status,
          timestamp: new Date().toISOString(),
          note
        }];

        await updateDoc(appRef, { status, updatedAt: new Date(), trackingTimeline: newTimeline });
        setApplications(apps => apps.map(a => a.id === applicationId ? { ...a, status, trackingTimeline: newTimeline } : a));
        if (viewingApp?.id === applicationId) {
          setViewingApp({ ...viewingApp, status, trackingTimeline: newTimeline } as Application);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    } finally {
      setActionLoading(false);
      if (status === 'Approved' || status === 'Rejected') setViewingApp(null);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.applicationId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Application Processing Center
          </h1>
          <p className="text-slate-400">Manage and review credential applications.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card p-4 mb-8 flex flex-col md:flex-row gap-4 relative z-10">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">New (Submitted)</option>
            <option value="Under Review">Under Review</option>
            <option value="Additional Information Required">Needs Info</option>
            <option value="Credential Issued">Issued</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden relative z-10 border border-white/10">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading applications...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-white font-medium text-lg mb-1">No applications found</p>
            <p className="text-slate-400">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm">Application ID</th>
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm">Applicant</th>
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm">Type</th>
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm">Status</th>
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm">Submitted</th>
                  <th className="py-4 px-6 font-semibold text-slate-300 text-sm text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6 font-mono text-sm text-blue-400">{app.applicationId || app.id.slice(0, 8)}</td>
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{app.applicantName}</p>
                      <p className="text-slate-400 text-xs">{app.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-800 text-slate-300 border border-white/10 px-2 py-1 rounded text-xs font-bold">
                        {app.credentialType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Submitted' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                        app.status === 'Under Review' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                        app.status === 'Credential Issued' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                        app.status === 'Rejected' ? 'bg-red-400/10 text-red-400 border-red-400/20' :
                        'bg-orange-400/10 text-orange-400 border-orange-400/20'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {app.submittedAt ? new Date(app.submittedAt.toDate()).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => {
                          setViewingApp(app);
                          if (app.status === 'Submitted') updateStatus(app.id, 'Under Review', 'Application is being reviewed by an administrator.');
                        }}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {viewingApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto py-10"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-4xl p-0 relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur-xl z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Application Review</h2>
                  <p className="text-slate-400 text-sm font-mono">{viewingApp.applicationId || viewingApp.id}</p>
                </div>
                <button 
                  onClick={() => setViewingApp(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Data Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Applicant Identity</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-slate-400 text-xs block mb-1">Full Name</span><span className="text-white text-sm font-medium">{viewingApp.applicantName}</span></div>
                      <div><span className="text-slate-400 text-xs block mb-1">Email</span><span className="text-white text-sm font-medium">{viewingApp.email}</span></div>
                      <div><span className="text-slate-400 text-xs block mb-1">Phone</span><span className="text-white text-sm font-medium">{viewingApp.phone || 'N/A'}</span></div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Address</h3>
                    <p className="text-white text-sm leading-relaxed">
                      {viewingApp.formData?.addressLine1} {viewingApp.formData?.addressLine2}<br/>
                      {viewingApp.formData?.city}, {viewingApp.formData?.state} {viewingApp.formData?.zipCode}<br/>
                      {viewingApp.formData?.country}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">{CREDENTIAL_SCHEMAS[viewingApp.credentialType]?.name || viewingApp.credentialType} Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(viewingApp.formData || {}).map(([key, value]) => {
                        if (['firstName', 'lastName', 'email', 'phone', 'addressLine1', 'addressLine2', 'city', 'state', 'zipCode', 'country', 'declaration'].includes(key)) return null;
                        const label = CREDENTIAL_SCHEMAS[viewingApp.credentialType]?.fields.find(f => f.id === key)?.label || key;
                        return (
                          <div key={key}>
                            <span className="text-slate-400 text-xs block mb-1">{label}</span>
                            <span className="text-white text-sm font-medium">{String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Supporting Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(viewingApp.documents || {}).map(([key, base64]) => {
                        const label = CREDENTIAL_SCHEMAS[viewingApp.credentialType]?.documents.find(d => d.id === key)?.label || key;
                        const isImage = base64.startsWith('data:image');
                        return (
                          <div key={key} className="border border-white/10 rounded-lg overflow-hidden bg-black/50 group relative aspect-video">
                            {isImage ? (
                              <img src={base64} alt={label} className="w-full h-full object-cover opacity-80" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-slate-500" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <a href={base64} download={`${label}_${viewingApp.applicationId}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg">Download</a>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-3 py-1.5 text-xs text-white truncate">{label}</div>
                          </div>
                        );
                      })}
                      {Object.keys(viewingApp.documents || {}).length === 0 && <p className="text-slate-500 text-sm italic">No documents provided.</p>}
                    </div>
                  </div>
                </div>

                {/* Actions Column */}
                <div className="bg-slate-900/50 rounded-xl p-5 border border-white/5 flex flex-col sticky top-6 self-start space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Current Status</h3>
                    <div className={`px-4 py-2.5 rounded-lg border font-medium flex items-center gap-2 ${
                      viewingApp.status === 'Credential Issued' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      viewingApp.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {viewingApp.status === 'Credential Issued' ? <CheckCircle2 className="w-5 h-5" /> : 
                       viewingApp.status === 'Rejected' ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      {viewingApp.status}
                    </div>
                  </div>

                  {(viewingApp.status !== 'Credential Issued' && viewingApp.status !== 'Rejected') && (
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Actions</h3>
                      
                      <button 
                        onClick={() => updateStatus(viewingApp.id, 'Approved', 'Application verified and credential issued.')}
                        disabled={actionLoading}
                        className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-50"
                      >
                        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Approve & Issue Credential
                      </button>

                      <button 
                        onClick={() => updateStatus(viewingApp.id, 'Additional Information Required', 'Please provide a clearer photo of your ID and address proof.')}
                        disabled={actionLoading}
                        className="w-full py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <AlertCircle className="w-5 h-5" />
                        Request More Info
                      </button>

                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to reject this application?')) {
                            updateStatus(viewingApp.id, 'Rejected', 'Application did not meet the requirements.');
                          }
                        }}
                        disabled={actionLoading}
                        className="w-full py-3 bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject Application
                      </button>
                    </div>
                  )}

                  {/* Declaration Audit */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-400 leading-tight">Digital declaration signed by {viewingApp.applicantName} on {new Date(viewingApp.submittedAt?.toDate()).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
