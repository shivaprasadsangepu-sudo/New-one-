
import { API_CONFIG } from './apiConfig';
import { Job, Scheme, GovTier } from './types';
import { MOCK_JOBS, MOCK_SCHEMES } from './data';

/**
 * Service to fetch data from various Government APIs
 */
export const GovApiService = {
  /**
   * Fetches latest jobs from NCS or other configured sources
   */
  async fetchJobs(): Promise<Job[]> {
    try {
      if (API_CONFIG.NCS_API_KEY === 'YOUR_NCS_KEY_HERE') {
        console.warn('NCS API Key not configured. Using mock data.');
        return MOCK_JOBS;
      }

      const response = await fetch(`${API_CONFIG.NCS_API_BASE}/jobs?apiKey=${API_CONFIG.NCS_API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch from NCS');
      
      const data = await response.json();
      // Map external data to our internal Job type
      return data.map((item: any) => ({
        id: item.job_id,
        title: item.designation,
        department: item.organization,
        location: item.location,
        tier: item.tier === 'Central' ? GovTier.CENTRAL : GovTier.STATE,
        salary: item.salary_range,
        deadline: item.last_date,
        type: 'Government',
        eligibility: {
          education: [item.minimum_qualification],
          minAge: item.min_age,
          maxAge: item.max_age,
        },
        description: item.job_description,
        postedDate: item.post_date,
        applicationFee: item.fee || 'Nil',
        selectionProcess: ['Exam', 'Interview'],
        officialLink: item.apply_url,
      }));
    } catch (error) {
      console.error('API Fetch Error:', error);
      return MOCK_JOBS;
    }
  },

  /**
   * Fetches schemes from UMANG or Data.gov.in
   */
  async fetchSchemes(): Promise<Scheme[]> {
    try {
      if (API_CONFIG.UMANG_API_KEY === 'YOUR_UMANG_KEY_HERE') {
        return MOCK_SCHEMES;
      }

      const response = await fetch(`${API_CONFIG.UMANG_API_BASE}/schemes?key=${API_CONFIG.UMANG_API_KEY}`);
      const data = await response.json();
      return data.map((s: any) => ({
        id: s.id,
        name: s.scheme_name,
        category: s.category,
        benefits: s.benefit_details,
        tier: s.govt_level === 'Central' ? GovTier.CENTRAL : GovTier.STATE,
        eligibility: {
          education: ['Any'],
          states: [s.state || 'All'],
        },
        description: s.summary,
        provider: s.ministry,
        howToApply: s.steps,
        requiredDocuments: s.documents || [],
      }));
    } catch (error) {
      return MOCK_SCHEMES;
    }
  }
};
