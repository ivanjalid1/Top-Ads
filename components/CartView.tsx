
import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, CreditCard, Bitcoin, Lock, CheckCircle, ShoppingCart } from 'lucide-react';

// Mock Cart Data
const MOCK_CART: CartItem[] = [
  {
    id: 'c1',
    product: {
      id: '201',
      title: 'Cuenta de Anuncios Personales Límite $250/día',
      category: 'Cuentas Personales',
      price: 99.00,
      rating: 5,
      reviews: 99,
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150',
      stock: 99,
      deliveryType: 'instant'
    },
    quantity: 2
  },
  {
    id: 'c2',
    product: {
       id: '701',
       title: 'BM5 Sin Límite Verificado & Rehabilitado',
       category: 'Business Managers',
       price: 350.00,
       rating: 5,
       reviews: 89,
       imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=150',
       stock: 4,
       deliveryType: 'instant'
    },
    quantity: 1
  }
];

export const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART);
  const [paymentMethod, setPaymentMethod] = useState('crypto');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        {/* Progress Header */}
        <div className="mb-8 md:mb-12">
           <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-6">Finalizar Compra</h1>
           <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-widest overflow-x-auto">
              <span className="text-facebook-primary flex items-center gap-2 shrink-0"><span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-facebook-primary text-white flex items-center justify-center text-xs">1</span> Carrito</span>
              <div className="w-8 md:w-12 h-px bg-white/10 shrink-0"></div>
              <span className="flex items-center gap-2 shrink-0"><span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">2</span> Pago</span>
              <div className="w-8 md:w-12 h-px bg-white/10 shrink-0"></div>
              <span className="flex items-center gap-2 shrink-0"><span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">3</span> Entrega</span>
           </div>
        </div>

        {cartItems.length === 0 ? (
           <div className="text-center py-32 bg-[#0f172a] rounded-2xl border border-white/5 border-dashed">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <ShoppingCart size={40} className="text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">Parece que no has añadido ningún activo digital aún.</p>
              <button className="px-8 py-3 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition-colors">
                 Explorar Catálogo
              </button>
           </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="flex-1 space-y-6">
              <div className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                 <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                    <span className="font-bold text-white text-sm md:text-base">Artículos ({cartItems.length})</span>
                    <button onClick={() => setCartItems([])} className="text-[10px] md:text-xs text-red-500 hover:text-red-400 font-bold uppercase flex items-center gap-1">
                       <Trash2 size={12} /> Vaciar
                    </button>
                 </div>
                 
                 <div className="divide-y divide-white/5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 group hover:bg-white/[0.02] transition-colors">
                        
                        {/* Mobile Wrapper for Image + Info */}
                        <div className="flex flex-row gap-4 w-full md:w-auto">
                            {/* Product Image */}
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-black/40 overflow-hidden border border-white/10 flex-shrink-0 relative">
                              <img src={item.product.imageUrl} alt={item.product.title} className="w-full h-full object-cover" />
                              {item.product.deliveryType === 'instant' && (
                                <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 text-white text-[9px] font-bold text-center py-0.5 uppercase">
                                    Instant
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] md:text-[10px] text-facebook-primary font-bold uppercase tracking-wider bg-facebook-primary/10 px-2 py-0.5 rounded inline-block mb-1">{item.product.category}</span>
                              <h3 className="text-sm md:text-lg font-bold text-white mb-1 leading-tight line-clamp-2">{item.product.title}</h3>
                              <p className="text-[10px] md:text-xs text-gray-500">ID: <span className="font-mono text-gray-400">{item.product.id}</span></p>
                              
                              {/* Price visible on mobile within info block for better density */}
                              <div className="md:hidden mt-2 font-black text-white font-mono">$ {(item.product.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Controls (Desktop: Right Side | Mobile: Full width bottom row) */}
                        <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-[120px] border-t md:border-t-0 border-white/5 pt-3 md:pt-0 mt-0 md:mt-0">
                           
                           {/* Price Desktop Only */}
                           <span className="hidden md:block text-xl font-black text-white font-mono">$ {(item.product.price * item.quantity).toFixed(2)}</span>
                           
                           {/* Quantity Controls */}
                           <div className="flex items-center gap-3">
                               <div className="flex items-center gap-1 bg-[#020617] rounded-lg p-1 border border-white/10">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                                     <Minus size={14}/>
                                  </button>
                                  <span className="font-mono font-bold text-white w-8 text-center text-sm">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                                     <Plus size={14}/>
                                  </button>
                               </div>
                               
                               <button onClick={() => removeItem(item.id)} className="p-2 bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-colors" title="Eliminar">
                                  <Trash2 size={16} />
                               </button>
                           </div>
                        </div>

                      </div>
                    ))}
                 </div>
              </div>

              {/* Additional Info Box */}
              <div className="bg-facebook-primary/5 border border-facebook-primary/20 rounded-xl p-4 flex gap-4 items-start">
                 <div className="p-2 bg-facebook-primary/10 rounded-lg text-facebook-primary shrink-0">
                    <ShieldCheck size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white mb-1">Garantía de Reposición Activa</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                       Tus activos están protegidos por nuestra política de 24h. Si detectas un checkpoint o bloqueo inicial, lo reemplazamos sin costo.
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Summary & Payment */}
            <div className="w-full lg:w-[400px] flex-shrink-0">
               <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 shadow-2xl sticky top-24">
                  <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Resumen de Orden</h3>
                  
                  {/* Totals */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                     <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white font-mono font-bold">$ {subtotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-gray-400">
                        <span>Descuento</span>
                        <span className="text-white font-mono font-bold">$ {discount.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-gray-400">
                        <span>Comisión Red (Gas)</span>
                        <span className="text-green-400 font-mono font-bold text-xs uppercase bg-green-500/10 px-2 py-0.5 rounded">Gratis</span>
                     </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Total a Pagar</span>
                        <span className="text-xs text-green-500">Impuestos incluidos</span>
                     </div>
                     <span className="text-4xl font-black text-white tracking-tighter">$ {total.toFixed(2)}</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-8">
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-3 ml-1">Selecciona Método de Pago</label>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setPaymentMethod('crypto')}
                          className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all overflow-hidden ${paymentMethod === 'crypto' ? 'bg-facebook-primary text-white border-facebook-primary shadow-lg shadow-facebook-primary/20' : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30'}`}
                        >
                           {paymentMethod === 'crypto' && <div className="absolute top-2 right-2"><CheckCircle size={14} /></div>}
                           <Bitcoin size={24} />
                           <span className="text-xs font-bold uppercase tracking-wider">Cripto</span>
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('balance')}
                          className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all overflow-hidden ${paymentMethod === 'balance' ? 'bg-facebook-primary text-white border-facebook-primary shadow-lg shadow-facebook-primary/20' : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30'}`}
                        >
                           {paymentMethod === 'balance' && <div className="absolute top-2 right-2"><CheckCircle size={14} /></div>}
                           <CreditCard size={24} />
                           <span className="text-xs font-bold uppercase tracking-wider">Saldo</span>
                        </button>
                     </div>
                  </div>

                  <button className="w-full py-4 bg-white text-black font-black uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all shadow-lg flex items-center justify-center gap-2 group mb-6">
                     <Lock size={16} />
                     Pagar Ahora
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* TRUST STRIP (PARTNERS) */}
                  <div className="pt-8 border-t border-white/5">
                     <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-6">Partners Oficiales</p>
                     <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        
                        {/* Shopify Partner */}
                        <div className="flex items-center gap-2">
                           <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#95BF47]"><path d="M24 10.973c-.158-2.697-1.127-4.22-3.327-5.234l-1.637-.736C18.673 3.963 17.7 2.062 16.29 2c-1.393-.06-1.57 2.067-1.57 2.067L4.766 8.913C3.513 9.53 1.252 11.233 0 17.896c3.41 1.776 6.666 1.776 9.395.736.31-.118 6.467-2.613 6.467-2.613l.353-.133c.31-.118 1.146-.354 2.07-.354 2.926 0 4.137 1.71 4.137 1.71s1.782-3.66 1.58-6.27zm-12.28 2.067l-5.325 2.12c-.572.235-.925-.353-.572-.707l7.834-8.07c.352-.353.924.118.572.707l-2.51 5.95z"/></svg>
                           <span className="font-bold text-white text-xs">shopify <span className="font-normal text-gray-400">partner</span></span>
                        </div>

                        {/* Google Ads */}
                        <div className="flex items-center gap-2">
                           <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                           <span className="font-bold text-gray-400 text-xs">Google Ads</span>
                        </div>

                        {/* TikTok Marketing Partner */}
                        <div className="flex items-center gap-2">
                           <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                           <div className="flex flex-col leading-none">
                              <span className="font-bold text-white text-xs">TikTok</span>
                              <span className="text-[8px] text-gray-500">Marketing Partner</span>
                           </div>
                        </div>

                     </div>
                  </div>

               </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
