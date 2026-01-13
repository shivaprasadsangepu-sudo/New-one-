
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">G</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-500 text-sm">
            {isLogin ? 'Access your dashboard and track jobs.' : 'Join the most trusted public job portal.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Email address</label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Password</label>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                <label className="ml-2 block text-slate-600 dark:text-slate-400">Remember me</label>
              </div>
              <a href="#" className="font-bold text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/20 transition-all"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="text-center pt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
