
import { Job, Scheme, GovTier } from './types';

export const INDIAN_STATES = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Haryana', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Assistant Engineer (Civil)',
    department: 'PWD Delhi',
    location: 'New Delhi',
    tier: GovTier.STATE,
    state: 'Delhi',
    salary: '₹56,100 - ₹1,77,500',
    deadline: '2025-05-15',
    type: 'Government',
    eligibility: {
      minAge: 21,
      maxAge: 32,
      education: ['Graduate', 'B.Tech'],
      gender: 'Any',
      states: ['Delhi']
    },
    description: 'Infrastructure design and management for Delhi projects. Candidates will be responsible for planning, designing, and overseeing construction and maintenance of building structures and facilities.',
    postedDate: '2024-04-01',
    applicationFee: 'Gen/OBC: ₹500, SC/ST: Nil',
    selectionProcess: ['Written Exam', 'Interview'],
    officialLink: 'https://pwd.delhi.gov.in',
    isPremium: false
  },
  {
    id: 'army-1',
    title: 'Lieutenant (Technical)',
    department: 'Indian Army',
    location: 'All India',
    tier: GovTier.CENTRAL,
    salary: '₹75,000 - ₹2,50,000',
    deadline: '2025-06-10',
    type: 'Defence',
    eligibility: {
      minAge: 20,
      maxAge: 27,
      education: ['Graduate', 'Engineering'],
      gender: 'Male',
      exServiceman: false
    },
    description: 'Technical officer recruitment for the Armed Forces. Direct commission for engineering graduates. Selected candidates will undergo training at IMA Dehradun.',
    postedDate: '2024-03-25',
    applicationFee: 'Nil',
    selectionProcess: ['SSB Interview', 'Medical'],
    officialLink: 'https://joinindianarmy.nic.in'
  },
  {
    id: 'tel-1',
    title: 'Group-1 Services',
    department: 'TSPSC',
    location: 'Telangana',
    tier: GovTier.STATE,
    state: 'Telangana',
    salary: '₹51,320 - ₹1,27,310',
    deadline: '2025-07-20',
    type: 'Government',
    eligibility: {
      minAge: 18,
      maxAge: 44,
      education: ['Graduate'],
      gender: 'Any',
      states: ['Telangana']
    },
    description: 'Administrative roles in the State of Telangana. These are the most prestigious civil services in the state including Deputy Collector and DSP ranks.',
    postedDate: '2024-04-10',
    applicationFee: '₹200',
    selectionProcess: ['Prelims', 'Mains', 'Interview'],
    officialLink: 'https://tspsc.gov.in'
  }
];

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    benefits: '₹6,000 per year',
    tier: GovTier.CENTRAL,
    eligibility: {
      education: ['Any'],
      maxIncome: 200000,
      states: ['All']
    },
    deadline: 'Ongoing',
    description: 'Direct income support for farmer families across India. The benefit is transferred in three equal installments of ₹2,000 each every four months.',
    provider: 'Central Government',
    howToApply: 'Visit PM-Kisan portal or use the mobile app. New farmers can register via CSC.',
    requiredDocuments: ['Aadhar', 'Bank Passbook', 'Land Records']
  },
  {
    id: 's-ts-1',
    name: 'Rythu Bandhu',
    category: 'Agriculture',
    benefits: '₹5,000 per acre per season',
    tier: GovTier.STATE,
    state: 'Telangana',
    eligibility: {
      education: ['Any'],
      states: ['Telangana']
    },
    deadline: 'Ongoing',
    description: 'Investment support scheme for farmers in Telangana. This is a unique initiative where the state provides cash grants to farmers for purchase of inputs.',
    provider: 'Telangana State Govt',
    howToApply: 'Apply at local Mandal office or through the online portal.',
    requiredDocuments: ['Pattadar Passbook', 'Aadhar', 'Bank Details']
  },
  {
    id: 's-state-up',
    name: 'Kanya Sumangala Yojana',
    category: 'Women & Child',
    benefits: '₹15,000 assistance',
    tier: GovTier.STATE,
    state: 'Uttar Pradesh',
    eligibility: {
      education: ['Any'],
      gender: 'Female',
      maxIncome: 300000,
      states: ['Uttar Pradesh']
    },
    deadline: 'Ongoing',
    description: 'Social security for female children in Uttar Pradesh. Funds are released at various stages of the child\'s growth from birth to graduation.',
    provider: 'UP State Govt',
    howToApply: 'Apply at CSC centers or online on the official website.',
    requiredDocuments: ['Birth Certificate', 'Income Certificate', 'Domicile']
  }
];

export const MOCK_UPDATES = [
  {
    id: 'u1',
    title: 'UPSC Civil Services Result 2023',
    description: 'Final recommendation list released by Union Public Service Commission.',
    fullContent: `The Union Public Service Commission (UPSC) has today declared the Final Result of Civil Services Examination (CSE) 2023. A total of 1016 candidates have been recommended for appointment to:
    
- Indian Administrative Service
- Indian Foreign Service
- Indian Police Service
- Central Services, Group 'A' and Group 'B'
    
Aditya Srivastava has secured All India Rank 1. The candidature of 355 recommended candidates is provisional.`,
    type: 'Result',
    date: '2024-04-16',
    link: '/notifications/u1',
    pdfUrl: 'https://upsc.gov.in/sites/default/files/Final-Result-CSE-2023-engl-160424.pdf'
  },
  {
    id: 'u2',
    title: 'SSC CGL Tier 1 Admit Card',
    description: 'Download links active for North and Western regions.',
    fullContent: `Staff Selection Commission (SSC) has released the Admit Cards for Combined Graduate Level (CGL) Tier 1 Examination. 
    
Candidates who have applied for regions including CR, NWR, NR and WR can now download their status and e-admit cards using their registration number and date of birth. 
    
Exam Dates: July 1st to July 15th, 2024.
Please carry an original photo ID proof to the exam center.`,
    type: 'Admit Card',
    date: '2024-04-18',
    link: '/notifications/u2',
    pdfUrl: 'https://ssc.nic.in/Portal/AdmitCard'
  },
  {
    id: 'u3',
    title: 'IBPS PO 2024 Notification Out',
    description: 'Official recruitment for 6,000+ Probationary Officers.',
    fullContent: `Institute of Banking Personnel Selection (IBPS) has released the common recruitment process (CRP PO/MT-XIV) for recruitment of Probationary Officers. 
    
Participating Banks: 11 Public Sector Banks including PNB, BOB, Canara Bank.
Total Vacancies: 6,432 (Tentative).
    
Registration Start: August 1st, 2024.
Last Date: August 21st, 2024.
Prelims Exam: October 2024.`,
    type: 'Latest',
    date: '2024-04-20',
    link: '/notifications/u3',
    pdfUrl: 'https://www.ibps.in/crp-po-mt-xiv/'
  }
];
