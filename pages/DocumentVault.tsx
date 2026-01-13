
import React, { useState } from 'react';

interface DocItem {
  id: string;
  name: string;
  status: 'Ready' | 'Missing' | 'Expired';
  expiry?: string;
}

const DocumentVault: React.FC = () => {
  const [docs, setDocs] = useState<DocItem[]>([
    { id: '1', name: 'Aadhar Card', status: 'Ready' },
    { id: '2', name: 'Degree Certificate', status: 'Ready' },
    { id: '3', name: 'Caste Certificate (Latest)', status: 'Missing' },
    { id: '4', name: 'Income Certificate', status: 'Expired', expiry: '2024-03-31' },
    { id: '5', name: 'Passport Size Photo', status: 'Ready' },
  ]);

  const readinessPercent = Math.round((docs.filter(d => d.status === 'Ready').length / docs.length) * 100);

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-4xl font-black italic">Document Vault</h1>
          <p className="text-slate-400">Keep your documents ready for 1-click applications.</p>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex items-center gap-6">
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Readiness</p>
              <p className="text-3xl font-black">{readinessPercent}%</p>
           </div>
           <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 rounded-full border-4 border-blue-400 transition-all duration-1000"
                style={{ clipPath: `inset(0 0 ${100 - readinessPercent}% 0)` }}
              ></div>
              <span className="text-xl">📄</span>
           </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                 doc.status === 'Ready' ? 'bg-green-50 text-green-600' : 
                 doc.status === 'Missing' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
               }`}>
                 {doc.status === 'Ready' ? '✅' : doc.status === 'Missing' ? '❓' : '⚠️'}
               </div>
               <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                 doc.status === 'Ready' ? 'bg-green-100 text-green-600' : 
                 doc.status === 'Missing' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
               }`}>
                 {doc.status}
               </span>
            </div>
            <h3 className="text-lg font-bold mb-1">{doc.name}</h3>
            {doc.expiry && <p className="text-[10px] text-red-500 font-bold uppercase">Expired on {doc.expiry}</p>}
            
            <button className="w-full mt-6 py-3 bg-slate-50 dark:bg-slate-900 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
              {doc.status === 'Ready' ? 'Update Scan' : 'Upload Now'}
            </button>
          </div>
        ))}
        
        <button className="border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all opacity-60">
          <span className="text-3xl">+</span>
          <span className="text-xs font-black uppercase tracking-widest">Add Custom Doc</span>
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 flex items-start gap-4">
         <span className="text-2xl">💡</span>
         <div className="space-y-2">
            <p className="font-bold text-blue-900 dark:text-blue-300">Vault Tip (Sallaah)</p>
            <p className="text-xs text-blue-600 dark:text-blue-500 leading-relaxed">Most jobs now require "DigiLocker" verified documents. You can sync your GovPortal Vault directly with DigiLocker to avoid manual verification delays.</p>
         </div>
      </div>
    </div>
  );
};

export default DocumentVault;
