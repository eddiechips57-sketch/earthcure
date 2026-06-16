import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShieldCheck, Ticket, Calendar, Truck, ArrowRight, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Product } from '../types';
import ProductVisualizer from './ProductVisualizer';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  
  // Checkout detail forms
  const [shippingName, setShippingName] = useState<string>('');
  const [shippingPhone, setShippingPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [shippingCity, setShippingCity] = useState<string>('Johannesburg');

  // Math totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.priceZAR * item.quantity), 0);
  
  // SA Courier rule: Free above R500, otherwise flat R85
  const courierThreshold = 500;
  const isCourierFree = subtotal >= courierThreshold;
  const courierFee = subtotal === 0 ? 0 : (isCourierFree ? 0 : 85);
  
  // Discount calculations
  const discountAmount = appliedDiscount ? Math.round(subtotal * (appliedDiscount.percent / 100)) : 0;
  const grandTotal = subtotal - discountAmount + courierFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (code === 'EARTHCURESA') {
      setAppliedDiscount({ code: 'EARTHCURESA', percent: 15 });
      setCouponCode('');
    } else if (code === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try "EARTHCURESA" for a 15% discount!');
    }
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('details');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingPhone) {
      alert('Please fill out all shipping details.');
      return;
    }
    
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep('success');
      onClearCart();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark backdrop overlay close trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Master Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1B2D2A] border-l border-[#2A423D]/70 z-50 shadow-2xl flex flex-col justify-between overflow-hidden text-[#E9E4D9]"
          >
            
            {/* Header section status */}
            <div className="p-6 border-b border-[#2A423D]/60 flex items-center justify-between bg-[#253A36] text-[#E9E4D9]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-display font-light uppercase tracking-wider">Your Basket</h3>
                <span className="bg-[#1B2D2A] text-[#D4AF37] text-xs px-2.5 py-0.5 border border-[#2D4540] rounded-full font-mono font-bold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#E9E4D9]/60 hover:text-white hover:bg-[#203531] rounded-lg transition focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Body switcher (Cart rows OR Details form OR Order Success) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {checkoutStep === 'cart' ? (
                /* STEP 1: Main Product Rows basket list */
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                      <div className="w-16 h-16 bg-[#253A36] border border-[#2D4540] rounded-full flex items-center justify-center text-[#D4AF37] mb-2 shadow-inner">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-display font-medium text-[#E9E4D9]">Your basket is empty</h4>
                      <p className="text-xs text-[#E9E4D9]/70 max-w-xs">
                        Explore our catalogue of legal, licensed Invegrow industrial hemp products tailored for South African wellness.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-sans text-xs uppercase tracking-widest font-bold transition-all"
                      >
                        Explore Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans">
                      {/* South African courier pricing progress slider */}
                      <div className="bg-[#253A36]/65 border border-[#2A423D]/50 rounded-xl p-4 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-[#E9E4D9] flex items-center gap-1.5 font-sans uppercase tracking-wider">
                            <Truck className="w-4 h-4 text-[#D4AF37]" /> Courier Delivery
                          </span>
                          <span className="font-mono font-bold text-[#D4AF37]">
                            {isCourierFree ? 'FREE UNLOCKED' : `Add R${courierThreshold - subtotal} for FREE`}
                          </span>
                        </div>
                        {/* Progress slider bar */}
                        <div className="w-full h-2 bg-[#1B2D2A] rounded-full overflow-hidden border border-[#2A423D]/30">
                          <div 
                            className="h-full bg-[#D4AF37] rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (subtotal / courierThreshold) * 100)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-[#E9E4D9]/60 leading-normal">
                          {isCourierFree 
                            ? '🎉 Free South African Courier selected! Packed carefully in custom cases.' 
                            : `Standard South African flat-rate courier cost is R85. Spend R500 or more to get it free!`
                          }
                        </p>
                      </div>

                      {/* Line row list loop */}
                      <div className="space-y-4 pt-2">
                        {cartItems.map((item) => (
                          <div 
                            key={item.product.id}
                            className="flex gap-4 p-3 bg-[#253A36] border border-[#2D4540]/65 rounded-xl hover:shadow-lg transition-all"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#2D4540] flex-shrink-0 bg-[#1B2D2A]">
                              <ProductVisualizer 
                                productId={item.product.id} 
                                fallbackUrl={item.product.imageUrl} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-1 text-left min-w-0">
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-xs font-sans font-medium text-[#E9E4D9] line-clamp-2 leading-tight">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-[#E9E4D9]/40 hover:text-red-400 p-0.5 rounded transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              
                              <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider">
                                Size: {item.product.size}
                              </p>

                              <div className="flex justify-between items-center pt-2">
                                {/* Quantity Adjust controls */}
                                <div className="flex items-center gap-1.5 bg-[#1B2D2A] border border-[#2D4540]/80 rounded-lg p-0.5">
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                    className="w-5 h-5 flex items-center justify-center text-xs font-semibold text-[#E9E4D9]/60 hover:text-white rounded hover:bg-[#203531] transition"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-mono font-bold w-5 text-center text-[#E9E4D9]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                    className="w-5 h-5 flex items-center justify-center text-xs font-semibold text-[#E9E4D9]/60 hover:text-white rounded hover:bg-[#203531] transition"
                                  >
                                    +
                                  </button>
                                </div>

                                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                                  R{item.product.priceZAR * item.quantity} ZAR
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code Discount form */}
                      <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-[#2D4540] space-y-2">
                        <label className="block text-[10px] uppercase font-mono text-[#E9E4D9]/50 tracking-[0.15em] font-medium">
                          Apply Promotion / South African Coupon (SA)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. EARTHCURESA"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3 py-2.5 border border-[#2D4540] bg-[#1B2D2A] text-[#E9E4D9] placeholder-[#E9E4D9]/30 rounded-none text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#D4AF37]"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] rounded-none text-xs font-sans font-bold tracking-[0.15em] uppercase transition duration-200"
                          >
                            Apply
                          </button>
                        </div>
                        {appliedDiscount && (
                          <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                            ✓ Applied Code "{appliedDiscount.code}" — {appliedDiscount.percent}% checkout deduction!
                          </p>
                        )}
                        {couponError && (
                          <p className="text-[10px] text-red-400 font-mono">
                            ✕ {couponError}
                          </p>
                        )}
                      </form>
                    </div>
                  )}
                </>
              ) : checkoutStep === 'details' ? (
                
                /* STEP 2: Delivery Details form panel */
                <form id="shipping-details-form" onSubmit={handleCompleteOrder} className="space-y-4 text-left font-sans">
                  <div className="space-y-1">
                    <h4 className="text-md font-display font-light uppercase tracking-wider text-[#E9E4D9]">Shipping Destination</h4>
                    <p className="text-[10px] text-[#E9E4D9]/60">Provide direct coordinate drop destinations. Delivered safely within 2–4 courier working days.</p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-[0.2em] text-[#E9E4D9]/50 uppercase">Recipient Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full px-3.5 py-3 border border-[#2D4540] bg-[#1B2D2A] text-[#E9E4D9] placeholder-[#E9E4D9]/30 rounded-none text-xs focus:outline-none focus:border-[#D4AF37] p-3"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-[0.2em] text-[#E9E4D9]/50 uppercase">SA Contact Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +27 82 123 4567"
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full px-3.5 py-3 border border-[#2D4540] bg-[#1B2D2A] text-[#E9E4D9] placeholder-[#E9E4D9]/30 rounded-none text-xs focus:outline-none focus:border-[#D4AF37] p-3"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-[0.2em] text-[#E9E4D9]/50 uppercase">Physical Courier Address</label>
                      <input
                        type="text"
                        required
                        placeholder="Suite 4B, 12 Highveld Boulevard"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-3.5 py-3 border border-[#2D4540] bg-[#1B2D2A] text-[#E9E4D9] placeholder-[#E9E4D9]/30 rounded-none text-xs focus:outline-none focus:border-[#D4AF37] p-3"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-[0.2em] text-[#E9E4D9]/50 uppercase">City Province</label>
                      <select
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="w-full px-3.5 py-3 bg-[#1B2D2A] border border-[#2D4540] text-[#E9E4D9] rounded-none text-xs focus:outline-none focus:border-[#D4AF37] p-3"
                      >
                        <option value="Johannesburg">Johannesburg, Gauteng</option>
                        <option value="Pretoria">Pretoria, Gauteng</option>
                        <option value="Cape Town">Cape Town, Western Cape</option>
                        <option value="Durban">Durban, KwaZulu-Natal</option>
                        <option value="Port Elizabeth">Gqeberha (PE), Eastern Cape</option>
                        <option value="Bloemfontein">Bloemfontein, Free State</option>
                        <option value="Salima Mal">Salima-Lilongwe (Direct Malawi border)</option>
                      </select>
                    </div>
                  </div>

                  {/* Security trust banner */}
                  <div className="p-3.5 bg-[#253A36]/50 rounded-xl border border-[#2D4540]/60 flex gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-sans font-medium text-[#E9E4D9] block leading-tight">Secure South African SSL Payment</span>
                      <p className="text-[9px] text-[#E9E4D9]/60 leading-normal">Your payment is encrypted natively using standard local gateways (PayFast/Yoco 3D Secure). Zero credit card logs saved on Earthcure.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full mt-4 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] py-3.5 px-6 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4.5 h-4.5 border-2 border-[#1B2D2A] border-t-transparent rounded-full animate-spin" />
                        <span>Validating Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Validate Order & Dispatch (R{grandTotal} ZAR)</span>
                        <ArrowRight className="w-4.5 h-4.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isCheckingOut}
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full text-center text-[10px] font-mono font-medium text-[#E9E4D9]/50 hover:text-[#E9E4D9] pt-1"
                  >
                    ← Back to basket items
                  </button>
                </form>
              ) : (
                
                /* STEP 3: Dispatch completed Order success */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 space-y-5 font-sans"
                >
                  <div className="w-16 h-16 bg-[#253A36] rounded-full flex items-center justify-center text-[#D4AF37] mb-2 border border-[#2D4540]/60 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 text-center">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-extrabold block">Order Confirmed!</span>
                    <h4 className="text-md font-display font-light uppercase tracking-wider text-[#E9E4D9] leading-tight">
                      Thank You! Your Earthcure is Sourcing...
                    </h4>
                    <p className="text-xs text-[#E9E4D9]/70 leading-relaxed max-w-xs mx-auto">
                      Your order is dispatched under legal SA Industrial Hemp Permit compliance. Invegrow oils are being boxed at our Cape Town labs. We sent your tracking code to your email!
                    </p>
                  </div>

                  <div className="bg-[#1B2D2A] rounded-xl p-4 w-full border border-[#2D4540]/60 space-y-2.5 text-left font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-[#E9E4D9]/50">Transaction ID</span>
                      <span className="font-bold text-[#E9E4D9]">EC-92813-SA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E9E4D9]/50">Destination</span>
                      <span className="font-bold text-[#E9E4D9]">{shippingName || 'Gauteng, SA'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E9E4D9]/50">Transit Method</span>
                      <span className="font-bold text-[#E9E4D9]">Carbon-Neutral Doorstep Cargo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E9E4D9]/50">Delivery Est.</span>
                      <span className="font-bold text-[#D4AF37]">2–4 working days</span>
                    </div>
                  </div>

                  <div className="pt-2 w-full">
                    <button
                      onClick={() => {
                        setCheckoutStep('cart');
                        onClose();
                      }}
                      className="w-full py-3.5 bg-[#253A36] hover:bg-[#2A423D] border border-[#2D4540] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-none transition"
                    >
                      Continue Sourcing Goods
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Bottom Billing calculation sidebar summary */}
            {cartItems.length > 0 && checkoutStep === 'cart' && (
              <div className="p-6 bg-[#253A36] border-t border-[#2D4540]/60 space-y-4 font-sans">
                <div className="space-y-2 text-xs font-mono text-[#E9E4D9]/85">
                  <div className="flex justify-between text-[#E9E4D9]/60">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#E9E4D9]">R{subtotal} ZAR</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount (EC-15%)</span>
                      <span>-R{discountAmount} ZAR</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#E9E4D9]/60">
                    <span>Courier Speedpost</span>
                    <span className="font-medium text-[#E9E4D9]">
                      {isCourierFree ? 'FREE' : `R${courierFee} ZAR`}
                    </span>
                  </div>
                  <div className="h-px bg-[#2D4540]/50 my-2.5" />
                  <div className="flex justify-between text-sm font-sans font-bold text-[#E9E4D9]">
                    <span>Grand Total</span>
                    <span className="font-mono text-base font-extrabold text-[#D4AF37]">
                      R{grandTotal} ZAR
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleStartCheckout}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-4 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-lg shadow-[#D4AF37]/10"
                  >
                    <span>Proceed to Delivery Details</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                  <p className="text-[9px] text-[#E9E4D9]/40 text-center font-mono uppercase tracking-wider">
                    Locked securely with AES-256 local banking standards.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
