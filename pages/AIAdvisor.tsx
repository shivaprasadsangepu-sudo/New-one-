
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { UserProfile } from '../types';

// Helper functions for audio processing
const encode = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const decode = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
};

const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
};

const AIAdvisor: React.FC<{ userProfile: UserProfile | null }> = ({ userProfile }) => {
  const [userInput, setUserInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);
  
  // Voice State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const liveSessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopVoiceMode();
  }, []);

  const stopVoiceMode = () => {
    setIsVoiceActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (liveSessionRef.current) {
      liveSessionRef.current.close?.();
      liveSessionRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    nextStartTimeRef.current = 0;
  };

  const getAdvice = async () => {
    if (!userInput.trim()) return;
    
    setLoading(true);
    setAdvice(null);
    setGroundingLinks([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const profileStr = userProfile 
        ? `User Profile: DOB ${userProfile.dob}, Gender: ${userProfile.gender}, State: ${userProfile.state}, Education: ${userProfile.education}, Caste: ${userProfile.caste}, Income: ${userProfile.income}, PWD: ${userProfile.hasDisability}`
        : "User Profile not provided yet.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `You are an expert Indian Career & Welfare Advisor.
        
        ${profileStr}
        
        User Request: "${userInput}"
        Response Language: ${language}
        
        Analyze eligibility deeply and provide the ABSOLUTE LATEST news using Google Search.`,
        config: {
          tools: [{ googleSearch: {} }],
          // Adding thinkingBudget for complex career reasoning tasks
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });

      setAdvice(response.text || "Unable to generate advice.");
      setGroundingLinks(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      setAdvice("Error connecting to AI. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const startVoiceMode = async () => {
    if (isVoiceActive) {
      stopVoiceMode();
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const outputNode = audioContextRef.current.createGain();
      outputNode.connect(audioContextRef.current.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log("Voice Session Opened");
            setIsVoiceActive(true);
            setLoading(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output from the model
            const parts = message.serverContent?.modelTurn?.parts || [];
            for (const part of parts) {
              if (part.inlineData?.data && audioContextRef.current) {
                const buffer = await decodeAudioData(decode(part.inlineData.data), audioContextRef.current, 24000, 1);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = buffer;
                source.connect(outputNode);
                
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                
                source.onended = () => sourcesRef.current.delete(source);
                sourcesRef.current.add(source);
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopVoiceMode(),
          onerror: () => stopVoiceMode(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: "You are a friendly Indian Government Job advisor. Speak clearly in the requested language. Use a helpful and encouraging tone."
        }
      });
      
      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      stopVoiceMode();
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight">AI Advisor <span className="text-blue-600 tracking-tighter">Elite</span></h1>
        <p className="text-slate-500 text-sm md:text-lg italic max-w-xl mx-auto">Instant grounded advice with real-time web verification and live voice interaction.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-14 shadow-2xl border border-slate-100 dark:border-slate-700 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-full md:w-auto">
              {['English', 'Telugu', 'Hindi'].map(l => (
                <button 
                  key={l} 
                  onClick={() => setLanguage(l)} 
                  className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === l ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {l}
                </button>
              ))}
           </div>
           <button 
            onClick={startVoiceMode}
            disabled={loading && !isVoiceActive}
            className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isVoiceActive ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl'}`}
           >
             {isVoiceActive ? (
               <><span className="w-2 h-2 bg-white rounded-full animate-ping"></span> Stop Voice Mode</>
             ) : loading ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <>🎙️ Start Voice Advisor</>
             )}
           </button>
        </div>

        <div className="relative group">
          <textarea 
            className="w-full p-6 md:p-10 bg-slate-50 dark:bg-slate-900 border-none rounded-[2rem] md:rounded-[3.5rem] h-48 text-lg md:text-xl resize-none font-medium italic outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
            placeholder="Type your question here... e.g. 'What are the upcoming SSC exams for graduates?'"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <button 
            onClick={getAdvice} 
            disabled={loading || !userInput} 
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black shadow-2xl shadow-blue-500/30 hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-all"
          >
            {loading && !isVoiceActive ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-xl">➔</span>
            )}
          </button>
        </div>

        {advice && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="p-8 md:p-12 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] md:rounded-[4rem] border border-blue-100 dark:border-blue-800">
               <div className="prose prose-slate dark:prose-invert max-w-none">
                 <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic text-sm md:text-lg">
                    {advice}
                 </div>
               </div>
            </div>

            {groundingLinks.length > 0 && (
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6">Verified Web Sources</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groundingLinks.map((link, i) => link.web && (
                      <a 
                        key={i} 
                        href={link.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] flex items-center justify-between hover:border-blue-500 hover:shadow-xl transition-all"
                      >
                         <div className="flex flex-col gap-1 overflow-hidden">
                            <span className="text-xs font-black text-blue-600 uppercase tracking-widest truncate">{link.web.title}</span>
                            <span className="text-[10px] text-slate-400 truncate">{link.web.uri}</span>
                         </div>
                         <span className="shrink-0 text-blue-600 ml-4">↗️</span>
                      </a>
                    ))}
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
         <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-black italic">Need a Mock Interview?</h4>
            <p className="text-slate-400 text-sm">Use voice mode to practice common interview questions for PSU and State level roles.</p>
         </div>
         <button onClick={startVoiceMode} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            Practice Now
         </button>
      </div>
    </div>
  );
};

export default AIAdvisor;
