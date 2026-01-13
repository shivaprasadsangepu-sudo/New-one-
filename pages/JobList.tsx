
import React, { useState } from 'react';
import { MOCK_JOBS, INDIAN_STATES } from '../data';
import JobCard from '../components/JobCard';
import { GovTier } from '../types';

interface JobListProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ bookmarks, toggleBookmark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<'All' | GovTier.CENTRAL | GovTier.STATE>('All');
  const [activeState, setActiveState] = useState('All');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tier Filtering
    const matchesTier = activeTier === 'All' || job.tier === activeTier;
    
    // State Filtering: If a state is selected, show jobs for that state OR all Central jobs
    const matchesState = activeState === 'All' || job.state === activeState || job.tier === GovTier.CENTRAL;

    return matchesSearch && matchesTier && matchesState;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Recruitments 2024-25</h1>
          <p className="text-slate-500">Find {activeTier === 'All' ? 'Central & State' : activeTier} Government jobs.</p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <input 
            type="text" 
            placeholder="Search roles, depts, or exams..."
            className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tier Selector */}
        <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-100 dark:border-slate-700 flex">
           {['All', GovTier.CENTRAL, GovTier.STATE].map((t) => (
             <button
              key={t}
              onClick={() => setActiveTier(t as any)}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTier === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
              }`}
             >
               {t === 'All' ? 'Everything' : t + ' Govt'}
             </button>
           ))}
        </div>

        {/* State Selector */}
        <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 px-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Your State</span>
          <select 
            value={activeState} 
            onChange={(e) => setActiveState(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-bold text-sm"
          >
            <option value="All">All Regions</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isBookmarked={bookmarks.includes(job.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold">No jobs found for this criteria</h3>
          <p className="text-slate-500 mb-6">Try switching between Central and State govt filters.</p>
          <button onClick={() => { setActiveTier('All'); setActiveState('All'); setSearchTerm(''); }} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold">Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default JobList;
