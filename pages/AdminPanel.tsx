
import React, { useState } from 'react';
import { MOCK_JOBS, MOCK_SCHEMES, MOCK_UPDATES } from '../data';
import { API_SOURCES } from '../apiConfig';
import { Job, Scheme, GovTier } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'schemes' | 'api' | 'broadcast'>('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);

  // Management State
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [schemes, setSchemes] = useState(MOCK_SCHEMES);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setSyncing(null);
      alert(`${id} data synchronized successfully!`);
    }, 1500);
  };

  const deleteJob = (id: string) => {
    if (window.confirm("Delete this job notification?")) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const deleteScheme = (id: string) => {
    if (window.confirm("Delete this scheme from the portal?")) {
      setSchemes(schemes.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
       {/* Admin Header */}
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight italic">Portal <span className="text-blue-600">Control</span></h1>
            <p className="text-slate-500 font-medium">Manage jobs, schemes, and data sync for GovPortal Pro.</p>
          </div>
          
          <div className="flex flex-wrap bg-white dark:bg-slate-800 p-2 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
             {[
               { id: 'dashboard', label: 'Stats', icon: '📈' },
               { id: 'jobs', label: 'Jobs', icon: '💼' },
               { id: 'schemes', label: 'Schemes', icon: '📜' },
               { id: 'api', label: 'Gatways', icon: '⚙️' },
               { id: 'broadcast', label: 'Alerts', icon: '📢' }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
               >
                 <span>{tab.icon}</span> {tab.label}
               </button>
             ))}
          </div>
       </div>

       {/* CONTENT: DASHBOARD STATS */}
       {activeTab === 'dashboard' && (
         <div className="space-y-10 animate-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { title: 'Live Jobs', count: jobs.length, color: 'text-blue-600', icon: '💼' },
                 { title: 'Active Schemes', count: schemes.length, color: 'text-indigo-600', icon: '🏛️' },
                 { title: 'New Apps', count: '4.2k', color: 'text-green-600', icon: '📱' },
                 { title: 'Pending Sync', count: '2', color: 'text-orange-600', icon: '🔄' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-50 dark:border-slate-700 shadow-sm flex flex-col gap-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <div>
                      <h4 className={`text-4xl font-black ${stat.color}`}>{stat.count}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.title}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="relative z-10 space-y-4 text-center md:text-left">
                  <h3 className="text-3xl font-black italic">Server Pulse</h3>
                  <p className="text-slate-400 max-w-sm">All gateways (NCS, UMANG) are currently operational. Next automated sync scheduled in 4 hours.</p>
                  <div className="flex gap-2">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Systems Normal</span>
                  </div>
               </div>
               <button 
                onClick={() => handleSync('Global')}
                className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
               >
                 {syncing ? 'Syncing...' : 'Force Global Sync'}
               </button>
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
            </div>
         </div>
       )}

       {/* CONTENT: JOBS MANAGEMENT */}
       {activeTab === 'jobs' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black italic">Job Notifications</h3>
               <button 
                onClick={() => setShowAddForm(true)}
                className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
               >
                 + Add New Job
               </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden overflow-x-auto">
               <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Position & Dept</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Deadline</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                     {jobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                           <td className="px-10 py-6">
                              <div className="flex flex-col gap-1">
                                 <span className="text-sm font-black">{job.title}</span>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.department}</span>
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <span className="text-xs font-bold text-red-500">{job.deadline}</span>
                           </td>
                           <td className="px-10 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${job.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                 {job.status}
                              </span>
                           </td>
                           <td className="px-10 py-6 text-right space-x-2">
                              <button className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-blue-600 hover:text-white transition-all">✏️</button>
                              <button onClick={() => deleteJob(job.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
       )}

       {/* CONTENT: SCHEMES MANAGEMENT */}
       {activeTab === 'schemes' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black italic">Public Welfare Schemes</h3>
               <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                 + Add New Scheme
               </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden overflow-x-auto">
               <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Scheme Name</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Provider</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                     {schemes.map(scheme => (
                        <tr key={scheme.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                           <td className="px-10 py-6">
                              <span className="text-sm font-black">{scheme.name}</span>
                           </td>
                           <td className="px-10 py-6">
                              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest">{scheme.category}</span>
                           </td>
                           <td className="px-10 py-6">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{scheme.provider}</span>
                           </td>
                           <td className="px-10 py-6 text-right space-x-2">
                              <button className="p-2.5 bg-slate-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">✏️</button>
                              <button onClick={() => deleteScheme(scheme.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
       )}

       {/* CONTENT: API GATEWAYS */}
       {activeTab === 'api' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
            {API_SOURCES.map(source => (
               <div key={source.id} className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-8 flex flex-col justify-between hover:border-blue-500 transition-all">
                  <div className="space-y-4">
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl">🔗</div>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase rounded-full">Active</span>
                     </div>
                     <div>
                        <h4 className="text-xl font-black">{source.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gateway: {source.type}</p>
                     </div>
                  </div>
                  <div className="pt-6 border-t border-slate-50 dark:border-slate-700 flex flex-col gap-3">
                     <button 
                      onClick={() => handleSync(source.name)}
                      disabled={!!syncing}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                     >
                       {syncing === source.name ? 'Syncing...' : 'Sync Gateway Now'}
                     </button>
                     <button className="w-full py-3 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Configure API Key</button>
                  </div>
               </div>
            ))}
            <button className="border-4 border-dashed border-slate-100 dark:border-slate-700 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-blue-500 hover:border-blue-500 transition-all">
               <span className="text-4xl">+</span>
               <span className="text-[10px] font-black uppercase tracking-widest">Connect New Source</span>
            </button>
         </div>
       )}

       {/* CONTENT: BROADCAST ALERT CENTER */}
       {activeTab === 'broadcast' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
             <div className="bg-white dark:bg-slate-800 p-10 md:p-14 rounded-[4rem] border border-slate-100 dark:border-slate-700 shadow-xl space-y-10">
                <div className="text-center space-y-2">
                   <h3 className="text-3xl font-black italic">Broadcast Alerts</h3>
                   <p className="text-slate-500">Send instant push notifications to all portal users.</p>
                </div>
                
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Target Audience</label>
                      <select className="w-full p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl outline-none font-bold text-sm">
                         <option>All Users (12.4k)</option>
                         <option>Graduates Only (6.1k)</option>
                         <option>Andhra Pradesh Only (2.2k)</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Broadcast Message</label>
                      <textarea className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] outline-none h-40 font-medium italic text-lg resize-none" placeholder="Type notification content..."></textarea>
                   </div>
                   <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <button className="flex-1 py-5 bg-slate-100 dark:bg-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest">Preview Push</button>
                      <button className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:scale-[1.02] transition-all">Send Now 🚀</button>
                   </div>
                </div>
             </div>
          </div>
       )}

       {/* ADD JOB MODAL (CONCEPTUAL) */}
       {showAddForm && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative overflow-y-auto max-h-[90vh]">
               <button onClick={() => setShowAddForm(false)} className="absolute top-10 right-10 text-2xl font-black">✕</button>
               <h2 className="text-3xl font-black italic mb-2">New Recruitment</h2>
               <p className="text-slate-500 mb-10">Ensure dates match the official PDF exactly.</p>
               
               <form onSubmit={(e) => { e.preventDefault(); alert("Job Created!"); setShowAddForm(false); }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Job Title</label>
                        <input required type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-bold text-sm" placeholder="e.g. IAS Prelims 2026" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Start Date</label>
                        <input required type="date" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">End Date</label>
                        <input required type="date" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" />
                     </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-6">Publish Listing Live</button>
               </form>
            </div>
         </div>
       )}
    </div>
  );
};

export default AdminPanel;
