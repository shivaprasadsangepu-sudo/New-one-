
import { Job, Scheme, GovTier, ApplicationMode } from './types';

export const INDIAN_STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];

export const EDUCATION_LEVELS = ['10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'PhD', 'Diploma', 'Engineering', 'Medical', 'ITI'];

export const CASTES = ['General', 'OBC', 'SC', 'ST', 'EWS'];

export const MOCK_JOBS: Job[] = [
  {
    id: 'ssc-cgl-2024',
    title: 'Combined Graduate Level Examination (CGL)',
    department: 'Staff Selection Commission (SSC)',
    location: 'All India',
    tier: GovTier.CENTRAL,
    salary: '₹25,500 - ₹1,51,100',
    startDate: '2024-06-24',
    deadline: '2025-07-20',
    type: 'Group B & C',
    eligibility: {
      minAge: 18,
      maxAge: 32,
      education: ['Graduate'],
      gender: 'Any'
    },
    description: 'Recruitment for various Group B and C posts in ministries and departments of the Government of India.',
    postedDate: '2024-05-10',
    applicationFee: '₹100 (Women/SC/ST/Ex-S: Nil)',
    selectionProcess: ['Tier 1 Exam', 'Tier 2 Exam'],
    officialLink: 'https://ssc.nic.in',
    isPremium: true,
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
  },
  {
    id: 'rrb-ntpc-2025',
    title: 'RRB NTPC Graduate & Undergraduate Posts',
    department: 'Railway Recruitment Board',
    location: 'Zonal Railways',
    tier: GovTier.CENTRAL,
    salary: '₹19,900 - ₹35,400',
    startDate: '2024-09-14',
    deadline: '2025-08-15',
    type: 'Technical/Non-Technical',
    eligibility: {
      minAge: 18,
      maxAge: 33,
      education: ['12th Pass', 'Graduate'],
      gender: 'Any'
    },
    description: 'Non-Technical Popular Categories (NTPC) recruitment for various posts in Indian Railways.',
    postedDate: '2024-05-12',
    applicationFee: '₹500 (SC/ST/Ex-S: ₹250)',
    selectionProcess: ['CBT-1', 'CBT-2', 'Skill Test', 'Document Verification'],
    officialLink: 'https://indianrailways.gov.in',
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
  },
  {
    id: 'upsc-ias-2025',
    title: 'Civil Services (IAS/IPS) Examination 2025',
    department: 'UPSC',
    location: 'All India',
    tier: GovTier.CENTRAL,
    salary: '₹56,100 (Level 10)',
    startDate: '2025-02-01',
    deadline: '2025-03-05',
    type: 'Administrative',
    eligibility: {
      minAge: 21,
      maxAge: 32,
      education: ['Graduate'],
      gender: 'Any'
    },
    description: 'Premier recruitment for IAS, IPS, IFS and other central services.',
    postedDate: '2024-02-14',
    applicationFee: '₹100 (Women/SC/ST: Nil)',
    selectionProcess: ['Prelims', 'Mains', 'Personality Test'],
    officialLink: 'https://upsc.gov.in',
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
  },
  {
    id: 'appsc-gr1-2024',
    title: 'Group-I Services Recruitment',
    department: 'APPSC Andhra Pradesh',
    location: 'Andhra Pradesh',
    tier: GovTier.STATE,
    state: 'Andhra Pradesh',
    salary: '₹54,060 - ₹1,40,540',
    startDate: '2024-05-01',
    deadline: '2025-06-15',
    type: 'Executive',
    eligibility: {
      minAge: 18,
      maxAge: 42,
      education: ['Graduate'],
      gender: 'Any',
      states: ['Andhra Pradesh']
    },
    description: 'Recruitment for Deputy Collectors, DSPs and other Group I posts in AP.',
    postedDate: '2024-04-10',
    applicationFee: '₹250 + ₹120 Processing',
    selectionProcess: ['Screening Test', 'Mains', 'Oral Test'],
    officialLink: 'https://psc.ap.gov.in',
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
  },
  {
    id: 'army-agniveer-2025',
    title: 'Indian Army Agniveer Intake',
    department: 'Indian Army',
    location: 'Regional AROs',
    tier: GovTier.CENTRAL,
    salary: '₹30,000 - ₹40,000',
    startDate: '2024-02-13',
    deadline: '2025-04-20',
    type: 'Defence',
    eligibility: {
      minAge: 17,
      maxAge: 21,
      education: ['10th Pass', '12th Pass'],
      gender: 'Male'
    },
    description: 'Short-term service recruitment for General Duty, Technical, and Tradesman.',
    postedDate: '2024-03-15',
    applicationFee: '₹250',
    selectionProcess: ['CEE Online Exam', 'Physical Fitness Test', 'Medical'],
    officialLink: 'https://joinindianarmy.nic.in',
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
  }
];

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    category: 'Farmer',
    benefits: '₹6,000 per year in 3 installments',
    tier: GovTier.CENTRAL,
    eligibility: {
      education: ['Any'],
      maxIncome: 200000,
      states: ['All']
    },
    deadline: 'Ongoing',
    description: 'Direct income support of ₹6,000 per annum to all landholding farmer families.',
    provider: 'Ministry of Agriculture',
    howToApply: 'Self-registration at PM-Kisan portal or through CSC.',
    requiredDocuments: ['Aadhar', 'Bank Passbook', 'Land Records'],
    status: 'published'
  },
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri MUDRA Yojana',
    category: 'Youth',
    benefits: 'Loan up to ₹10 Lakh',
    tier: GovTier.CENTRAL,
    eligibility: {
      education: ['Any'],
      minAge: 18
    },
    deadline: 'Ongoing',
    description: 'Funding for non-corporate, non-farm small/micro enterprises.',
    provider: 'MUDRA Ltd.',
    howToApply: 'Contact any commercial bank or MUDRA portal.',
    requiredDocuments: ['Business Plan', 'Aadhar', 'PAN'],
    status: 'published'
  }
];

export const MOCK_UPDATES = [
  {
    id: 'u1',
    title: 'UPSC Civil Services Result 2024',
    description: 'The Union Public Service Commission has released the final result list for CSE 2024.',
    fullContent: `UPSC CSE 2024 Final results have been published...`,
    type: 'Result',
    date: '2024-05-16',
    link: '/notifications',
    pdfUrl: 'https://upsc.gov.in'
  },
  {
    id: 'u2',
    title: 'SSC GD Constable Admit Card Download',
    description: 'Admit cards for regional centers are now live for the upcoming GD examination.',
    fullContent: `Download your SSC GD Admit Card from the regional portal...`,
    type: 'Admit Card',
    date: '2024-05-20',
    link: '/notifications',
    pdfUrl: '#'
  }
];
