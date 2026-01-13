
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SCHEMES } from '../data';

const SchemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const scheme = MOCK_SCHEMES.find(s => s.id === id);

  if (!scheme) return <div className="text-center py-20">Scheme not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
       <Link to="/schemes" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium">
         &larr; Back to Schemes
       </Link>

       <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 md:p-16 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
             <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 font-black text-xs uppercase tracking-widest rounded-full">
                Verified Initiative
             </span>
             <h1 className="text-4xl md:text-5xl font-black leading-tight">{scheme.name}</h1>
             <p className="text-slate-500 text-lg leading-relaxed">{scheme.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-slate-100 dark:border-slate-700">
             <div className="space-y-8">
                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Scheme Benefits</h4>
                   <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">{scheme.benefits}</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Required Documents</h4>
                   <ul className="space-y-2">
                      {scheme.requiredDocuments.map((doc, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <span className="text-blue-500">✔</span> {doc}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-6">
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">How to Apply</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{scheme.howToApply}</p>
                
                <div className="space-y-4 pt-4">
                   <div className="p-4 bg-white dark:bg-slate-800 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Provider</p>
                      <p className="font-bold text-slate-900 dark:text-white">{scheme.provider}</p>
                   </div>
                   <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
                      Apply through Umang App
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default SchemeDetail;
