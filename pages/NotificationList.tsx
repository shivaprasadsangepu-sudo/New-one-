
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_UPDATES } from '../data';

const NotificationList: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight mb-4">Latest Announcements</h1>
        <p className="text-slate-500 text-lg">Daily updates on Exam Dates, Results, and Official Notifications.</p>
      </div>

      <div className="space-y-4">
        {MOCK_UPDATES.map(update => (
          <Link 
            to={update.link} 
            key={update.id}
            className="block group bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                  update.type === 'Result' ? 'bg-green-100 text-green-600' : 
                  update.type === 'Admit Card' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {update.type === 'Result' ? '🏆' : update.type === 'Admit Card' ? '🎫' : '📢'}
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{update.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{update.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{update.date}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  update.type === 'Result' ? 'bg-green-50 text-green-600' : 
                  update.type === 'Admit Card' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {update.type}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
