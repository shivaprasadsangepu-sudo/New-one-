
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  bookmarkCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, bookmarkCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navSearch, setNavSearch] = useState('');
  
  const isActive = (path: string) => location.pathname === path;

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 h-22 flex items-center justify-between py-5 gap-6">
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20">
            GP
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none">GovPortal<span className="text-blue-600 font-bold">Pro</span></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Official Hub</span>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-10">
          <Link to="/" className={`${isActive('/') ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'} text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors`}>Home</Link>
          <Link to="/jobs" className={`${isActive('/jobs') ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'} text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors`}>Latest Jobs</Link>
          <Link to="/schemes" className={`${isActive('/schemes') ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'} text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors`}>Govt Schemes</Link>
          <Link to="/notifications" className="text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Admit Card</Link>
          <Link to="/notifications" className="text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Results</Link>
        </div>

        <div className="flex items-center gap-5 flex-1 justify-end">
          <form onSubmit={handleNavSearch} className="hidden md:block flex-1 max-w-[280px]">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input 
                type="text" 
                placeholder="Search job / scheme..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
            </div>
          </form>
          
          <button onClick={() => setDarkMode(!darkMode)} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center transition-all hover:scale-105">
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <Link to="/login" className="hidden sm:flex px-8 py-3.5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.05] shadow-xl transition-all">
            Member Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
