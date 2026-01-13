
import React, { useState } from 'react';
import { MOCK_JOBS, MOCK_SCHEMES } from '../data';
import { API_SOURCES, API_CONFIG } from '../apiConfig';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'api' | 'health'>('listings');
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000); // Simulate API call
  };

  return (
    <div className="space-y-12 pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black">Management Portal</h1>
            <p className="text-slate-500">System control and API configuration.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'listings' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}
            >
              Listings
            </button>
            <button 
              onClick={() => setActiveTab('api')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'api' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}
            >
              API Settings
            </button>
            <button 
              onClick={() => setActiveTab('health')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'health' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}
            >
              Health
            </button>
          </div>
       </div>

       {activeTab === 'listings' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                     <h3 className="font-bold">Active Listings ({MOCK_JOBS.length})</h3>
                     <button className="text-xs font-bold text-blue-600">+ Add Record</button>
                  </div>
                  <div className="divide-y divide-slate-50 dark:divide-slate-700">
                     {MOCK_JOBS.map(job => (
                        <div key={job.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-xl">💼</div>
                              <div>
                                 <h4 className="font-bold text-sm">{job.title}</h4>
                                 <p className="text-xs text-slate-500">{job.department}</p>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <button className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors">✏️</button>
                              <button className="p-2.5 hover:bg-red-50 text-red-600 rounded-xl transition-colors">🗑️</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/20">
                <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="opacity-70 text-sm">Total Jobs</span>
                    <span className="font-black">12,450</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="opacity-70 text-sm">Active Schemes</span>
                    <span className="font-black">420</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70 text-sm">User Applications</span>
                    <span className="font-black">8.2k</span>
                  </div>
                </div>
              </div>
            </div>
         </div>
       )}

       {activeTab === 'api' && (
         <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">Connected Sources</h3>
                  <p className="text-slate-500">Manage external government portal API keys.</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Add Custom API</button>
              </div>

              <div className="space-y-4">
                 {API_SOURCES.map(source => (
                   <div key={source.id} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6 flex-1">
                         <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-2xl font-black text-blue-600">
                           {source.name[0]}
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{source.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight ${source.type === 'Jobs' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {source.type}
                              </span>
                            </div>
                            <p className="text-xs font-mono text-slate-400">Endpoint: {API_CONFIG.NCS_API_BASE}</p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-end mr-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase">Current Key</span>
                           <span className="text-xs font-bold text-slate-600">••••••••••••••••</span>
                        </div>
                        <button 
                          onClick={() => handleSync(source.id)}
                          disabled={!!syncing}
                          className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs transition-all ${syncing === source.id ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {syncing === source.id ? 'Syncing...' : 'Sync Now'}
                        </button>
                        <button className="px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs">Edit Key</button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-12 p-8 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-800/50 flex items-start gap-4">
                <span className="text-2xl">💡</span>
                <div className="space-y-2">
                  <p className="font-bold text-orange-800 dark:text-orange-400 text-sm">Integration Tip</p>
                  <p className="text-xs text-orange-700 dark:text-orange-500/80 leading-relaxed">Most Indian government APIs require formal registration on <a href="https://api.gov.in" className="underline font-bold">api.gov.in</a> or the specific department's developer portal. Once you receive your <strong>X-API-KEY</strong>, update the <code>apiConfig.ts</code> file to start fetching live data.</p>
                </div>
              </div>
            </div>
         </div>
       )}

       {activeTab === 'health' && (
         <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
           <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
              <h3 className="text-xl font-bold">Server Logs</h3>
              <div className="font-mono text-[10px] bg-slate-900 text-green-400 p-6 rounded-2xl h-64 overflow-y-auto space-y-1">
                 <div>[2024-04-20 10:12:01] INFO: Initializing API sync workers...</div>
                 <div>[2024-04-20 10:12:05] WARN: NCS API key is missing. Using fallback.</div>
                 <div>[2024-04-20 10:15:22] SUCCESS: Scheme database cached (420 entries)</div>
                 <div className="animate-pulse">_</div>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
                 <h3 className="text-xl font-bold">System Status</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                       <p className="text-[10px] opacity-50 uppercase font-black">Memory</p>
                       <p className="text-lg font-bold">24%</p>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                       <p className="text-[10px] opacity-50 uppercase font-black">Latency</p>
                       <p className="text-lg font-bold">18ms</p>
                    </div>
                 </div>
              </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default AdminPanel;
