import React, { useState } from 'react';
import { HardwareConfig, BenchmarkResult } from './types';
import { getBenchmarkData } from './services/geminiService';
import HardwareForm from './components/HardwareForm';
import ResultsDashboard from './components/ResultsDashboard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [currentConfig, setCurrentConfig] = useState<HardwareConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBenchmark = async (config: HardwareConfig) => {
    setLoading(true);
    setError(null);
    setCurrentConfig(config);
    try {
      const data = await getBenchmarkData(config);
      setResult(data);
    } catch (err: any) {
      setError("Connection to NEGANOX servers interrupted. Please verify API key and network status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentConfig(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-neganox-black selection:bg-neganox-red selection:text-white">
      {/* Background Grid Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(18, 18, 18, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 18, 18, 0.8) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }}>
      </div>
      
      {/* Header */}
      <header className="border-b border-white/5 bg-neganox-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleReset}>
            <div className="relative w-10 h-10">
               <div className="absolute inset-0 bg-neganox-red transform skew-x-[-12deg] group-hover:skew-x-[-20deg] transition-transform duration-300"></div>
               <span className="absolute inset-0 flex items-center justify-center text-white font-bold font-display text-xl transform skew-x-[12deg] z-10">N</span>
            </div>
            <div>
              <h1 className="text-3xl font-display font-black tracking-wider text-white italic">
                NEGANOX
              </h1>
              <p className="text-[10px] text-neganox-red tracking-[0.3em] font-bold">BENCHMARK SUITE</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               SERVER ONLINE
             </div>
             <div className="text-xs font-mono text-white border border-neganox-red px-4 py-1.5 rounded bg-neganox-red/10">
               V 2.0.4
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-16 relative z-10">
        {!result && !loading && (
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 drop-shadow-2xl">
              TEST YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neganox-red to-orange-500">LIMITS</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-xl font-light">
              The world's most advanced AI-powered hardware simulator.
              Visualize performance before you build.
            </p>
          </div>
        )}

        {error && (
           <div className="max-w-4xl mx-auto mb-8 bg-red-950/40 border-l-4 border-red-600 text-red-200 p-6 flex items-center gap-4 animate-pulse">
             <p className="font-mono">{error}</p>
           </div>
        )}

        {result && currentConfig ? (
          <ResultsDashboard data={result} onReset={handleReset} config={currentConfig} />
        ) : (
          <HardwareForm onSubmit={handleBenchmark} isLoading={loading} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-10 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-neutral-600 text-xs font-mono tracking-widest">
            NEGANOX SYSTEMS &copy; {new Date().getFullYear()} // ENGINEERED FOR PERFECTION
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;