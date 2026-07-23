'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Shield, Clock, CheckCircle2, XCircle, AlertCircle, Calendar, FileText, Activity } from 'lucide-react';
import { CREDENTIAL_SCHEMAS } from '@/lib/credential-schema';

export default function ApplicationTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      if (!auth.currentUser) {
        router.push('/sign-in');
        return;
      }

      try {
        const docRef = doc(db, 'applications', params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Ensure user owns this application, or they are an admin. For simplicity, just check ownership here.
          if (data.userId === auth.currentUser.uid) {
            setAppData(data);
          } else {
            // Check if admin
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.data()?.role === 'admin') {
              setAppData(data);
            } else {
              router.push('/applications');
            }
          }
        } else {
          router.push('/applications');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    // Slight delay to allow auth state to resolve
    const timer = setTimeout(() => {
      fetchApp();
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.id, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!appData) return null;

  const schema = CREDENTIAL_SCHEMAS[appData.credentialType];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Submitted': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Under Review': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Additional Information Required': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Credential Issued': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved':
      case 'Credential Issued': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'Additional Information Required': return <AlertCircle className="w-5 h-5 text-orange-400" />;
      case 'Under Review': return <Activity className="w-5 h-5 text-amber-400" />;
      default: return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Application Tracking</h1>
            <p className="text-slate-400 text-sm">Application ID: <span className="font-mono text-white">{appData.applicationId}</span></p>
          </div>
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-medium ${getStatusColor(appData.status)}`}>
            {getStatusIcon(appData.status)}
            {appData.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{schema?.name || appData.credentialType}</h2>
                  <p className="text-slate-400 text-sm">Credential Type</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Applicant Name</p>
                  <p className="text-white">{appData.applicantName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Submission Date</p>
                  <p className="text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {appData.submittedAt ? new Date(appData.submittedAt.toDate()).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-white">{appData.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-white">{appData.phone}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Provided Data Summary</h3>
              <div className="space-y-4">
                {Object.entries(appData.formData).map(([key, value]) => {
                  if (key === 'declaration' || key === 'firstName' || key === 'lastName' || key === 'email' || key === 'phone') return null;
                  const label = schema?.fields.find(f => f.id === key)?.label || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex flex-col md:flex-row md:justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-slate-400 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-6">Status Timeline</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {appData.trackingTimeline?.map((event: any, index: number) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-500 group-[.is-active]:bg-blue-500/20 group-[.is-active]:text-blue-400 group-[.is-active]:border-blue-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow flex-shrink-0 z-10">
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-white text-sm">{event.status}</div>
                        <time className="text-xs font-medium text-slate-500">{new Date(event.timestamp).toLocaleDateString()}</time>
                      </div>
                      <div className="text-slate-400 text-xs">{event.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {appData.status === 'Additional Information Required' && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                <div className="flex gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400 shrink-0" />
                  <div>
                    <h4 className="text-orange-400 font-bold mb-1">Action Required</h4>
                    <p className="text-slate-300 text-sm text-balance">The review team has requested additional information. Please check your email for instructions on how to update your application.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
