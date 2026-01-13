
import React, { useState } from 'react';
import { MOCK_JOBS, INDIAN_STATES, EDUCATION_LEVELS, CASTES } from '../data';
import JobCard from '../components/JobCard';
import { GovTier, ApplicationMode } from '../types';

interface JobListProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ bookmarks, toggleBookmark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<'All' | GovTier.CENTRAL | GovTier.STATE>('All');
  const [activeState, setActiveState] = useState('All');
  
  // New Granular Filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [appMode, setAppMode] = useState<'All' | ApplicationMode>('All');
  const [education, setEducation] = useState('All');
  const [caste, setCaste] = useState('All');
  const [gender, setGender] = useState('Any');
  const [disability, setDisability] = useState<'All' | 'Yes' | 'No'>('All');

  const publishedJobs = MOCK_JOBS.filter(j => j.status === 'published');

  const filteredJobs = publishedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = activeTier === 'All' || job.tier === activeTier;
    const matchesState = activeState === 'All' || job.state === activeState || job.tier === GovTier.CENTRAL;
    const matchesAppMode = appMode === 'All' || job.applicationMode === appMode;
    const matchesEducation = education === 'All' || job.eligibility.education.includes(education);
    const matchesCaste = caste === 'All' || job.eligibility.caste?.includes(caste);
    const matchesGender = gender === 'Any' || job.eligibility.gender === 'Any' || job.eligibility.gender === gender;
    const matchesDisability = disability === 'All' || 
                             (disability === 'Yes' && job.eligibility.disabilityRequired) || 
                             (disability === 'No' && !job.eligibility.disabilityRequired);

    return matchesSearch && matchesTier && matchesState && matchesAppMode && matchesEducation && matchesCaste && matchesGender && matchesDisability;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Recruitments 2024-25</h1>
          <p className="text-slate-500 font-medium italic">Finding opportunities in {activeTier === 'All' ? 'Central & State' : activeTier} Government.</p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <input 
            type="text" 
            placeholder="Search roles, depts, or exams..."
            className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
            {['All', GovTier.CENTRAL, GovTier.STATE].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTier === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${showAdvanced ? 'bg-slate-900 text-white border-slate-900' : 'bg-white dark:bg-slate-800 border-slate-200 text-slate-500'}`}
             >
               {showAdvanced ? 'Simple Filters' : 'More Filters ⚙️'}
             </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-50 dark:border-slate-700 animate-in slide-in-from-top-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
              <select value={activeState} onChange={e => setActiveState(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">All States</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mode</label>
              <select value={appMode} onChange={e => setAppMode(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">Any Mode</option>
                <option value={ApplicationMode.ONLINE}>Online</option>
                <option value={ApplicationMode.OFFLINE}>Offline</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Education</label>
              <select value={education} onChange={e => setEducation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">Any Degree</option>
                {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Caste</label>
              <select value={caste} onChange={e => setCaste(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">Any Caste</option>
                {CASTES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Disability</label>
              <select value={disability} onChange={e => setDisability(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">All Roles</option>
                <option value="Yes">PWD Preferred</option>
                <option value="No">Non-PWD Only</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="relative group">
              <JobCard 
                job={job} 
                isBookmarked={bookmarks.includes(job.id)}
                onToggleBookmark={toggleBookmark}
              />
              {job.applicationMode && (
                <span className="absolute top-4 left-4 bg-slate-900 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  {job.applicationMode}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold">No jobs match your search</h3>
          <p className="text-slate-500 mb-6">Try resetting your filters to explore more options.</p>
          <button 
            onClick={() => { setActiveTier('All'); setActiveState('All'); setSearchTerm(''); setAppMode('All'); setEducation('All'); setCaste('All'); setDisability('All'); }} 
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
