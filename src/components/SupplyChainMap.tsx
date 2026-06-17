import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Sun, Cpu, FlaskConical, Truck, ChevronRight, HelpCircle, AlertCircle } from 'lucide-react';
import { SOIL_TO_BOTTLE_JOURNEY, JourneyStage } from '../data';

export default function SupplyChainMap() {
  const [activeStage, setActiveStage] = useState<number>(1);

  // Map icon names to Lucide icons
  const getIcon = (name: string, active: boolean) => {
    const props = {
      className: `w-6 h-6 transition-all duration-300 ${
        active ? 'text-[#1B2D2A] scale-110 font-bold' : 'text-[#D4AF37]'
      }`
    };
    switch (name) {
      case 'Sprout': return <Sprout {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'FlaskConical': return <FlaskConical {...props} />;
      case 'Truck': return <Truck {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  const currentStageData = SOIL_TO_BOTTLE_JOURNEY.find(s => s.id === activeStage) || SOIL_TO_BOTTLE_JOURNEY[0];

  return (
    <section className="bg-[#253A36] py-16 px-4 md:px-8 rounded-none border border-[#2D4540]/60 shadow-xl overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Intro */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1B2D2A] border border-[#2D4540] rounded-none text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            Trace of Origin
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-wider text-[#E9E4D9]">
            The Trans-African <span className="font-normal text-[#D4AF37] italic">Soil-to-Bottle</span> Journey
          </h2>
          <p className="text-[#E9E4D9]/80 text-sm md:text-base font-sans">
            Explore our legal, GACP/GMP certified supply chain to trace how raw active botanicals are harvested in Malawi and delivered safely to you in South Africa.
          </p>
        </div>

        {/* The Interactive Visual Map Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Side: Route and Flow Representation */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#1B2D2A] rounded-none p-6 md:p-8 border border-[#2D4540]/70 relative min-h-[420px]">
            
            {/* Ambient Background Graphic SVG showing the African continent map coordinates */}
            <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none p-6">
              <svg className="w-full h-full max-w-sm" viewBox="0 0 200 300" fill="none" stroke="currentColor">
                {/* Simulated East/South African coast and borders */}
                <path d="M50,10 Q100,50 120,90 T140,160 T120,220 T50,290" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="120" cy="110" r="4" fill="currentColor" />
                <text x="130" y="114" className="text-[10px] font-mono fill-current">Malawi</text>
                <circle cx="70" cy="240" r="4" fill="currentColor" />
                <text x="80" y="244" className="text-[10px] font-mono fill-current">South Africa</text>
              </svg>
            </div>

            {/* Simulated interactive connection paths */}
            <div className="space-y-6 relative z-10 w-full text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                Malawi Plains ➔ South African Highveld Connection
              </span>
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-2 pt-6">
                
                {/* Horizontal flow connector lines for desktop */}
                <div className="absolute top-[34px] left-6 right-6 h-0.5 bg-[#2D4540]/60 hidden md:block -z-1" />
                {/* Pulsing delivery flow progress */}
                <div 
                  className="absolute top-[34px] left-6 h-0.5 bg-[#D4AF37] hidden md:block -z-1 transition-all duration-500 rounded-none"
                  style={{ width: `${((activeStage - 1) / (SOIL_TO_BOTTLE_JOURNEY.length - 1)) * 92}%` }}
                />

                {/* Vertical flow connector for mobile */}
                <div className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-[#2D4540]/60 md:hidden -z-1" />
                <div 
                  className="absolute left-[34px] top-6 w-0.5 bg-[#D4AF37] md:hidden -z-1 transition-all duration-500 rounded-none"
                  style={{ height: `${((activeStage - 1) / (SOIL_TO_BOTTLE_JOURNEY.length - 1)) * 88}%` }}
                />

                {/* Map Node trigger bubbles */}
                {SOIL_TO_BOTTLE_JOURNEY.map((stage) => {
                  const isActive = stage.id === activeStage;
                  const isCompleted = stage.id < activeStage;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(stage.id)}
                      className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center focus:outline-none group relative pointer-events-auto"
                    >
                      {/* Node circle */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-20 ${
                        isActive 
                          ? 'bg-[#D4AF37] ring-4 ring-[#2D4540]/50 shadow-md text-[#1B2D2A] border border-[#2D4540]' 
                          : isCompleted
                            ? 'bg-[#253A36] border border-[#2D4540] text-emerald-400 hover:bg-[#203531]'
                            : 'bg-[#1D312E] border border-[#2D4540] text-[#E9E4D9]/40 hover:text-[#E9E4D9]/80'
                      }`}>
                        {getIcon(stage.iconName, isActive)}
                        
                        {/* Sequence index bag */}
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1B2D2A] text-[#D4AF37] rounded-none text-[9px] font-mono flex items-center justify-center border border-[#2D4540] shadow-sm font-bold">
                          {stage.id}
                        </span>
                      </div>

                      {/* Brief labels */}
                      <div className="space-y-0.5 max-w-[130px]">
                        <span className={`text-xs block font-sans uppercase tracking-wider leading-tight transition-colors duration-200 ${
                          isActive ? 'text-[#D4AF37] font-bold' : 'text-[#E9E4D9]/60 group-hover:text-[#E9E4D9]'
                        }`}>
                          {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                        </span>
                        <span className="text-[9px] font-mono text-[#D4AF37]/75 block tracking-tight font-medium opacity-60">
                          {stage.source.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Map Legend and compliance badge */}
            <div className="mt-8 pt-6 border-t border-[#2D4540]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 w-full text-xs font-mono text-[#E9E4D9]/60">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Verified GACP/GMP Standards — Woman-Founded & Led Business</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1B2D2A] px-2.5 py-1 rounded-none border border-[#2D4540]/60">
                <span className="inline-block w-2.5 h-2.5 rounded-none bg-emerald-400 animate-pulse" />
                <span>SA CONFORMITY ASSURED</span>
              </div>
            </div>

          </div>

          {/* Right Side: Detailed Spatial Stage Card with dynamic CSS perspective */}
          <div className="lg:col-span-5 h-full flex items-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.95, y: 15, rotateY: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15, rotateY: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ perspective: 1000 }}
                className="w-full bg-[#1B2D2A] rounded-none p-6 md:p-8 border border-[#2D4540]/70 shadow-lg relative flex flex-col justify-between text-[#E9E4D9] text-left"
              >
                {/* Background decorative detail */}
                <div className="absolute top-4 right-4 text-[#2D4540]/30 font-mono text-7xl select-none font-bold opacity-30">
                  0{activeStage}
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#D4AF37] block font-semibold">
                      Current Stage Node
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-wider text-[#E9E4D9]">
                      {currentStageData.title}
                    </h3>
                    <span className="inline-block px-2.5 py-1 bg-[#253A36] text-[#D4AF37] border border-[#2D4540]/60 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider">
                      Origin: {currentStageData.source}
                    </span>
                  </div>

                  <p className="text-[#E9E4D9]/80 text-sm leading-relaxed font-sans">
                    {currentStageData.description}
                  </p>

                  {/* Ecological Impact highlighting box */}
                  <div className="bg-[#253A36]/65 rounded-none p-4 border border-[#2D4540]/60 space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-[#E9E4D9]/50 block font-semibold">
                      Agroforestry & Carbon Metric
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-[#1B2D2A] border border-[#2D4540]/60 text-[#D4AF37]">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-sans font-bold text-[#E9E4D9] uppercase tracking-wide leading-tight">
                        {currentStageData.metric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro navigations */}
                <div className="flex justify-between items-center mt-8 pt-5 border-t border-[#2D4540]/50">
                  <button
                    disabled={activeStage === 1}
                    onClick={() => setActiveStage(prev => prev - 1)}
                    className="text-xs uppercase font-mono font-bold tracking-[0.15em] text-[#D4AF37] disabled:opacity-30 hover:text-[#E9E4D9] transition scroll-smooth"
                  >
                    ← Prev
                  </button>

                  <div className="flex gap-1">
                    {SOIL_TO_BOTTLE_JOURNEY.map(s => (
                      <div 
                        key={s.id} 
                        className={`h-1.5 transition-all duration-350 ${
                          s.id === activeStage ? 'w-5 bg-[#D4AF37]' : 'w-1.5 bg-[#2D4540]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={activeStage === SOIL_TO_BOTTLE_JOURNEY.length}
                    onClick={() => setActiveStage(prev => prev + 1)}
                    className="text-xs uppercase font-mono font-bold tracking-[0.15em] text-[#D4AF37] disabled:opacity-30 hover:text-[#E9E4D9] transition flex items-center gap-1 scroll-smooth"
                  >
                    Next →
                  </button>
                </div>
                
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
