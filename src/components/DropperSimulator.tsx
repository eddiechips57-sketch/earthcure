import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Sparkles, Scale, HeartHandshake, Smile, ShieldAlert } from 'lucide-react';
import { triggerEmoticons } from './EmoticonEffects';

export default function DropperSimulator() {
  const [weightKg, setWeightKg] = useState<number>(75);
  const [goal, setGoal] = useState<'micro' | 'moderate' | 'intense'>('moderate');
  const [dropsDispensed, setDropsDispensed] = useState<number>(0);
  const [isDispensing, setIsDispensing] = useState<boolean>(false);
  const [activeDrips, setActiveDrips] = useState<{ id: number; delay: number }[]>([]);
  const [showRipples, setShowRipples] = useState<boolean[]>([]);
  
  // Formulas
  // micro: 0.15mg/kg, moderate: 0.35mg/kg, intense: 0.60mg/kg
  const multiplier = {
    micro: 0.15,
    moderate: 0.35,
    intense: 0.60
  };

  const dosageMg = Math.round(weightKg * multiplier[goal]);
  
  // 1000mg in 30ml is ~400 drops total. 1 drop = ~2.5mg CBD
  const recommendedDrops = Math.max(1, Math.round(dosageMg / 2.5));

  const handleDispense = () => {
    if (isDispensing) return;
    setIsDispensing(true);
    setDropsDispensed(0);
    setActiveDrips([]);
    setShowRipples([]);

    // We dispense sequentially based on recommended drops
    const totalDrops = Math.min(recommendedDrops, 12); // limit animation to 12 droplets for speed
    
    const newDrips = Array.from({ length: totalDrops }).map((_, i) => ({
      id: i,
      delay: i * 450
    }));
    
    setActiveDrips(newDrips);

    // Create a series of timeouts to count active drips and trigger ripples
    newDrips.forEach((drip, index) => {
      // Drip animation takes 1s. Ripple triggers at 80% (800ms) after delay
      setTimeout(() => {
        setDropsDispensed(prev => prev + 1);
        triggerEmoticons('💧 (⊙‿⊙)', 2);
        setShowRipples(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        
        // Remove ripple after animation completes
        setTimeout(() => {
          setShowRipples(prev => {
            const next = [...prev];
            next[index] = false;
            return next;
          });
        }, 1200);

      }, drip.delay + 800);
    });

    // Reset dispensing lock when all are finished
    setTimeout(() => {
      setIsDispensing(false);
    }, (totalDrops * 450) + 1200);
  };

  return (
    <section id="dropper-simulator-section" className="relative bg-[#253A36] justify-center text-[#E9E4D9] py-16 px-4 md:px-8 rounded-none border border-[#2D4540]/60 shadow-2xl">
      {/* Absolute background visual rings */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B2D2A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Settings Panel (Controls) */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1B2D2A] rounded-none text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest border border-[#2D4540]/60">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Dosage Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-wider text-[#E9E4D9] leading-tight">
              Calculate Your True <span className="text-[#D4AF37] italic font-normal">Daily Wellness Balance</span>
            </h2>
            <p className="text-[#E9E4D9]/80 text-sm md:text-base leading-relaxed font-sans">
              CBD binds uniquely to your natural body weights and physical priorities. Tailor your dosage below to see how Earthcure syncs up with your schedule.
            </p>
          </div>

          <div className="bg-[#1B2D2A] rounded-none p-6 border border-[#2D4540]/65 space-y-6">
            
            {/* Weight Sliders */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-sans">
                <label className="text-xs uppercase font-mono tracking-wider font-semibold text-[#E9E4D9]/70 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#D4AF37]" /> Body Weight (kg)
                </label>
                <span className="text-lg font-mono font-bold text-[#D4AF37]">{weightKg} kg</span>
              </div>
              <input
                id="weight-range-slider"
                type="range"
                min="50"
                max="120"
                value={weightKg}
                disabled={isDispensing}
                onChange={(e) => setWeightKg(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#253A36] rounded-none appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#E9E4D9]/50">
                <span>50 kg</span>
                <span>85 kg (Avg SA)</span>
                <span>120 kg</span>
              </div>
            </div>

            {/* Severity Goal Selection */}
            <div className="space-y-3">
              <label className="block text-xs uppercase font-mono tracking-wider font-semibold text-[#E9E4D9]/70">
                Primary Strength Indicator
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'micro', label: 'Mild Care', icon: Smile, desc: 'Microdose (0.15mg/kg)' },
                  { id: 'moderate', label: 'Daily Relax', icon: HeartHandshake, desc: 'Balance (0.35mg/kg)' },
                  { id: 'intense', label: 'Heavy Relief', icon: ShieldAlert, desc: 'Intense (0.60mg/kg)' }
                ].map((opt) => {
                  const IconComp = opt.icon;
                  const isActive = goal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      disabled={isDispensing}
                      onClick={() => setGoal(opt.id as 'micro' | 'moderate' | 'intense')}
                      className={`flex flex-col items-center justify-center p-3 rounded-none text-center border transition-all duration-200 ${
                        isActive
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1B2D2A] shadow-md'
                          : 'bg-[#253A36] border-[#2D4540] text-[#E9E4D9]/80 hover:bg-[#203531]'
                      }`}
                    >
                      <IconComp className={`w-5 h-5 mb-1.5 ${isActive ? 'text-[#1B2D2A]' : 'text-[#D4AF37]'}`} />
                      <span className="text-xs font-semibold block leading-tight">{opt.label}</span>
                      <span className="text-[8px] font-mono mt-0.5 whitespace-nowrap opacity-85">
                        {opt.id === 'micro' ? '0.15mg/k' : opt.id === 'moderate' ? '0.35mg/k' : '0.60mg/k'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Output Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#2D4540]/60">
              <div className="bg-[#253A36]/60 rounded-none p-3 border border-[#2D4540]/40">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#E9E4D9]/50 block">Daily Intake</span>
                <span className="text-xl font-display font-light text-[#D4AF37] block mt-0.5">{dosageMg} <span className="text-xs font-sans font-medium text-[#E9E4D9]/80">mg CBD</span></span>
              </div>
              <div className="bg-[#253A36]/60 rounded-none p-3 border border-[#2D4540]/40">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#E9E4D9]/50 block">Estimated Drops</span>
                <span className="text-xl font-display font-light text-white block mt-0.5">{recommendedDrops} <span className="text-xs font-sans font-medium text-[#E9E4D9]/80">Drops</span></span>
              </div>
            </div>

          </div>

          {/* Action Trigger */}
          <button
            onClick={handleDispense}
            disabled={isDispensing}
            className={`w-full py-4 px-6 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 ${
              isDispensing
                ? 'bg-[#253A36] border border-[#2D4540] text-[#E9E4D9]/40 cursor-not-allowed'
                : 'bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A]'
            }`}
          >
            <Droplet className={`w-5 h-5 ${isDispensing ? 'animate-bounce text-[#D4AF37]' : 'text-[#1B2D2A] fill-[#1B2D2A]'}`} />
            {isDispensing 
              ? `Dispensing ${recommendedDrops > 12 ? '12+' : recommendedDrops} Drops...` 
              : `Squeeze & Dispense Daily ${recommendedDrops} Drops`
            }
          </button>
        </div>

        {/* Right 3D Visual Simulator */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center h-[460px] bg-[#1B2D2A]/85 backdrop-blur-xl rounded-none border border-[#2D4540]/60 p-6 relative">
          
          {/* Legend and counter overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#253A36]/80 px-3 py-1.5 rounded-none border border-[#2D4540]/60">
            <div className={`w-2.5 h-2.5 rounded-none ${isDispensing ? 'bg-orange-500 animate-pulse' : 'bg-[#D4AF37]'}`} />
            <span className="text-xs font-mono font-medium text-[#E9E4D9]">
              Absorbed: <span className="text-white font-bold">{dropsDispensed}</span> / {recommendedDrops} drops
            </span>
          </div>

          <div className="absolute top-4 right-4 text-right">
            <span className="text-[11px] font-mono text-[#D4AF37] bg-[#253A36]/60 px-2.5 py-1 rounded-none border border-[#2D4540]/40">
              Concentration = 2.5mg/drop
            </span>
          </div>

          {/* Squeezed Pipette & Bottle Stack Container */}
          <div className="w-full max-w-xs relative h-[360px] flex flex-col justify-between items-center py-4">
            
            {/* 1. Pipette Dropper Element */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Squeeze bulb */}
              <motion.div
                animate={{
                  scaleY: isDispensing ? 0.75 : 1,
                  scaleX: isDispensing ? 1.15 : 1,
                  y: isDispensing ? 5 : 0
                }}
                transition={{ duration: 0.25, repeat: isDispensing ? -1 : 0, repeatType: "reverse" }}
                className="w-10 h-14 bg-amber-700 rounded-t-3xl rounded-b-lg border-2 border-amber-800 flex items-center justify-center cursor-pointer shadow-md"
              >
                <div className="w-1 h-8 bg-amber-600/50 rounded-full" />
              </motion.div>
              
              {/* Collar ring */}
              <div className="w-12 h-3 bg-[#1B2D2A] border border-[#2D4540] rounded-none shadow-sm" />
              
              {/* Glass pipette pipe */}
              <div className="w-2.5 h-24 bg-[#E9E4D9]/30 border border-[#2D4540]/40 rounded-b-lg flex flex-col justify-end items-center relative">
                {/* Internal amber fluid core */}
                <motion.div
                  animate={{
                    height: isDispensing ? '20%' : '80%'
                  }}
                  transition={{ duration: 1.5 }}
                  className="w-[6px] bg-[#D4AF37]/80 rounded-b-sm"
                  style={{ height: '70%', transition: 'height 0.3s ease-in-out' }}
                />
                
                {/* Dripping point */}
                <div className="absolute bottom-0 w-2 h-2 bg-amber-500 rounded-full blur-[1px] opacity-70" />
              </div>
            </div>

            {/* 2. Visual Liquid Droplets Flying Down */}
            <div className="absolute left-1/2 -translate-x-1/2 top-40 w-1 h-[200px] pointer-events-none overflow-visible">
              <AnimatePresence>
                {activeDrips.map((drip) => (
                  <div
                    key={drip.id}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-5 bg-amber-500/90 rounded-b-full rounded-tl-full rotate-45 border border-amber-600/50 shadow-sm animate-drip"
                    style={{
                      animationDelay: `${drip.delay}ms`,
                      transformOrigin: '50% 50%'
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* 3. The open Amber Medicine Flask */}
            <div className="relative z-10 flex flex-col items-center mt-28">
              {/* Flask Neck neck ring */}
              <div className="w-14 h-4 bg-amber-800 border-x border-amber-700 mt-2" />
              {/* Bottle body */}
              <div className="w-24 h-32 bg-amber-900/90 rounded-none border-2 border-amber-800 flex flex-col justify-between p-2 relative shadow-2xl">
                {/* Fluid fill meter inside glass */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 top-12 bg-amber-950/80 rounded-none overflow-hidden">
                  <motion.div 
                    animate={{
                      y: [0, 4, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-[#2D4540]/25 border-t border-[#D4AF37]/40"
                  />
                </div>
                {/* Earthcure stylized logo on glass bottle */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  <span className="text-[10px] font-mono tracking-[0.15em] text-[#E9E4D9]/80 uppercase font-bold">Invegrow</span>
                  <Droplet className="w-5 h-5 text-[#D4AF37] my-1 fill-[#D4AF37]/20" />
                  <span className="text-[7px] font-mono text-[#E9E4D9]/50">Malawi Export</span>
                </div>
              </div>
            </div>

            {/* 4. Ceramic Absorption Wavepool and ripple effects under the bottle */}
            <div className="absolute bottom-6 w-52 h-14 bg-[#1B2D2A] rounded-none border border-[#2D4540]/40 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                {/* Base calm fluid plate in dark green */}
                <div className="absolute inset-0 bg-[#1D312E] border-t border-[#2D4540]" />
                
                {/* Splashes / expansion ripples triggered sequence */}
                {showRipples.map((isActive, idx) => 
                  isActive ? (
                    <div
                      key={idx}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-[#D4AF37]/70 bg-[#D4AF37]/5 rounded-none animate-surge"
                    />
                  ) : null
                )}

                {/* Constant wave feedback indicator */}
                <div className="absolute inset-x-0 bottom-0 h-4 bg-[#1D312E] border-t border-[#2D4540]/40 flex justify-center items-center">
                  <span className="text-[8px] font-mono text-[#D4AF37] tracking-widest uppercase">CELLULAR RECEPTORS READY</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
