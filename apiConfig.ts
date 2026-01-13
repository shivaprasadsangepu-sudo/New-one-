
/**
 * Configuration for External Government APIs
 * Add your API keys in environment variables or update them here.
 */
export const API_CONFIG = {
  // National Career Service (NCS) API
  NCS_API_BASE: 'https://www.ncs.gov.in/api/v1',
  NCS_API_KEY: process.env.NCS_API_KEY || 'YOUR_NCS_KEY_HERE',

  // UMANG API for Schemes
  UMANG_API_BASE: 'https://web.umang.gov.in/uapi',
  UMANG_API_KEY: process.env.UMANG_KEY || 'YOUR_UMANG_KEY_HERE',

  // MyGov / Data.gov.in
  DATA_GOV_IN_BASE: 'https://api.data.gov.in/resource',
  DATA_GOV_API_KEY: process.env.DATA_GOV_KEY || 'YOUR_DATA_GOV_KEY',

  // State Specific (Examples)
  TS_GOV_JOBS: 'https://api.telangana.gov.in/jobs',
  UP_GOV_SCHEMES: 'https://api.up.gov.in/schemes',
};

export const API_SOURCES = [
  { id: 'ncs', name: 'National Career Service', type: 'Jobs', status: 'Inactive' },
  { id: 'umang', name: 'UMANG Portal', type: 'Schemes', status: 'Inactive' },
  { id: 'datagov', name: 'Data.gov.in', type: 'All', status: 'Inactive' },
];
