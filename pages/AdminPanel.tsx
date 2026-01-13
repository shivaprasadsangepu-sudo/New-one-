
import React, { useState } from 'react';
import { MOCK_JOBS, MOCK_SCHEMES, MOCK_UPDATES } from '../data';
import { API_SOURCES, API_CONFIG } from '../apiConfig';
import { Job, GovTier } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'broadcast' | 'api'>('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);

  // Form State for new Job
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '',
    department: '',
    tier: GovTier.CENTRAL,
    salary: '₹',
    deadline: '',
    type: 'Full-time'
  });

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 1500);
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
       {/* Header Section */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
               Management Hub <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest font-black">Admin Only</span>
            </h1>
            <p className="text-slate-500 font-medium italic">Hello Admin! Eeroju updates ento chuddam. (Let's see today's updates.)</p>
          </div>
          
          <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
            {[
              { id: 'dashboard', label: 'Overview', icon: '📊' },
              { id: 'content', label: 'Listings', icon: '💼' },
              { id: 'broadcast', label: 'Broadcast', icon: '📢' },
              { id: 'api', label: 'API Keys', icon: '🔑' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
       </div>

       {/* Tab Content: DASHBOARD */}
       {activeTab === 'dashboard' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: 'Active Jobs', val: '1,240', color: 'text-blue-600', bg: 'bg-blue-50', icon: '💼' },
                 { label: 'Scheme Apps', val: '4,821', color: 'text-green-600', bg: 'bg-green-50', icon: '📜' },
                 { label: 'New Users', val: '89', color: 'text-purple-600', bg: 'bg-purple-50', icon: '👤' },
                 { label: 'Alerts Sent', val: '12.4k', color: 'text-orange-600', bg: 'bg-orange-50', icon: '⚡' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                      <h4 className={`text-2xl font-black ${stat.color}`}>{stat.val}</h4>
                    </div>
                    <div className={`w-12 h-12 ${stat.bg} dark:bg-slate-700 rounded-2xl flex items-center justify-center text-xl`}>{stat.icon}</div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
                  <h3 className="text-xl font-black mb-6">Recent User Activity</h3>
                  <div className="space-y-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-700 last:border-0">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                             <div>
                                <p className="text-sm font-bold">User_{i}02 applied for TSPSC</p>
                                <p className="text-[10px] text-slate-400">2 minutes ago</p>
                             </div>
                          </div>
                          <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">SUCCESS</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-black">AI System Health</h3>
                    <p className="text-slate-400 text-sm">Advice generator is running at optimal capacity.</p>
                    <div className="pt-6">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                          <span>Token Usage</span>
                          <span className="text-blue-400">42%</span>
                       </div>
                       <div className="w-full bg-slate-800 h-2 rounded-full">
                          <div className="w-[42%] bg-blue-500 h-full rounded-full"></div>
                       </div>
                    </div>
                    <button className="w-full mt-6 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest">Run Diagnostics</button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
               </div>
            </div>
         </div>
       )}

       {/* Tab Content: LISTINGS (The Content Manager) */}
       {activeTab === 'content' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
               <div className="relative flex-1 max-w-md">
                 <input type="text" placeholder="Search by Job ID or Dept..." className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none text-sm font-medium" />
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
               </div>
               <button 
                 onClick={() => setShowAddForm(true)}
                 className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20 ml-4"
               >
                 + Post New Job
               </button>
            </div>

            {/* Modal for Adding Job */}
            {showAddForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                 <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative">
                    <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-2xl">✕</button>
                    <h2 className="text-3xl font-black mb-2 italic">New Job Circular (Kotha Job Update)</h2>
                    <p className="text-slate-500 mb-10">Fill in the details to publish to the portal.</p>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Job Title</label>
                             <input type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Deputy Collector" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Department</label>
                             <input type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Revenue Dept" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Gov Tier</label>
                                <select className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none">
                                   <option>Central</option><option>State</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Last Date</label>
                                <input type="date" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" />
                             </div>
                          </div>
                       </div>

                       <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                          <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-blue-600">Admin Preview</h4>
                          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg space-y-4">
                             <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">🏛️</div>
                                <span className="text-[8px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase">Preview</span>
                             </div>
                             <div>
                                <h3 className="font-bold text-sm">{newJob.title || 'Untitled Role'}</h3>
                                <p className="text-[10px] text-slate-500">{newJob.department || 'No Department'}</p>
                             </div>
                             <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400">Salary: {newJob.salary}</span>
                                <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Details</button>
                             </div>
                          </div>
                          <p className="text-[9px] text-center mt-6 text-slate-400 font-medium tracking-tight">Post will be immediately visible to matched users.</p>
                       </div>
                    </div>
                    
                    <div className="flex gap-4 mt-12">
                       <button onClick={() => setShowAddForm(false)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest">Discard</button>
                       <button onClick={() => { alert('Listing Published!'); setShowAddForm(false); }} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20">Publish Update</button>
                    </div>
                 </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                     <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Job Details</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Applications</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                     {MOCK_JOBS.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">💼</div>
                                 <div>
                                    <p className="font-bold text-sm">{job.title}</p>
                                    <p className="text-xs text-slate-500">{job.department}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[9px] font-black uppercase tracking-tighter">Live</span>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-black">1.2k+</p>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex gap-2">
                                 <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">✏️</button>
                                 <button className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
       )}

       {/* Tab Content: BROADCAST (Latest Updates) */}
       {activeTab === 'broadcast' && (
         <div className="max-w-2xl mx-auto space-y-10 animate-in slide-in-from-bottom-4">
            <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-700 space-y-8">
               <div className="space-y-2">
                  <h3 className="text-2xl font-black italic">Send Update (Kotha Notification)</h3>
                  <p className="text-sm text-slate-500">This will appear in the "Latest Updates" section for all users.</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Notification Type</label>
                    <div className="flex gap-3">
                       {['Result', 'Admit Card', 'Latest'].map(t => (
                         <button key={t} className="px-4 py-2 border rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700">{t}</button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Headline (English/Telugu)</label>
                    <input type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" placeholder="e.g. UPSC CSE Final Result Out!" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Full Context (Detailed Info)</label>
                    <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none h-32 resize-none" placeholder="Add exam dates, steps to download result, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Official PDF Link</label>
                    <input type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" placeholder="https://upsc.gov.in/notice.pdf" />
                  </div>
                  <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
                    Broadcast to All Users 🚀
                  </button>
               </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 flex items-center gap-4">
               <span className="text-3xl">🔔</span>
               <div>
                  <p className="font-bold text-blue-900 dark:text-blue-300">Smart Alert Triggered</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Users who have bookmarked matching keywords will receive an automated Push Notification.</p>
               </div>
            </div>
         </div>
       )}

       {/* Tab Content: API KEYS */}
       {activeTab === 'api' && (
         <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-4">
            <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">Connected Gateways</h3>
                  <p className="text-slate-500">System is currently pulling data from Indian Govt portals.</p>
                </div>
                <button className="px-5 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200">System Logs</button>
              </div>

              <div className="space-y-4">
                 {API_SOURCES.map(source => (
                   <div key={source.id} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-8 group">
                      <div className="flex items-center gap-6 flex-1">
                         <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">
                           {source.name[0]}
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{source.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tight ${source.type === 'Jobs' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {source.type} Source
                              </span>
                            </div>
                            <p className="text-xs font-mono text-slate-400 truncate max-w-[200px]">{API_CONFIG.NCS_API_BASE}</p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-end mr-6">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auth Status</span>
                           <span className="text-xs font-black text-green-500 flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Encrypted
                           </span>
                        </div>
                        <button 
                          onClick={() => handleSync(source.id)}
                          disabled={!!syncing}
                          className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${syncing === source.id ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 hover:bg-slate-50'}`}
                        >
                          {syncing === source.id ? 'Connecting...' : 'Fetch Live'}
                        </button>
                        <button className="px-4 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-500/20">Config</button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default AdminPanel;
