
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS, MOCK_SCHEMES, MOCK_UPDATES } from '../data';
import JobCard from '../components/JobCard';

interface HomeProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ bookmarks, toggleBookmark }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-8 md:p-20 text-center shadow-2xl shadow-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-indigo-900/40 opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
            Central & State Government Portal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            One Stop for Jobs & <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Public Welfare</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Get personalized job alerts and discover government schemes you are eligible for in seconds.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-4">
            <Link to="/ai-advisor" className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold transition-all shadow-xl hover:scale-105">
              ✨ Smart AI Advisor
            </Link>
            <Link to="/dashboard" className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 border border-blue-400/30">
              Check My Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Results', color: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/10 dark:border-green-800', icon: '🏆', items: MOCK_UPDATES.filter(u => u.type === 'Result') },
          { title: 'Admit Cards', color: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/10 dark:border-orange-800', icon: '🎫', items: MOCK_UPDATES.filter(u => u.type === 'Admit Card') },
          { title: 'New Notifications', color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800', icon: '🔔', items: MOCK_UPDATES.filter(u => u.type === 'Latest' || u.type === 'Syllabus') }
        ].map((block) => (
          <div key={block.title} className={`rounded-[2rem] border ${block.color} p-6 space-y-4 shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg flex items-center gap-2">
                <span>{block.icon}</span> {block.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {block.items.slice(0, 3).map(item => (
                <li key={item.id} className="group">
                  <Link to={item.link} className="text-sm font-medium hover:underline flex items-start gap-2">
                    <span className="mt-1 opacity-50">•</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/notifications" className="inline-block text-xs font-bold underline mt-2">View All Updates</Link>
          </div>
        ))}
      </section>

      {/* Featured Schemes Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">Public Welfare Schemes</h2>
            <p className="text-slate-500">Popular financial assistance & development initiatives</p>
          </div>
          <Link to="/schemes" className="text-blue-600 font-bold hover:underline">All Schemes &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SCHEMES.slice(0, 2).map(scheme => (
            <Link key={scheme.id} to={`/schemes/${scheme.id}`} className="group block bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">{scheme.category}</span>
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">{scheme.name}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{scheme.description}</p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <span>💎 Benefit:</span>
                <span>{scheme.benefits}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">Active Recruitment</h2>
            <p className="text-slate-500">Latest job openings from Central & State departments</p>
          </div>
          <Link to="/jobs" className="text-blue-600 font-bold hover:underline">Browse Jobs &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_JOBS.slice(0, 3).map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isBookmarked={bookmarks.includes(job.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
