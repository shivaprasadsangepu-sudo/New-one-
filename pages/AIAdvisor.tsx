
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
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

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
        contents: `You are an expert Indian Career & Welfare Advisor with real-time web access.
        
        ${profileStr}
        
        User Request: "${userInput}"
        Response Language: ${language}
        
        Provide the ABSOLUTE LATEST news using Google Search. Mention specific exam dates if they were announced TODAY.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      setAdvice(response.text || "Unable to generate advice.");
      setGroundingLinks(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      setAdvice("Error connecting to AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const startVoiceMode = async () => {
    if (isVoiceActive) return;
    setIsVoiceActive(true);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = audioContextRef.current.createGain();
    outputNode.connect(audioContextRef.current.destination);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log("Voice Session Opened");
            // Setup Mic Stream (Advanced users can use ScriptProcessor or AudioWorklet here)
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const buffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are a friendly Indian Government Job advisor. Speak clearly in the requested language."
        }
      });
    } catch (err) {
      console.error(err);
      setIsVoiceActive(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black italic tracking-tight">AI Advisor <span className="text-blue-600 tracking-tighter">Elite</span></h1>
        <p className="text-slate-500 text-lg italic">Search grounded advice with live voice support.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 dark:border-slate-700 space-y-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
           <div className="flex gap-2">
              {['English', 'Telugu', 'Hindi'].map(l => (
                <button key={l} onClick={() => setLanguage(l)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${language === l ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>
                  {l}
                </button>
              ))}
           </div>
           <button 
            onClick={startVoiceMode}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${isVoiceActive ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-900 text-white shadow-xl'}`}
           >
             {isVoiceActive ? (
               <><span className="w-2 h-2 bg-red-600 rounded-full"></span> Listening...</>
             ) : (
               <>🎙️ Voice Mode</>
             )}
           </button>
        </div>

        <div className="relative">
          <textarea 
            className="w-full p-8 bg-slate-50 dark:bg-slate-900 border-none rounded-[2.5rem] h-40 text-lg resize-none font-medium italic outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20"
            placeholder="e.g. 'Emayya, UPSC prelims date eppudu?' or 'Tell me about the PM Kisan status today.'"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <button 
            onClick={getAdvice} 
            disabled={loading || !userInput} 
            className="absolute bottom-6 right-6 p-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:scale-110 transition-all"
          >
            {loading ? "..." : "➔"}
          </button>
        </div>

        {advice && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-10 bg-blue-50 dark:bg-blue-900/20 rounded-[3rem] border border-blue-100 dark:border-blue-800">
               <div className="prose prose-slate dark:prose-invert max-w-none">
                 <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic">
                    {advice}
                 </div>
               </div>
            </div>

            {groundingLinks.length > 0 && (
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Web Sources Verified</h4>
                 <div className="grid md:grid-cols-2 gap-4">
                    {groundingLinks.map((link, i) => link.web && (
                      <a 
                        key={i} 
                        href={link.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl flex items-center justify-between hover:shadow-lg transition-all"
                      >
                         <span className="text-sm font-bold truncate max-w-[200px]">{link.web.title}</span>
                         <span className="text-blue-600">↗️</span>
                      </a>
                    ))}
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAdvisor;
