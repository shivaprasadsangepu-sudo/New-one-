
import { Job, Scheme, GovTier, ApplicationMode } from './types';

export const INDIAN_STATES = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Haryana', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

export const EDUCATION_LEVELS = ['10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'PhD', 'Diploma', 'Engineering', 'Medical'];

export const CASTES = ['General', 'OBC', 'SC', 'ST', 'EWS'];

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
      education: ['Graduate', 'Engineering'],
      gender: 'Any',
      states: ['Delhi'],
      caste: ['General', 'OBC', 'SC', 'ST']
    },
    description: 'Infrastructure design and management for Delhi projects.',
    postedDate: '2024-04-01',
    applicationFee: 'Gen/OBC: ₹500, SC/ST: Nil',
    selectionProcess: ['Written Exam', 'Interview'],
    officialLink: 'https://pwd.delhi.gov.in',
    isPremium: false,
    status: 'published',
    applicationMode: ApplicationMode.ONLINE
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
      exServiceman: false,
      caste: ['General']
    },
    description: 'Technical officer recruitment for the Armed Forces.',
    postedDate: '2024-03-25',
    applicationFee: 'Nil',
    selectionProcess: ['SSB Interview', 'Medical'],
    officialLink: 'https://joinindianarmy.nic.in',
    status: 'published',
    applicationMode: ApplicationMode.OFFLINE
  },
  {
    id: '4',
    title: 'Staff Nurse',
    department: 'Health Dept Telangana',
    location: 'Hyderabad',
    tier: GovTier.STATE,
    state: 'Telangana',
    salary: '₹32,000 - ₹90,000',
    deadline: '2025-04-30',
    type: 'Government',
    eligibility: {
      minAge: 18,
      maxAge: 44,
      education: ['Diploma', 'Graduate', 'Medical'],
      gender: 'Female',
      disabilityRequired: false
    },
    description: 'Nursing services in state government hospitals.',
    postedDate: '2024-03-10',
    applicationFee: '₹200',
    selectionProcess: ['Merit List'],
    officialLink: 'https://health.telangana.gov.in',
    status: 'published',
    applicationMode: ApplicationMode.OFFLINE
  },
  {
    id: 'draft-job-1',
    title: 'Upcoming Junior Assistant Role',
    department: 'Railways (RRB)',
    location: 'Bhopal',
    tier: GovTier.CENTRAL,
    salary: '₹35,000',
    deadline: '2025-08-01',
    type: 'Government',
    eligibility: {
      education: ['Graduate'],
    },
    description: 'This is a draft vacancy post not yet public.',
    postedDate: '2024-05-01',
    applicationFee: '₹100',
    selectionProcess: ['CBT'],
    officialLink: '#',
    status: 'draft',
    applicationMode: ApplicationMode.ONLINE
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
    description: 'Direct income support for farmer families across India.',
    provider: 'Ministry of Agriculture',
    howToApply: 'Visit PM-Kisan portal.',
    requiredDocuments: ['Aadhar', 'Bank Passbook'],
    status: 'published'
  },
  {
    id: 's2',
    name: 'Rythu Bandhu',
    category: 'Agriculture',
    benefits: '₹5,000 per acre',
    tier: GovTier.STATE,
    state: 'Telangana',
    eligibility: {
      education: ['Any'],
      states: ['Telangana']
    },
    deadline: 'Ongoing',
    description: 'Investment support scheme for farmers in Telangana.',
    provider: 'Dept of Agriculture, Telangana',
    howToApply: 'Apply at MeeSeva centers.',
    requiredDocuments: ['Land Passbook', 'Aadhar'],
    status: 'published'
  },
  {
    id: 'draft-scheme-1',
    name: 'New Education Grant (WIP)',
    category: 'Education',
    benefits: '₹10,000',
    tier: GovTier.STATE,
    state: 'Maharashtra',
    eligibility: { education: ['Student'] },
    deadline: '2025-12-31',
    description: 'Internal draft for new scholarship program.',
    provider: 'Maha State Govt',
    howToApply: 'TBD',
    requiredDocuments: ['College ID'],
    status: 'draft'
  }
];

export const MOCK_UPDATES = [
  {
    id: 'u1',
    title: 'UPSC Civil Services Result 2023',
    description: 'Final recommendation list released by Union Public Service Commission.',
    fullContent: `UPSC Final Result 2023 details...`,
    type: 'Result',
    date: '2024-04-16',
    link: '/notifications/u1',
    pdfUrl: 'https://upsc.gov.in/sites/default/files/Final-Result-CSE-2023-engl-160424.pdf'
  },
  {
    id: 'u2',
    title: 'SSC CGL Tier 1 Admit Card Out',
    description: 'Candidates can now download their hall tickets from regional websites.',
    fullContent: `Download your SSC CGL Admit Card...`,
    type: 'Admit Card',
    date: '2024-04-20',
    link: '/notifications/u2',
    pdfUrl: '#'
  },
  {
    id: 'u3',
    title: 'New Railway Recruitment 2024 (RRB)',
    description: 'Notification for 10,000+ Junior Engineer vacancies released.',
    fullContent: `RRB JE Recruitment 2024 details...`,
    type: 'Latest',
    date: '2024-04-22',
    link: '/notifications/u3',
    pdfUrl: '#'
  },
  {
    id: 'u4',
    title: 'IBPS PO Exam Dates Shifted',
    description: 'Mains exam postponed to November due to state elections.',
    fullContent: `IBPS PO Mains updated schedule...`,
    type: 'Exam',
    date: '2024-04-24',
    link: '/notifications/u4',
    pdfUrl: '#'
  }
];
