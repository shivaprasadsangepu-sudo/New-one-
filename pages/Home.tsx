
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_JOBS, MOCK_SCHEMES, INDIAN_STATES, EDUCATION_LEVELS } from '../data';
import { GovTier } from '../types';

interface HomeProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ bookmarks, toggleBookmark }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const [filters, setFilters] = useState({
    q: '',
    state: 'All India',
    qualification: 'Any',
    tier: 'All'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.state !== 'All India') params.set('state', filters.state);
    if (filters.qualification !== 'Any') params.set('edu', filters.qualification);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const latestJobs = MOCK_JOBS.filter(j => j.status === 'published').slice(0, 6);
  const featuredSchemes = MOCK_SCHEMES.filter(s => s.status === 'published').slice(0, 4);

  return (
    <div className="space-y-20 pb-0 -mt-8 overflow-hidden">
      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-28 md:pt-36 md:pb-48 bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] -z-10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest animate-fade-in">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
             </span>
             No Login Required for Basic Browsing
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            India's Leading <br /> 
            <span className="text-blue-600">Public Job Search Engine</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Browse 10,000+ verified Central & State Govt openings instantly. Get personalized alerts by joining our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            <Link to="/jobs" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all hover:scale-[1.03]">
              Search Jobs Now
            </Link>
            <Link to="/schemes" className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl">
              Govt Schemes Hub
            </Link>
          </div>
        </div>
      </section>

      {/* 3. QUICK SEARCH */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-none border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="lg:col-span-1 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Qualification</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.qualification}
                onChange={e => setFilters({...filters, qualification: e.target.value})}
              >
                <option value="Any">Any Qualification</option>
                {EDUCATION_LEVELS.map(edu => <option key={edu}>{edu}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.state}
                onChange={e => setFilters({...filters, state: e.target.value})}
              >
                <option>All India</option>
                {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Type</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.tier}
                onChange={e => setFilters({...filters, tier: e.target.value})}
              >
                <option value="All">All Tiers</option>
                <option value={GovTier.CENTRAL}>Central Govt</option>
                <option value={GovTier.STATE}>State Govt</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
              Search Results
            </button>
          </form>
        </div>
      </section>

      {/* 4. LATEST JOBS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight">Recent notifications</h2>
            <p className="text-slate-500 font-medium italic">Hand-verified daily updates.</p>
          </div>
          <Link to="/jobs" className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest hover:underline">
            View All ➔
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestJobs.map(job => (
            <div key={job.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all flex flex-col h-full relative overflow-hidden">
               <div className="flex justify-between items-start mb-8">
                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${job.tier === GovTier.CENTRAL ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                   {job.tier} Govt
                 </span>
                 <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Ends: {job.deadline}</span>
               </div>
               <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
               <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-8">{job.department}</p>
               <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Education</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{job.eligibility.education[0]}</span>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">View</Link>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NOTIFICATIONS / ALERTS */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-blue-600 p-12 md:p-20 rounded-[4rem] text-white text-center space-y-12 shadow-2xl relative overflow-hidden">
           <div className="relative z-10 space-y-8">
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Instant Alerts. <br /> Zero Spam.</h2>
             <p className="text-blue-100 font-medium">Subscribe for direct notifications on new jobs matching your profile.</p>
             
             {subscribed ? (
               <div className="bg-white/20 p-6 rounded-3xl animate-in zoom-in-95">
                  <p className="text-2xl font-black italic">Welcome aboard! 🚀</p>
                  <p className="text-sm font-bold opacity-80 mt-2">We'll send your first digest tomorrow.</p>
               </div>
             ) : (
               <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email for alerts" 
                    className="flex-grow px-8 py-5 bg-white text-slate-900 rounded-2xl font-bold text-sm outline-none shadow-inner" 
                  />
                  <button type="submit" className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] transition-all">Subscribe</button>
               </form>
             )}
           </div>
           <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-slate-100 dark:border-slate-900 flex flex-col items-center gap-12 text-center">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl shadow-xl">GP</div>
          <span className="text-3xl font-black tracking-tighter">GovPortal<span className="text-blue-600 font-bold">Pro</span></span>
        </Link>
        <p className="text-slate-500 text-base font-medium leading-relaxed max-w-sm">
          A public service initiative for Indian Job Aspirants. No login required for searching.
        </p>
        <div className="flex flex-wrap justify-center gap-10 text-xs font-black uppercase tracking-widest text-slate-400">
          <Link to="/jobs" className="hover:text-blue-600">Browse Jobs</Link>
          <Link to="/schemes" className="hover:text-blue-600">Browse Schemes</Link>
          <Link to="/login" className="hover:text-blue-600">Member Login</Link>
          <Link to="/admin" className="hover:text-blue-600">Staff Access</Link>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">&copy; 2026 GovPortal Pro. Verified Updates Only.</p>
      </footer>
    </div>
  );
};

export default Home;
