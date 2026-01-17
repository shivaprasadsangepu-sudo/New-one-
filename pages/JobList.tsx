
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_JOBS, INDIAN_STATES, EDUCATION_LEVELS, CASTES } from '../data';
import JobCard from '../components/JobCard';
import { GovTier, ApplicationMode } from '../types';

interface JobListProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ bookmarks, toggleBookmark }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL Param values
  const queryParam = searchParams.get('q') || '';
  const stateParam = searchParams.get('state') || 'All';
  const eduParam = searchParams.get('edu') || 'All';

  // State managed via search inputs
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeTier, setActiveTier] = useState<'All' | GovTier.CENTRAL | GovTier.STATE>('All');
  const [activeState, setActiveState] = useState(stateParam);
  
  // Advanced Filters
  const [showAdvanced, setShowAdvanced] = useState(queryParam !== '' || stateParam !== 'All' || eduParam !== 'All');
  const [appMode, setAppMode] = useState<'All' | ApplicationMode>('All');
  const [education, setEducation] = useState(eduParam);
  const [caste, setCaste] = useState('All');
  const [gender, setGender] = useState('Any');
  const [disability, setDisability] = useState<'All' | 'Yes' | 'No'>('All');

  // Sync internal state with URL params when they change (deep linking)
  useEffect(() => {
    setSearchTerm(queryParam);
    setActiveState(stateParam);
    setEducation(eduParam);
    if (queryParam || stateParam !== 'All' || eduParam !== 'All') setShowAdvanced(true);
  }, [queryParam, stateParam, eduParam]);

  // SMARTER FILTERING LOGIC
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      if (job.status !== 'published') return false;

      // 1. Text Search across multiple fields
      const searchStr = searchTerm.toLowerCase().trim();
      const matchesSearch = searchStr === '' || 
                            job.title.toLowerCase().includes(searchStr) || 
                            job.department.toLowerCase().includes(searchStr) ||
                            job.location.toLowerCase().includes(searchStr) ||
                            job.eligibility.education.some(edu => edu.toLowerCase().includes(searchStr));
      
      // 2. Structural Filters
      const matchesTier = activeTier === 'All' || job.tier === activeTier;
      
      const matchesState = activeState === 'All' || 
                           activeState === 'All India' || 
                           job.state === activeState || 
                           job.tier === GovTier.CENTRAL; // Central jobs are shown everywhere

      const matchesAppMode = appMode === 'All' || job.applicationMode === appMode;
      const matchesEducation = education === 'All' || education === 'Any' || job.eligibility.education.includes(education) || job.eligibility.education.includes('Any');
      const matchesCaste = caste === 'All' || (job.eligibility.caste && job.eligibility.caste.includes(caste));
      const matchesGender = gender === 'Any' || job.eligibility.gender === 'Any' || job.eligibility.gender === gender;
      const matchesDisability = disability === 'All' || 
                               (disability === 'Yes' && job.eligibility.disabilityRequired) || 
                               (disability === 'No' && !job.eligibility.disabilityRequired);

      return matchesSearch && matchesTier && matchesState && matchesAppMode && matchesEducation && matchesCaste && matchesGender && matchesDisability;
    });
  }, [searchTerm, activeTier, activeState, appMode, education, caste, gender, disability]);

  const updateUrl = (q: string, s: string, eVal: string) => {
    const params: any = {};
    if (q) params.q = q;
    if (s !== 'All' && s !== 'All India') params.state = s;
    if (eVal !== 'All' && eVal !== 'Any') params.edu = eVal;
    setSearchParams(params);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight">Search <span className="text-blue-600 italic">Jobs</span></h1>
          <p className="text-slate-500 font-medium">Browse verified government notifications nationwide.</p>
        </div>
        
        <div className="relative w-full lg:w-[450px]">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-20">🔍</span>
          <input 
            type="text" 
            placeholder="Search roles, depts, or qualification..."
            className="w-full pl-16 pr-8 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] outline-none shadow-xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:font-medium"
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              updateUrl(val, activeState, education);
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl">
            {['All', GovTier.CENTRAL, GovTier.STATE].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t as any)}
                className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTier === t ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${showAdvanced ? 'bg-slate-900 text-white border-slate-900' : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-500'}`}
             >
               {showAdvanced ? 'Simple Filters' : 'More Filters ⚙️'}
             </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-8 border-t border-slate-50 dark:border-slate-800 animate-in slide-in-from-top-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">State Selection</label>
              <select 
                value={activeState} 
                onChange={e => {
                  const val = e.target.value;
                  setActiveState(val);
                  updateUrl(searchTerm, val, education);
                }} 
                className="w-full bg-slate-50 dark:bg-slate-950 px-5 py-4 rounded-2xl text-xs font-bold outline-none border-none"
              >
                <option value="All">All India</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Application Type</label>
              <select value={appMode} onChange={e => setAppMode(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-950 px-5 py-4 rounded-2xl text-xs font-bold outline-none border-none">
                <option value="All">Any Mode</option>
                <option value={ApplicationMode.ONLINE}>Online Portal</option>
                <option value={ApplicationMode.OFFLINE}>Offline Notice</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Qualification</label>
              <select 
                value={education} 
                onChange={e => {
                  const val = e.target.value;
                  setEducation(val);
                  updateUrl(searchTerm, activeState, val);
                }} 
                className="w-full bg-slate-50 dark:bg-slate-950 px-5 py-4 rounded-2xl text-xs font-bold outline-none border-none"
              >
                <option value="All">Any Degree</option>
                {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Reservation Category</label>
              <select value={caste} onChange={e => setCaste(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 px-5 py-4 rounded-2xl text-xs font-bold outline-none border-none">
                <option value="All">General / Any</option>
                {CASTES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Special Quota</label>
              <select value={disability} onChange={e => setDisability(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-950 px-5 py-4 rounded-2xl text-xs font-bold outline-none border-none">
                <option value="All">No Preference</option>
                <option value="Yes">PWD / Specially Abled</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <div key={job.id} className="relative group animate-in zoom-in-95 duration-300">
              <JobCard 
                job={job} 
                isBookmarked={bookmarks.includes(job.id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-40 bg-white dark:bg-slate-900 rounded-[4rem] border-4 border-dashed border-slate-50 dark:border-slate-950">
          <div className="text-8xl mb-10">🏜️</div>
          <h3 className="text-3xl font-black mb-4">No results match your criteria</h3>
          <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium leading-relaxed italic">Try broadening your search or resetting filters to see thousands of other live opportunities.</p>
          <button 
            onClick={() => { 
              setActiveTier('All'); 
              setActiveState('All'); 
              setSearchTerm(''); 
              setAppMode('All'); 
              setEducation('All'); 
              setCaste('All'); 
              setDisability('All');
              setSearchParams({}); // Clear URL params
            }} 
            className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/30 active:scale-95 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
