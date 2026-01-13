
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { INDIAN_STATES } from '../data';

interface Props {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
}

const ProfilePage: React.FC<Props> = ({ userProfile, setUserProfile }) => {
  const [form, setForm] = useState<UserProfile>(userProfile || {
    dob: '',
    gender: 'Male',
    state: 'Delhi',
    district: '',
    education: 'Graduate',
    caste: 'General',
    income: 0,
    hasDisability: false,
    isExServiceman: false
  });

  const save = () => {
    setUserProfile(form);
    alert('Profile Updated! Smart Match is now active.');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-black mb-2">Smart Profile</h1>
        <p className="text-slate-500 mb-8">Tell us about yourself to unlock matched opportunities.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Date of Birth</label>
            <input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Gender</label>
            <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">State</label>
            <select value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none">
              {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Annual Income (₹)</label>
            <input type="number" value={form.income} onChange={e => setForm({...form, income: parseInt(e.target.value)})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none" />
          </div>
        </div>

        <div className="mt-8 space-y-4">
           <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.hasDisability} onChange={e => setForm({...form, hasDisability: e.target.checked})} className="w-5 h-5 rounded accent-blue-600" />
              <span className="font-bold text-sm">Person with Disability (PWD)</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isExServiceman} onChange={e => setForm({...form, isExServiceman: e.target.checked})} className="w-5 h-5 rounded accent-blue-600" />
              <span className="font-bold text-sm">Ex-Serviceman</span>
           </label>
        </div>

        <button onClick={save} className="w-full mt-12 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
          Save & See Matches
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
