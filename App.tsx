
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Target,
  Copy,
  Check,
  BrainCircuit,
  Heart,
  Search,
  Sparkles,
  Cpu,
  Filter,
  ChevronLeft,
  PlayCircle,
  ArrowRight,
  Settings,
  BookOpen,
  Rocket,
  X,
  Quote,
  Lightbulb,
  Languages
} from 'lucide-react';
import { TechniqueType, TECHNIQUES } from './types';
import { analyzeAndSolve, EnhancedSolution } from './services/geminiService';
import { translations, PREDEFINED_EXAMPLES, CREATIVE_QUOTES, Language } from './i18n';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const t = translations[lang];
  
  const [problemInput, setProblemInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [results, setResults] = useState<{
    problem: string;
    technique: typeof TECHNIQUES[keyof typeof TECHNIQUES];
    analysis: string;
    solutions: EnhancedSolution[];
  } | null>(null);
  
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>(t.all);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const LOADING_STEPS = [
    { label: t.loadingSteps[0], icon: <Search size={24} /> },
    { label: t.loadingSteps[1], icon: <Settings size={24} /> },
    { label: t.loadingSteps[2], icon: <Sparkles size={24} /> },
    { label: t.loadingSteps[3], icon: <Rocket size={24} /> }
  ];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  useEffect(() => {
    let stepInterval: number;
    let quoteInterval: number;
    
    if (loading) {
      stepInterval = window.setInterval(() => {
        setLoadingStep(prev => (prev + 1) % LOADING_STEPS.length);
      }, 2000);
      
      quoteInterval = window.setInterval(() => {
        setQuoteIndex(prev => (prev + 1) % CREATIVE_QUOTES[lang].length);
      }, 4500);
    }
    
    return () => {
      clearInterval(stepInterval);
      clearInterval(quoteInterval);
    };
  }, [loading, lang]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    setActiveCategory(translations[newLang].all);
  };

  const startInnovation = async (text?: string) => {
    const query = text || problemInput;
    if (!query.trim()) {
      addToast(t.inputError, 'info');
      return;
    }
    if (text) setProblemInput(text);
    
    setLoading(true);
    setLoadingStep(0);
    setQuoteIndex(Math.floor(Math.random() * CREATIVE_QUOTES[lang].length));
    
    try {
      const data = await analyzeAndSolve(query, lang);
      const normalizedTechId = (data.techniqueId || '').toUpperCase() as TechniqueType;
      setResults({
        problem: query,
        technique: TECHNIQUES[normalizedTechId] || TECHNIQUES.FIVE_WHYS,
        analysis: data.analysis,
        solutions: data.solutions
      });
      setFavorites(new Set());
      setActiveCategory(t.all);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      addToast(t.error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    if (!results) return [];
    const cats = [t.all, ...Array.from(new Set(results.solutions.map(s => s.category)))];
    if (favorites.size > 0) cats.push(t.favorites);
    return cats;
  }, [results, favorites, t.all, t.favorites]);

  const filteredSolutions = useMemo(() => {
    if (!results) return [];
    if (activeCategory === t.all) return results.solutions;
    if (activeCategory === t.favorites) {
      return results.solutions.filter((_, idx) => favorites.has(idx));
    }
    return results.solutions.filter(s => s.category === activeCategory);
  }, [results, activeCategory, favorites, t.all, t.favorites]);

  const copySolution = (sol: EnhancedSolution) => {
    const text = `💡 ${lang === 'ar' ? 'حل مقترح من مختبر الإبداع' : 'Suggested solution from Innovation Lab'}:\n\n[${sol.title}]\n${sol.text}\n\n${t.nextStep}: ${sol.nextStep}`;
    navigator.clipboard.writeText(text);
    addToast(t.copySuccess, 'success');
  };

  if (results) {
    return (
      <div className="min-h-screen flex flex-col items-center pb-24 px-3 md:px-8 max-w-[1600px] mx-auto overflow-x-hidden">
        <header className="w-full max-w-6xl py-3 md:py-4 flex justify-between items-center sticky top-2 bg-white/80 backdrop-blur-2xl z-50 px-4 md:px-6 rounded-2xl md:rounded-[2rem] shadow-xl shadow-indigo-100/20 border border-white/50 mb-4 md:mb-6 transition-all">
          <button 
            onClick={() => setResults(null)}
            className="flex items-center gap-1.5 md:gap-2 text-slate-600 font-black hover:text-indigo-600 transition-all text-xs md:text-base group"
          >
            <ChevronLeft size={18} className={`${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'} transition-transform`} />
            {t.newChallenge}
          </button>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-indigo-600 font-bold text-xs md:text-sm transition-all"
            >
              <Languages size={16} />
              {t.switchLanguage}
            </button>
            
            <button 
              onClick={() => {
                const text = results.solutions.map(s => `[${s.title}]\n${s.text}`).join('\n\n');
                navigator.clipboard.writeText(text);
                addToast(t.copyAllSuccess, 'success');
              }}
              className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-indigo-600 text-white rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black hover:bg-slate-950 shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">{t.copyAll}</span>
              <span className="sm:hidden">{t.copyAllShort}</span>
            </button>
          </div>
        </header>

        <main className="w-full max-w-6xl space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <section className="bg-white rounded-[2rem] md:rounded-[3rem] p-5 md:p-14 border border-slate-100 shadow-2xl shadow-indigo-50/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1.5 md:h-2 bg-indigo-600"></div>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-[9px] md:text-sm uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full">
                <Target size={14} className="md:w-[18px] md:h-[18px]" /> {t.detectedChallenge}
              </div>
              <h2 className="text-lg md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">{results.problem}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-6 md:mt-10">
                <div className="md:col-span-5 bg-slate-950 text-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-row md:flex-col items-center md:items-start justify-between md:justify-end gap-3 md:gap-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-[-10%] left-[-10%] opacity-10 rotate-12 scale-150 pointer-events-none">
                    <BrainCircuit size={140} className="md:w-[180px] md:h-[180px]" />
                  </div>
                  <div className="text-4xl md:text-8xl z-10">{results.technique.icon}</div>
                  <div className={`z-10 flex flex-col ${lang === 'ar' ? 'items-end text-right' : 'items-start text-left'}`}>
                    <p className="text-[8px] md:text-xs text-indigo-400 font-black uppercase tracking-[0.2em] mb-1">{t.usedTechnique}</p>
                    <p className="text-xs md:text-3xl font-black leading-tight">{lang === 'ar' ? results.technique.name : results.technique.nameEn}</p>
                  </div>
                </div>
                <div className="md:col-span-7 bg-slate-50 p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 flex items-center shadow-inner">
                  <div className="space-y-3 md:space-y-6">
                    <div className="text-indigo-200">
                      <Quote size={24} className="md:w-[40px] md:h-[40px]" fill="currentColor" />
                    </div>
                    <p className="text-slate-700 leading-relaxed font-bold text-xs md:text-2xl lg:text-3xl italic">
                      {results.analysis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="sticky top-16 md:top-24 bg-[#fcfdfe]/95 backdrop-blur-xl py-3 md:py-5 z-40 -mx-4 px-4 border-y border-slate-100/50 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-3 md:gap-4 min-w-max max-w-6xl mx-auto">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl text-slate-500 font-black text-[10px] md:text-sm">
                <Filter size={14} />
                <span>{t.category}</span>
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-base font-black whitespace-nowrap transition-all border-2 ${
                    activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-300'
                  }`}
                >
                  {cat === t.favorites && <Heart size={14} fill="currentColor" className={`inline ${lang === 'ar' ? 'ml-1.5' : 'mr-1.5'} text-rose-500`} />}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredSolutions.map((sol, idx) => {
              const originalIdx = results.solutions.indexOf(sol);
              const isFav = favorites.has(originalIdx);
              
              return (
                <div 
                  key={idx}
                  className="group bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl md:text-4xl group-hover:scale-110 transition-transform duration-500">
                      {sol.emoji}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const newFavs = new Set(favorites);
                          if (isFav) newFavs.delete(originalIdx);
                          else newFavs.add(originalIdx);
                          setFavorites(newFavs);
                        }}
                        className={`p-2.5 rounded-xl transition-all ${isFav ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:text-rose-500'}`}
                      >
                        <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                      </button>
                      <button 
                        onClick={() => copySolution(sol)}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                      {sol.category}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{sol.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">{sol.text}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-tighter">
                          <span>{t.impact}</span>
                          <span>{sol.impact}/10</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${sol.impact * 10}%` }}></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-tighter">
                          <span>{t.feasibility}</span>
                          <span>{sol.feasibility}/10</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sol.feasibility * 10}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950 text-white p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{t.nextStep}</p>
                      <p className="text-xs font-bold leading-relaxed">{sol.nextStep}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full"></div>
      
      <div className="w-full max-w-4xl z-10 space-y-12 md:space-y-20">
        <header className="text-center space-y-4 md:space-y-6 relative">
          <button 
            onClick={toggleLanguage}
            className="absolute top-0 right-0 md:-right-20 flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm text-slate-600 hover:text-indigo-600 font-bold text-xs md:text-sm transition-all"
          >
            <Languages size={16} />
            {t.switchLanguage}
          </button>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.2em] animate-bounce">
            <Sparkles size={16} /> {t.title}
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tight leading-[0.9]">
            {t.subtitle.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-indigo-600 block md:inline" : ""}>{word} </span>
            ))}
          </h1>
        </header>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-indigo-100/50 p-2 md:p-4 border border-white">
            <div className="flex flex-col md:flex-row gap-2">
              <input 
                type="text"
                value={problemInput}
                onChange={(e) => setProblemInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startInnovation()}
                placeholder={t.placeholder}
                className="flex-grow px-6 py-6 md:px-10 md:py-8 text-lg md:text-2xl font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none bg-transparent"
              />
              <button 
                onClick={() => startInnovation()}
                disabled={loading}
                className="bg-slate-950 text-white px-8 py-6 md:px-12 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-lg md:text-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm md:text-base">{LOADING_STEPS[loadingStep].label}</span>
                  </div>
                ) : (
                  <>
                    {t.startBtn}
                    <ArrowRight size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-center text-slate-400 font-black text-xs md:text-sm uppercase tracking-widest">{t.examplesTitle}</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {PREDEFINED_EXAMPLES[lang].map((ex, i) => (
              <button
                key={i}
                onClick={() => startInnovation(ex.text)}
                className="px-5 py-3 md:px-8 md:py-4 bg-white border border-slate-100 rounded-2xl md:rounded-3xl text-slate-600 font-bold text-sm md:text-lg hover:border-indigo-200 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-50 transition-all flex items-center gap-2"
              >
                <span>{ex.icon}</span>
                {ex.text}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center space-y-12">
              <div className="relative inline-block">
                <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-500">
                  {LOADING_STEPS[loadingStep].icon}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl font-black text-white animate-pulse">
                  {LOADING_STEPS[loadingStep].label}
                </h3>
                <div className="flex justify-center gap-2">
                  {LOADING_STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === loadingStep ? 'w-8 bg-indigo-500' : 'w-2 bg-white/10'}`}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                <Quote size={48} className="absolute top-6 left-6 text-white/5" fill="currentColor" />
                <p className="text-xl md:text-3xl font-bold text-indigo-100 leading-relaxed italic mb-6">
                  "{CREATIVE_QUOTES[lang][quoteIndex].text}"
                </p>
                <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">
                  — {CREATIVE_QUOTES[lang][quoteIndex].author}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center pt-10 md:pt-20">
          <p className="text-slate-400 font-bold text-xs md:text-sm">
            {t.footerText}
          </p>
        </footer>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 z-[110] space-y-3">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full duration-300 ${
              toast.type === 'success' ? 'bg-emerald-500 text-white' : 
              toast.type === 'error' ? 'bg-rose-500 text-white' : 
              'bg-slate-900 text-white'
            }`}
          >
            {toast.type === 'success' ? <Check size={20} /> : <Sparkles size={20} />}
            <span className="font-bold text-sm md:text-base">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
