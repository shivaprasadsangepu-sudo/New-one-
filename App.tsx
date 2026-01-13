
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
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
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
          <Routes>
            <Route path="/" element={<Home bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/jobs" element={<JobList bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/jobs/:id" element={<JobDetail bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/schemes" element={<SchemeList />} />
            <Route path="/schemes/:id" element={<SchemeDetail />} />
            <Route path="/profile" element={<ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />} />
            <Route path="/dashboard" element={<Dashboard userProfile={userProfile} />} />
            <Route path="/ai-advisor" element={<AIAdvisor userProfile={userProfile} />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <MobileNav />
      </div>
    </HashRouter>
  );
};

export default App;
