
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
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Job Not Found</h2>
        <Link to="/jobs" className="text-blue-600 underline">Return to listings</Link>
      </div>
    );
  }

  const handleDownloadNotice = () => {
    // Simulated PDF download
    window.open(job.officialLink, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 font-medium transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Listings
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase rounded-full">
              {job.type}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {job.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">{job.department}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => toggleBookmark(job.id)}
              className={`flex-1 md:flex-none px-6 py-4 rounded-2xl font-bold transition-all border flex items-center justify-center gap-2 ${
                isBookmarked 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 text-blue-600' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {isBookmarked ? '🔖 Saved' : '🔖 Save'}
            </button>
            <button className="flex-1 md:flex-none px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/30 transition-all">
              Apply Now
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-slate-100 dark:border-slate-700">
          <div className="space-y-6">
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Application Fee</p>
                <p className="font-bold text-lg text-slate-900 dark:text-white">{job.applicationFee}</p>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Salary Package</p>
                <p className="font-bold text-lg text-slate-900 dark:text-white">{job.salary}</p>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Important Dates</p>
                <div className="flex flex-col text-sm gap-1">
                   <div className="flex justify-between border-b pb-1 dark:border-slate-700">
                      <span className="text-slate-500">Posted On:</span> <span className="font-bold">{job.postedDate}</span>
                   </div>
                   <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Last Date:</span> <span className="font-bold text-red-500">{job.deadline}</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl space-y-4">
             <div className="flex justify-between items-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Selection Process</p>
                <span className="text-xs font-bold text-blue-600">Full Stages</span>
             </div>
             <ul className="space-y-3">
                {job.selectionProcess.map((step, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-[10px]">{i+1}</span>
                      {step}
                   </li>
                ))}
             </ul>
          </div>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Official Notice & PDF</h3>
            <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-2xl font-black">PDF</div>
                 <div>
                   <h4 className="font-bold">Full Advertisement Notification</h4>
                   <p className="text-xs opacity-60">Read the official PDF circular before applying.</p>
                 </div>
               </div>
               <button 
                onClick={handleDownloadNotice}
                className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
               >
                 <span>📥</span> Download Notice
               </button>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Detailed Description</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {job.description}
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Eligibility & Age Criteria</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Age Limit</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {job.eligibility.minAge && job.eligibility.maxAge 
                    ? `${job.eligibility.minAge} - ${job.eligibility.maxAge} Years` 
                    : 'Refer Official PDF Notification'}
                </p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">Calculated as on {job.postedDate}</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Educational Qualification</h4>
                <p className="text-slate-600 dark:text-slate-400">{job.eligibility.education.join(', ')}</p>
              </div>
            </div>
          </section>

          <section className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] space-y-6 border border-blue-100 dark:border-blue-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">Apply Directly</h3>
                  <p className="text-sm text-blue-600 opacity-80">{job.officialLink}</p>
               </div>
               <a 
                href={job.officialLink} 
                target="_blank" 
                rel="noreferrer"
                className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.05] transition-all text-center"
               >
                 Go to Official Registration
               </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
