export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

export type DocumentRequirement = {
  id: string;
  label: string;
  description: string;
  required: boolean;
};

export type CredentialSchema = {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  documents: DocumentRequirement[];
};

export const CREDENTIAL_SCHEMAS: Record<string, CredentialSchema> = {
  SOID: {
    id: 'SOID',
    name: 'Surya OneID',
    description: 'Primary organizational identity for all internal services.',
    fields: [
      { id: 'department', label: 'Primary Department', type: 'text', required: true, placeholder: 'e.g., Engineering' },
      { id: 'employeeId', label: 'Employee ID (if applicable)', type: 'text', placeholder: 'e.g., EMP-1234' }
    ],
    documents: [
      { id: 'nationalId', label: 'National ID / Passport', description: 'Clear photo of government issued ID', required: true },
      { id: 'profilePhoto', label: 'Professional Headshot', description: 'Recent photo on a solid background', required: true }
    ]
  },
  SFID: {
    id: 'SFID',
    name: 'Surya Financial ID',
    description: 'Customer financial relationship and services.',
    fields: [
      { id: 'incomeBracket', label: 'Annual Income Bracket', type: 'select', required: true, options: [
        { label: 'Under $50k', value: '<50k' },
        { label: '$50k - $100k', value: '50k-100k' },
        { label: 'Over $100k', value: '>100k' }
      ]},
      { id: 'taxId', label: 'Tax Identification Number', type: 'text', required: true }
    ],
    documents: [
      { id: 'nationalId', label: 'Government ID', description: 'Clear photo of government issued ID', required: true },
      { id: 'proofOfAddress', label: 'Proof of Address', description: 'Recent utility bill or bank statement', required: true },
      { id: 'taxDocument', label: 'Latest Tax Return', description: 'First page of recent tax filing', required: false }
    ]
  },
  SMA: {
    id: 'SMA',
    name: 'Mobility Authorization',
    description: 'Fleet access and mobility services.',
    fields: [
      { id: 'vehicleCategory', label: 'Vehicle Category', type: 'select', required: true, options: [
        { label: 'Standard Sedan', value: 'sedan' },
        { label: 'SUV / Heavy Duty', value: 'suv' },
        { label: 'Electric Vehicle', value: 'ev' }
      ]},
      { id: 'licenseNumber', label: 'Driver License Number', type: 'text', required: true }
    ],
    documents: [
      { id: 'driversLicense', label: 'Driver License', description: 'Front and back of valid driver license', required: true },
      { id: 'drivingRecord', label: 'Driving Record', description: 'Recent driving record abstract', required: false }
    ]
  },
  SMID: {
    id: 'SMID',
    name: 'Member Identity',
    description: 'Official membership credential for clubs and communities.',
    fields: [
      { id: 'membershipType', label: 'Membership Type', type: 'select', required: true, options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Premium', value: 'premium' },
        { label: 'Executive', value: 'executive' }
      ]},
      { id: 'sponsorName', label: 'Sponsoring Member (Optional)', type: 'text' }
    ],
    documents: [
      { id: 'profilePhoto', label: 'Profile Photo', description: 'Clear headshot for your membership card', required: true }
    ]
  },
  SGP: {
    id: 'SGP',
    name: 'Global Pass',
    description: 'Travel and visitor credential.',
    fields: [
      { id: 'destinationRegion', label: 'Primary Destination Region', type: 'select', required: true, options: [
        { label: 'North America', value: 'na' },
        { label: 'Europe', value: 'eu' },
        { label: 'Asia Pacific', value: 'apac' }
      ]},
      { id: 'purpose', label: 'Purpose of Travel', type: 'text', required: true }
    ],
    documents: [
      { id: 'passport', label: 'Passport Data Page', description: 'Clear scan of passport data page', required: true },
      { id: 'visa', label: 'Valid Visa (If applicable)', description: 'Scan of current visa', required: false }
    ]
  },
  SAID: {
    id: 'SAID',
    name: 'Academic ID',
    description: 'Academic identity for institutions.',
    fields: [
      { id: 'institution', label: 'Institution Name', type: 'text', required: true },
      { id: 'program', label: 'Degree / Program', type: 'text', required: true },
      { id: 'enrollmentYear', label: 'Year of Enrollment', type: 'text', required: true }
    ],
    documents: [
      { id: 'studentId', label: 'Current Student ID', description: 'University issued ID card', required: true },
      { id: 'enrollmentProof', label: 'Proof of Enrollment', description: 'Recent transcript or letter', required: true }
    ]
  },
  SWID: {
    id: 'SWID',
    name: 'Workforce ID',
    description: 'Official employee credential.',
    fields: [
      { id: 'department', label: 'Department', type: 'text', required: true },
      { id: 'designation', label: 'Designation / Title', type: 'text', required: true },
      { id: 'manager', label: 'Reporting Manager', type: 'text', required: true }
    ],
    documents: [
      { id: 'offerLetter', label: 'Offer Letter / Employment Contract', description: 'First page of employment agreement', required: true },
      { id: 'profilePhoto', label: 'Professional Photo', description: 'For badge generation', required: true }
    ]
  },
  SHID: {
    id: 'SHID',
    name: 'Health ID',
    description: 'Healthcare identity for hospitals.',
    fields: [
      { id: 'bloodGroup', label: 'Blood Group', type: 'select', required: true, options: [
        { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
        { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' },
        { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' }
      ]},
      { id: 'allergies', label: 'Known Allergies', type: 'textarea' },
      { id: 'emergencyContact', label: 'Emergency Contact Phone', type: 'tel', required: true }
    ],
    documents: [
      { id: 'insuranceCard', label: 'Insurance Card', description: 'Front and back of health insurance card', required: true },
      { id: 'medicalRecords', label: 'Supporting Medical Records', description: 'Any relevant medical history', required: false }
    ]
  }
};
