import Link from 'next/link';
import { Shield, Info, Globe, MessageCircle, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040610] pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <span className="text-xl font-bold tracking-wider text-white">SURYA</span>
                <span className="text-xl font-light text-blue-400"> OneID</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The world-class digital identity customer portal, engineered exclusively for the Surya Group of Industries ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-full transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-full transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-full transition-colors"><Code className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Products</h3>
            <ul className="space-y-4">
              <li><Link href="/my-oneid" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Digital Wallet</Link></li>
              <li><Link href="/vault" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Document Vault</Link></li>
              <li><Link href="/verify" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Verification Portal</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Applications</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">About Surya Group</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Security</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Contact</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Developers</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">API Documentation</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">SDKs</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">GitHub Repository</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Support Tickets</Link></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer */}
        <div className="bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="p-3 bg-red-500/20 rounded-xl shrink-0">
            <Info className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-sm text-red-200/80 leading-relaxed flex-1">
            <strong className="text-red-400 font-semibold tracking-wide">LEGAL NOTICE:</strong> Surya OneID and all credentials issued through this platform are private organizational credentials issued by Surya Group of Industries for use within its own ecosystem. They are not government-issued identity documents and do not replace official documents such as Aadhaar, PAN, Passport, Driving Licence, or Voter ID.
          </p>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Surya Group of Industries. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
