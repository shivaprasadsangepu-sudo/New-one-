
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from '../types';

const AIAdvisor: React.FC<{ userProfile: UserProfile | null }> = ({ userProfile }) => {
  const [userInput, setUserInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const getAdvice = async () => {
    if (!userInput.trim()) return;
    
    setLoading(true);
    setAdvice(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const profileStr = userProfile 
        ? `User Profile: Age calculated from DOB ${userProfile.dob}, Gender: ${userProfile.gender}, State: ${userProfile.state}, Education: ${userProfile.education}, Caste: ${userProfile.caste}, Income: ${userProfile.income}, PWD: ${userProfile.hasDisability}`
        : "User Profile not provided yet.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert National-level Indian Career & Welfare Advisor.
        
        ${profileStr}
        
        User Request: "${userInput}"
        Response Language: ${language}
        
        Provide accurate guidance on:
        1. Specific eligibility for major jobs/schemes (UPSC, Banking, PM-Kisan, etc.)
        2. Exact documents required for the user's specific state (${userProfile?.state || 'India'})
        3. Simple "next steps" to apply.
        
        Tone: Professional, supportive, and simple. Use Markdown.`,
      });

      setAdvice(response.text || "Unable to generate advice.");
    } catch (error) {
      setAdvice("Error connecting to AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">AI Assistant</h1>
        <p className="text-slate-500 text-lg">Your personal guide for Telugu, Hindi, and English guidance.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 space-y-8">
        <div className="flex gap-4 mb-4">
           {['English', 'Telugu', 'Hindi'].map(l => (
             <button key={l} onClick={() => setLanguage(l)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${language === l ? 'bg-blue-600 text-white' : 'bg-slate-50'}`}>
               {l}
             </button>
           ))}
        </div>

        <textarea 
          className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl h-32 text-lg resize-none"
          placeholder="e.g. Can I apply for Banking jobs with my profile? What documents do I need for Kisan Nidhi in my state?"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <button onClick={getAdvice} disabled={loading || !userInput} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20">
          {loading ? "AI is thinking..." : "Ask Assistant"}
        </button>

        {advice && (
          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {advice}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAdvisor;
