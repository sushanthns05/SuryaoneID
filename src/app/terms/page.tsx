import { Shield, Info } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-lg">Surya OneID</p>
          <div className="text-sm text-slate-500 mt-4 space-y-1">
            <p>Effective Date: 22 July 2026</p>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2rem] prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-300 prose-li:text-slate-300">
          <h2>1. Acceptance</h2>
          <p>By using Surya OneID, you agree to these Terms of Service. If you do not agree, please discontinue use of the platform.</p>

          <h2>2. Platform Description</h2>
          <p>Surya OneID is a digital identity and credential platform operated by Surya Group of Industries. It enables users to manage organizational credentials and services within the Surya ecosystem.</p>

          <div className="bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 rounded-2xl p-6 my-8 flex items-start space-x-4">
            <Info className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="!text-red-400 !mt-0 !mb-2 !text-xl">3. Not Government Identification</h2>
              <p className="text-red-200/80 m-0 text-sm">Surya OneID is not Aadhaar, PAN, Passport, Driving Licence, Voter ID, or any government-issued identity document. Credentials issued through this platform cannot replace official government documents where such documents are required by law.</p>
            </div>
          </div>

          <h2>4. Eligibility</h2>
          <p>You must Meet the eligibility criteria for the relevant credential, Provide accurate information, and Use the platform lawfully. Some services may require additional verification.</p>

          <h2>5. User Responsibilities</h2>
          <p>You agree to Provide truthful information, Keep login credentials secure, Protect your account, Report unauthorized access promptly, and Use the platform responsibly.</p>

          <h2>6. Prohibited Activities</h2>
          <p>You must not Create fake identities, Upload forged documents, Misrepresent your identity, Attempt unauthorized access, Reverse engineer the platform, Interfere with platform security, Upload malware or harmful code, or Use the platform for unlawful purposes. Violations may result in suspension or termination of your account.</p>

          <h2>7. Credential Issuance</h2>
          <p>Credential issuance is subject to Eligibility, Verification, Approval by authorized Surya personnel, and Compliance with organizational policies. Surya reserves the right to refuse or revoke credentials where appropriate.</p>

          <h2>8. Credential Verification</h2>
          <p>Verification confirms that a credential was issued by Surya OneID. Verification does not guarantee a person's current status, authority, or qualifications beyond the information displayed.</p>

          <h2>9. Account Security</h2>
          <p>Users are responsible for Maintaining password confidentiality, Using strong passwords, Enabling available security features, and Reporting suspicious activity.</p>

          <h2>10. Intellectual Property</h2>
          <p>All software, branding, logos, trademarks, designs, and content are owned by Surya Group of Industries or its licensors. You may not copy, distribute, or exploit them without permission.</p>

          <h2>11. Service Availability</h2>
          <p>We aim for high availability but do not guarantee uninterrupted service. Maintenance, upgrades, technical issues, or unforeseen events may temporarily affect access.</p>

          <h2>12. Suspension and Termination</h2>
          <p>We may suspend or terminate accounts for Fraud, Misuse, Policy violations, Security threats, or Legal requirements. Users may request account closure, subject to applicable retention obligations.</p>

          <h2>13. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, Surya Group of Industries is not liable for indirect, incidental, consequential, or special damages arising from use of the platform. Nothing in these Terms limits liability where such limitation is prohibited by law.</p>

          <h2>14. Disclaimer</h2>
          <p>The platform is provided "as is" and "as available." While we strive for accuracy and security, we do not guarantee that the platform will always be error-free or uninterrupted.</p>

          <h2>15. Changes</h2>
          <p>We may modify these Terms from time to time. Continued use after updates constitutes acceptance of the revised Terms.</p>

          <h2>16. Governing Law</h2>
          <p>These Terms are governed by the laws applicable in the jurisdiction where Surya Group of Industries is established, unless otherwise required by applicable law. Any disputes shall be subject to the jurisdiction of the competent courts in that jurisdiction.</p>

          <h2>17. Contact</h2>
          <p>Surya Group of Industries<br />Legal Department<br />Email: legal@suryagroup.com<br />Website: https://oneid-suryagroup.web.app</p>
        </div>
      </div>
    </div>
  );
}
