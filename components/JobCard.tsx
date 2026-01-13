
import React from 'react';
import { Link } from 'react-router-dom';
import { Job, GovTier } from '../types';

interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onToggleBookmark }) => {
  return (
    <div className={`group relative bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border ${job.isPremium ? 'border-yellow-400' : 'border-slate-100 dark:border-slate-700'} overflow-hidden flex flex-col h-full`}>
      {job.isPremium && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-slate-900 text-[8px] font-black uppercase px-3 py-1 rounded-br-xl">Premium Listing</div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl">
          {job.tier === GovTier.CENTRAL ? '🏛️' : job.tier === GovTier.STATE ? '📍' : '🏢'}
        </div>
        <div className="flex flex-col items-end gap-1">
           <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{job.tier}</span>
           <span className="text-[9px] text-slate-400 font-bold uppercase">{job.deadline}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{job.department}</p>
      </div>

      <div className="mt-auto space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex justify-between items-center text-[11px] font-medium">
           <span className="text-slate-400">Salary</span>
           <span className="text-slate-900 dark:text-white">{job.salary.split(' - ')[0]}</span>
        </div>
        <Link 
          to={`/jobs/${job.id}`}
          className="w-full block text-center py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
