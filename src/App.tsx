import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  ShoppingCart, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Compass, 
  Info,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  ChevronDown
} from 'lucide-react';

import { Product, CartItem } from './types';
import { INVEGROW_PRODUCTS } from './data';
import ThreeDCard from './components/ThreeDCard';
import DropperSimulator from './components/DropperSimulator';
import SupplyChainMap from './components/SupplyChainMap';
import WellnessQuiz from './components/WellnessQuiz';
import ProductSection from './components/ProductSection';
import CartDrawer from './components/CartDrawer';
import EmoticonEffects, { triggerEmoticons } from './components/EmoticonEffects';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Initialize Cart from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('earthcure_cart');
    if (cached) {
      try {
        setCartItems(JSON.parse(cached));
      } catch (err) {
        console.error('Failed to parse cart local storage:', err);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('earthcure_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      const next = cartItems.map((item) => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(next);
    } else {
      const next = [...cartItems, { product, quantity: 1 }];
      saveCart(next);
    }
    // Delightful emoticon/emoji shower effect
    triggerEmoticons('🌿', 2);
  };

  const handleAddMultipleToCart = (products: Product[]) => {
    let next = [...cartItems];
    products.forEach((product) => {
      const existingIdx = next.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        next[existingIdx] = { ...next[existingIdx], quantity: next[existingIdx].quantity + 1 };
      } else {
        next.push({ product, quantity: 1 });
      }
    });
    saveCart(next);
    // Large matchmaker celebration emoticon/emoji shower
    triggerEmoticons('✨', 2);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const next = cartItems.map((item) => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(next);
  };

  const handleRemoveItem = (productId: string) => {
    const next = cartItems.filter((item) => item.product.id !== productId);
    saveCart(next);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const faqs = [
    {
      id: 1,
      q: 'Is Earthcure / Invegrow legal in South Africa?',
      a: 'Completely. Invegrow is a fully licensed and legal industrial cannabis/hemp cultivator in Malawi, governed under authorized state frameworks. Earthcure processes and distributes these products inside South Africa fully compliant with SA Health Guidelines, ensuring 0.0% THC concentration across our oral remedies.'
    },
    {
      id: 2,
      q: 'How long does shipment courier take anywhere in South Africa?',
      a: 'We fulfill orders from our clean logistics hubs in Cape Town and Johannesburg via trusted courier cargo. Deliveries take 2–3 working days to major cities (such as Gauteng, Durban, Cape Town) and up to 4 days for outlaying rural hubs.'
    },
    {
      id: 3,
      q: 'Will your CBD oil or seeds make me high or fail drug screening?',
      a: 'Not at all. Industrial hemp is highly distinct from psychoactive marijuana. It carries dense nutritional lipids and CBD, but contains 0.0% THC, meaning it is non-psychoactive and fully safe to consume, work, and operate under drug screening guidelines.'
    },
    {
      id: 4,
      q: 'Why does Earthcure prioritize Invegrow over other hemp producers?',
      a: 'Invegrow pioneered licensed high-altitude regenerative hemp agricultural sciences in Malawi. The tropical sun, sustainable soil, and zero-pesticide agroforestry practices create dense essential fatty acids and full cannabinoids unmatched by mass commercial European/US green-houses, yielding far higher wellness efficacy for the end consumer.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1B2D2A] text-[#E9E4D9] font-sans flex flex-col justify-between selection:bg-[#2A423D] selection:text-[#E9E4D9] relative overflow-hidden">
      
      {/* Background Decorative Gradient Elements for Editorial Depth */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#2A423D] blur-[120px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] left-[-150px] w-[400px] h-[400px] rounded-full bg-[#D4AF37] blur-[150px] opacity-[0.08] pointer-events-none z-0"></div>

      {/* Floating high-status Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#1B2D2A]/85 backdrop-blur-md border-b border-[#2A423D]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group relative z-10">
            <div className="w-10 h-10 bg-[#253A36] text-[#D4AF37] border border-[#2A423D] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <Leaf className="w-5.5 h-5.5 fill-[#D4AF37]/10" />
            </div>
            <div className="text-left font-display">
              <span className="text-xl tracking-wider font-light uppercase text-[#E9E4D9] block leading-none">Earthcure</span>
              <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#D4AF37] font-semibold block pt-1">Premium Hemp Sourcing</span>
            </div>
          </a>

          {/* Desktop offset links */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.25em] font-sans text-[#E9E4D9]/70 relative z-10">
            <a href="#catalogue-section" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1 transition-all duration-200">Catalogue</a>
            <a href="#soil-to-bottle-section" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1 transition-all duration-200">Tracing Origin</a>
            <a href="#dropper-simulator-section" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1 transition-all duration-200">Dosage Sim</a>
            <a href="#wellness-quiz-section" className="hover:text-[#D4AF37] transition font-semibold text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" /> Find Your Blend
            </a>
          </nav>

          {/* Shopper cart trigger button */}
          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#253A36] hover:bg-[#2A423D] border border-[#2A423D] rounded-xl text-[#E9E4D9] transition focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/45"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#1B2D2A] text-[9px] font-mono font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-[#1B2D2A] shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu drawer trigger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 text-[#E9E4D9] hover:text-[#D4AF37] transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile navigation side drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 inset-x-0 bg-[#1B2D2A] border-b border-[#2D4540]/80 shadow-xl z-50 p-6 flex flex-col gap-4 font-mono text-center text-xs text-[#E9E4D9]"
          >
            <a 
              href="#catalogue-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 hover:bg-[#253A36] rounded transition-colors text-white"
            >
              Product Catalog
            </a>
            <a 
              href="#soil-to-bottle-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 hover:bg-[#253A36] rounded transition-colors text-white"
            >
              Soil-to-Bottle
            </a>
            <a 
              href="#dropper-simulator-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 hover:bg-[#253A36] rounded transition-colors text-white"
            >
              Dosage Simulator
            </a>
            <a 
              href="#wellness-quiz-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-bold rounded transition-colors"
            >
              Matchmaker Quiz
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Wrapper Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        
        {/* SMALL WELCOME & CORNERSTONE REGENERATIVE CATALOGUE AT THE VERY TOP */}
        <section id="catalogue-section" className="space-y-10 scroll-mt-24 pt-4">
          
          {/* Straight to the point welcome banner */}
          <div className="border border-[#2D4540]/60 bg-[#253A36]/30 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between relative overflow-hidden backdrop-blur-md rounded-xl">
            <div className="space-y-2 max-w-xl text-left z-10">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#253A36] text-[#D4AF37] border border-[#2D4540]/85 rounded font-mono text-[9px] font-bold tracking-wider uppercase">
                Welcome to Earthcure
              </div>
              <h1 className="text-xl md:text-2xl font-display font-light text-[#E9E4D9] uppercase tracking-wide leading-tight">
                Pure Malawian Hemp.
              </h1>
              <p className="text-xs text-[#E9E4D9]/80 font-sans leading-relaxed">
                Welcome to Earthcure. We offer pure, cold-pressed Malawian hemp seed oils, digests, and certified full-spectrum drop formulations. Grown on carbon-negative solar farms, packaged back-to-source traceable, and delivered straight to South Africa.
              </p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto shrink-0 font-mono text-[9px] uppercase tracking-widest z-10">
              <div className="flex-1 bg-[#253A36] text-[#D4AF37] border border-[#2D4540] px-4 py-3 text-center rounded-lg min-w-[130px]">
                <span className="block font-bold">0.0% THC</span>
                <span className="text-[7px] text-[#E9E4D9]/60">Pure immunity fuel</span>
              </div>
              <div className="flex-1 bg-[#253A36] text-[#D4AF37] border border-[#2D4540] px-4 py-3 text-center rounded-lg min-w-[130px]">
                <span className="block font-bold">FREE COURIER</span>
                <span className="text-[7px] text-[#E9E4D9]/60">Orders over R500</span>
              </div>
            </div>
          </div>

          <div className="text-left space-y-3 pt-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#253A36] rounded-full text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.25em] border border-[#2A423D]/50">
              Available Stock
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-light text-[#E9E4D9] tracking-tight leading-tight">
              Premium <span className="text-[#D4AF37] font-light italic">Botanical Catalogue</span>
            </h2>
            <p className="text-[#E9E4D9]/80 text-sm md:text-base max-w-2xl font-sans">
              Discover our certified therapeutic oils and seed proteins matching the highest South African standard safety benchmarks.
            </p>
          </div>

          {/* Catalogue item grids */}
          <ProductSection onAddToCart={handleAddToCart} />
        </section>

        {/* HERO SECTION MODULE (repositioned as About/Farming Story) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px] border-t border-[#2D4540]/30 pt-16">
          
          {/* Left Column: Copy and CTA */}
          <div className="lg:col-span-6 space-y-8 text-left relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#253A36] rounded-full text-[10px] font-mono font-semibold tracking-[0.3em] text-[#D4AF37] uppercase border border-[#2A423D]/60 shadow-inner">
                <Compass className="w-3.5 h-3.5" /> High-Altitude African Sourcing
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight text-[#E9E4D9] leading-[1.05]">
                Nourish Your Body <br /> With Certified <br />
                <span className="text-[#D4AF37] font-light italic">Malawian Hemp</span>
              </h1>
              <p className="text-[#E9E4D9]/85 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                Earthcure delivers premium cold-pressed oils, seed protein digests, and certified full-spectrum botanical wellness drops sourced directly from legal, carbon-negative farms in Malawi to the South African market.
              </p>
            </div>

            {/* Quick value props list */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="p-1 px-2 bg-[#253A36] text-[#D4AF37] rounded-md font-mono text-[9px] font-bold tracking-widest border border-[#2A423D]/30">THC</div>
                <span className="text-xs text-[#E9E4D9]/75 font-sans">0.0% Psychoactive Index</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 px-2 bg-[#253A36] text-[#D4AF37] rounded-md font-mono text-[9px] font-bold tracking-widest border border-[#2A423D]/30">DEL.</div>
                <span className="text-xs text-[#E9E4D9]/75 font-sans">Free SA Courier &gt; R500</span>
              </div>
            </div>

            {/* CTA anchors */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#catalogue-section"
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-sans text-[11px] uppercase tracking-[0.2em] font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/15 transition-all duration-300 flex items-center justify-center gap-2 rounded-none"
              >
                <span>Back to Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#wellness-quiz-section"
                className="px-8 py-4 bg-transparent hover:bg-[#253A36] text-[#E9E4D9] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold border border-[#2D4540] hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-center"
              >
                Identify My Perfect Stack
              </a>
            </div>
          </div>

          {/* Right Column: Premium 3D-feeling geometric stack */}
          <div className="lg:col-span-6 flex items-center justify-center h-[460px] relative pointer-events-auto">
            {/* Ambient circular backdrop */}
            <div className="absolute inset-x-8 inset-y-8 bg-brand-green-800/5 rounded-full blur-3xl" />
            
            {/* Premium 3D interactive bento tile */}
            <ThreeDCard className="w-full max-w-md h-[400px]">
              <div className="bg-gradient-to-br from-[#1B2D2A] to-[#253A36] rounded-none p-8 border border-[#2D4540] flex flex-col justify-between h-full relative overflow-hidden shadow-2xl">
                
                {/* Visual graphic leaves and floating stars inside the bento */}
                <div className="absolute top-10 right-10 leading-none select-none font-bold text-[#2D4540]/30 text-9xl">
                  ☀
                </div>

                <div className="space-y-1.5 text-left relative z-10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">
                    Product Highlight
                  </span>
                  <p className="text-3xl font-display font-light text-white tracking-tight leading-tight uppercase font-light">
                    Cold-Pressed <br /> Organic Sourcing
                  </p>
                  <p className="text-xs text-[#E9E4D9]/80 leading-relaxed max-w-xs pt-1 font-sans">
                    Grown on Malawi’s highest solar plains, our seeds are mechanically pressed at cold bounds to lock in antioxidants.
                  </p>
                </div>

                {/* Floating centerpiece mock rendering of are Premium oil dropper */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20%] w-32 h-52 pointer-events-none drop-shadow-2xl z-10">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 4, -4, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full relative flex flex-col items-center justify-center"
                  >
                    {/* Floating leaf card background indicator */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#253A36] border border-[#2D4540] backdrop-blur-md rounded-none flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/20" />
                    </div>
                    {/* Floating compliance card backdrop */}
                    <div className="absolute -right-8 top-1/4 w-28 p-2.5 bg-[#1B2D2A]/95 border border-[#2D4540] backdrop-blur-md rounded-none text-left text-[9px] font-mono leading-snug space-y-1">
                      <span className="text-[#D4AF37] block font-bold">ORIGIN REPORT</span>
                      <span className="text-[#E9E4D9]/85 block">✓ Salima Plains, MAL</span>
                      <span className="text-[#E9E4D9]/85 block">✓ 100% Legal Import</span>
                    </div>

                    {/* Simple geometric representation of the Amber CBD bottle */}
                    <div className="w-14 h-24 bg-gradient-to-b from-amber-800 to-amber-950 rounded-none border border-amber-700/50 flex flex-col justify-between p-1 shadow-2xl">
                      <div className="w-full h-1 bg-amber-600/40 rounded-full" />
                      <div className="bg-[#1B2D2A] border border-[#2D4540] rounded-none p-1 text-center scale-90 text-[#E9E4D9]">
                        <span className="text-[5px] uppercase font-mono tracking-wider font-extrabold block text-[#D4AF37]">Earthcure</span>
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-none mx-auto my-0.5" />
                        <span className="text-[4px] font-mono text-[#E9E4D9]/70 block">CBD 1000mg</span>
                      </div>
                      <div className="w-full h-0.5 bg-amber-900" />
                    </div>

                    {/* Dropper pipette head */}
                    <div className="w-4 h-6 bg-amber-700 rounded-lg absolute -top-4 rounded-b-none border border-amber-600" />
                  </motion.div>
                </div>

                {/* Micro bento footer info */}
                <div className="flex justify-between items-center text-xs font-mono relative z-10 text-[#E9E4D9] pt-6 border-t border-[#2D4540]/60 mt-16 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#E9E4D9]/50 uppercase tracking-widest">Sustainability</span>
                    <span className="block font-bold text-[#D4AF37]">Carbon Negative</span>
                  </div>
                  <div className="bg-[#253A36] text-[#D4AF37] border border-[#2D4540] px-3 py-1 rounded-none font-bold text-[10px] uppercase font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Traceable
                  </div>
                </div>

              </div>
            </ThreeDCard>
          </div>

        </section>

        {/* TRANS-AFRICAN SUPPLY JOURNEY: Tracing origin */}
        <section id="soil-to-bottle-section" className="scroll-mt-24">
          <SupplyChainMap />
        </section>

        {/* CALCULATING ENGINE DOSAGE PIPETTE DROPPERS */}
        <section className="scroll-mt-24">
          <DropperSimulator />
        </section>

        {/* ECO LOGICAL BIOQuiz RECOMMENDATION STARTERS */}
        <section className="scroll-mt-24">
          <WellnessQuiz 
            onAddProductsToCart={handleAddMultipleToCart} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
        </section>

        {/* EDUCATIONAL FAQ SYSTEM COLLAPSES */}
        <section className="space-y-10 max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#253A36] rounded-full text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.25em] border border-[#2A423D]/50">
              Faq Board
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-light text-[#E9E4D9] tracking-tight">
              Everything You <span className="text-[#D4AF37] font-light italic">Need To Know</span>
            </h2>
            <p className="text-[#E9E4D9]/80 text-sm md:text-base font-sans">
              Learn about legality, South African Health permits, non-psychoactive thresholds, and shipping logistics.
            </p>
          </div>

          <div className="space-y-4 pt-4 font-sans">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={faq.id}
                  className="bg-[#253A36] rounded-xl border border-[#2A423D]/60 overflow-hidden text-left shadow-lg transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 flex justify-between items-center bg-[#253A36] hover:bg-[#2A423D] transition-colors text-left focus:outline-none"
                  >
                    <span className="font-sans font-medium text-[#E9E4D9] text-xs sm:text-sm md:text-base leading-snug">
                       {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform duration-350 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-[#1D312E]"
                      >
                        <p className="p-5 text-[#E9E4D9]/80 text-xs sm:text-sm leading-relaxed border-t border-[#2A423D]/45">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Slide-over custom drawer checking out */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global emoticon/emoji physics visualizer element */}
      <EmoticonEffects />

      {/* General High-End Footer */}
      <footer className="bg-[#152422] text-[#E9E4D9] pt-20 pb-8 mt-24 border-t border-[#2D4540]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left relative z-10 font-sans">
            
            {/* Logo description */}
            <div className="space-y-4 md:col-span-1.5 pt-0.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#253A36] text-[#D4AF37] border border-[#2D4540]/50 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4.5 h-4.5 fill-[#D4AF37]/10" />
                </div>
                <span className="text-md font-display font-medium tracking-widest uppercase text-[#E9E4D9]">Earthcure</span>
              </div>
              <p className="text-xs text-[#E9E4D9]/75 leading-relaxed">
                Earthcure is the primary digital gateway connecting licensed Malawian industrial hemp agricultural harvests with consumers seeking certified plant immunity and cellular rest across South Africa.
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[9px] font-mono uppercase bg-[#1B2D2A] border border-[#2D4540] text-[#D4AF37] px-2.5 py-1 rounded">
                  Legal SA Permit Conformity
                </span>
                <span className="text-[9px] font-mono uppercase bg-[#1B2D2A] border border-[#2D4540] text-[#D4AF37] px-2.5 py-1 rounded">
                  Non-Psychoactive Certified
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">Store Sourcing</h4>
              <ul className="space-y-2.5 text-xs text-[#E9E4D9]/70">
                <li><a href="#catalogue-section" className="hover:text-[#D4AF37] transition-colors">Hemp Supplement Catalog</a></li>
                <li><a href="#soil-to-bottle-section" className="hover:text-[#D4AF37] transition-colors">Malawian Farm Origin</a></li>
                <li><a href="#dropper-simulator-section" className="hover:text-[#D4AF37] transition-colors">Immunity Dosage Calculator</a></li>
                <li><a href="#wellness-quiz-section" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]/80">Bespoke Wellness Quiz</a></li>
              </ul>
            </div>

            {/* Sourcing Hub Locations info */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">Partner Sourcing</h4>
              <div className="text-xs text-[#E9E4D9]/70 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#E9E4D9]">Invegrow Malawi Ltd:</strong> <br />
                  Chilungamo Area, Salima Highways, Lilongwe, Malawi
                </p>
                <p>
                  <strong className="text-[#E9E4D9]">Earthcure Logistics Hubs:</strong> <br />
                  De Waterkant Cape Town, Sandton Gauteng, South Africa
                </p>
              </div>
            </div>

            {/* Legal / Authority Permits compliance logos */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">SA Compliance Regulations</h4>
              <div className="space-y-2.5 text-xs text-[#E9E4D9]/60">
                <p className="leading-relaxed">
                  Products are sold strictly under South African Department of Health regulations. Assured content contains &lt; 0.001% Tetrahydrocannabinol (THC).
                </p>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-[#E9E4D9]">SAHPRA REGISTERED SOURCE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Underlay legal credits */}
          <div className="pt-10 border-t border-[#2D4540]/40 text-[#E9E4D9]/40 text-[10px] font-mono flex flex-col sm:flex-row justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Earthcure Digital Storefront. All rights reserved. Sourced natively from Malawian partner farms.
            </p>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Security Certifications</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Courier Delivery Policies</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
