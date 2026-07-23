'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, User, Building, GraduationCap, Briefcase, Users, HeartHandshake, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, UploadCloud } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const accountTypes = [
  { id: 'customer', title: 'Customer', icon: User, desc: 'Personal OneID for retail customers' },
  { id: 'employee', title: 'Employee', icon: Briefcase, desc: 'Corporate identity for Surya staff' },
  { id: 'student', title: 'Student', icon: GraduationCap, desc: 'Academic credentials for institutions' },
  { id: 'vendor', title: 'Vendor', icon: Building, desc: 'B2B identity for suppliers' },
  { id: 'partner', title: 'Partner', icon: PartnerIcon, desc: 'Strategic partner access' },
  { id: 'member', title: 'Member', icon: Users, desc: 'Club and community memberships' },
];

function PartnerIcon(props: any) {
  return <HeartHandshake {...props} />;
}

export default function CreateOneID() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState('');
  
  // Step 2
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '', dob: '', address: '' });
  const [authError, setAuthError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Step 3
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Step 4 & 5
  const [photo, setPhoto] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  // Step 6
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const router = useRouter();

  // Watch for email verification
  useEffect(() => {
    let interval: any;
    if (step === 3) {
      interval = setInterval(async () => {
        if (auth.currentUser) {
          await auth.currentUser.reload();
          if (auth.currentUser.emailVerified) {
            setIsEmailVerified(true);
            clearInterval(interval);
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 7));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (formData.password !== formData.confirm) {
      setAuthError('Passwords do not match');
      return;
    }
    setIsCreating(true);
    try {
      // Create user
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update Auth Profile
      await updateProfile(userCred.user, { displayName: formData.name });
      
      // Create initial Firestore Profile
      await setDoc(doc(db, 'users', userCred.user.uid), {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        role: 'customer',
        createdAt: serverTimestamp()
      });

      // Send Verification
      await sendEmailVerification(userCred.user);
      
      nextStep();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('An account with this email already exists.');
      } else {
        setAuthError(err.message);
      }
    } finally {
      setIsCreating(false);
    }
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

  const processFile = async (file: File): Promise<string> => {
    if (file.type.startsWith('image/')) {
      return await compressImage(file);
    } else if (file.type === 'application/pdf') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    } else {
      throw new Error("Unsupported file type");
    }
  };

  const handleUploadsAndProceed = async () => {
    setIsSubmitting(true);
    try {
      let pUrl = '';
      let dUrl = '';
      if (photo) pUrl = await processFile(photo);
      if (document) dUrl = await processFile(document);
      
      setPhotoUrl(pUrl);
      setDocumentUrl(dUrl);
      nextStep();
    } catch (err) {
      console.error(err);
      alert('Failed to process file. Please ensure it is an image or PDF.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not logged in');

      const appRef = doc(db, 'applications', user.uid); // Simplified: 1 app per user
      await setDoc(appRef, {
        userId: user.uid,
        accountType,
        applicantName: formData.name,
        applicantEmail: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        photoUrl,
        documentUrl,
        status: 'Pending',
        submittedAt: serverTimestamp()
      });

      setApplicationId(appRef.id);
      nextStep();
    } catch (err) {
      console.error(err);
      alert('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        
        {/* Progress Bar */}
        {step < 7 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <div className="glass-card p-8 md:p-10 border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait" custom={1}>
            
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Choose Account Type</h2>
                  <p className="text-slate-400">Select the type of OneID you are applying for.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  {accountTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAccountType(type.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${accountType === type.id ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <type.icon className={`w-6 h-6 mb-3 ${accountType === type.id ? 'text-blue-400' : 'text-slate-400'}`} />
                      <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                      <p className="text-xs text-slate-400">{type.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={nextStep} disabled={!accountType} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center">
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.form key="step2" onSubmit={handleAccountCreation} variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Account Creation</h2>
                  <p className="text-slate-400">Enter your primary contact information.</p>
                </div>
                
                {authError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col justify-center text-sm text-red-400">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 shrink-0" /> 
                      <span>{authError}</span>
                    </div>
                    {authError.includes('already exists') && (
                      <Link href="/sign-in" className="mt-2 text-blue-400 hover:text-blue-300 underline font-medium ml-6">
                        Click here to Sign In instead
                      </Link>
                    )}
                  </div>
                )}

                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Legal Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none" placeholder="As per government ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none" placeholder="name@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none" placeholder="+91" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                      <input required minLength={8} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Confirm</label>
                      <input required minLength={8} type="password" value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={prevStep} className="text-slate-400 hover:text-white px-6 py-2.5 rounded-xl font-medium flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                  </button>
                  <button type="submit" disabled={isCreating} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium flex items-center">
                    {isCreating ? 'Creating...' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: Email Verification */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
                <p className="text-slate-400 mb-8 max-w-sm">
                  We've sent a verification link to <strong>{formData.email}</strong>. Please check your inbox and click the link to continue.
                </p>
                
                {isEmailVerified ? (
                  <div className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl border border-green-500/30 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Email Verified
                  </div>
                ) : (
                  <div className="flex items-center text-blue-400">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full mr-3" />
                    Waiting for verification...
                  </div>
                )}

                <div className="w-full mt-auto flex justify-end pt-8">
                  <button onClick={nextStep} disabled={!isEmailVerified} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 px-6 py-2.5 rounded-xl font-medium flex items-center">
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 & 5 Combined Form */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Profile & Documents</h2>
                  <p className="text-slate-400">Complete your profile to proceed.</p>
                </div>
                
                <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                      <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Profile Photo</label>
                      <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-2 px-4 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Residential Address</label>
                    <textarea rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Full address" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Identity Document (PDF/Image)</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                      <input type="file" onChange={e => setDocument(e.target.files?.[0] || null)} className="w-full text-center text-sm text-slate-400 file:hidden" />
                      {document && <p className="text-green-400 text-sm mt-2 font-medium">{document.name}</p>}
                    </div>
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={handleUploadsAndProceed} disabled={isSubmitting || !formData.dob || !photo || !document} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 px-6 py-2.5 rounded-xl font-medium flex items-center">
                    {isSubmitting ? 'Uploading...' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Review */}
            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Review Application</h2>
                  <p className="text-slate-400">Ensure all details are correct before submission.</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 mb-6">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400">Account Type</span>
                    <span className="text-white capitalize">{accountType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400">Applicant Name</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400">Email</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400">Phone</span>
                    <span className="text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Documents</span>
                    <span className="text-green-400 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1" /> Uploaded</span>
                  </div>
                </div>

                <div className="mt-auto flex justify-between">
                  <button onClick={prevStep} className="text-slate-400 hover:text-white px-6 py-2.5 rounded-xl font-medium flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                  </button>
                  <button onClick={submitApplication} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 px-6 py-2.5 rounded-xl font-medium flex items-center">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'} <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: Success */}
            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={1} className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 1, bounce: 0.5 }}
                  className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Application Submitted!</h2>
                <p className="text-slate-400 mb-8 max-w-sm">Your application for Surya OneID is under review by our administrators.</p>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-sm mb-8 text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Application ID</p>
                  <p className="font-mono text-white text-sm">{applicationId || 'PND-827361'}</p>
                </div>

                <button onClick={() => router.push('/my-oneid')} className="w-full max-w-sm bg-white text-black hover:bg-slate-200 font-bold py-4 rounded-xl transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Go to My Dashboard
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
