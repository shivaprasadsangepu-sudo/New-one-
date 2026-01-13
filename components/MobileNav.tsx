
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center gap-1">
          <span className={`text-xl ${isActive('/') ? 'text-blue-600' : 'text-slate-400'}`}>🏠</span>
          <span className={`text-[10px] font-medium ${isActive('/') ? 'text-blue-600' : 'text-slate-400'}`}>Home</span>
        </Link>
        <Link to="/jobs" className="flex flex-col items-center gap-1">
          <span className={`text-xl ${isActive('/jobs') ? 'text-blue-600' : 'text-slate-400'}`}>💼</span>
          <span className={`text-[10px] font-medium ${isActive('/jobs') ? 'text-blue-600' : 'text-slate-400'}`}>Jobs</span>
        </Link>
        <Link to="/schemes" className="flex flex-col items-center gap-1">
          <span className={`text-xl ${isActive('/schemes') ? 'text-blue-600' : 'text-slate-400'}`}>📜</span>
          <span className={`text-[10px] font-medium ${isActive('/schemes') ? 'text-blue-600' : 'text-slate-400'}`}>Schemes</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1">
          <span className={`text-xl ${isActive('/dashboard') ? 'text-blue-600' : 'text-slate-400'}`}>👤</span>
          <span className={`text-[10px] font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-slate-400'}`}>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
