
export enum GovTier {
  CENTRAL = 'Central',
  STATE = 'State',
  DISTRICT = 'District',
  PSU = 'PSU'
}

export enum ApplicationMode {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}

export interface EligibilityCriteria {
  minAge?: number;
  maxAge?: number;
  education: string[];
  caste?: string[];
  gender?: 'Male' | 'Female' | 'Any';
  maxIncome?: number;
  disabilityRequired?: boolean;
  exServiceman?: boolean;
  states?: string[];
  districts?: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  tier: GovTier;
  state?: string;
  district?: string;
  salary: string;
  deadline: string;
  type: string;
  eligibility: EligibilityCriteria;
  description: string;
  postedDate: string;
  applicationFee: string;
  selectionProcess: string[];
  officialLink: string;
  isPremium?: boolean;
  status: 'published' | 'draft';
  applicationMode?: ApplicationMode;
}

export interface Scheme {
  id: string;
  name: string;
  category: string;
  benefits: string;
  tier: GovTier;
  state?: string;
  district?: string;
  eligibility: EligibilityCriteria;
  deadline: string;
  description: string;
  provider: string;
  howToApply: string;
  requiredDocuments: string[];
  status: 'published' | 'draft';
}

export interface UserProfile {
  dob: string;
  gender: string;
  state: string;
  district: string;
  education: string;
  caste: string;
  income: number;
  hasDisability: boolean;
  isExServiceman: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Job' | 'Scheme' | 'Deadline' | 'Exam';
  date: string;
  isRead: boolean;
}

export interface SavedItem {
  userId: string;
  itemId: string;
  type: 'job' | 'scheme';
  savedAt: string;
}
