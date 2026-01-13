
import React, { useState } from 'react';
import { MOCK_SCHEMES, INDIAN_STATES } from '../data';
import { Link } from 'react-router-dom';
import { GovTier } from '../types';

const SchemeList: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'All' | GovTier.CENTRAL | GovTier.STATE>('All');
  const [activeState, setActiveState] = useState('All');

  const filteredSchemes = MOCK_SCHEMES.filter(s => {
    const matchesTier = activeTier === 'All' || s.tier === activeTier;
    // Show selected state schemes OR always show Central schemes (as they apply to everyone)
    const matchesState = activeState === 'All' || s.state === activeState || s.tier === GovTier.CENTRAL;
    return matchesTier && matchesState;
  });

  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-5xl font-black tracking-tight leading-tight">Public Welfare <br/><span className="text-blue-600">Schemes</span></h1>
        <p className="text-slate-500 text-lg">Direct benefits from the Union of India and your State Government.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
           {['All', GovTier.CENTRAL, GovTier.STATE].map(t => (
             <button
              key={t}
              onClick={() => setActiveTier(t as any)}
              className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTier === t ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-700'
              }`}
             >
               {t === 'All' ? 'All Schemes' : t + ' Govt'}
             </button>
           ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center px-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">State</span>
          <select 
            value={activeState}
            onChange={(e) => setActiveState(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-black text-sm"
          >
            <option value="All">All States</option>
            {INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map(scheme => (
          <div key={scheme.id} className="group bg-white dark:bg-slate-800 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-2">
                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full w-fit ${
                  scheme.tier === GovTier.CENTRAL ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {scheme.tier} Government
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  {scheme.tier === GovTier.CENTRAL ? '🇮🇳 Indian Initiative' : `📍 ${scheme.state} State`}
                </span>
              </div>
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">📜</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">{scheme.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">{scheme.description}</p>
            
            <div className="space-y-4 mb-8 pt-6 border-t border-slate-50 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">💎</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Benefit</span>
                  <span className="text-sm font-bold">{scheme.benefits}</span>
                </div>
              </div>
            </div>

            <Link 
              to={`/schemes/${scheme.id}`}
              className="w-full text-center py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-sm hover:scale-[1.02] transition-all shadow-lg shadow-slate-900/10"
            >
              Apply / Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemeList;
