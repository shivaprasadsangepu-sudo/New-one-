
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS, MOCK_SCHEMES, INDIAN_STATES } from '../data';
import JobCard from '../components/JobCard';
import { GovTier } from '../types';

interface HomeProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ bookmarks, toggleBookmark }) => {
  const [activeUpdateTab, setActiveUpdateTab] = useState<'jobs' | 'schemes'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-24 pb-20 -mt-8 overflow-hidden">
      {/* 1️⃣ HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 opacity-100 -z-10"></div>
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/5 dark:bg-blue-400/10 border border-blue-600/10 dark:border-blue-400/20 rounded-full text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Direct Official Career Access
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] md:leading-[1.05] text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            All Government Jobs <br /> & Schemes. <span className="text-blue-600">One Smart Platform.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Central • State • Schemes • Eligibility • Alerts. <br className="hidden md:block" />
            Verified notifications delivered instantly to your dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link 
              to="/profile" 
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all hover:bg-blue-700"
            >
              Check My Eligibility
            </Link>
            <Link 
              to="/jobs" 
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Browse Latest Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* 2️⃣ SMART SEARCH SECTION */}
      <section className="max-w-5xl mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input 
                type="text" 
                placeholder="Search job, scheme, department, exam..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 text-sm font-bold transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select className="px-6 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none text-xs font-black uppercase tracking-widest">
                <option>All India</option>
                {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
              <button className="px-8 py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Quick Access:</span>
            {['SSC', 'Banking', 'Police', 'Defence', 'Schemes', 'UPSC'].map(chip => (
              <Link 
                key={chip} 
                to="/jobs" 
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700 transition-all"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ FEATURE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-2">
           <h2 className="text-3xl md:text-5xl font-black tracking-tight">The Smartest Way to Apply.</h2>
           <p className="text-slate-500 font-medium">Built for the next generation of civil aspirants.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { title: 'Central & State Jobs', desc: 'Consolidated recruitment data from 100+ ministries and departments.', icon: '🏛️' },
             { title: 'Government Schemes', desc: 'Direct financial and social benefits categorized by eligibility.', icon: '📜' },
             { title: 'Eligibility Checker', desc: 'Personalized matching engine based on your educational profile.', icon: '⚖️' },
             { title: 'Document Vault', desc: 'Keep your certificates ready for one-click online applications.', icon: '🔒' },
             { title: 'Admin Verified Data', desc: 'Zero fake news. Every notification is cross-checked with official gazettes.', icon: '🛡️' },
             { title: 'AI Assistant', desc: 'Get voice-enabled advice on exam strategies and scheme benefits.', icon: '✨', badge: 'Coming Soon' }
           ].map((feat, i) => (
             <div key={i} className="group bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-50 dark:border-slate-700 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all space-y-6 relative overflow-hidden">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                    {feat.title}
                    {feat.badge && <span className="text-[9px] bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">{feat.badge}</span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full"></div>
             </div>
           ))}
        </div>
      </section>

      {/* 4️⃣ HOW IT WORKS */}
      <section className="bg-slate-900 text-white rounded-[4rem] mx-4 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight italic">3 Steps to your <br /> <span className="text-blue-500">Official Career.</span></h2>
               <p className="text-slate-400 text-lg max-w-md">Our precision-guided workflow ensures you never miss an application window.</p>
               <div className="space-y-6 pt-8">
                 {[
                   { step: '01', title: 'Complete Smart Profile', desc: 'Add education and category details for precise matching.' },
                   { step: '02', title: 'Auto-Check Eligibility', desc: 'Our engine filters thousands of roles to show what you can apply for.' },
                   { step: '03', title: 'Apply with Confidence', desc: 'Get direct official links and exam preparation guides instantly.' }
                 ].map((s, i) => (
                   <div key={i} className="flex gap-6 items-start">
                     <span className="text-blue-500 font-black text-2xl tracking-tighter">{s.step}</span>
                     <div>
                       <h4 className="font-bold text-lg">{s.title}</h4>
                       <p className="text-slate-500 text-sm">{s.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-transparent rounded-full animate-pulse absolute -inset-10 -z-10"></div>
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-[3.5rem] shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dashboard Preview" 
                  className="rounded-[3rem] shadow-2xl"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ LATEST UPDATES SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Active Recruitment.</h2>
              <p className="text-slate-500 font-medium">Real-time alerts from verified government gateways.</p>
           </div>
           <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setActiveUpdateTab('jobs')}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeUpdateTab === 'jobs' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xl' : 'text-slate-500'}`}
              >
                Latest Jobs
              </button>
              <button 
                onClick={() => setActiveUpdateTab('schemes')}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeUpdateTab === 'schemes' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xl' : 'text-slate-500'}`}
              >
                New Schemes
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {activeUpdateTab === 'jobs' ? (
             MOCK_JOBS.filter(j => j.status === 'published').slice(0, 3).map(job => (
               <JobCard 
                 key={job.id} 
                 job={job} 
                 isBookmarked={bookmarks.includes(job.id)} 
                 onToggleBookmark={toggleBookmark} 
               />
             ))
           ) : (
             MOCK_SCHEMES.filter(s => s.status === 'published').slice(0, 3).map(scheme => (
               <div key={scheme.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-[9px] font-black uppercase tracking-widest">{scheme.category}</span>
                    <span className="text-2xl">📜</span>
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors">{scheme.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 flex-grow leading-relaxed font-medium italic line-clamp-2">
                    {scheme.description}
                  </p>
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-50 dark:border-slate-700">
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Benefit</span>
                        <span className="text-sm font-black text-blue-600">{scheme.benefits}</span>
                     </div>
                     <Link to={`/schemes/${scheme.id}`} className="px-5 py-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Details</Link>
                  </div>
               </div>
             ))
           )}
        </div>
        <div className="text-center">
           <Link 
            to={activeUpdateTab === 'jobs' ? "/jobs" : "/schemes"} 
            className="inline-flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest hover:underline"
           >
             View All Opportunities &rarr;
           </Link>
        </div>
      </section>

      {/* 6️⃣ TRUST & AUTHORITY SECTION */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl">🏛️</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Verified Sources</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl">🛡️</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Zero Fake Alerts</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl">⚖️</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Official Gazette</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl">🔒</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Privacy First</span>
            </div>
         </div>
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
           GovPortal Pro aggregates data from 28 States and 8 UTs directly from government cloud gateways. We are not a government entity but a data technology bridge.
         </p>
      </section>

      {/* 7️⃣ CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/40">
           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Never Miss a <br /> Government Opportunity.</h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto font-medium">Join 500,000+ aspirants who use our smart dashboard to track their future.</p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                  Sign Up Free
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                  Login
                </Link>
              </div>
           </div>
           {/* Decorative shapes */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* 8️⃣ FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">GP</div>
              <span className="text-lg font-black tracking-tighter">GovPortal<span className="text-blue-600">Pro</span></span>
            </Link>
            <p className="text-slate-500 text-xs font-medium max-w-xs leading-relaxed">
              India's most sophisticated career and public scheme matching engine. Redefining how 1.4 billion people access public opportunities.
            </p>
            <div className="flex gap-4">
               {['fb', 'tw', 'ig', 'li'].map(s => (
                 <div key={s} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black uppercase opacity-60 hover:opacity-100 cursor-pointer">{s}</div>
               ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">All Jobs</Link></li>
              <li><Link to="/schemes" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Public Schemes</Link></li>
              <li><Link to="/calendar" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Exam Calendar</Link></li>
              <li><Link to="/map" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Center Locator</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/profile" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Smart Match</Link></li>
              <li><Link to="/resume" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Resume Builder</Link></li>
              <li><Link to="/vault" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Document Vault</Link></li>
              <li><Link to="/ai-advisor" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">AI Advisor</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Language Support</h4>
            <div className="flex flex-col gap-2">
               <span className="text-sm font-black text-blue-600">English (Active)</span>
               <span className="text-sm font-bold text-slate-400 italic">Telugu (Coming Soon)</span>
               <span className="text-sm font-bold text-slate-400 italic">Hindi (Coming Soon)</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">&copy; 2025 GovPortal Pro. All Rights Reserved.</p>
           <div className="flex gap-6">
              <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600">Privacy Policy</Link>
              <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600">Terms of Service</Link>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
