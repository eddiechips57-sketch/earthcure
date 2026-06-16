import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShoppingCart, HelpCircle, Star, Sparkles, Check, ChevronDown, Award } from 'lucide-react';
import { INVEGROW_PRODUCTS } from '../data';
import { Product, Category } from '../types';
import ThreeDCard from './ThreeDCard';
import ProductVisualizer from './ProductVisualizer';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [successAddId, setSuccessAddId] = useState<string | null>(null);

  // Filter items
  const filteredProducts = INVEGROW_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setSuccessAddId(product.id);
    setTimeout(() => {
      setSuccessAddId(null);
    }, 1800);
  };

  return (
    <section id="catalogue-section" className="space-y-12">
      
      {/* Search and Filters Navigation Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#253A36] rounded-2xl p-5 border border-[#2D4540] shadow-xl">
        
        {/* Category triggers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'wellness', label: 'Wellness & CBD' },
            { id: 'nutrition', label: 'Superfoods' },
            { id: 'skincare', label: 'Organic Skincare' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category | 'all')}
              className={`flex-shrink-0 px-5 py-2.5 rounded-none text-[11px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#1B2D2A] font-semibold'
                  : 'bg-[#1B2D2A] hover:bg-[#203531] border border-[#2D4540] text-[#E9E4D9]/80 hover:text-[#E9E4D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input bar */}
        <div className="relative max-w-sm w-full font-sans">
          <input
            type="text"
            placeholder="Search e.g. Protein, Seed oil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-[#2D4540] rounded-none text-xs bg-[#1B2D2A] text-[#E9E4D9] placeholder-[#E9E4D9]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/35 transition-colors"
          />
          <Search className="w-4 h-4 text-[#D4AF37]/75 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Grid List Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout text-center justify-center pt-2">
          {filteredProducts.map((product) => {
            const hasNutrition = !!product.nutritionFacts;
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                
                {/* 3D tilt tracking card */}
                <ThreeDCard className="h-full">
                  <div className="bg-[#253A36] rounded-none border border-[#2D4540] shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden relative group">
                    
                    {/* Category pill label badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-[#1B2D2A]/90 backdrop-blur-md rounded-none border border-[#2D4540] text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                      {product.category}
                    </div>

                    {/* Image block container */}
                    <div className="relative h-56 bg-[#1D312E] overflow-hidden shrink-0">
                      <ProductVisualizer 
                        productId={product.id} 
                        fallbackUrl={product.imageUrl} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
                        <span className="text-[#E9E4D9] font-mono text-xs bg-[#1B2D2A]/80 px-2.5 py-1 border border-[#2D4540]/60">
                          {product.size}
                        </span>
                        
                        {/* Rating block overlay */}
                        <div className="flex items-center gap-1 bg-[#D4AF37] text-[#1B2D2A] font-bold px-2 py-0.5 text-[10px] shadow-sm">
                          <Star className="w-3 h-3 fill-current" /> {product.rating}
                        </div>
                      </div>
                    </div>

                    {/* Text desc core Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-1.5">
                        <h3 className="text-md md:text-lg font-display font-light text-[#E9E4D9] leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#D4AF37]">
                          {product.tagline}
                        </p>
                        <p className="text-xs text-[#E9E4D9]/70 leading-relaxed pt-1 line-clamp-2 font-sans">
                          {product.description}
                        </p>
                      </div>

                      {/* Benefits tag matrix row */}
                      <div className="space-y-1.5 border-t border-[#2D4540]/60 pt-3">
                        {product.benefits.slice(0, 2).map((b, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#E9E4D9]/80 font-sans">
                            <span className="w-1.5 h-1.5 bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                            <span className="leading-tight">{b}</span>
                          </div>
                        ))}
                      </div>

                      {/* Buy action drawer footer */}
                      <div className="flex justify-between items-center pt-3 border-t border-[#2D4540]/60">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono text-[#E9E4D9]/40 uppercase tracking-widest leading-none">Price ZAR</span>
                          <span className="text-lg font-mono font-extrabold text-[#D4AF37] pt-0.5">
                            R{product.priceZAR}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedProductDetails(product)}
                            className="px-3 py-2 bg-[#1B2D2A] hover:bg-[#203531] border border-[#2D4540] text-white rounded-none text-xs font-mono font-medium transition"
                          >
                            Details
                          </button>
                          
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`px-4 py-2 rounded-none text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                              successAddId === product.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A]'
                            }`}
                          >
                            {successAddId === product.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 animate-pulse" /> Added!
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" /> Buy
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </ThreeDCard>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-16 text-center bg-[#253A36] rounded-none border border-[#2D4540] relative">
          <p className="text-sm text-[#E9E4D9]/60 font-mono text-center">No product items match your search. Try resetting filters.</p>
        </div>
      )}

      {/* Comparison table panel: Hemp Seed Nutrition dominance ledger */}
      <div className="bg-[#253A36] rounded-none border border-[#2D4540] p-6 md:p-8 space-y-6 text-left relative font-sans">
        <div className="flex items-center gap-2.5">
          <Award className="w-6 h-6 text-[#D4AF37]" />
          <div className="space-y-0.5">
            <h4 className="text-md md:text-lg font-display font-light uppercase tracking-wider text-[#E9E4D9]">
              Heirloom Superfood: Hemp Protein Dominance
            </h4>
            <p className="text-xs text-[#E9E4D9]/70">Comparing mineral & protein densities per 30g scoop against standard seed competitors.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-none border border-[#2D4540]/50 bg-[#1B2D2A]">
          <table className="w-full text-xs text-left" id="competitor-comparison-table">
            <thead className="bg-[#253A36] text-[#D4AF37] uppercase font-mono text-[9px] tracking-[0.15em] border-b border-[#2D4540]/80">
              <tr>
                <th className="px-4 py-3">Superfood Core</th>
                <th className="px-4 py-3">Protein Density</th>
                <th className="px-4 py-3">Omega 3 & 6 Profile</th>
                <th className="px-4 py-3">Bloat Resistance</th>
                <th className="px-4 py-3">Magnesium & Zinc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D4540]/40 text-[#E9E4D9]/80">
              <tr className="bg-[#253A36]/40 font-semibold text-[#E9E4D9]">
                <td className="px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-none bg-[#D4AF37]" />
                  Hemp Hearts
                </td>
                <td className="px-4 py-3 text-[#D4AF37] font-mono">10.1g (COMPLETE)</td>
                <td className="px-4 py-3 font-mono">12.0g (Perfect 3:1 ratio)</td>
                <td className="px-4 py-3 text-emerald-400">✓ Excellent (0% Phytic blocker)</td>
                <td className="px-4 py-3">Excellent (70% RDA)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Chia Seeds</td>
                <td className="px-4 py-3 font-mono">4.7g (Incomplete)</td>
                <td className="px-4 py-3 font-mono">5.2g (Lacks Omega-6 link)</td>
                <td className="px-4 py-3 text-orange-400/80">Moderate (Mucilaginous expansion)</td>
                <td className="px-4 py-3 font-mono">Moderate (32% RDA)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Flax Seeds</td>
                <td className="px-4 py-3 font-mono">5.1g (Incomplete)</td>
                <td className="px-4 py-3 font-mono">5.9g (Needs conversion)</td>
                <td className="px-4 py-3 text-orange-400/80">Moderate (Hard seed shell)</td>
                <td className="px-4 py-3 font-mono">Moderate (34% RDA)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL SPEC SHEET OVERLAY */}
      <AnimatePresence>
        {selectedProductDetails && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductDetails(null)}
              className="fixed inset-0 bg-black/80 z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-2xl w-full bg-[#1B2D2A] border border-[#2D4540] z-50 rounded-none shadow-2xl p-6 overflow-y-auto max-h-[85vh] text-left text-[#E9E4D9]"
            >
              <div className="flex justify-between items-start border-b border-[#2D4540]/60 pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37] font-bold">
                    Sourcing Specifications
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-wider text-[#E9E4D9]">
                    {selectedProductDetails.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="p-1 hover:bg-[#253A36] rounded-none text-[#E9E4D9]/60 hover:text-white transition"
                >
                  <XIcon />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                
                {/* Visual Specifications Left column */}
                <div className="space-y-4">
                  <div className="w-full h-44 rounded-none overflow-hidden border border-[#2D4540] bg-[#1B2D2A]">
                    <ProductVisualizer 
                      productId={selectedProductDetails.id} 
                      fallbackUrl={selectedProductDetails.imageUrl} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 bg-[#253A36]/65 rounded-none border border-[#2D4540]/60 text-xs text-[#E9E4D9]/80 leading-relaxed font-sans">
                    <span className="font-mono font-bold block text-[#D4AF37] text-[10px] uppercase tracking-[0.15em] mb-2">
                      Cellular Dosage Guidance
                    </span>
                    {selectedProductDetails.dosage}
                  </div>
                </div>

                {/* Nutritional / Botanical Details right column */}
                <div className="space-y-5">
                  <p className="text-xs text-[#E9E4D9]/70 leading-relaxed font-sans">
                    {selectedProductDetails.extendedDescription}
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono uppercase text-[#E9E4D9]/40 tracking-[0.15em] font-semibold block">
                      Ingredients Profile
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProductDetails.ingredients.map((ing, k) => (
                        <span 
                          key={k} 
                          className="px-2.5 py-1 bg-[#253A36] border border-[#2D4540]/60 rounded-none text-[10px] font-mono text-[#E9E4D9]/80 font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition fact table if available */}
                  {selectedProductDetails.nutritionFacts && (
                    <div className="border border-[#2D4540] rounded-none overflow-hidden text-xs">
                      <div className="bg-[#253A36] px-3.5 py-2 font-mono text-[9px] font-bold text-[#D4AF37] border-b border-[#2D4540] flex justify-between tracking-wide">
                        <span>NUTRITIONAL INFORMATION</span>
                        <span>Serving Size {selectedProductDetails.nutritionFacts.servingSize}</span>
                      </div>
                      <div className="p-3.5 space-y-2 bg-[#1B2D2A]/60">
                        <div className="flex justify-between border-b border-[#2D4540]/40 pb-1">
                          <span className="font-medium text-[#E9E4D9]/60">Energy Calories</span>
                          <span className="font-mono font-bold text-[#D4AF37]">{selectedProductDetails.nutritionFacts.calories}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#2D4540]/40 pb-1">
                          <span className="font-medium text-[#E9E4D9]/60">Complete Protein</span>
                          <span className="font-mono font-bold text-[#D4AF37]">{selectedProductDetails.nutritionFacts.protein}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#2D4540]/40 pb-1">
                          <span className="font-medium text-[#E9E4D9]/60">Total Essential Lipid Fats</span>
                          <span className="font-mono font-bold text-[#D4AF37]">{selectedProductDetails.nutritionFacts.fat}</span>
                        </div>
                        {selectedProductDetails.nutritionFacts.omega3 && (
                          <div className="flex justify-between border-b border-[#2D4540]/40 pb-1 text-[#E9E4D9]/90">
                            <span className="font-semibold text-emerald-400">Omega 3 Alpha-Linolenic</span>
                            <span className="font-mono font-bold text-[#E9E4D9]">{selectedProductDetails.nutritionFacts.omega3}</span>
                          </div>
                        )}
                        {selectedProductDetails.nutritionFacts.omega6 && (
                          <div className="flex justify-between border-b border-[#2D4540]/40 pb-1 text-[#E9E4D9]/90">
                            <span className="font-semibold text-emerald-400">Omega 6 Linoleic IP</span>
                            <span className="font-mono font-bold text-[#E9E4D9]">{selectedProductDetails.nutritionFacts.omega6}</span>
                          </div>
                        )}
                        {selectedProductDetails.nutritionFacts.fiber && (
                          <div className="flex justify-between border-b border-[#2D4540]/40 pb-1">
                            <span className="font-medium text-[#E9E4D9]/60">Dietary pre-biotic Fiber</span>
                            <span className="font-mono font-bold text-[#D4AF37]">{selectedProductDetails.nutritionFacts.fiber}</span>
                          </div>
                        )}
                        {selectedProductDetails.nutritionFacts.iron && (
                          <div className="flex justify-between">
                            <span className="font-medium text-[#E9E4D9]/60">Mineral Organic Iron</span>
                            <span className="font-mono font-bold text-[#D4AF37]">{selectedProductDetails.nutritionFacts.iron}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProductDetails);
                        setSelectedProductDetails(null);
                      }}
                      className="flex-1 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] flex items-center justify-center gap-2 py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition duration-200"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Basket (R{selectedProductDetails.priceZAR} ZAR)
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}

// Simple internal micro components to prevent dependency errors
function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" strokeY="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
