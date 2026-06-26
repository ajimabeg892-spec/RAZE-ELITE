import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Tag, Star, Sparkles, Check, AlertTriangle, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { Merchandise } from '../types';

interface StoreProps {
  products: Merchandise[];
  onUpdateProducts?: (newProducts: Merchandise[]) => void;
}

export default function Store({ products, onUpdateProducts }: StoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ product: Merchandise; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [checkoutInvoice, setCheckoutInvoice] = useState<string>('');

  const categories = ['All', 'Jersey', 'Hoodie', 'Accessory', 'Limited Drop'];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Merchandise) => {
    const size = selectedSizes[product.id] || 'M';
    
    // Check stock limit
    if (product.stock <= 0) {
      alert("Product is currently out of stock!");
      return;
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });

    // Alert
    setIsCartOpen(true);
  };

  const removeFromCart = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Deduct stock in our local state if updating is supported
    if (onUpdateProducts) {
      const updatedProducts = products.map(prod => {
        const cartItems = cart.filter(item => item.product.id === prod.id);
        if (cartItems.length > 0) {
          const totalQty = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
          return { ...prod, stock: Math.max(0, prod.stock - totalQty) };
        }
        return prod;
      });
      onUpdateProducts(updatedProducts);
    }

    // Set invoice ID
    const invId = `RE-INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setCheckoutInvoice(invId);
    setCheckoutComplete(true);
  };

  const resetCheckout = () => {
    setCart([]);
    setCheckoutComplete(false);
    setIsCartOpen(false);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  return (
    <section id="store" className="relative w-full py-24 bg-brand-black overflow-hidden cyber-grid">
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
              <Tag className="h-3.5 w-3.5" />
              ELITE CUSTOM APPAREL
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
              MERCHANDISE <span className="text-brand-red">STORE</span>
            </h2>
            <div className="h-1 w-20 bg-brand-red mt-4" />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="btn-cart-toggle"
            className="relative px-5 py-3 bg-brand-charcoal hover:bg-brand-red text-white font-display font-bold text-xs uppercase tracking-widest border border-white/10 hover:border-brand-red rounded flex items-center gap-3 transition-all duration-300 shadow-md shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
            CART DETAILS
            {cart.length > 0 && (
              <span className="h-5 w-5 rounded-full bg-white text-black font-mono font-black text-[10px] flex items-center justify-center animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Categories Navbar */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2 border-b border-white/5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded font-display font-bold text-xs uppercase tracking-wider border shrink-0 transition-all ${
                selectedCategory === cat 
                  ? 'bg-brand-red border-brand-red text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                  : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Limited Drops Timer Banner if looking at limited drops */}
        {selectedCategory === 'Limited Drop' && (
          <div className="bg-gradient-to-r from-red-950/20 to-black border border-brand-red rounded-xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden clip-corner-br">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-brand-red-light uppercase tracking-widest animate-pulse">
              [ SECURED CAPSULE DROP ]
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-red/10 border border-brand-red/30 rounded text-[9px] font-mono text-brand-red-light tracking-widest uppercase">
                <Sparkles className="h-3 w-3" />
                EXTREMELY RARE STREETWEAR APEX
              </span>
              <h3 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-wider">
                HYPER-REAP APEX COUTURE DROP
              </h3>
              <p className="text-gray-400 font-sans text-xs max-w-xl">
                Hand-numbered limited series. Real-time reflective red metallic threading, tactical collar details, and physical RFID verification badge. Release scheduled soon. Stock strictly limited to 15 globally.
              </p>
            </div>

            <div className="bg-black/80 px-4 py-3 rounded border border-white/5 font-mono text-center shrink-0 min-w-[150px]">
              <span className="block text-[8px] text-gray-500 uppercase tracking-widest">LAUNCH SCHEDULE</span>
              <span className="text-lg font-black text-brand-red-light mt-1 block">JULY 15, 2026</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => {
            const sizeOption = selectedSizes[product.id] || 'M';
            const isLimited = product.category === 'Limited Drop';
            const isOutOfStock = product.stock <= 0;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-brand-red/20 hover:bg-brand-charcoal/30 flex flex-col justify-between group transition-all duration-300 p-4 relative"
              >
                {/* Limited flag overlay */}
                {isLimited && (
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[8px] font-bold font-mono tracking-widest uppercase px-2.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,0,0,0.5)] z-10">
                    LIMITED RELEASE
                  </span>
                )}

                {/* Main Product image container */}
                <div className="aspect-square bg-zinc-950/40 rounded-lg overflow-hidden border border-white/5 relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle shadows overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info and Purchase selectors */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  
                  {/* Name and Price */}
                  <div>
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider line-clamp-1 group-hover:text-brand-red-light transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brand-red-light font-display font-black text-lg mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-xs font-sans line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Sizing Matrix Row */}
                  {product.category !== 'Accessory' && (
                    <div className="space-y-1.5">
                      <span className="block font-mono text-[9px] text-gray-500 tracking-wider">CHOOSE UNIT SIZE:</span>
                      <div className="flex gap-1.5">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                          <button
                            key={sz}
                            onClick={() => handleSizeSelect(product.id, sz)}
                            className={`h-6 w-8 text-[9px] font-mono border rounded flex items-center justify-center transition-all ${
                              sizeOption === sz 
                                ? 'bg-white border-white text-black font-black' 
                                : 'bg-black/50 border-white/5 text-gray-400 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stock level tracking */}
                  <div className="flex items-center justify-between font-mono text-[9px]">
                    <span className="text-gray-500">QUANTITY REMAINING:</span>
                    {isOutOfStock ? (
                      <span className="text-brand-red font-bold uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        SOLD OUT
                      </span>
                    ) : (
                      <span className={`font-bold ${product.stock < 15 ? 'text-brand-red-light animate-pulse' : 'text-gray-300'}`}>
                        {product.stock} UNITS
                      </span>
                    )}
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 font-display font-bold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all ${
                      isOutOfStock 
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-transparent' 
                        : 'bg-brand-red hover:bg-brand-red-light text-white border-b-2 border-brand-red-dark shadow-md'
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    ACQUIRE PIECE
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 5. SLIDEOUT SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide drawer */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-brand-charcoal border-l border-white/5 flex flex-col justify-between"
              >
                
                {/* Header */}
                <div className="bg-black p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5 text-brand-red-light" />
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      CART ALLOCATIONS
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="font-mono text-xs text-gray-500 hover:text-white uppercase"
                  >
                    CLOSE
                  </button>
                </div>

                {/* Checkout complete state or standard cart listing */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {checkoutComplete ? (
                    // SECURED INVOICE SUCCESS VIEW
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="h-16 w-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <ShieldCheck className="h-8 w-8" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-display font-black text-lg text-white uppercase tracking-wider">
                          ORDER TRANSPOSING SECURED!
                        </h4>
                        <p className="text-gray-400 font-sans text-xs">
                          Your purchase allocation has been compiled and synchronized. Raze Elite logistic servers are packing your tactical assets.
                        </p>
                      </div>

                      {/* Invoice Certificate */}
                      <div className="bg-black/80 border border-white/10 rounded-lg p-5 font-mono text-left text-[11px] space-y-3 relative overflow-hidden">
                        <div className="absolute inset-0 cyber-grid opacity-10" />
                        
                        <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] text-gray-500">
                          <span>INVOICE LOG</span>
                          <span className="text-brand-red-light font-bold">{checkoutInvoice}</span>
                        </div>

                        {/* Cart items summary */}
                        <div className="space-y-1">
                          {cart.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-white font-bold">
                              <span>{item.quantity}x {item.product.name} ({item.size})</span>
                              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-white/5 pt-3 flex justify-between text-xs font-black">
                          <span className="text-gray-400">GRAND TOTAL PAID</span>
                          <span className="text-brand-red">${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="text-[9px] text-gray-500 pt-3 text-center border-t border-dashed border-white/5">
                          RE_SECURE_PAYMENT_METADATA: APPROVED
                        </div>
                      </div>

                      <button
                        onClick={resetCheckout}
                        className="w-full py-3 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded transition-all shadow-md"
                      >
                        RETURN TO THE VAULT
                      </button>

                    </motion.div>
                  ) : (
                    // STANDARD CART LIST
                    <>
                      {cart.length > 0 ? (
                        <div className="space-y-4">
                          {cart.map((item, idx) => (
                            <div 
                              key={idx}
                              className="bg-black/40 p-4 rounded-lg border border-white/5 flex gap-4 items-center justify-between"
                            >
                              <div className="h-16 w-16 rounded overflow-hidden border border-white/10 shrink-0">
                                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1.5 font-mono text-[9px] text-gray-400">
                                  <span>SIZE: <strong className="text-white">{item.size}</strong></span>
                                  <span>QTY: <strong className="text-white">{item.quantity}</strong></span>
                                </div>
                                <p className="text-brand-red-light font-display font-black text-xs mt-1">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <button 
                                onClick={() => removeFromCart(idx)}
                                className="font-mono text-[10px] text-gray-500 hover:text-brand-red uppercase px-2 py-1 bg-black rounded"
                              >
                                REMOVE
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-20 font-mono text-xs text-gray-500 uppercase tracking-widest">
                          [ CART ALLOCATIONS EMPTY ]
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer Subtotal */}
                {!checkoutComplete && (
                  <div className="bg-black p-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center font-display">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">SUBTOTAL</span>
                      <span className="text-xl font-black text-white">${cartTotal.toFixed(2)}</span>
                    </div>

                    <p className="font-mono text-[8px] text-gray-500 leading-normal uppercase">
                      * All drops include a physical authentication chip. Checkout executes a secure simulated payment and verifies inventory allocation.
                    </p>

                    <button
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                      className={`w-full py-4 font-display font-bold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all ${
                        cart.length === 0 
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border-none' 
                          : 'bg-brand-red hover:bg-brand-red-light text-white shadow-lg border-b-4 border-brand-red-dark'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      EXECUTE CHECKOUT
                    </button>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
