
import React, { useState } from 'react';
import { MOCK_SCHEMES, INDIAN_STATES, CASTES } from '../data';
import { Link } from 'react-router-dom';
import { GovTier } from '../types';

const SchemeList: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'All' | GovTier.CENTRAL | GovTier.STATE>('All');
  const [activeState, setActiveState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState('All');
  const [caste, setCaste] = useState('All');
  const [disability, setDisability] = useState<'All' | 'Yes' | 'No'>('All');

  const publishedSchemes = MOCK_SCHEMES.filter(s => s.status === 'published');
  
  const categories = Array.from(new Set(publishedSchemes.map(s => s.category)));

  const filteredSchemes = publishedSchemes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = activeTier === 'All' || s.tier === activeTier;
    const matchesState = activeState === 'All' || s.state === activeState || s.tier === GovTier.CENTRAL;
    const matchesCategory = category === 'All' || s.category === category;
    const matchesCaste = caste === 'All' || s.eligibility.caste?.includes(caste) || !s.eligibility.caste;
    const matchesDisability = disability === 'All' || 
                             (disability === 'Yes' && s.eligibility.disabilityRequired) || 
                             (disability === 'No' && !s.eligibility.disabilityRequired);

    return matchesSearch && matchesTier && matchesState && matchesCategory && matchesCaste && matchesDisability;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl font-black tracking-tight leading-tight">Public Welfare <br/><span className="text-blue-600 italic">Schemes</span></h1>
          <p className="text-slate-500 text-lg">Direct benefits from the Union of India and your State Government.</p>
        </div>
        <div className="relative w-full lg:w-96">
          <input 
            type="text" 
            placeholder="Search schemes or benefits..."
            className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
            {['All', GovTier.CENTRAL, GovTier.STATE].map(t => (
              <button
                key={t}
                onClick={() => setActiveTier(t as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTier === t ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${showAdvanced ? 'bg-slate-900 text-white border-slate-900' : 'bg-white dark:bg-slate-800 border-slate-200 text-slate-500'}`}
             >
               {showAdvanced ? 'Simple View' : 'Advanced Filters ⚙️'}
             </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-50 dark:border-slate-700 animate-in slide-in-from-top-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
              <select value={activeState} onChange={e => setActiveState(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">All Regions</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Caste</label>
              <select value={caste} onChange={e => setCaste(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">Any Background</option>
                {CASTES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Eligibility</label>
              <select value={disability} onChange={e => setDisability(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl text-xs font-bold outline-none border-none">
                <option value="All">Everyone</option>
                <option value="Yes">PWD Specific</option>
                <option value="No">Non-PWD Only</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map(scheme => (
          <div key={scheme.id} className="group bg-white dark:bg-slate-800 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-2">
                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full w-fit ${
                  scheme.tier === GovTier.CENTRAL ? 'bg-blue-100 text-blue-600 shadow-sm' : 'bg-green-100 text-green-600 shadow-sm'
                }`}>
                  {scheme.tier} Government
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  {scheme.tier === GovTier.CENTRAL ? '🇮🇳 Indian Initiative' : `📍 ${scheme.state} State`}
                </span>
              </div>
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">📜</span>
            </div>
            
            <h3 className="text-2xl font-black mb-3 leading-tight group-hover:text-blue-600 transition-colors">{scheme.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed line-clamp-3 font-medium italic">
              {scheme.description}
            </p>
            
            <div className="space-y-4 mb-8 pt-6 border-t border-slate-50 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">💎</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Benefit</span>
                    <span className="text-sm font-black">{scheme.benefits}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</span>
                   <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate max-w-[120px]">{scheme.provider}</span>
                </div>
              </div>
            </div>

            <Link 
              to={`/schemes/${scheme.id}`}
              className="w-full text-center py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-slate-900/10"
            >
              Apply / Details
            </Link>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="col-span-full text-center py-32 bg-white dark:bg-slate-800 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-black mb-2 italic">No matching schemes</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Try broadening your search or resetting categories.</p>
            <button 
              onClick={() => { setSearchTerm(''); setCategory('All'); setCaste('All'); setActiveTier('All'); setDisability('All'); }} 
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeList;
