
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import ScrollingTicker from './components/ScrollingTicker';
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import SchemeList from './pages/SchemeList';
import SchemeDetail from './pages/SchemeDetail';
import NotificationList from './pages/NotificationList';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import AIAdvisor from './pages/AIAdvisor';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import DocumentVault from './pages/DocumentVault';
import ExamCalendar from './pages/ExamCalendar';
import ExamMap from './pages/ExamMap';
import ResumeBuilder from './pages/ResumeBuilder';
import SavedItems from './pages/SavedItems';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gov_user_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('gov_portal_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (userProfile) localStorage.setItem('gov_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('gov_portal_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <HashRouter>
      <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} bookmarkCount={bookmarks.length} />
        <ScrollingTicker />
        <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
          <Routes>
            <Route path="/" element={<Home bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/jobs" element={<JobList bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/jobs/:id" element={<JobDetail bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/schemes" element={<SchemeList bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/schemes/:id" element={<SchemeDetail />} />
            <Route path="/profile" element={<ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />} />
            <Route path="/dashboard" element={<Dashboard userProfile={userProfile} />} />
            <Route path="/ai-advisor" element={<AIAdvisor userProfile={userProfile} />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/vault" element={<DocumentVault />} />
            <Route path="/calendar" element={<ExamCalendar />} />
            <Route path="/map" element={<ExamMap />} />
            <Route path="/resume" element={<ResumeBuilder userProfile={userProfile} />} />
            <Route path="/saved" element={<SavedItems bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
          </Routes>
        </main>

        {/* Floating Quick Saved Action */}
        {bookmarks.length > 0 && (
          <Link 
            to="/saved" 
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40 group animate-bounce-short"
          >
             <span className="text-xl">🔖</span>
             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
               {bookmarks.length}
             </span>
             <span className="absolute right-16 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-black uppercase tracking-widest">
                My Saved Items
             </span>
          </Link>
        )}

        <MobileNav />
      </div>
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 3s ease-in-out infinite;
        }
      `}</style>
    </HashRouter>
  );
};

export default App;
