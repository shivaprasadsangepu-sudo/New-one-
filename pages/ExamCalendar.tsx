
import React from 'react';
import { MOCK_JOBS } from '../data';

const ExamCalendar: React.FC = () => {
  const upcomingDeadlines = [...MOCK_JOBS].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <div className="space-y-12 pb-20">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Exam <span className="text-blue-600">Timeline</span></h1>
        <p className="text-slate-500 text-lg italic">Never miss a deadline. Your personalized countdown for 2024-25.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: The Timeline */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black">Active Deadlines</h3>
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-[10px] font-black uppercase text-slate-400">Critical (Last 3 Days)</span>
                </div>
             </div>

             <div className="space-y-6">
                {upcomingDeadlines.map((job, idx) => {
                  const daysLeft = Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isCritical = daysLeft < 5;

                  return (
                    <div key={job.id} className="relative pl-10 border-l-2 border-slate-100 dark:border-slate-700 pb-8 last:pb-0">
                      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${isCritical ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl group hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                         <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{job.deadline}</span>
                            <h4 className="font-bold text-lg">{job.title}</h4>
                            <p className="text-xs text-slate-500">{job.department}</p>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="text-right">
                               <p className={`text-xl font-black ${isCritical ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{daysLeft}</p>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Days Left</p>
                            </div>
                            <button className="px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">Register</button>
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
           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
              <h3 className="text-xl font-black mb-6 italic">Summary</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Active Applications</p>
                    <p className="text-3xl font-black">12</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Exams this Month</p>
                    <p className="text-3xl font-black">04</p>
                 </div>
                 <button className="w-full py-4 bg-white/10 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest border border-white/20">Sync to Google Calendar</button>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-4">Top Recruiters</h4>
              <div className="space-y-4">
                 {['UPSC', 'SSC', 'Banks', 'State PSC'].map(org => (
                   <div key={org} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-600 dark:text-slate-400">{org}</span>
                      <span className="font-black">Active</span>
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
