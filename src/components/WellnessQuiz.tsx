import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Leaf } from 'lucide-react';
import { QUIZ_QUESTIONS, INVEGROW_PRODUCTS } from '../data';
import { Product } from '../types';
import ProductVisualizer from './ProductVisualizer';
import { triggerEmoticons } from './EmoticonEffects';

interface WellnessQuizProps {
  onAddProductsToCart: (products: Product[]) => void;
  onOpenCart: () => void;
}

export default function WellnessQuiz({ onAddProductsToCart, onOpenCart }: WellnessQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestion.category]: value };
    setAnswers(updatedAnswers);
    triggerEmoticons('🌿 (✿◡‿◠)', 3);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question completed, compute recommendation
      setIsCalculating(true);
      
      setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);

        // Core Recommendation Algorithm based on user answers
        const primaryFocus = updatedAnswers['focus']; // wellness, nutrition, skincare
        const preferredMethod = updatedAnswers['method']; // drops, powders, tea
        
        let stack: Product[] = [];
        
        if (primaryFocus === 'wellness') {
          // Wellness stack
          const cdbDrops = INVEGROW_PRODUCTS.find(p => p.id === 'broad-spectrum-cbd-oils');
          const tea = INVEGROW_PRODUCTS.find(p => p.id === 'relaxing-cbd-herbal-tea');
          if (cdbDrops) stack.push(cdbDrops);
          if (tea) stack.push(tea);
        } else if (primaryFocus === 'nutrition') {
          // Nutrition stack
          if (preferredMethod === 'powders') {
            const protein = INVEGROW_PRODUCTS.find(p => p.id === 'nutritious-hemp-protein-powder');
            const hearts = INVEGROW_PRODUCTS.find(p => p.id === 'hearty-hemp-shelled-seeds');
            if (protein) stack.push(protein);
            if (hearts) stack.push(hearts);
          } else {
            const seedOil = INVEGROW_PRODUCTS.find(p => p.id === 'culinary-hemp-seed-oil');
            const hearts = INVEGROW_PRODUCTS.find(p => p.id === 'hearty-hemp-shelled-seeds');
            if (seedOil) stack.push(seedOil);
            if (hearts) stack.push(hearts);
          }
        } else if (primaryFocus === 'skincare') {
          // Skincare & joint relief stack
          const balm = INVEGROW_PRODUCTS.find(p => p.id === 'amari-cbd-topical-balm');
          const cosmeticOil = INVEGROW_PRODUCTS.find(p => p.id === 'cosmetic-hair-body-oil');
          if (balm) stack.push(balm);
          if (cosmeticOil) stack.push(cosmeticOil);
        } else {
          // Default fallbacks
          const cdbDrops = INVEGROW_PRODUCTS.find(p => p.id === 'broad-spectrum-cbd-oils');
          if (cdbDrops) stack.push(cdbDrops);
        }
        
        setRecommendedProducts(stack);
      }, 1500);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedProducts([]);
  };

  const handleAddStackToCart = () => {
    onAddProductsToCart(recommendedProducts);
    onOpenCart();
  };

  const progressPercentage = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="wellness-quiz-section" className="bg-[#253A36] text-[#E9E4D9] py-16 px-4 md:px-8 rounded-none border border-[#2D4540]/60 overflow-hidden shadow-2xl relative">
      
      {/* Dynamic graphic accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#1B2D2A]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Quiz Layout header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1B2D2A] border border-[#2D4540] rounded-none text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Botanical Recommendation
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-wider text-[#E9E4D9]">
            Find Your Custom <span className="text-[#D4AF37] italic">Hemp Balance</span>
          </h2>
          <p className="text-[#E9E4D9]/80 text-sm md:text-base max-w-lg mx-auto font-sans">
            Take our simple 3-stage quiz. Our algorithm pairs your focus points with the correct Malawian-grown Earthcure formulas.
          </p>
        </div>

        {/* Dynamic State rendering */}
        <div className="bg-[#1B2D2A] backdrop-blur-md rounded-none border border-[#2D4540]/70 p-6 md:p-10 min-h-[360px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {/* 1. Calculating Recommendation loader state */}
            {isCalculating ? (
              <motion.div
                key="calculating"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-4"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-none border-4 border-[#2D4540]/60" />
                  <div className="absolute inset-0 rounded-none border-4 border-[#D4AF37] border-t-transparent animate-spin" />
                  <Leaf className="w-6 h-6 text-[#D4AF37] stroke-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-1 pt-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">Synchronizing bio-receptors</span>
                  <p className="text-lg font-display uppercase tracking-wider text-[#E9E4D9]">Compiling your South African wellness stack...</p>
                </div>
              </motion.div>
            ) : showResults ? (
              
              /* 2. Results Dashboard state */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8 py-2"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D4540]/60 pb-5">
                  <div className="space-y-1 text-left">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#D4AF37]">Matchmaker Outcome</span>
                    <h3 className="text-2xl font-display font-light uppercase tracking-wider text-[#E9E4D9]">Your Recommended Earthcure Daily Stack</h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-mono uppercase bg-[#253A36] hover:bg-[#203531] border border-[#2D4540] px-3 py-1.5 rounded-none text-[#E9E4D9]/80 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Start Over
                  </button>
                </div>

                {/* Stack Product Grid cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="bg-[#253A36] rounded-none border border-[#2D4540]/60 p-4 flex gap-4 items-start hover:border-[#D4AF37]/40 transition-all text-left"
                    >
                      <div className="w-16 h-16 rounded-none overflow-hidden border border-[#2D4540]/80 flex-shrink-0">
                        <ProductVisualizer 
                          productId={product.id} 
                          fallbackUrl={product.imageUrl} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">{product.category}</span>
                        <h4 className="text-sm font-display font-light text-[#E9E4D9] uppercase tracking-wide line-clamp-1">{product.name}</h4>
                        <p className="text-[11px] text-[#E9E4D9]/75 line-clamp-2 leading-relaxed font-sans">{product.description}</p>
                        <span className="text-xs text-[#D4AF37] font-mono font-bold block pt-1">R{product.priceZAR} ZAR</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Stack Advice / Summary and ADD action */}
                <div className="bg-[#253A36] border border-[#2D4540]/60 rounded-none p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                  <div className="space-y-2 flex-1 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#D4AF37] text-[10px] font-mono font-bold text-[#1B2D2A] uppercase tracking-widest">
                        SYNERGY RATE = 98%
                      </span>
                      <span className="text-xs font-mono text-[#E9E4D9]/60">
                        Total Value: R{recommendedProducts.reduce((sum, p) => sum + p.priceZAR, 0)} ZAR
                      </span>
                    </div>
                    <p className="text-xs text-[#E9E4D9]/75 leading-relaxed max-w-xl">
                      These formulas compound benefits when utilized together. The nutrient fats in our primary carrier oils accelerate the absorption of cannabinoid particles, maximizing your target relief pathway.
                    </p>
                  </div>
                  <button
                    onClick={handleAddStackToCart}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-sans font-bold uppercase tracking-widest rounded-none text-sm transition-all duration-300 shadow-md flex-shrink-0"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    Add Stack to Basket
                  </button>
                </div>

              </motion.div>
            ) : (
              
              /* 3. Live Question slide state */
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                {/* Micro progression index */}
                <div className="flex justify-between items-center text-xs font-mono text-[#E9E4D9]/60">
                  <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="font-semibold text-[#D4AF37] tracking-wider">{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
                </div>

                {/* Question title */}
                <div className="text-left space-y-2 py-2">
                  <h3 className="text-xl md:text-2xl font-display font-light uppercase tracking-wider text-[#E9E4D9] leading-tight">
                    {currentQuestion.text}
                  </h3>
                </div>

                {/* Option grid triggers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className="group bg-[#253A36] hover:bg-[#203531] border border-[#2D4540] hover:border-[#D4AF37] rounded-none p-5 text-left transition-all duration-205 focus:outline-none flex flex-col justify-between min-h-[140px]"
                    >
                      <div className="space-y-1.5">
                        <div className="w-7 h-7 bg-[#1B2D2A] border border-[#2D4540] rounded-none flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#1B2D2A]" />
                        </div>
                        <h4 className="text-sm font-display font-light uppercase tracking-wider text-[#E9E4D9] group-hover:text-[#D4AF37] transition-colors">
                          {option.text}
                        </h4>
                      </div>
                      <p className="text-xs text-[#E9E4D9]/70 leading-normal mt-3 font-sans">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Micro bottom advice */}
                <div className="flex justify-between items-center pt-8 border-t border-[#2D4540]/60 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Custom wellness modeling
                  </span>
                  <span>100% Free Consultation Result</span>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
