
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ExamMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Location error:", err)
    );
  }, []);

  const findCenters = async (query: string) => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Model must be a Gemini 2.5 series model for googleMaps grounding support
        model: "gemini-2.5-flash",
        contents: `Find me nearby ${query} in ${coords ? `at coordinates ${coords.lat}, ${coords.lng}` : 'my current city'}. List their addresses and links if possible.`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: coords ? { latitude: coords.lat, longitude: coords.lng } : undefined
            }
          }
        },
      });

      // Directly accessing the .text property on the GenerateContentResponse object
      setResults(response.text);
      setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      console.error(error);
      setResults("Sorry, I couldn't find locations right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black italic">Center <span className="text-blue-600 tracking-tighter">Locator</span></h1>
        <p className="text-slate-500 max-w-xl mx-auto italic">Find nearby Exam Centers, Passport Offices, or Seva Kendras using real-time GPS.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {['Exam Centers', 'Passport Seva', 'MeeSeva Centers'].map(q => (
          <button 
            key={q} 
            onClick={() => findCenters(q)}
            className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:border-blue-500 transition-all font-bold text-sm"
          >
            Find {q} 📍
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="font-bold text-blue-600 uppercase tracking-widest text-[10px]">Scanning Google Maps...</p>
        </div>
      ) : results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
           <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl prose prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {results}
              </div>
           </div>
           <div className="space-y-6">
              <h3 className="text-xl font-black px-4">Direct Map Links</h3>
              <div className="space-y-3">
                 {sources.map((chunk, i) => (
                   chunk.maps && (
                     <a 
                      key={i} 
                      href={chunk.maps.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block p-6 bg-blue-600 text-white rounded-[2rem] shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                     >
                        <div className="flex justify-between items-center">
                           <span className="font-bold">{chunk.maps.title || 'Location Found'}</span>
                           <span>↗️</span>
                        </div>
                     </a>
                   )
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExamMap;
