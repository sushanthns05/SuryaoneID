'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Shield, ChevronRight, ChevronLeft, Upload, File as FileIcon, X, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { CREDENTIAL_SCHEMAS, CredentialSchema } from '@/lib/credential-schema';

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  
  const [schema, setSchema] = useState<CredentialSchema | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [documents, setDocuments] = useState<Record<string, string>>({}); // Base64 strings
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  useEffect(() => {
    if (type && CREDENTIAL_SCHEMAS[type]) {
      setSchema(CREDENTIAL_SCHEMAS[type]);
    } else {
      router.push('/applications');
    }
  }, [type, router]);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/sign-in');
      return;
    }
    // Load draft
    const draft = localStorage.getItem(`draft_${auth.currentUser.uid}_${type}`);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed.formData || {});
        setDocuments(parsed.documents || {});
      } catch (e) {
        console.error('Failed to load draft');
      }
    }
  }, [type, router]);

  // Auto-save draft
  useEffect(() => {
    if (auth.currentUser && schema && Object.keys(formData).length > 0) {
      const uid = auth.currentUser.uid;
      const timer = setTimeout(() => {
        localStorage.setItem(`draft_${uid}_${type}`, JSON.stringify({ formData, documents }));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, documents, type, schema]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadId) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select a file under 5MB.");
      return;
    }

    try {
      if (file.type.startsWith('image/')) {
        const base64 = await compressImage(file);
        setDocuments(prev => ({ ...prev, [activeUploadId]: base64 }));
      } else if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setDocuments(prev => ({ ...prev, [activeUploadId]: reader.result as string }));
        };
      } else {
        alert("Unsupported file type. Please upload an image or PDF.");
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Failed to process file.');
    }
  };

  const removeDocument = (id: string) => {
    const newDocs = { ...documents };
    delete newDocs[id];
    setDocuments(newDocs);
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.addressLine1 && formData.city && formData.state && formData.zipCode;
    }
    if (step === 3 && schema) {
      for (const field of schema.fields) {
        if (field.required && !formData[field.id]) return false;
      }
      return true;
    }
    if (step === 4 && schema) {
      for (const doc of schema.documents) {
        if (doc.required && !documents[doc.id]) return false;
      }
      return true;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!auth.currentUser || !schema) return;
    setIsSubmitting(true);
    setStatusMessage('Securing application data...');

    try {
      const year = new Date().getFullYear();
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const applicationId = `APP-${type}-${year}-${randomId}`;

      const applicationData = {
        applicationId,
        userId: auth.currentUser.uid,
        credentialType: type,
        status: 'Submitted',
        applicantName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        formData,
        documents, // Base64 stored directly
        submittedAt: serverTimestamp(),
        trackingTimeline: [
          { status: 'Submitted', timestamp: new Date().toISOString(), note: 'Application received' }
        ]
      };

      await setDoc(doc(db, 'applications', applicationId), applicationData);
      
      // Clear draft
      localStorage.removeItem(`draft_${auth.currentUser.uid}_${type}`);
      
      router.push(`/applications/${applicationId}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!schema) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      
      <div className="mb-10 flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            {schema.name} Application
          </h1>
          <p className="text-slate-400 mt-2">{schema.description}</p>
        </div>
        <AnimatePresence>
          {isSaved && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
              <Save className="w-4 h-4" /> Draft Saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="glass-card p-6 md:p-10 relative z-10">
        {/* Progress Tracker */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
          
          {['Identity', 'Address', 'Details', 'Documents', 'Review'].map((label, idx) => {
            const s = idx + 1;
            const isActive = step === s;
            const isCompleted = step > s;
            return (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] border-2 border-blue-400' : isCompleted ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 border border-white/10'}`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                <span className={`absolute -bottom-6 text-xs whitespace-nowrap font-medium ${isActive ? 'text-blue-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">Applicant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Legal First Name <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.firstName || ''} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Legal Last Name <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.lastName || ''} onChange={(e) => handleInputChange('lastName', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" value={formData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" value={formData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
                    <input type="date" value={formData.dob || ''} onChange={(e) => handleInputChange('dob', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6">Residential Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Address Line 1 <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.addressLine1 || ''} onChange={(e) => handleInputChange('addressLine1', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="123 Main St" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Address Line 2 (Optional)</label>
                    <input type="text" value={formData.addressLine2 || ''} onChange={(e) => handleInputChange('addressLine2', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Apt 4B" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">City <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.city || ''} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="New York" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">State / Province <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.state || ''} onChange={(e) => handleInputChange('state', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="NY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">ZIP / Postal Code <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.zipCode || ''} onChange={(e) => handleInputChange('zipCode', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="10001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Country <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.country || 'United States'} onChange={(e) => handleInputChange('country', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6">Credential Details</h2>
                <div className="grid grid-cols-1 gap-6">
                  {schema.fields.map(field => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select 
                          value={formData[field.id] || ''} 
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select an option</option>
                          {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.id] || ''} 
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
                        />
                      ) : (
                        <input 
                          type={field.type} 
                          value={formData[field.id] || ''} 
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-2">Supporting Documents</h2>
                <p className="text-slate-400 text-sm mb-6">Please provide clear, legible copies of the requested documents. Max 5MB per file.</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={handleFileUpload} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schema.documents.map(docReq => (
                    <div key={docReq.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-medium flex items-center gap-2">
                            {docReq.label} {docReq.required && <span className="text-red-500 text-xs px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">Required</span>}
                          </h3>
                          <p className="text-slate-400 text-xs mt-1">{docReq.description}</p>
                        </div>
                        {documents[docReq.id] && (
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      
                      {documents[docReq.id] ? (
                        <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/50 aspect-video flex items-center justify-center">
                          {documents[docReq.id].startsWith('data:image') ? (
                            <img src={documents[docReq.id]} alt={docReq.label} className="w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity" />
                          ) : (
                            <div className="text-center">
                              <FileIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                              <span className="text-sm text-slate-300">PDF Document</span>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => removeDocument(docReq.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full mr-2">
                              <X className="w-5 h-5" />
                            </button>
                            <button onClick={() => { setActiveUploadId(docReq.id); fileInputRef.current?.click(); }} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                              <Upload className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => { setActiveUploadId(docReq.id); fileInputRef.current?.click(); }}
                          className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group"
                        >
                          <Upload className="w-8 h-8 text-slate-500 group-hover:text-blue-400 mx-auto mb-3 transition-colors" />
                          <p className="text-sm text-slate-300 font-medium mb-1">Click to upload</p>
                          <p className="text-xs text-slate-500">JPG, PNG, or PDF</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Review Application</h2>
                <p className="text-slate-400 text-sm">Please review your information carefully before submitting. Providing false information may lead to credential revocation.</p>
                
                <div className="bg-slate-900/50 rounded-xl border border-white/5 p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Applicant</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-slate-400 block">Name</span><span className="text-white">{formData.firstName} {formData.lastName}</span></div>
                      <div><span className="text-slate-400 block">Email</span><span className="text-white">{formData.email}</span></div>
                      <div><span className="text-slate-400 block">Phone</span><span className="text-white">{formData.phone}</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Address</h3>
                    <p className="text-white text-sm">
                      {formData.addressLine1} {formData.addressLine2 && `, ${formData.addressLine2}`}<br/>
                      {formData.city}, {formData.state} {formData.zipCode}<br/>
                      {formData.country}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Credential Data</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {schema.fields.map(f => (
                        <div key={f.id}><span className="text-slate-400 block">{f.label}</span><span className="text-white">{formData[f.id] || 'N/A'}</span></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Documents Attached</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(documents).map(docId => {
                        const def = schema.documents.find(d => d.id === docId);
                        return def ? <span key={docId} className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs">{def.label}</span> : null;
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <input type="checkbox" id="declaration" className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" checked={formData.declaration} onChange={(e) => handleInputChange('declaration', e.target.checked)} />
                  <label htmlFor="declaration" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
                    I declare that all information provided in this application is true, accurate, and complete. I understand that the Surya Identity Authority will process my data in accordance with the Privacy Policy.
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between pt-6 border-t border-white/10">
          <button 
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1 || isSubmitting}
            className="px-6 py-2.5 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 5 ? (
            <button 
              onClick={() => setStep(s => s + 1)}
              disabled={!validateStep()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={!formData.declaration || isSubmitting}
              className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {statusMessage}
                </>
              ) : (
                <>Submit Application <CheckCircle2 className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
