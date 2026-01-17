
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

  const latestJobs = MOCK_JOBS.filter(j => j.status === 'published').slice(0, 6);
  const featuredSchemes = MOCK_SCHEMES.filter(s => s.status === 'published').slice(0, 4);

  return (
    <div className="space-y-20 pb-0 -mt-8 overflow-hidden">
      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-28 md:pt-36 md:pb-48 bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] -z-10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
             </span>
             Verified Govt Updates Only
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            Latest Government Jobs & <br /> 
            <span className="text-blue-600">Schemes – All in One Place</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Central & State Government jobs, schemes, eligibility details and apply links – updated daily. Your reliable career partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            <Link to="/jobs" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all hover:scale-[1.03]">
              View Latest Jobs
            </Link>
            <Link to="/schemes" className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl">
              Check Govt Schemes
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-12 max-w-4xl mx-auto">
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <p className="text-4xl font-black text-slate-900 dark:text-white">1000+</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">✔ Active Jobs</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <p className="text-4xl font-black text-slate-900 dark:text-white">500+</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">✔ Welfare Schemes</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <p className="text-4xl font-black text-slate-900 dark:text-white">Live</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">✔ Daily Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK SEARCH / FILTER */}
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
            <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              Search Opportunities
            </button>
          </form>
        </div>
      </section>

      {/* 4. LATEST JOBS SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight">Active Recruitments</h2>
            <p className="text-slate-500 font-medium italic">Hand-verified updates from official sources.</p>
          </div>
          <Link to="/jobs" className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest hover:underline">
            View All Jobs ➔
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestJobs.map(job => (
            <div key={job.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all flex flex-col h-full relative overflow-hidden">
               <div className="flex justify-between items-start mb-8">
                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${job.tier === GovTier.CENTRAL ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                   {job.tier} Govt
                 </span>
                 <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Deadline: {job.deadline}</span>
               </div>
               <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
               <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-8">{job.department}</p>
               <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Education</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{job.eligibility.education[0]}</span>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Apply</Link>
               </div>
            </div>
          ))}
        </div>
        <div className="md:hidden text-center">
          <Link to="/jobs" className="inline-block w-full px-8 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest">View All Jobs</Link>
        </div>
      </section>

      {/* 5. GOVERNMENT SCHEMES SECTION */}
      <section className="bg-slate-900 text-white py-28 rounded-[4rem] md:rounded-[6rem] mx-4 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Welfare & Public Schemes</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Mapped social benefits for every citizen profile.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredSchemes.map(scheme => (
              <div key={scheme.id} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] flex flex-col h-full hover:bg-white/10 transition-all border-b-4 border-b-blue-500">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-8">📜</div>
                <h3 className="text-2xl font-black mb-3 leading-tight">{scheme.name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">{scheme.category}</span>
                <p className="text-sm text-slate-400 mb-10 flex-grow leading-relaxed line-clamp-3 italic">{scheme.description}</p>
                <Link to={`/schemes/${scheme.id}`} className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center shadow-2xl hover:scale-[1.05] transition-all">Check Eligibility</Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/schemes" className="inline-block text-sm font-black uppercase tracking-[0.25em] text-blue-400 hover:text-blue-300 transition-colors">See All Public Schemes ➔</Link>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { icon: '🛡️', title: 'Verified Data', desc: 'Sourced directly from official government gazettes.' },
            { icon: '📊', title: 'Simple Logic', desc: 'Complex eligibility rules simplified for candidates.' },
            { icon: '🚫', title: 'Zero Clutter', desc: 'No annoying popups or registration mandatory.' },
            { icon: '✨', title: 'Free Always', desc: 'Our job and scheme intelligence costs nothing to access.' }
          ].map((item, i) => (
            <div key={i} className="space-y-6 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-3xl">{item.icon}</div>
              <h4 className="font-black text-xl tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 space-y-20 py-12">
        <div className="text-center space-y-4">
           <h2 className="text-4xl md:text-5xl font-black">How to Secure Your Future</h2>
           <p className="text-slate-500 text-lg font-medium italic">Three simple steps to your dream government career.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative">
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-slate-100 dark:bg-slate-800 -z-10"></div>
          {[
            { step: '01', title: 'Browse Smartly', desc: 'Filter by qualification and state to see relevant listings.' },
            { step: '02', title: 'Match Profile', desc: 'Our logic engine instantly tells you if you qualify to apply.' },
            { step: '03', title: 'Apply Official', desc: 'Redirect to verified ministry links for final submission.' }
          ].map((s, i) => (
            <div key={i} className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-900 rounded-full border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center text-2xl font-black text-blue-600 shadow-xl">{s.step}</div>
              <h4 className="text-2xl font-black">{s.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium px-4">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NOTIFICATIONS / ALERTS */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-blue-600 p-12 md:p-20 rounded-[4rem] text-white text-center space-y-12 shadow-[0_48px_80px_-20px_rgba(59,130,246,0.4)] relative overflow-hidden">
           <div className="relative z-10 space-y-8">
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Stay updated with <br /> Instant Alerts.</h2>
             <div className="flex flex-wrap justify-center gap-5">
                <span className="px-6 py-2.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">Email Notifications</span>
                <span className="px-6 py-2.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">Telegram Channel</span>
                <span className="px-6 py-2.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">WhatsApp Hub</span>
             </div>
             <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
                <input type="email" placeholder="Email Address" className="flex-grow px-8 py-5 bg-white text-slate-900 rounded-2xl font-bold text-sm outline-none shadow-inner" />
                <button className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] transition-all">Subscribe Now</button>
             </div>
           </div>
           <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/20 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* 9. TRUST & DISCLAIMER */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="p-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] text-center space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Public Trust Notice</p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium leading-relaxed italic max-w-3xl mx-auto">
            "GovPortal Pro is an independent educational portal. We are not a government entity and do not represent any government organization. All information is aggregated from public domains and official notifications for easy accessibility. Candidates must always verify information from the primary official portal before making decisions."
          </p>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="max-w-7xl mx-auto px-8 pt-28 pb-12 border-t border-slate-100 dark:border-slate-900 space-y-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8">
          <div className="col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20">GP</div>
              <span className="text-3xl font-black tracking-tighter">GovPortal<span className="text-blue-600 font-bold">Pro</span></span>
            </Link>
            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-sm">
              Empowering Indian youth with accurate, verified, and timely career information since 2025. Your growth, our mission.
            </p>
            <div className="flex gap-4 pt-4">
               {['Twitter', 'Telegram', 'YouTube', 'Insta'].map(s => (
                 <div key={s} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all cursor-pointer">{s[0]}</div>
               ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Directory</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">Latest Jobs</Link></li>
              <li><Link to="/schemes" className="hover:text-blue-600 transition-colors">Welfare Schemes</Link></li>
              <li><Link to="/notifications" className="hover:text-blue-600 transition-colors">Exam Results</Link></li>
              <li><Link to="/notifications" className="hover:text-blue-600 transition-colors">Admit Cards</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tools</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              <li><Link to="/profile" className="hover:text-blue-600 transition-colors">Eligibility Checker</Link></li>
              <li><Link to="/resume" className="hover:text-blue-600 transition-colors">Bento Resume</Link></li>
              <li><Link to="/ai-advisor" className="hover:text-blue-600 transition-colors">AI Career Help</Link></li>
              <li><Link to="/calendar" className="hover:text-blue-600 transition-colors">Exam Calendar</Link></li>
            </ul>
          </div>
          <div className="col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Legal & Transparency</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Disclaimer Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">&copy; 2026 GovPortal Pro. Crafted for Excellence.</p>
           <div className="flex gap-12">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Fast Loading</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">SSL Secure</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Verified Hub</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
