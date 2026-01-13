
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            GP
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter leading-none">GovPortal<span className="text-blue-600 font-bold">Pro</span></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Central & State Service</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className={`${isActive('/') ? 'text-blue-600' : 'text-slate-600'} text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors`}>Home</Link>
          <Link to="/jobs" className={`${isActive('/jobs') ? 'text-blue-600' : 'text-slate-600'} text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors`}>Jobs</Link>
          <Link to="/schemes" className={`${isActive('/schemes') ? 'text-blue-600' : 'text-slate-600'} text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors`}>Schemes</Link>
          <Link to="/admin" className={`${isActive('/admin') ? 'text-blue-600' : 'text-slate-600'} text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors`}>Admin</Link>
          <Link to="/ai-advisor" className="px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
            ✨ AI Assistant
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 p-1.5 pr-4 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-600 overflow-hidden">
               <img src="https://picsum.photos/seed/goverment/100/100" alt="Avatar" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
