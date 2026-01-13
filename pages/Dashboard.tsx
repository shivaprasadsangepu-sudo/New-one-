
import React from 'react';
import { UserProfile } from '../types';
import { MOCK_JOBS, MOCK_SCHEMES } from '../data';
import { checkEligibility } from '../utils/eligibility';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const Dashboard: React.FC<{ userProfile: UserProfile | null }> = ({ userProfile }) => {
  if (!userProfile) return (
    <div className="text-center py-20 space-y-6">
      <h2 className="text-3xl font-black">Ready to get matched?</h2>
      <p>Set up your profile to see jobs and schemes you're eligible for.</p>
      <Link to="/profile" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold">Complete Profile</Link>
    </div>
  );

  const matchedJobs = MOCK_JOBS.filter(j => checkEligibility(userProfile, j.eligibility).isEligible);
  const matchedSchemes = MOCK_SCHEMES.filter(s => checkEligibility(userProfile, s.eligibility).isEligible);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 p-12 rounded-[3.5rem] text-white flex flex-col justify-between min-h-[300px] shadow-2xl shadow-blue-500/20">
          <div>
            <h1 className="text-4xl font-black mb-2 italic">Dashboard Hub</h1>
            <p className="opacity-80 max-w-sm">Welcome back! We found {matchedJobs.length} specialized job openings for your profile today.</p>
          </div>
          <div className="flex gap-4 mt-8">
             <Link to="/calendar" className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl text-xs font-black uppercase border border-white/20">📅 My Calendar</Link>
             <Link to="/vault" className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase shadow-lg">📄 Smart Vault</Link>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white space-y-8 flex flex-col justify-center border border-slate-800">
           <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Your Eligibility Score</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-6xl font-black">92</span>
                 <span className="text-xl opacity-50 font-bold">/100</span>
              </div>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed">Excellent! Your profile is highly compatible with Central Govt roles. Complete your <span className="text-white font-bold">OBC Certificate</span> in the Vault to hit 100%.</p>
           <Link to="/profile" className="text-xs font-black uppercase underline tracking-widest text-blue-400">Refine Profile &rarr;</Link>
        </div>
      </div>

      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
             Perfect Matches <span className="text-[10px] bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase font-black tracking-widest">Verified</span>
           </h2>
           <Link to="/jobs" className="text-sm font-bold text-blue-600">View All Matches &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedJobs.map(job => (
            <div key={job.id} className="relative">
              <span className="absolute -top-3 -right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">100% ELIGIBLE</span>
              <JobCard job={job} isBookmarked={false} onToggleBookmark={() => {}} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-black px-2 tracking-tight">Welfare Schemes</h2>
          <div className="space-y-4">
             {matchedSchemes.slice(0, 3).map(s => (
               <div key={s.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl">📜</div>
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-blue-600 transition-colors">{s.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black">{s.category}</p>
                    </div>
                  </div>
                  <Link to={`/schemes/${s.id}`} className="text-slate-400 hover:text-blue-600">&rarr;</Link>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-6">
           <h2 className="text-2xl font-black px-2 tracking-tight">System Notifications</h2>
           <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700">
              <div className="space-y-6">
                 {[1,2].map(i => (
                   <div key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                      <div className="space-y-1">
                         <p className="text-sm font-bold leading-tight">New Admit Card for SSC CGL is available for download.</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase">2 Hours Ago</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Link to="/notifications" className="block w-full text-center mt-8 py-3 bg-white dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">See All Alerts</Link>
           </div>
        </section>
      </div>

      <section className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black italic">Administrator Portal</h3>
            <p className="text-slate-400 text-sm max-w-sm">System management for authorized government officials and portal moderators.</p>
          </div>
          <Link to="/admin" className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.05] transition-all whitespace-nowrap shadow-xl">
            Access Control &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
