import React, { useState } from 'react';

interface ProductVisualizerProps {
  productId: string;
  className?: string;
  fallbackUrl?: string;
}

export default function ProductVisualizer({ productId, className = '', fallbackUrl = '' }: ProductVisualizerProps) {
  const [hasError, setHasError] = useState(false);

  // Prioritize showing actual uploaded local or remote images containing official photography
  if (fallbackUrl && !hasError) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-[#122421] to-[#0A1614] flex items-center justify-center p-2.5 overflow-hidden relative group rounded-none border border-[#2D4540]/30 ${className}`}>
        {/* Subtle decorative target scope grid line */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#E9E4D9 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {/* Real photo showcase */}
        <img 
          src={fallbackUrl} 
          alt={productId} 
          className="max-w-full max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          onError={() => {
            setHasError(true);
          }}
        />
        
        {/* Super premium minimalist overlay brand line */}
        <div className="absolute bottom-1 right-2 hover:opacity-100 transition-opacity duration-300 font-mono text-[7px] text-[#E9E4D9]/25 tracking-wider bg-black/10 px-1 py-0.5 pointer-events-none uppercase">
          Licensed GACP Sourced
        </div>
      </div>
    );
  }

  // Check if we have a custom vector mockup for this product
  // Otherwise, fallback to the standard Unsplash image
  
  // Earthcure Logo SVG helper
  const renderEarthcureLogo = (color = '#FFFFFF') => (
    <div className="flex flex-col items-center justify-center">
      <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M50 25L70 45L50 68L30 45L50 25Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
        <path d="M50 35L60 45L50 58L40 45L50 35Z" fill={color} opacity="0.8" />
        <line x1="50" y1="15" x2="50" y2="78" stroke={color} strokeWidth="1.5" opacity="0.4" />
        <line x1="22" y1="45" x2="78" y2="45" stroke={color} strokeWidth="1.5" opacity="0.4" />
      </svg>
      <span className="text-[10px] tracking-[0.3em] font-light mt-1 text-center" style={{ color }}>
        EARTHCURE
      </span>
    </div>
  );

  switch (productId) {
    case 'broad-spectrum-cbd-oils':
      // Trio of CBD dropper bottles (300mg Green, 600mg Red, 1200mg Blue)
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#182B28] to-[#0E1B19] flex items-center justify-center overflow-hidden p-3 ${className}`}>
          {/* Subtle geometric grid background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="relative flex items-end justify-center gap-2.5 w-full h-full pt-6">
            {/* Ambient soft glow behind bottles */}
            <div className="absolute w-36 h-36 rounded-full bg-[#D4AF37]/5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {/* 300mg Green Bottle (Left) */}
            <div className="relative w-[28%] aspect-[1/3.2] flex flex-col items-center group/bottle transition-transform duration-300 hover:-translate-y-1.5 z-10">
              {/* Dropper Cap assembly */}
              <div className="w-[45%] h-[15%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 rounded-t-lg shadow" />
              <div className="w-[50%] h-[3%] bg-neutral-900" />
              <div className="w-[30%] h-[2%] bg-neutral-600" />
              <div className="w-[38%] h-[10%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-b border-black/40" />
              <div className="w-[28%] h-[3%] bg-neutral-900" />
              
              {/* Bottle body */}
              <div className="relative w-[90%] h-[67%] bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-950 rounded-b-xl border border-black/65 shadow-2xl flex flex-col justify-between p-1 overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute left-[8%] top-0 bottom-[5%] w-[12%] bg-white/10 rounded-full blur-[1px] pointer-events-none" />
                <div className="absolute right-[8%] top-0 bottom-[5%] w-[6%] bg-white/5 rounded-full pointer-events-none" />
                
                {/* Label wrapper */}
                <div className="w-full h-[75%] bg-[#1E1E1E] mt-1.5 border border-neutral-800 rounded px-0.5 py-1 text-center flex flex-col justify-between relative">
                  {/* Label contents */}
                  <div className="scale-[0.8] origin-top">
                    {/* Tiny logo */}
                    <div className="flex flex-col items-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 100 100" fill="none">
                        <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#FFFFFF" strokeWidth="4" />
                      </svg>
                      <span className="text-[4px] tracking-widest text-[#FFFFFF]/80 uppercase mt-0.5">EARTHCURE</span>
                    </div>
                    {/* Product description */}
                    <div className="text-[4.5px] font-mono text-[#FFFFFF]/75 mt-0.5 leading-none">Broad Spectrum</div>
                    <div className="text-[5.5px] font-bold text-[#FFFFFF] mt-0.5 uppercase tracking-wide leading-none">CBD OIL</div>
                  </div>
                  
                  {/* Green bottom V for 300mg */}
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-emerald-900/90 to-emerald-800/80 border-t border-emerald-700 flex flex-col items-center justify-center">
                    <span className="text-[6.5px] font-bold text-white font-mono leading-none">300 mg</span>
                    <span className="text-[4px] text-emerald-300 font-mono scale-90 leading-none mt-0.5">SO</span>
                  </div>
                </div>
                
                {/* Liquid bottom reflection */}
                <div className="w-full h-2 bg-emerald-950/40 rounded-b-lg" />
              </div>
              <span className="text-[9px] font-mono text-emerald-400 mt-2">300mg</span>
            </div>

            {/* 1200mg Blue Bottle (Right) - placed right, to let 600mg pop in center */}
            <div className="relative w-[28%] aspect-[1/3.2] flex flex-col items-center group/bottle transition-transform duration-300 hover:-translate-y-1.5 z-10">
              {/* Dropper Cap assembly */}
              <div className="w-[45%] h-[15%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 rounded-t-lg shadow" />
              <div className="w-[50%] h-[3%] bg-neutral-900" />
              <div className="w-[30%] h-[2%] bg-neutral-600" />
              <div className="w-[38%] h-[10%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-b border-black/40" />
              <div className="w-[28%] h-[3%] bg-neutral-900" />
              
              {/* Bottle body */}
              <div className="relative w-[90%] h-[67%] bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-950 rounded-b-xl border border-black/65 shadow-2xl flex flex-col justify-between p-1 overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute left-[8%] top-0 bottom-[5%] w-[12%] bg-white/10 rounded-full blur-[1px] pointer-events-none" />
                
                {/* Label wrapper */}
                <div className="w-full h-[75%] bg-[#1E1E1E] mt-1.5 border border-neutral-800 rounded px-0.5 py-1 text-center flex flex-col justify-between relative">
                  {/* Label contents */}
                  <div className="scale-[0.8] origin-top">
                    {/* Tiny logo */}
                    <div className="flex flex-col items-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 100 100" fill="none">
                        <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#FFFFFF" strokeWidth="4" />
                      </svg>
                      <span className="text-[4px] tracking-widest text-[#FFFFFF]/80 uppercase mt-0.5">EARTHCURE</span>
                    </div>
                    {/* Product description */}
                    <div className="text-[4.5px] font-mono text-[#FFFFFF]/75 mt-0.5 leading-none">Broad Spectrum</div>
                    <div className="text-[5.5px] font-bold text-[#FFFFFF] mt-0.5 uppercase tracking-wide leading-none">CBD OIL</div>
                  </div>
                  
                  {/* Blue bottom V for 1200mg */}
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-sky-900/90 to-sky-800/80 border-t border-sky-700 flex flex-col items-center justify-center">
                    <span className="text-[6.5px] font-bold text-white font-mono leading-none">1200 mg</span>
                    <span className="text-[4px] text-sky-300 font-mono scale-90 leading-none mt-0.5">SO</span>
                  </div>
                </div>
                
                {/* Liquid bottom reflection */}
                <div className="w-full h-2 bg-sky-950/40 rounded-b-lg" />
              </div>
              <span className="text-[9px] font-mono text-sky-450 mt-2">1200mg</span>
            </div>

            {/* 600mg Red Bottle (Center, slightly larger) */}
            <div className="relative w-[34%] aspect-[1/3.2] flex flex-col items-center group/bottle transition-transform duration-300 hover:-translate-y-2 z-20">
              {/* Dropper Cap assembly */}
              <div className="w-[45%] h-[15%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 rounded-t-lg shadow" />
              <div className="w-[50%] h-[3%] bg-neutral-900" />
              <div className="w-[30%] h-[2%] bg-neutral-600" />
              <div className="w-[38%] h-[10%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-b border-black/40" />
              <div className="w-[28%] h-[3%] bg-neutral-900" />
              
              {/* Bottle body */}
              <div className="relative w-[95%] h-[68%] bg-gradient-to-r from-neutral-850 via-neutral-800 to-neutral-900 rounded-b-2xl border border-black/70 shadow-2xl flex flex-col justify-between p-1 overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute left-[8%] top-0 bottom-[5%] w-[12%] bg-white/12 rands-full blur-[1.5px] pointer-events-none" />
                <div className="absolute right-[8%] top-0 bottom-[5%] w-[8%] bg-white/5 rounded-full pointer-events-none" />
                
                {/* Label wrapper */}
                <div className="w-full h-[78%] bg-[#1E1E1E] mt-1 border border-neutral-800 rounded-md px-1 py-1 text-center flex flex-col justify-between relative">
                  {/* Label contents */}
                  <div className="scale-[0.9] origin-top">
                    {/* Tiny logo */}
                    <div className="flex flex-col items-center">
                      <svg className="w-4 h-4" viewBox="0 0 100 100" fill="none">
                        <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#FFFFFF" strokeWidth="4" />
                      </svg>
                      <span className="text-[4.5px] tracking-widest text-[#FFFFFF]/80 uppercase mt-0.5">EARTHCURE</span>
                    </div>
                    {/* Product description */}
                    <div className="text-[5px] font-mono text-[#FFFFFF]/75 mt-0.5 leading-none">Broad Spectrum</div>
                    <div className="text-[6.5px] font-bold text-[#FFFFFF] mt-0.5 uppercase tracking-wide leading-none mt-0.5">CBD OIL</div>
                  </div>
                  
                  {/* Red bottom V for 600mg */}
                  <div className="absolute inset-x-0 bottom-0 py-1.5 bg-gradient-to-t from-red-900/90 to-red-800/80 border-t border-red-700 flex flex-col items-center justify-center">
                    <span className="text-[8px] font-bold text-white font-mono leading-none">600 mg</span>
                    <span className="text-[4.5px] text-red-300 font-mono scale-90 leading-none mt-0.5">SO</span>
                  </div>
                </div>
                
                {/* Liquid bottom reflection */}
                <div className="w-full h-2.5 bg-red-950/40 rounded-b-lg" />
              </div>
              <span className="text-[10px] font-mono font-bold text-red-400 mt-2 animate-pulse">600mg (Best Seller)</span>
            </div>

          </div>
          
          {/* Subtle reflection footer */}
          <div className="absolute bottom-1 right-2 font-mono text-[7px] text-[#E9E4D9]/40 tracking-wider">
            Vochepetsa Nkhawa | 3 x 30ml
          </div>
        </div>
      );

    case 'relaxing-cbd-herbal-tea':
      // Loose tea leaves black standing pouch with coral-pink chevron fill of organic tea pattern
      return (
        <div className={`relative w-full h-full bg-[#11211E] flex flex-col items-center justify-between p-4 font-sans ${className}`}>
          {/* Standing pouch container */}
          <div className="relative w-[72%] h-[92%] bg-gradient-to-r from-neutral-900 via-[#1a1a1a] to-neutral-920 border border-neutral-850 rounded-t-3xl rounded-b-[2rem] shadow-2xl overflow-hidden flex flex-col p-4 text-center justify-between">
            {/* Pouch zip lock line & side notches */}
            <div className="absolute top-2 inset-x-0 h-0.5 bg-neutral-800/80 border-t border-neutral-950" />
            <div className="absolute top-1.5 left-0 w-1.5 h-3 bg-neutral-950 rounded-r" />
            <div className="absolute top-1.5 right-0 w-1.5 h-3 bg-neutral-950 rounded-l" />
            
            {/* Brand Logo Header */}
            <div className="mt-2 scale-90">
              {renderEarthcureLogo('#FFFFFF')}
            </div>

            {/* Product labels */}
            <div className="my-2 space-y-1">
              <span className="text-red-400 font-mono text-[10px] uppercase font-bold tracking-widest block">HEMP</span>
              <h4 className="text-[#E9E4D9] font-display font-medium text-xs uppercase tracking-wide">Loose Tea Leaves</h4>
              <p className="text-[7.5px] text-[#E9E4D9]/60 max-w-[85%] mx-auto leading-tight">
                A mild, delicious infusion of organic hemp leaves & flowers with love from Malawi
              </p>
              <span className="inline-block bg-[#1B2D2A] text-red-400 font-mono text-[8px] border border-red-950 px-2 py-0.5 mt-1">
                100 g
              </span>
            </div>

            {/* Coral-Pink deep V-shaped vector containing tea texture / leaf patterns */}
            <div className="relative w-full h-[40%] bg-neutral-950 border-t border-red-900/40 overflow-hidden rounded-b-2xl">
              {/* Giant Red triangle pointing down (the Chevron cutout) */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-red-950 to-[#2A1110] flex items-center justify-center p-1.5"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
              >
                {/* Inside texture representing dried loose herbal tea and gold flakes */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
                  backgroundImage: `radial-gradient(#15352c 2px, transparent 2px), radial-gradient(#d4af37 1px, transparent 1px)`,
                  backgroundSize: '12px 12px, 20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }} />
                
                {/* Dried loose leaf representation */}
                <div className="w-full h-full flex items-center justify-center opacity-70">
                  <svg className="w-full h-full" viewBox="0 0 100 60" fill="none">
                    {/* Tiny leaf scatter vector */}
                    <path d="M20 10C22 15 28 14 30 20M40 30C45 28 42 22 48 20M60 15C62 20 68 22 75 18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <path d="M15 25C18 22 25 28 30 30M55 40C60 45 65 38 70 35M45 45C50 48 55 42 58 48" stroke="#10b981" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>
              </div>
              
              {/* Outer bottom text */}
              <div className="absolute bottom-1 inset-x-0 text-center leading-none">
                <span className="text-[6px] font-mono tracking-widest text-[#E9E4D9]/40 block">
                  GMP COMPLIANT STANDARDS
                </span>
              </div>
            </div>

          </div>
        </div>
      );

    case 'nutritious-hemp-protein-powder':
      // Mint green organic protein powder standing pouch
      return (
        <div className={`relative w-full h-full bg-[#11211E] flex flex-col items-center justify-between p-4 font-sans ${className}`}>
          {/* Standing pouch container */}
          <div className="relative w-[72%] h-[92%] bg-gradient-to-r from-neutral-900 via-[#1a1a1a] to-neutral-920 border border-neutral-850 rounded-t-3xl rounded-b-[2rem] shadow-2xl overflow-hidden flex flex-col p-4 text-center justify-between">
            {/* Pouch zip lock line & side notches */}
            <div className="absolute top-2 inset-x-0 h-0.5 bg-neutral-800/80 border-t border-neutral-950" />
            <div className="absolute top-1.5 left-0 w-1.5 h-3 bg-neutral-950 rounded-r" />
            <div className="absolute top-1.5 right-0 w-1.5 h-3 bg-neutral-950 rounded-l" />
            
            {/* Brand Logo Header */}
            <div className="mt-2 scale-90">
              {renderEarthcureLogo('#FFFFFF')}
            </div>

            {/* Product labels */}
            <div className="my-2 space-y-1">
              <span className="text-emerald-450 font-mono text-[10px] uppercase font-bold tracking-widest block">HEMP</span>
              <h4 className="text-[#E9E4D9] font-display font-medium text-xs uppercase tracking-wide">Protein Powder</h4>
              <p className="text-[7.5px] text-[#E9E4D9]/60 max-w-[85%] mx-auto leading-tight">
                A high protein nutritional food source organically grown with love in Malawi
              </p>
              <span className="inline-block bg-[#1B2D2A] text-emerald-400 font-mono text-[8px] border border-emerald-950 px-2 py-0.5 mt-1">
                250 g
              </span>
            </div>

            {/* Mint-Green deep V-shaped vector containing protein powder illustration */}
            <div className="relative w-full h-[40%] bg-neutral-950 border-t border-emerald-900/40 overflow-hidden rounded-b-2xl">
              {/* Giant Mint triangle pointing down (the Chevron cutout) */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-[#0F221E] flex items-center justify-center p-1.5"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
              >
                {/* Powder texture overlay */}
                <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{
                  backgroundImage: `radial-gradient(#1e3a34 1px, transparent 1px)`,
                  backgroundSize: '4px 4px'
                }} />
                
                {/* Powder piles representation inside the pouch */}
                <div className="w-full h-full flex items-end justify-center pb-2 opacity-85">
                  <svg className="w-20 h-10" viewBox="0 0 100 50" fill="none">
                    <path d="M10 50 Q30 20 50 50" fill="#1e3a30" />
                    <path d="M40 50 Q65 15 90 50" fill="#142c24" opacity="0.6" />
                    <path d="M25 50 Q50 10 75 50" fill="#315e4f" opacity="0.8" />
                  </svg>
                </div>
              </div>
              
              {/* Outer bottom text */}
              <div className="absolute bottom-1 inset-x-0 text-center leading-none">
                <span className="text-[6px] font-mono tracking-widest text-[#E9E4D9]/40 block">
                  GMP COMPLIANT STANDARDS
                </span>
              </div>
            </div>

          </div>
        </div>
      );

    case 'hearty-hemp-shelled-seeds':
      // Yellow-gold hemp shelled seeds standing pouch
      return (
        <div className={`relative w-full h-full bg-[#11211E] flex flex-col items-center justify-between p-4 font-sans ${className}`}>
          {/* Standing pouch container */}
          <div className="relative w-[72%] h-[92%] bg-gradient-to-r from-neutral-900 via-[#1a1a1a] to-neutral-920 border border-neutral-850 rounded-t-3xl rounded-b-[2rem] shadow-2xl overflow-hidden flex flex-col p-4 text-center justify-between">
            {/* Pouch zip lock line & side notches */}
            <div className="absolute top-2 inset-x-0 h-0.5 bg-neutral-800/80 border-t border-neutral-950" />
            <div className="absolute top-1.5 left-0 w-1.5 h-3 bg-neutral-950 rounded-r" />
            <div className="absolute top-1.5 right-0 w-1.5 h-3 bg-neutral-950 rounded-l" />
            
            {/* Brand Logo Header */}
            <div className="mt-2 scale-90">
              {renderEarthcureLogo('#FFFFFF')}
            </div>

            {/* Product labels */}
            <div className="my-2 space-y-1">
              <span className="text-[#D4AF37] font-mono text-[10px] uppercase font-bold tracking-widest block">HEMP</span>
              <h4 className="text-[#E9E4D9] font-display font-medium text-xs uppercase tracking-wide">Shelled Seeds</h4>
              <p className="text-[7.5px] text-[#E9E4D9]/60 max-w-[85%] mx-auto leading-tight">
                A high protein nutritional food source organically grown with love in Malawi
              </p>
              <span className="inline-block bg-[#1B2D2A] text-[#D4AF37] font-mono text-[8px] border border-[#3A301D] px-2 py-0.5 mt-1">
                250 g
              </span>
            </div>

            {/* Gold-Yellow deep V-shaped vector containing seeds illustrations */}
            <div className="relative w-full h-[40%] bg-neutral-950 border-t border-[#3A301D]/40 overflow-hidden rounded-b-2xl">
              {/* Giant Gold triangle pointing down (the Chevron cutout) */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-[#352B18] to-[#1E190E] flex items-center justify-center p-1.5"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
              >
                {/* Seed texture simulation overlay */}
                <div className="absolute inset-0 opacity-[0.35] mix-blend-screen animate-pulse" style={{
                  backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#E9E4D9 1.5px, transparent 1.5px)`,
                  backgroundSize: '8px 8px, 14px 14px',
                  backgroundPosition: '0 0, 4px 4px'
                }} />
                
                {/* Scattered seed structures in vector */}
                <div className="w-full h-full flex items-center justify-center opacity-80">
                  <svg className="w-full h-full" viewBox="0 0 100 60" fill="none">
                    {/* Small oval seeds scattered inside V cutout */}
                    <ellipse cx="35" cy="15" rx="3" ry="1.5" fill="#E9E4D9" transform="rotate(15 35 15)" />
                    <ellipse cx="55" cy="20" rx="3.5" ry="1.8" fill="#D4AF37" transform="rotate(-30 55 20)" />
                    <ellipse cx="45" cy="35" rx="3" ry="1.5" fill="#E9E4D9" transform="rotate(45 45 35)" />
                    <ellipse cx="65" cy="12" rx="2.5" ry="1.2" fill="#d1fae5" transform="rotate(25 65 12)" />
                    <ellipse cx="25" cy="28" rx="3" ry="1.5" fill="#D4AF37" transform="rotate(-15 25 28)" />
                    <ellipse cx="50" cy="8" rx="2.8" ry="1.4" fill="#E9E4D9" transform="rotate(60 50 8)" />
                  </svg>
                </div>
              </div>
              
              {/* Outer bottom text */}
              <div className="absolute bottom-1 inset-x-0 text-center leading-none">
                <span className="text-[6px] font-mono tracking-widest text-[#E9E4D9]/40 block">
                  GMP COMPLIANT STANDARDS
                </span>
              </div>
            </div>

          </div>
        </div>
      );

    case 'culinary-hemp-seed-oil':
      // Amber Cold-Pressed Hemp Seed Oil Glass Bottle (250ml)
      return (
        <div className={`relative w-full h-full bg-[#132421] flex flex-col items-center justify-center p-4 font-sans ${className}`}>
          {/* Elegant amber-olive green bottle */}
          <div className="relative w-[34%] h-[90%] flex flex-col items-center group/bottle transition-transform duration-300 hover:scale-105">
            {/* Screw cap */}
            <div className="w-[50%] h-[10%] bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-900 rounded-t border-b border-black/40 shadow-md" />
            
            {/* Slender neck */}
            <div className="w-[42%] h-[18%] bg-gradient-to-r from-[#1E2F1A] via-[#314A2B] to-[#122210] border-x border-neutral-900 shadow-inner overflow-hidden relative">
              {/* Liquid content fill line */}
              <div className="absolute bottom-0 inset-x-0 h-[80%] bg-gradient-to-r from-[#172514] via-[#243B1D] to-[#0E1B0B]" />
              <div className="absolute left-[8%] top-0 bottom-0 w-[15%] bg-white/5 pointer-events-none" />
            </div>

            {/* Bottle Shoulder curve */}
            <div className="w-[78%] h-[6%] bg-gradient-to-r from-[#1a2b16] via-[#2F4A28] to-[#10200d] rounded-t-xl border-x border-t border-neutral-900" />
            
            {/* Main glass column */}
            <div className="relative w-full h-[66%] bg-gradient-to-r from-[#142312] via-[#2F4F24] to-[#0E1C0C] border-x border-b border-neutral-950/80 rounded-b-lg shadow-2xl flex flex-col p-1.5 overflow-hidden">
              {/* Highlight glass glare lines */}
              <div className="absolute left-[6%] top-0 bottom-[4%] w-[10%] bg-white/10 rounded-full blur-[1px] pointer-events-none" />
              <div className="absolute right-[6%] top-0 bottom-[4%] w-[6%] bg-white/5 rounded-full pointer-events-none" />

              {/* Centered matte-black detailed label */}
              <div className="w-full h-[78%] my-auto bg-neutral-900 border border-neutral-800 rounded-md px-1 py-1.5 text-center flex flex-col justify-between relative">
                {/* Label Brand Header */}
                <div className="scale-75 origin-top space-y-0.5">
                  <svg className="w-3.5 h-3.5 mx-auto" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#FFFFFF" strokeWidth="4" />
                  </svg>
                  <span className="text-[4px] tracking-[0.2em] font-light block text-[#FFFFFF]/75">EARTHCURE</span>
                </div>

                {/* Oil name */}
                <div className="my-[1px] scale-90">
                  <span className="text-emerald-450 text-[7px] font-mono font-bold leading-none block">HEMP OIL</span>
                  <span className="text-[#E9E4D9] text-[6.5px] font-display font-medium leading-none block mt-0.5">Cold Pressed</span>
                </div>

                {/* Bottom green V chevron band */}
                <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-emerald-950/90 to-emerald-900/80 border-t border-emerald-800/60 rounded-b flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-white font-mono leading-none">250 ml</span>
                  <span className="text-[3.5px] text-emerald-300 font-mono tracking-widest scale-90 mt-0.5 uppercase">UNREFINED LIPIDS</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-2 font-mono text-[8px] text-[#E9E4D9]/40 tracking-wider">
            Cold Pressed Glass Decanter
          </div>
        </div>
      );

    case 'cosmetic-hair-body-oil':
      // White spray bottle with black pump and orange-red bottom band (250ml)
      return (
        <div className={`relative w-full h-full bg-[#132421] flex flex-col items-center justify-center p-4 font-sans ${className}`}>
          {/* Tall cylindrical white beauty canister spray bottle */}
          <div className="relative w-[30%] h-[92%] flex flex-col items-center group/bottle transition-transform duration-300 hover:scale-105">
            
            {/* Transparent upper protective cap */}
            <div className="w-[58%] h-[12%] bg-white/20 border border-white/35 rounded-t-2xl shadow-inner relative flex justify-center">
              {/* Internal spray nozzle siphon tube */}
              <div className="w-[25%] h-full bg-neutral-800/85 absolute bottom-0 rounded-t" />
              <div className="w-0.5 h-full bg-white/40 absolute" />
            </div>

            {/* Black spray collar element */}
            <div className="w-[74%] h-[6%] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 border-y border-black/40 shadow" />
            
            {/* Bottle body (purity white cylinder container) */}
            <div className="relative w-full h-[82%] bg-gradient-to-r from-neutral-100 via-white to-neutral-200 border border-neutral-350 rounded-b-xl shadow-2xl flex flex-col p-1 overflow-hidden">
              {/* Material sheen reflex gloss */}
              <div className="absolute left-[8%] top-0 bottom-[8%] w-[15%] bg-white/40 rounded-full blur-[2px] pointer-events-none" />
              <div className="absolute right-[8%] top-0 bottom-[8%] w-[5%] bg-black/5 rounded-full pointer-events-none" />

              {/* Wrapped premium black cosmetic label */}
              <div className="w-full h-[84%] my-auto bg-neutral-950 px-1 py-1.5 text-center flex flex-col justify-between relative rounded">
                
                {/* Brand Identity */}
                <div className="scale-75 origin-top space-y-0.5">
                  <svg className="w-3.5 h-3.5 mx-auto" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#FFFFFF" strokeWidth="4" />
                  </svg>
                  <span className="text-[4px] tracking-[0.2em] font-light block text-[#FFFFFF]/75">EARTHCURE</span>
                </div>

                {/* Cosmetic designation */}
                <span className="text-[#E9E4D9] text-[5.5px] uppercase font-mono tracking-wider font-semibold block leading-tight">
                  HEMP SEED
                </span>
                <span className="text-red-400 text-[6.5px] font-display font-medium block leading-none mt-0.5">
                  Hair & Body Oil
                </span>

                {/* Bottom red chevron footer */}
                <div className="absolute inset-x-0 bottom-0 py-1.5 bg-gradient-to-t from-red-950 to-red-900 border-t border-red-800 rounded-b flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-white font-mono leading-none">125 ml</span>
                  <span className="text-[3.5px] text-red-300 font-mono scale-90 tracking-widest leading-none mt-0.5">TO YOUR BODY</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      );

    case 'amari-cbd-topical-balm':
      // Amber relief balm glass pharmaceutical flask jar with yellow-orange ribbed cap (50ml)
      return (
        <div className={`relative w-full h-full bg-[#132421] flex flex-col items-center justify-center p-4 font-sans ${className}`}>
          {/* Glass jar profile */}
          <div className="relative w-[50%] h-[80%] flex flex-col items-center group/bottle transition-transform duration-300 hover:rotate-2">
            
            {/* Amber Glass Lip */}
            <div className="w-[68%] h-[5%] bg-amber-900 border border-amber-950 rounded-t" />

            {/* Bright Yellow ribbed cap */}
            <div className="w-[84%] h-[16%] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 rounded border border-amber-500 shadow-md flex justify-between px-1 relative">
              {/* Cap ribs */}
              <div className="w-full h-full absolute inset-0 opacity-15 flex justify-between px-1 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-0.5 h-full bg-black/60" />
                ))}
              </div>
            </div>

            {/* Apothecary glass base */}
            <div className="relative w-full h-[79%] bg-gradient-to-r from-amber-950 via-amber-900 to-[#4a1d00] border border-amber-950/60 rounded-b-2xl shadow-2xl overflow-hidden flex flex-col p-1.5 justify-between">
              {/* Liquid shine refraction and volumetric lines */}
              <div className="absolute left-[6%] top-0 bottom-[8%] w-[12%] bg-white/10 rounded-full blur-[1.5px] pointer-events-none" />
              
              {/* Measurement marks on the side of the container */}
              <div className="absolute right-2 top-2 text-right leading-[5px] scale-75 font-mono text-[5px] text-[#E9E4D9]/25 font-bold pointer-events-none space-y-2">
                <div>— 200 APPROX</div>
                <div>— 150</div>
                <div>— 100</div>
                <div>— 50</div>
              </div>

              {/* Glowing internal substance layer representing the golden beeswax balm */}
              <div className="absolute bottom-[2px] inset-x-[2px] h-[55%] bg-gradient-to-t from-orange-500/80 to-[#D4AF37]/50 rounded-b-2xl blur-[1px] mix-blend-screen pointer-events-none" />

              {/* Minimalist matte black pharmaceutical shield label */}
              <div className="w-[80%] h-[75%] mx-auto my-auto bg-neutral-950/90 border border-neutral-900 relative rounded-md p-1.5 flex flex-col justify-between text-center items-center z-10 shadow-lg">
                {/* Mini logo */}
                <div className="scale-75 origin-top">
                  <svg className="w-3.5 h-3.5 mx-auto" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15L78 45L50 78L22 45L50 15Z" stroke="#D4AF37" strokeWidth="5" />
                  </svg>
                  <span className="text-[3.5px] font-mono tracking-widest text-[#D4AF37] block mt-0.5">AMARI CBD</span>
                </div>

                <div className="scale-90 my-1">
                  <span className="text-[#E9E4D9] text-[5.5px] font-display uppercase tracking-widest block leading-none">Relief Balm</span>
                  <span className="text-[3.5px] text-[#E9E4D9]/40 font-mono block leading-none mt-1">GACP Sourced</span>
                </div>

                {/* Potency badge */}
                <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] text-[4.5px] font-mono rounded">
                  Active CBD
                </span>
                
              </div>
            </div>

          </div>
        </div>
      );

    default:
      // Fallback to beautiful default illustrative packaging using the fallbackUrl Unsplash image
      if (fallbackUrl) {
        return (
          <img 
            src={fallbackUrl} 
            alt={productId} 
            className={`w-full h-full object-cover ${className}`}
            referrerPolicy="no-referrer"
          />
        );
      }
      return (
        <div className={`w-full h-full bg-[#182C28] flex items-center justify-center text-center p-4 border border-[#2D4540]/60 ${className}`}>
          {renderEarthcureLogo('#D4AF37')}
        </div>
      );
  }
}
