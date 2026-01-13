
import React from 'react';
import { UserProfile } from '../types';
import { Link } from 'react-router-dom';

const ResumeBuilder: React.FC<{ userProfile: UserProfile | null }> = ({ userProfile }) => {
  if (!userProfile) return (
    <div className="text-center py-24 space-y-6">
       <h2 className="text-3xl font-black">Profile Required</h2>
       <p className="text-slate-500">We need your profile details to generate a smart resume.</p>
       <Link to="/profile" className="inline-block px-10 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl">Complete Profile</Link>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Smart <span className="text-blue-600 italic">Bento</span> Resume</h1>
          <p className="text-slate-500 font-medium italic">Your government-standard profile, beautifully summarized.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Download PDF</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Bento */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-10">
           <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 overflow-hidden shadow-inner">
              <img src="https://picsum.photos/seed/resumeprof/200/200" alt="Profile" />
           </div>
           <div className="space-y-2">
              <h2 className="text-3xl font-black">Candidate Profile</h2>
              <p className="text-lg text-slate-500 font-bold">{userProfile.gender} • {userProfile.education}</p>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{userProfile.state} Resident</span>
                 <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{userProfile.caste}</span>
              </div>
           </div>
        </div>

        {/* Status Bento */}
        <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col justify-between shadow-xl shadow-blue-500/20">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Status</p>
           <div className="space-y-2">
              <h3 className="text-4xl font-black">{userProfile.hasDisability ? 'PWD' : 'General'}</h3>
              <p className="text-xs font-bold opacity-80">Eligibility verified via smart-logic engine.</p>
           </div>
           <div className="pt-4 border-t border-white/20">
              <span className="text-2xl font-black italic underline">#ReadyToHire</span>
           </div>
        </div>

        {/* Stats Bento */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6">
           <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Application Stats</h4>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                 <p className="text-[10px] opacity-40 uppercase">Total Apps</p>
                 <p className="text-xl font-black">14</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                 <p className="text-[10px] opacity-40 uppercase">Selected</p>
                 <p className="text-xl font-black">02</p>
              </div>
           </div>
        </div>

        {/* Document Bento */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 space-y-6">
           <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Vault Readiness</h4>
           <div className="grid md:grid-cols-2 gap-4">
              {['Aadhar Card', 'Degree Scan', 'Income Certificate', 'Category Proof'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                   <span className="text-sm font-bold">{doc}</span>
                   <span className="text-green-500 font-black text-xs">✓ READY</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-[2.5rem] border border-orange-100 dark:border-orange-800/50 flex items-start gap-4">
         <span className="text-2xl">⚡</span>
         <div>
            <p className="font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest text-[10px] mb-1">Elite Feature</p>
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">This resume uses the <strong>"Indian Standard Resume Format"</strong> required by PSUs and Defence organizations. You can attach this directly to your offline applications.</p>
         </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
