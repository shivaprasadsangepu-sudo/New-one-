
import React from 'react';
import { MOCK_UPDATES, MOCK_JOBS, MOCK_SCHEMES } from '../data';
import { Link } from 'react-router-dom';

const ScrollingTicker: React.FC = () => {
  const publishedJobs = MOCK_JOBS.filter(j => j.status === 'published');
  const publishedSchemes = MOCK_SCHEMES.filter(s => s.status === 'published');
  
  const tickerItems = (
    <div className="flex items-center gap-12 px-6">
      {/* Recent Notifications */}
      {MOCK_UPDATES.map(update => (
        <Link key={`update-${update.id}`} to={update.link} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-black ${
            update.type === 'Result' ? 'bg-green-600' : 
            update.type === 'Admit Card' ? 'bg-orange-600' : 
            update.type === 'Exam' ? 'bg-red-600' : 'bg-blue-600'
          }`}>
            {update.type}
          </span>
          <span className="tracking-tight">{update.title}</span>
          <span className="opacity-30">|</span>
        </Link>
      ))}
      
      {/* Latest Jobs */}
      {publishedJobs.slice(0, 3).map(job => (
        <Link key={`job-${job.id}`} to={`/jobs/${job.id}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <span className="px-2 py-0.5 rounded text-[9px] uppercase font-black bg-white/10 text-white border border-white/20">
            New Job
          </span>
          <span className="tracking-tight">{job.title} - {job.department}</span>
          <span className="opacity-30">|</span>
        </Link>
      ))}

      {/* Latest Schemes */}
      {publishedSchemes.slice(0, 3).map(scheme => (
        <Link key={`scheme-${scheme.id}`} to={`/schemes/${scheme.id}`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
          <span className="px-2 py-0.5 rounded text-[9px] uppercase font-black bg-indigo-600 text-white">
            New Scheme
          </span>
          <span className="tracking-tight">{scheme.name}</span>
          <span className="opacity-30">|</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2.5 text-xs font-bold border-b border-slate-800 shadow-lg relative z-40">
      <div className="flex whitespace-nowrap animate-marquee">
        {tickerItems}
        {tickerItems}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ScrollingTicker;
