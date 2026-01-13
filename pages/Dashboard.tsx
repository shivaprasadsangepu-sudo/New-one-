
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
    <div className="space-y-12 pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-12 rounded-[3rem] text-white">
        <h1 className="text-4xl font-black mb-2">Hello, Aspirant!</h1>
        <p className="opacity-80">We found {matchedJobs.length} jobs and {matchedSchemes.length} schemes specifically for your profile.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold px-2 flex items-center gap-3">
           Perfect Matches (Jobs) <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-black">{matchedJobs.length}</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedJobs.map(job => (
            <div key={job.id} className="relative">
              <span className="absolute -top-3 -right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">100% ELIGIBLE</span>
              <JobCard job={job} isBookmarked={false} onToggleBookmark={() => {}} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold px-2">Matched Welfare Schemes</h2>
        <div className="grid md:grid-cols-2 gap-8">
           {matchedSchemes.map(s => (
             <div key={s.id} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">Direct Match</span>
                </div>
                <p className="text-slate-500 text-sm mb-6">{s.description}</p>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      💎 {s.benefits}
                   </div>
                   <Link to={`/schemes/${s.id}`} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-xs font-bold">Details</Link>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Admin Shortcut for testing */}
      <section className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-900 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white space-y-1">
            <h3 className="text-xl font-bold">Are you an administrator?</h3>
            <p className="text-slate-400 text-sm">Access the management portal to add jobs, schemes, or send notifications.</p>
          </div>
          <Link to="/admin" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-blue-50 transition-all whitespace-nowrap">
            Open Admin Panel &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
