
import React from 'react';
import { MOCK_JOBS } from '../data';

const ExamCalendar: React.FC = () => {
  const now = new Date().getTime();
  const upcomingDeadlines = [...MOCK_JOBS]
    .filter(j => j.status === 'published')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Exam <span className="text-blue-600">Timeline</span></h1>
        <p className="text-slate-500 text-lg italic">Never miss a deadline. Your precision countdown for active recruitments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: The Timeline */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-6 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
             <div className="flex justify-between items-center mb-10 px-2">
                <h3 className="text-xl font-black flex items-center gap-3">
                  Active Deadlines 
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full text-slate-400 font-black uppercase tracking-widest">
                    {upcomingDeadlines.length} Total
                  </span>
                </h3>
                <div className="hidden sm:flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Urgent (≤3d)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Critical (≤7d)</span>
                  </div>
                </div>
             </div>

             <div className="space-y-8">
                {upcomingDeadlines.map((job, idx) => {
                  const start = new Date(job.postedDate).getTime();
                  const end = new Date(job.deadline).getTime();
                  const totalDuration = end - start;
                  const elapsed = now - start;
                  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
                  
                  const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysLeft <= 3;
                  const isCritical = daysLeft <= 7;

                  const statusColor = isUrgent ? 'red' : isCritical ? 'orange' : 'blue';

                  return (
                    <div key={job.id} className="relative pl-8 md:pl-12 border-l-2 border-slate-100 dark:border-slate-700 pb-10 last:pb-0">
                      {/* Timeline Dot */}
                      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-slate-800 transition-colors duration-500 ${
                        isUrgent ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse' : 
                        isCritical ? 'bg-orange-500' : 'bg-blue-600'
                      }`}></div>
                      
                      <div className={`flex flex-col gap-6 p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden ${
                        isUrgent ? 'bg-red-50/50 dark:bg-red-950/10 border-red-100 dark:border-red-900/30' : 
                        isCritical ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-100 dark:border-orange-900/30' : 
                        'bg-slate-50 dark:bg-slate-900/30 border-transparent hover:border-slate-100 dark:hover:border-slate-700'
                      }`}>
                         
                         <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="space-y-2">
                               <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deadline: {job.deadline}</span>
                                 {isUrgent && <span className="text-[8px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black uppercase animate-bounce">Expiring Soon!</span>}
                               </div>
                               <h4 className={`text-xl md:text-2xl font-black leading-tight ${isUrgent ? 'text-red-900 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{job.title}</h4>
                               <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{job.department}</p>
                            </div>

                            <div className="flex items-center gap-6 self-end md:self-center">
                               <div className="text-right">
                                  <p className={`text-5xl md:text-6xl font-black tracking-tighter transition-colors duration-500 ${
                                    isUrgent ? 'text-red-600 drop-shadow-sm' : 
                                    isCritical ? 'text-orange-600' : 
                                    'text-slate-900 dark:text-white'
                                  }`}>
                                    {daysLeft < 0 ? '0' : daysLeft}
                                  </p>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-[-4px]">Days Left</p>
                               </div>
                            </div>
                         </div>

                         {/* Progress Bar Container */}
                         <div className="space-y-2">
                            <div className="flex justify-between items-end">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Application Progress</span>
                               <span className={`text-[10px] font-black ${isUrgent ? 'text-red-500' : isCritical ? 'text-orange-500' : 'text-blue-600'}`}>
                                 {Math.round(progress)}% Window Elapsed
                               </span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full transition-all duration-1000 ease-out rounded-full ${
                                   isUrgent ? 'bg-red-500' : 
                                   isCritical ? 'bg-orange-500' : 
                                   'bg-blue-600'
                                 }`}
                                 style={{ width: `${progress}%` }}
                               ></div>
                            </div>
                         </div>

                         <div className="flex justify-between items-center pt-2">
                            <div className="flex gap-4">
                               <div className="flex flex-col">
                                 <span className="text-[9px] font-black uppercase text-slate-400">Posted</span>
                                 <span className="text-xs font-bold">{job.postedDate}</span>
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-[9px] font-black uppercase text-slate-400">Exam Mode</span>
                                 <span className="text-xs font-bold">{job.applicationMode || 'Online'}</span>
                               </div>
                            </div>
                            <button className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                              isUrgent ? 'bg-red-600 text-white shadow-lg shadow-red-500/20 hover:scale-105' : 
                              isCritical ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:scale-105' : 
                              'bg-slate-900 dark:bg-blue-600 text-white hover:bg-blue-700'
                            }`}>
                              Apply Now
                            </button>
                         </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>

        {/* Right Column: Mini Stats */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-black italic border-b border-white/10 pb-4">Timeline Summary</h3>
                <div className="space-y-6">
                   <div className="group">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 group-hover:text-red-400 transition-colors">Urgent Closures</p>
                      <p className="text-4xl font-black text-red-500 animate-pulse">
                        {upcomingDeadlines.filter(j => Math.ceil((new Date(j.deadline).getTime() - now) / (1000 * 60 * 60 * 24)) <= 3).length}
                      </p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Total Opportunities</p>
                      <p className="text-4xl font-black">{upcomingDeadlines.length}</p>
                   </div>
                   <div className="pt-4">
                      <button className="w-full py-4 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all">
                        📅 Sync to My Calendar
                      </button>
                   </div>
                </div>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full"></div>
           </div>

           <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
              <h4 className="font-black text-xs uppercase tracking-widest opacity-40">Pro-Tips for 2025</h4>
              <div className="space-y-4">
                 {[
                   { t: 'Check Fees', d: 'Finalize payment 24h before deadline to avoid gateway server lag.' },
                   { t: 'Doc Vault', d: 'Ensure your Income Certificate is valid for current fiscal year.' }
                 ].map((tip, i) => (
                   <div key={i} className="space-y-1">
                      <p className="text-xs font-black text-blue-600 uppercase">{tip.t}</p>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{tip.d}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;
