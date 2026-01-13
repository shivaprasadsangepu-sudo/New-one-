
import React, { useState } from 'react';
import { MOCK_JOBS, MOCK_SCHEMES } from '../data';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

interface SavedItemsProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const SavedItems: React.FC<SavedItemsProps> = ({ bookmarks, toggleBookmark }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'schemes'>('jobs');

  const savedJobs = MOCK_JOBS.filter(job => bookmarks.includes(job.id));
  const savedSchemes = MOCK_SCHEMES.filter(scheme => bookmarks.includes(scheme.id));

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Saved <span className="text-blue-600">Items</span></h1>
          <p className="text-slate-500 font-medium">Manage your bookmarked opportunities.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'jobs' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Jobs ({savedJobs.length})
          </button>
          <button 
            onClick={() => setActiveTab('schemes')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'schemes' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Schemes ({savedSchemes.length})
          </button>
        </div>
      </div>

      {activeTab === 'jobs' ? (
        savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {savedJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                isBookmarked={true} 
                onToggleBookmark={toggleBookmark} 
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No saved jobs" subtitle="Explore latest openings and bookmark them for later." link="/jobs" />
        )
      ) : (
        savedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
            {savedSchemes.map(scheme => (
              <div key={scheme.id} className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm relative group">
                <button 
                  onClick={() => toggleBookmark(scheme.id)}
                  className="absolute top-6 right-6 text-blue-600 font-bold hover:scale-110 transition-transform"
                >
                  Remove ✕
                </button>
                <div className="mb-4">
                   <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase">{scheme.category}</span>
                </div>
                <h3 className="text-xl font-black mb-2 leading-tight">{scheme.name}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{scheme.description}</p>
                <Link to={`/schemes/${scheme.id}`} className="block text-center py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest">Details</Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No saved schemes" subtitle="Discover government welfare initiatives you are eligible for." link="/schemes" />
        )
      )}
    </div>
  );
};

const EmptyState = ({ title, subtitle, link }: { title: string, subtitle: string, link: string }) => (
  <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700 space-y-6">
    <div className="text-6xl">🔖</div>
    <div className="space-y-1">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-500 max-w-sm mx-auto">{subtitle}</p>
    </div>
    <Link to={link} className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20">Explore Now</Link>
  </div>
);

export default SavedItems;
