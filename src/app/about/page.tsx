import { Shield, Info, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Surya OneID</h1>
            <p className="text-blue-400 text-xl font-medium">One Identity. Infinite Possibilities.</p>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2rem] prose prose-invert prose-cyan max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-300 prose-li:text-slate-300">
          
          <p className="text-lg leading-relaxed">
            Surya OneID is the official digital identity and credential platform developed by Surya Group of Industries to provide a secure, modern, and unified identity experience across the Surya ecosystem. Built with enterprise-grade security and cutting-edge technology, Surya OneID enables customers to manage their organizational identities, digital credentials, memberships, certificates, and other authorized records through a single, trusted platform.
          </p>

          <p className="text-lg leading-relaxed">
            Designed with simplicity, privacy, and security at its core, Surya OneID offers a seamless digital experience where users can securely access, store, verify, and share their credentials anytime and anywhere. Every credential issued through the platform includes advanced security features such as encrypted storage, QR-based verification, digital signatures, audit logging, and multi-layer authentication to ensure authenticity and protect against unauthorized access.
          </p>

          <p className="text-lg leading-relaxed">
            Our mission is to simplify digital identity management while maintaining the highest standards of security, transparency, and user trust. Whether you're managing memberships, professional credentials, academic certificates, employee records, or customer services within the Surya ecosystem, Surya OneID provides a centralized platform designed for reliability, convenience, and long-term scalability.
          </p>

          <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/20 border border-white/10">
            <h2 className="!mt-0">Our Vision</h2>
            <p className="m-0 text-slate-200">
              To build a trusted, secure, and intelligent digital identity ecosystem that empowers every individual and organization within the Surya Group by making identity management simple, accessible, and future-ready.
            </p>
          </div>

          <h2>Our Mission</h2>
          <ul className="space-y-2">
            <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 shrink-0" /> <span>Deliver a unified digital identity for every Surya customer.</span></li>
            <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 shrink-0" /> <span>Protect user information through advanced security technologies.</span></li>
            <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 shrink-0" /> <span>Provide fast and reliable credential verification.</span></li>
            <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 shrink-0" /> <span>Simplify access to Surya services with a single identity.</span></li>
            <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 shrink-0" /> <span>Continuously innovate to create a world-class digital experience.</span></li>
          </ul>

          <h2>Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 mb-8">
            <ul className="!mt-0 !mb-0 space-y-2">
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Secure Digital Identity</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Digital Credential Wallet</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>QR Code Verification</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Encrypted Document Vault</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Digital Signature Validation</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Multi-Factor Authentication</span></li>
            </ul>
            <ul className="!mt-0 !mb-0 space-y-2">
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Secure Credential Sharing</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Real-Time Verification</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Cloud-Based Access</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Cross-Platform Compatibility</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Privacy-First Architecture</span></li>
              <li className="flex items-center"><Shield className="w-4 h-4 text-slate-400 mr-2 shrink-0" /> <span>Enterprise-Grade Security</span></li>
            </ul>
          </div>

          <h2>Security & Privacy</h2>
          <p>
            Security is the foundation of Surya OneID. We employ modern encryption standards, secure authentication mechanisms, continuous monitoring, and rigorous access controls to help safeguard user information. Our platform is designed with a privacy-first approach, ensuring that personal information is handled responsibly and protected throughout its lifecycle.
          </p>

          <h2>Our Commitment</h2>
          <p>
            At Surya Group of Industries, we are committed to delivering innovative digital solutions that prioritize customer trust, security, and convenience. Surya OneID represents our vision of a connected digital future—where every customer can confidently manage their organizational credentials through one secure identity.
          </p>

          <div className="bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 rounded-2xl p-6 my-10 flex items-start space-x-4">
            <Info className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="!text-red-400 !mt-0 !mb-2 !text-xl">Important Notice</h2>
              <p className="text-red-200/80 m-0 text-sm">
                Surya OneID is a private organizational digital identity platform operated by Surya Group of Industries. All identities and credentials issued through this platform are intended for use anywhere and anytime and affiliated services only. Surya OneID is not affiliated with any government authority but it can serve as an alternative to government-issued identity documents such as Aadhaar, PAN, Passport, Driving Licence, or Voter ID. Users can continue to use official government-issued documents or Surya OneID wherever required by applicable laws or regulations.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
