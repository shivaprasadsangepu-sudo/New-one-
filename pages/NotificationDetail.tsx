
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_UPDATES } from '../data';

const NotificationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const update = MOCK_UPDATES.find(u => u.id === id);

  if (!update) return <div className="text-center py-20">Notification not found</div>;

  const handleDownload = () => {
    // In a real app, this would use update.pdfUrl
    if (update.pdfUrl) {
      window.open(update.pdfUrl, '_blank');
    } else {
      alert('The official PDF for this notification is not yet available.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <Link to="/notifications" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium transition-colors">
        &larr; All Announcements
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-16 border border-slate-100 dark:border-slate-700 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                update.type === 'Result' ? 'bg-green-100 text-green-600' : 
                update.type === 'Admit Card' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
             }`}>
                {update.type}
             </span>
             <span className="text-xs font-bold text-slate-400">{update.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">{update.title}</h1>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
             <p className="font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
               {update.description}
             </p>
           </div>
           
           <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              {update.fullContent}
           </div>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-700 space-y-6">
           <div className="flex flex-col gap-2">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Important Action</h4>
             <p className="text-sm text-slate-500">View or download the official documentation issued by the department.</p>
           </div>
           
           <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] transition-all"
              >
                 <span>📥</span> Download Official Notice (PDF)
              </button>
              <a 
                href={update.pdfUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-all"
              >
                 <span>🌐</span> Visit Official Portal
              </a>
           </div>
        </div>
      </div>
      
      {/* Help Section */}
      <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold">Need help understanding this notice?</p>
          <p className="text-sm text-slate-500">Our AI assistant can summarize this PDF for you.</p>
        </div>
        <Link to="/ai-advisor" className="px-6 py-3 bg-white dark:bg-slate-800 text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all">
           Ask AI Advisor ✨
        </Link>
      </div>
    </div>
  );
};

export default NotificationDetail;
