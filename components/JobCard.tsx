
import React from 'react';
import { Link } from 'react-router-dom';
import { Job, GovTier } from '../types';

interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onToggleBookmark }) => {
  const isUpcoming = new Date(job.startDate) > new Date();
  
  return (
    <div className={`group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border-2 ${job.isPremium ? 'border-yellow-400' : 'border-slate-50 dark:border-slate-700'} flex flex-col h-full overflow-hidden`}>
      {/* Premium Badge */}
      {job.isPremium && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-slate-950 text-[9px] font-black uppercase px-4 py-1.5 rounded-br-2xl z-10">Premium Recruitment</div>
      )}

      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
          {job.tier === GovTier.CENTRAL ? '🏛️' : '📍'}
        </div>
        <div className="flex flex-col items-end">
           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${job.tier === GovTier.CENTRAL ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
             {job.tier} Govt
           </span>
        </div>
      </div>

      {/* Job Main Info */}
      <div className="space-y-2 mb-8">
        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">
          {job.department}
        </p>
      </div>

      {/* RECRUITMENT TIMELINE - HIGHLIGHTED */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 mb-8">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recruitment Window</span>
           {isUpcoming && <span className="text-[8px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase">Upcoming</span>}
        </div>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Starts</span>
              <span className="text-sm font-black text-blue-600">{job.startDate}</span>
           </div>
           <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
           <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Last Date</span>
              <span className="text-sm font-black text-red-500">{job.deadline}</span>
           </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Education</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.eligibility.education[0]}</span>
         </div>
         <div className="flex gap-2">
            <button 
              onClick={() => onToggleBookmark(job.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${isBookmarked ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white dark:bg-slate-800 border-slate-100 text-slate-400 hover:bg-slate-50'}`}
            >
              {isBookmarked ? '🔖' : '☆'}
            </button>
            <Link 
              to={`/jobs/${job.id}`}
              className="px-6 py-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Apply Now
            </Link>
         </div>
      </div>
    </div>
  );
};

export default JobCard;
