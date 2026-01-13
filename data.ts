
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
    description: 'Infrastructure design and management for Delhi projects.',
    postedDate: '2024-04-01',
    applicationFee: 'Gen/OBC: ₹500, SC/ST: Nil',
    selectionProcess: ['Written Exam', 'Interview'],
    officialLink: 'https://pwd.delhi.gov.in',
    isPremium: false,
    status: 'published'
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
    description: 'Technical officer recruitment for the Armed Forces.',
    postedDate: '2024-03-25',
    applicationFee: 'Nil',
    selectionProcess: ['SSB Interview', 'Medical'],
    officialLink: 'https://joinindianarmy.nic.in',
    status: 'published'
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
    status: 'draft'
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
    provider: 'Central Government',
    howToApply: 'Visit PM-Kisan portal.',
    requiredDocuments: ['Aadhar', 'Bank Passbook'],
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
  }
];
