
import React, { useState } from 'react';
import { MOCK_JOBS, MOCK_SCHEMES, MOCK_UPDATES } from '../data';
import { API_SOURCES, API_CONFIG } from '../apiConfig';
import { Job, GovTier } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'broadcast' | 'api'>('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [contentFilter, setContentFilter] = useState<'published' | 'draft'>('published');

  // Form State for new Job
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '',
    department: '',
    tier: GovTier.CENTRAL,
    salary: '₹',
    deadline: '',
    type: 'Full-time',
    status: 'published'
  });

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 1500);
  };

  const handlePublishToggle = (id: string) => {
    alert(`Status changed for ${id}`);
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
       {/* Header Section */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
               Management Hub <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest font-black">Admin Only</span>
            </h1>
            <p className="text-slate-500 font-medium italic">Manage listings, view drafts, and sync data gateways.</p>
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
                 { label: 'Active Jobs', val: MOCK_JOBS.filter(j => j.status === 'published').length, color: 'text-blue-600', bg: 'bg-blue-50', icon: '💼' },
                 { label: 'Draft Items', val: MOCK_JOBS.filter(j => j.status === 'draft').length + MOCK_SCHEMES.filter(s => s.status === 'draft').length, color: 'text-orange-600', bg: 'bg-orange-50', icon: '📝' },
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
                  <h3 className="text-xl font-black mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-700 last:border-0">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px]">👤</div>
                             <div>
                                <p className="text-sm font-bold">Admin_{i} updated a draft listing</p>
                                <p className="text-[10px] text-slate-400">10 minutes ago</p>
                             </div>
                          </div>
                          <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">DRAFT</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-center">
                  <h3 className="text-2xl font-black mb-2 italic">System Health</h3>
                  <p className="text-slate-400 text-sm mb-6">Database and API connections are stable.</p>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] uppercase font-black opacity-40">Load</p>
                       <p className="text-xl font-black">22%</p>
                    </div>
                    <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] uppercase font-black opacity-40">Storage</p>
                       <p className="text-xl font-black">8.4GB</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
               </div>
            </div>
         </div>
       )}

       {/* Tab Content: LISTINGS (The Content Manager) */}
       {activeTab === 'content' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm gap-6">
               <div className="flex p-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  {['published', 'draft'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setContentFilter(s as any)}
                      className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${contentFilter === s ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
               <div className="flex-1 w-full max-w-md relative">
                 <input type="text" placeholder="Search Listings..." className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none text-sm font-medium" />
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
               </div>
               <button 
                 onClick={() => setShowAddForm(true)}
                 className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
               >
                 + Create Job
               </button>
            </div>

            {/* Modal for Adding Job */}
            {showAddForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                 <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative">
                    <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-2xl">✕</button>
                    <h2 className="text-3xl font-black mb-2 italic">Create New Circular</h2>
                    <p className="text-slate-500 mb-10">Define parameters and choose to save as draft or publish.</p>
                    
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
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Deadline</label>
                                <input type="date" className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none" />
                             </div>
                          </div>
                       </div>

                       <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center space-y-4">
                          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">📝</div>
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-widest text-blue-600">Smart Preview</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Drafting: {newJob.title || 'Untitled Listing'}</p>
                          </div>
                          <p className="text-[10px] italic text-slate-400">Saving as draft allows further editing by team members.</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 mt-12">
                       <button onClick={() => { alert('Saved to Drafts'); setShowAddForm(false); }} className="flex-1 py-5 bg-slate-100 dark:bg-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Save as Draft</button>
                       <button onClick={() => { alert('Published Immediately!'); setShowAddForm(false); }} className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">Publish Live</button>
                    </div>
                 </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden overflow-x-auto">
               <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                     <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Job Details</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Apps</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                     {[...MOCK_JOBS].filter(j => j.status === contentFilter).map(job => (
                        <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">💼</div>
                                 <div>
                                    <p className="font-bold text-sm leading-none mb-1">{job.title}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{job.department}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${job.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                {job.status}
                              </span>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-black">{job.status === 'published' ? '1.2k+' : '-'}</p>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex gap-2">
                                 <button onClick={() => handlePublishToggle(job.id)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-xs">
                                   {job.status === 'draft' ? '🚀' : '✏️'}
                                 </button>
                                 <button className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all text-xs">🗑️</button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
       )}

       {/* BROADCAST & API remain as before but could also handle Draft versions of broadcasts */}
       {activeTab === 'broadcast' && (
          <div className="max-w-2xl mx-auto space-y-10 animate-in slide-in-from-bottom-4">
             <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-700 space-y-8">
               <h3 className="text-2xl font-black italic">Broadcast Center</h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Update Content</label>
                    <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none h-32 resize-none" placeholder="Announcement text..." />
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-slate-100 rounded-2xl text-[10px] font-black uppercase">Draft Update</button>
                    <button className="flex-2 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg">Push Live</button>
                  </div>
               </div>
             </div>
          </div>
       )}

       {/* API Gateway Tab */}
       {activeTab === 'api' && (
         <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-2xl font-black mb-10">API Gateway Integration</h3>
            <div className="space-y-4">
               {API_SOURCES.map(source => (
                 <div key={source.id} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600">{source.name[0]}</div>
                       <div>
                          <h4 className="font-bold text-sm">{source.name}</h4>
                          <p className="text-[10px] text-slate-400 font-mono">Status: Connected</p>
                       </div>
                    </div>
                    <button onClick={() => handleSync(source.id)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase">Sync Now</button>
                 </div>
               ))}
            </div>
         </div>
       )}
    </div>
  );
};

export default AdminPanel;
