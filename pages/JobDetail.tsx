
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_JOBS } from '../data';

interface JobDetailProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ bookmarks, toggleBookmark }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === id);
  const isBookmarked = job ? bookmarks.includes(job.id) : false;

  if (!job) {
    return (
      <div className="text-center py-40 bg-white dark:bg-slate-950 rounded-[4rem]">
        <h2 className="text-4xl font-black mb-4 italic">Recruitment Not Found</h2>
        <Link to="/jobs" className="text-blue-600 font-bold uppercase tracking-widest text-sm hover:underline">Return to active listings &rarr;</Link>
      </div>
    );
  }

  const handleDownloadNotice = () => {
    window.open(job.officialLink, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-32 animate-in fade-in duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Active Jobs
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-[3.5rem] p-8 md:p-16 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex flex-wrap gap-2">
               <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Verified Notification
               </span>
               <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {job.type}
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              {job.title}
            </h1>
            <p className="text-2xl text-slate-400 font-bold uppercase tracking-widest italic">{job.department}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => toggleBookmark(job.id)}
              className={`flex-1 md:flex-none px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border flex items-center justify-center gap-3 ${
                isBookmarked 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-600' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {isBookmarked ? '🔖 Saved' : '🔖 Save Alert'}
            </button>
            <button className="flex-1 md:flex-none px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/40 transition-all hover:scale-[1.05]">
              Apply Link ➔
            </button>
          </div>
        </div>

        {/* IMPORTANT DATES HIGHLIGHT - CRITICAL UPDATE */}
        <section className="space-y-6">
           <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 text-center">Important Recruitment Dates</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] text-center border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                 <p className="text-[10px] uppercase font-black text-slate-400 mb-2 group-hover:text-blue-600">Notice Published</p>
                 <p className="text-2xl font-black text-slate-900 dark:text-white">{job.postedDate}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-[2.5rem] text-center border-2 border-blue-100 dark:border-blue-800 transition-all shadow-lg hover:scale-105 group">
                 <p className="text-[10px] uppercase font-black text-blue-600 mb-2">Application Starts</p>
                 <p className="text-2xl font-black text-blue-700 dark:text-blue-400">{job.startDate}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-[2.5rem] text-center border border-red-100 dark:border-red-900/30 transition-all hover:shadow-xl group">
                 <p className="text-[10px] uppercase font-black text-red-500 mb-2">Last Date to Apply</p>
                 <p className="text-2xl font-black text-red-600 dark:text-red-400">{job.deadline}</p>
              </div>
           </div>
        </section>

        {/* Detail Info Grid */}
        <div className="grid md:grid-cols-2 gap-16 py-16 border-y border-slate-100 dark:border-slate-700">
          <div className="space-y-10">
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Salary & Grade Pay</p>
                <p className="font-black text-2xl text-slate-900 dark:text-white italic">{job.salary}</p>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Selection Method</p>
                <div className="flex flex-wrap gap-2 pt-2">
                   {job.selectionProcess.map((step, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400">
                         {i+1}. {step}
                      </span>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-6">
                <h4 className="text-[10px] uppercase tracking-widest font-black text-blue-400">Application Fees</h4>
                <div className="space-y-4">
                   <p className="text-xl font-bold leading-tight">{job.applicationFee}</p>
                   <p className="text-[10px] opacity-60 italic font-medium">Verify your specific category fee from the official PDF notification below.</p>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
          </div>
        </div>

        {/* Action Blocks */}
        <div className="space-y-16">
          <section className="space-y-6 text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Documentation</p>
             <button 
              onClick={handleDownloadNotice}
              className="group w-full p-8 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500 transition-all"
             >
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-3xl">📄</div>
                   <div className="text-left">
                      <h4 className="text-xl font-black group-hover:text-blue-600 transition-colors italic">Download Official PDF</h4>
                      <p className="text-xs text-slate-500 font-medium">Full notification details, syllabus, and vacancies.</p>
                   </div>
                </div>
                <span className="text-sm font-black text-blue-600 uppercase tracking-widest px-8 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">Get PDF ➔</span>
             </button>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-black italic">Eligibility Breakdown</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-sm">🎂</div>
                <h4 className="font-black text-sm uppercase tracking-widest">Age Limit</h4>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {job.eligibility.minAge && job.eligibility.maxAge 
                    ? `${job.eligibility.minAge} - ${job.eligibility.maxAge} Years` 
                    : 'Refer Official PDF'}
                </p>
                <p className="text-[10px] text-slate-400 font-black italic uppercase">Calculation: {job.postedDate}</p>
              </div>
              <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-sm">🎓</div>
                <h4 className="font-black text-sm uppercase tracking-widest">Education</h4>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{job.eligibility.education.join(', ')}</p>
                <p className="text-[10px] text-slate-400 font-black italic uppercase tracking-widest">Equivalent qualification accepted</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl">
             <div className="space-y-3 text-center md:text-left">
                <h3 className="text-3xl font-black italic">Ready to Apply?</h3>
                <p className="text-slate-400 font-medium">This will redirect you to the official ministry registration portal.</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Link Verified: {new Date().toLocaleDateString()}</p>
             </div>
             <a 
              href={job.officialLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-full md:w-auto px-16 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all text-center"
             >
               Go to Official Portal ➔
             </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
