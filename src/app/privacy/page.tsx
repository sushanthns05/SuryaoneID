import { Shield, Info } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-lg">Surya OneID</p>
          <div className="text-sm text-slate-500 mt-4 space-y-1">
            <p>Effective Date: 22 July 2026</p>
            <p>Last Updated: 22 July 2026</p>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2rem] prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-300 prose-li:text-slate-300">
          <h2>1. Introduction</h2>
          <p>Welcome to Surya OneID, a private digital identity platform operated by Surya Group of Industries ("Surya", "we", "our", or "us").</p>
          <p>Surya OneID enables eligible users to create and manage digital identities, organizational credentials, memberships, certificates, access passes, and other credentials issued by Surya Group of Industries and its affiliated organizations.</p>
          <p>This Privacy Policy explains how we collect, use, store, protect, and disclose your information when you use our platform.</p>

          <div className="bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 rounded-2xl p-6 my-8 flex items-start space-x-4">
            <Info className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="!text-red-400 !mt-0 !mb-2 !text-xl">2. Important Notice</h2>
              <p className="text-red-200/80 m-0 text-sm">Surya OneID is a private organizational identity platform. Surya OneID is not affiliated with, endorsed by, or operated by any government authority.</p>
              <p className="text-red-200/80 m-0 mt-2 text-sm">Credentials issued through Surya OneID are organizational credentials and do not replace government-issued documents such as Aadhaar, PAN, Passport, Driving Licence, Voter ID, Birth Certificate, or Government-issued Certificates. Users should continue to obtain and use official government documents wherever legally required.</p>
            </div>
          </div>

          <h2>3. Information We Collect</h2>
          <p>We may collect:</p>
          <ul>
            <li><strong>Personal Information:</strong> Full Name, Date of Birth, Gender (optional), Photograph, Email Address, Mobile Number, Residential Address, Emergency Contact, Organization Membership Details, Identity Information.</li>
            <li><strong>Depending on the credential requested:</strong> Employee Number, Student Number, Membership Number, Vendor ID, Partner ID, Customer ID.</li>
            <li><strong>Account Information:</strong> Username, Password (encrypted), Login history, Device information, Browser information, IP address, Operating System.</li>
            <li><strong>Documents Uploaded:</strong> Passport-size photo, Signature, Educational certificates, Employment documents, Membership proofs, Organization-issued documents.</li>
            <li><strong>Technical Information:</strong> Cookies, Session identifiers, Analytics, Crash reports, Device identifiers, Browser language, Screen resolution.</li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Create your OneID</li>
            <li>Verify eligibility</li>
            <li>Issue organizational credentials</li>
            <li>Secure your account</li>
            <li>Prevent fraud</li>
            <li>Improve customer support</li>
            <li>Notify users</li>
            <li>Generate QR verification</li>
            <li>Manage digital wallets</li>
            <li>Maintain audit logs</li>
            <li>Improve services</li>
          </ul>

          <h2>5. Legal Basis for Processing</h2>
          <p>Information is processed based on User consent, Contractual necessity, Legitimate business interests, and Compliance with applicable laws.</p>

          <h2>6. Credential Verification</h2>
          <p>Users may voluntarily share credentials through QR Code, Secure Verification Link, or Credential Number. Verification displays only information necessary to confirm authenticity.</p>

          <h2>7. Data Storage</h2>
          <p>Information is securely stored using Encrypted databases, Secure cloud infrastructure, Multi-region backups, Access controls, and Audit logging.</p>

          <h2>8. Security Measures</h2>
          <p>We implement AES-256 Encryption, HTTPS/TLS Encryption, Multi-Factor Authentication, Role-Based Access Control, Secure Cloud Storage, Digital Signature Verification, Intrusion Monitoring, Fraud Detection Systems, and Routine Security Audits. No online platform can guarantee absolute security.</p>

          <h2>9. Cookies</h2>
          <p>We use cookies for Authentication, User Preferences, Security, Performance, Analytics, and Session Management. Users may disable cookies, though some functionality may be limited.</p>

          <h2>10. Third-Party Services</h2>
          <p>We may use trusted service providers for Authentication, Cloud Storage, Email Delivery, Push Notifications, Analytics, and Customer Support. These providers are required to protect your information.</p>

          <h2>11. Data Sharing</h2>
          <p>We do not sell personal information. Information may be shared With your consent, Within Surya Group entities where necessary, To comply with legal obligations, To investigate fraud or abuse, or During business restructuring or mergers, subject to applicable law.</p>

          <h2>12. Data Retention</h2>
          <p>Information is retained While your account remains active, As required by applicable laws, As necessary for legitimate business purposes, or Until deletion is requested, unless retention is legally required.</p>

          <h2>13. User Rights</h2>
          <p>Where applicable under law, you may Access your information, Correct inaccurate data, Download your information, Delete your account (subject to legal or operational retention requirements), Restrict certain processing, Update personal information, or Withdraw consent where processing is based on consent.</p>

          <h2>14. Children's Privacy</h2>
          <p>Surya OneID is intended for eligible users. Where minors use the platform, parental or guardian consent may be required as required by applicable law or organizational policy.</p>

          <h2>15. International Transfers</h2>
          <p>Information may be processed in secure cloud environments located in various jurisdictions. Appropriate safeguards will be applied where required.</p>

          <h2>16. Changes to Privacy Policy</h2>
          <p>This Privacy Policy may be updated periodically. Material changes will be communicated through the website or registered email where appropriate.</p>

          <h2>17. Contact</h2>
          <p>Surya Group of Industries<br />Privacy Officer<br />Email: privacy@suryagroup.com<br />Website: https://oneid-suryagroup.web.app</p>
        </div>
      </div>
    </div>
  );
}
