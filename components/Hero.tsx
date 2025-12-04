import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ArrowRight, Terminal, X, Server, ShoppingCart, CheckCircle, Zap, Globe, Star, Megaphone, Briefcase, UserCheck, BarChart3, Lock } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'cuenta-anuncios-personales-250',
    title: 'Cuenta de Anuncios Personales Límite $250/día [Fuerte+Recomendado]',
    category: 'Cuentas Personales',
    price: 99.00,
    rating: 5.0,
    reviews: 42,
    imageUrl: '', 
    features: ['País/Moneda/Zona Modificable', 'Límite $250 Diario', 'Alta Resistencia'],
    stock: 99,
    deliveryType: 'instant'
  },
  {
    id: '2',
    slug: 'cuenta-anuncios-personales-1500',
    title: 'Cuenta de Anuncios Personales Límite $1500/día',
    category: 'Cuentas Personales',
    price: 200.00,
    rating: 5.0,
    reviews: 18,
    imageUrl: '', 
    features: ['Límite Alto $1500', 'Lista para Escalar', 'Entrega Inmediata'],
    stock: 50,
    deliveryType: 'instant'
  },
  {
    id: '3',
    slug: 'perfil-usa-antiguo-sari',
    title: 'Perfil USA Super Antiguo Rehabilitado (SARI) + ID',
    category: 'Perfiles Rehabilitados',
    price: 120.00,
    rating: 5.0,
    reviews: 156,
    imageUrl: '', 
    features: ['Incluye Tarjeta ID', 'Perfil Premium Antiguo', 'Green Status'],
    stock: 7,
    deliveryType: 'instant'
  },
  {
    id: '7',
    slug: 'bm5-sin-limite-verificado',
    title: 'BM5 Sin Límite Verificado & Rehabilitado [Recomendado]',
    category: 'Business Managers',
    price: 350.00,
    rating: 5.0,
    reviews: 89,
    imageUrl: '',
    features: ['5 Cuentas de Anuncios', 'Gasto Ilimitado', 'Rehabilitado'],
    stock: 4,
    deliveryType: 'instant'
  },
];

interface HeroProps {
  onNavigateToProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToProducts }) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restockTime, setRestockTime] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    const updateTimer = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(24, 0, 0, 0); 
      const diff = target.getTime() - now.getTime();
      
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setRestockTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    
    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // OPTIMIZED LOGO STYLING
  const LOGO_BASE_CLASS = "w-auto object-contain transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-40 brightness-0 invert hover:brightness-100 hover:invert-0 hover:opacity-100 hover:scale-110 cursor-pointer filter will-change-transform backface-visibility-hidden select-none hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]";

  const BRAND_LOGOS = [
    {
       name: 'Meta',
       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png',
       className: `h-7 md:h-10 ${LOGO_BASE_CLASS}` 
    },
    {
       name: 'Google Ads',
       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/800px-Google_Ads_logo.svg.png',
       className: `h-12 md:h-16 ${LOGO_BASE_CLASS}` 
    },
    {
       name: 'AWS',
       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/800px-Amazon_Web_Services_Logo.svg.png',
       className: `h-8 md:h-12 ${LOGO_BASE_CLASS}` 
    },
    {
       name: 'TikTok Ads',
       url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/800px-TikTok_logo.svg.png',
       className: `h-7 md:h-11 ${LOGO_BASE_CLASS}` 
    },
    {
       name: 'Facebook',
       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png',
       className: `h-5 md:h-7 ${LOGO_BASE_CLASS}` 
    },
    {
       name: 'Cloudflare',
       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/512px-Cloudflare_Logo.svg.png',
       className: `h-8 md:h-11 ${LOGO_BASE_CLASS}` 
    },
  ];

  // Increase repetitions to ensure smooth looping for fewer items
  const LOGO_STRIP = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS]; 

  return (
    // Removed padding to allow header glassmorphism to overlap
    <main className="flex-grow"> 
      
      {/* HERO SECTION - Height adjusted and top padding added */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/5 pb-20 pt-20">
        <div className="absolute inset-0 bg-[#020617]"></div>
        
        {/* NEW: Top Gradient to make Glassmorphism Visible */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-facebook-primary/20 to-transparent z-10"></div>
        
        <div className="absolute inset-0 cyber-grid opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-facebook-primary to-transparent opacity-50"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-facebook-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

        <div className="container mx-auto px-4 relative z-30 text-center mt-0 md:mt-2">
          
          {/* SOCIAL PLATFORM BADGES */}
          <div className="inline-flex justify-center items-center gap-6 mb-8 animate-fade-in-up bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-3 rounded-full shadow-lg">
             {/* Facebook */}
             <div className="flex items-center gap-2 text-gray-400 hover:text-[#1877F2] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Facebook</span>
             </div>
             
             <div className="w-px h-4 bg-white/10"></div>

             {/* Meta Ads (Updated Size & Correct Loop Path) */}
             <div className="flex items-center gap-2 text-gray-400 hover:text-[#0668E1] transition-colors group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 group-hover:scale-110 transition-transform">
                   <path d="M20.19 13.56C22.65 13.56 24 11.95 24 9.49C24 7.27 22.09 5.38 19.58 5.38C17.27 5.38 15.09 7.08 13.68 9.39C12.3 11.66 10.1 13.35 7.82 13.35C5.35 13.35 4 11.74 4 9.28C4 7.07 5.91 5.17 8.42 5.17C10.73 5.17 12.91 6.87 14.32 9.18C15.7 11.45 17.9 13.14 20.19 13.14L20.19 13.56ZM8.42 12.44C6.96 12.44 5.86 11.33 5.86 9.28C5.86 7.23 6.96 6.12 8.42 6.12C9.72 6.12 10.93 7.15 11.69 8.68C10.92 10.22 9.71 11.24 8.42 11.24V12.44ZM20.19 6.27C21.65 6.27 22.75 7.38 22.75 9.43C22.75 11.48 21.65 12.59 20.19 12.59C18.89 12.59 17.68 11.56 16.92 10.03C17.69 8.49 18.9 7.47 20.19 7.47V6.27Z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Meta Ads</span>
             </div>

             <div className="w-px h-4 bg-white/10"></div>

             {/* Google Ads (Correct Triangle Path) */}
             <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                   <path d="M21.4 11.5h-1.6l-5.6-9.1h-4l6.4 10.6-2 3.5h-3l3-5.2h-6l-3.6 6.3 3 5.2h12.2l1.2-2.1h-10l-1.2-2.1h3.4l2.1 3.5h3l-2.1-3.5 5.8-9.9z"/>
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Google Ads</span>
             </div>
          </div>

          <h1 className="reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9] select-none mix-blend-screen relative z-30">
             <span className="block opacity-50 text-xl md:text-3xl font-mono tracking-[0.2em] mb-4 font-normal text-facebook-primary">ACTIVOS PREMIUM</span>
             TE AHORRAMOS <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">TIEMPO</span> <br />
             <span className="text-facebook-primary relative inline-block">
               Y DINERO
               <svg className="absolute -bottom-2 w-full h-3 text-facebook-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
               </svg>
             </span>
          </h1>

          <p className="reveal delay-200 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Proveedores Elite de <span className="text-white font-bold">Business Managers</span>, <span className="text-white font-bold">Perfiles USA</span> y <span className="text-white font-bold">Activos de Contingencia</span>.
          </p>

          <div className="reveal delay-300 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={onNavigateToProducts} className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-wider rounded-none skew-x-[-10deg] hover:bg-facebook-primary hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,136,204,0.6)] active:scale-95">
               <div className="skew-x-[10deg] flex items-center justify-center gap-3">
                 <Terminal size={20} />
                 INICIAR OPERACIÓN
               </div>
            </button>
            <button onClick={onNavigateToProducts} className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:border-white hover:bg-white/5 transition-all active:scale-95">
               <div className="skew-x-[10deg] flex items-center justify-center gap-3">
                 VER CATÁLOGO
                 <ArrowRight size={20} className="group-hover:translate-x-1" />
               </div>
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW - REINVENTED CYBER HUD STYLE */}
      <section id="products-section" className="py-24 relative bg-[#020617]">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
         
         <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="reveal flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
               <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter">Inventario <span className="text-facebook-primary">Destacado</span></h2>
                  <p className="text-gray-400 font-mono text-sm flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    STOCK ACTUALIZADO: <span className="text-white font-bold">{restockTime}</span>
                  </p>
               </div>
               
               <button 
                onClick={onNavigateToProducts}
                className="text-facebook-primary font-bold uppercase tracking-wider flex items-center gap-2 hover:text-white transition-colors"
               >
                 Ver Todo <ArrowRight size={16} />
               </button>
            </div>

            <div className="grid gap-6">
              {isLoading 
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-[#0f172a] rounded-xl border border-white/5 animate-pulse"></div>
                  ))
                : MOCK_PRODUCTS.slice(0, 4).map((product, idx) => {
                    const ProductIcon = product.category.includes('Business') ? Briefcase : 
                                        product.category.includes('Perfiles') ? UserCheck : 
                                        Megaphone;

                    // Calculate stock percentage (mock logic)
                    const stockPercent = Math.min(100, (product.stock || 0) * 5); 
                    const isLowStock = (product.stock || 0) < 10;

                    return (
                      <div 
                        key={product.id} 
                        className="reveal group relative bg-gradient-to-r from-[#0f172a] to-[#0b1121] border border-white/5 rounded-xl p-0 hover:border-facebook-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(24,119,242,0.15)] cursor-pointer overflow-hidden transform hover:-translate-y-1"
                        onClick={() => setActiveProduct(product)}
                        style={{transitionDelay: `${idx * 0.1}s`}} 
                      >
                        {/* LEFT ACCENT BAR */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-facebook-primary shadow-[0_0_10px_#1877F2]"></div>

                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-6 p-5 pl-6 md:pl-8">
                            
                            {/* TOP SECTION (Mobile) / LEFT SECTION (Desktop) */}
                            <div className="flex flex-row md:contents items-start gap-4">
                                
                                {/* TECH ICON MODULE */}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#020617] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-facebook-primary group-hover:border-facebook-primary/50 transition-all shadow-inner">
                                        <ProductIcon size={20} className="md:w-7 md:h-7" />
                                    </div>
                                    {/* FLOATING FB BADGE - REMOVED FOR MOBILE CLEANLINESS AS REQUESTED */}
                                    <div className="hidden md:flex absolute -top-3 -right-3 z-20 w-8 h-8 bg-[#1877F2] rounded-full items-center justify-center shadow-[0_0_15px_rgba(24,119,242,0.6)] ring-4 ring-[#0f172a] group-hover:scale-110 transition-transform duration-300">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* INFO MODULE - IMPROVED MOBILE LAYOUT */}
                                <div className="flex-1 text-left w-full min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        {/* Mobile: FB Ads pill, Category Removed */}
                                        <span className="px-2 py-0.5 bg-[#1877F2] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded shadow-sm flex items-center gap-1">
                                            FB Ads
                                        </span>
                                        {product.deliveryType === 'instant' && (
                                            <span className="hidden sm:flex text-[10px] text-green-400 font-bold uppercase items-center gap-1">
                                                <Zap size={10} fill="currentColor" /> Instant
                                            </span>
                                        )}
                                    </div>

                                    {/* LARGER TITLE FONT, CLEANER LOOK */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-facebook-glow transition-colors leading-tight line-clamp-2">
                                        {product.title}
                                    </h3>

                                    {/* TECH SPECS PILLS - LIMITED TO 2 ON MOBILE */}
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {product.features?.slice(0, 2).map((f, i) => (
                                            <span key={i} className="text-[10px] font-semibold text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/10 flex items-center gap-1.5">
                                               <div className="w-1.5 h-1.5 bg-facebook-primary rounded-full"></div>
                                               {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM SECTION (Mobile) / RIGHT SECTION (Desktop) */}
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-8 mt-4 md:mt-0 min-w-[140px]">
                                <div className="text-left md:text-right">
                                    <span className="text-xl md:text-3xl font-black text-white tracking-tight leading-none">$ {product.price.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex flex-col items-end gap-1">
                                    {/* VISUAL STOCK BAR */}
                                    <div className="w-24 md:w-32 bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${isLowStock ? 'bg-red-500' : 'bg-green-500'} transition-all duration-1000`} 
                                            style={{width: `${stockPercent}%`}}
                                        ></div>
                                    </div>
                                    <div className={`text-[9px] md:text-[10px] font-bold uppercase mt-1 flex items-center gap-1.5 ${isLowStock ? 'text-red-400' : 'text-green-400'}`}>
                                        {isLowStock ? <Lock size={10} /> : <BarChart3 size={10} />}
                                        {isLowStock ? `Solo ${product.stock}` : `${product.stock} Stock`}
                                    </div>
                                </div>

                                {/* CART BUTTON */}
                                <button className="hidden md:flex w-12 h-12 bg-white/5 hover:bg-facebook-primary text-white rounded-xl items-center justify-center border border-white/10 hover:border-transparent transition-all shadow-lg group-hover:translate-x-1 mt-2">
                                    <ShoppingCart size={20} />
                                </button>
                            </div>

                        </div>
                      </div>
                    );
                  })
              }
            </div>
         </div>
      </section>

      {/* INFRASTRUCTURE CAROUSEL - IMPROVED LOOPING & ANIMATION */}
      <section className="reveal py-24 bg-[#0b1121] relative overflow-hidden flex flex-col items-center border-t border-white/5">
        
        <div className="container mx-auto px-4 relative z-20 mb-16 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">COMPATIBILIDAD 100%</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
             REDES & <span className="text-gray-600">TECNOLOGÍA</span>
           </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden flex select-none">
           {/* Gradient Masks */}
           <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#0b1121] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0b1121] to-transparent z-10 pointer-events-none"></div>

           <div className="flex w-max">
               {/* Loop 1 */}
               <div className="flex shrink-0 animate-marquee items-center">
                  {LOGO_STRIP.map((tech, index) => (
                     <div key={`s1-${index}`} className="flex-shrink-0 flex items-center justify-center px-10 md:px-14">
                        <img 
                          src={tech.url} 
                          alt={tech.name}
                          className={tech.className}
                          draggable="false"
                        />
                     </div>
                  ))}
               </div>
               
               {/* Loop 2 */}
               <div className="flex shrink-0 animate-marquee items-center" aria-hidden="true">
                  {LOGO_STRIP.map((tech, index) => (
                     <div key={`s2-${index}`} className="flex-shrink-0 flex items-center justify-center px-10 md:px-14">
                        <img 
                          src={tech.url} 
                          alt={tech.name}
                          className={tech.className}
                          draggable="false"
                        />
                     </div>
                  ))}
               </div>
           </div>
        </div>

      </section>

      {/* CTA FULL SCREEN */}
      <section className="reveal min-h-[80vh] relative overflow-hidden flex flex-col items-center justify-center py-32 bg-[#020617]">
        <div className="absolute inset-0 bg-facebook-primary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#0f172a] to-[#020617]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
             <span className="text-[30vw] font-black text-white whitespace-nowrap animate-pulse-slow leading-none">
               ELITE
             </span>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
             <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                DEJA DE PERDER <br />
                <span className="text-gray-600">DINERO</span>
             </h2>

             <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-facebook-primary to-facebook-glow mb-12 tracking-tighter leading-[0.9]">
                ESCALA SIN LÍMITES
             </h2>
             
             <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto mb-16 font-light">
               Únete a los media buyers que facturan <span className="text-white font-bold">6-7 cifras</span> utilizando nuestra infraestructura blindada.
             </p>
             
             <button 
               onClick={onNavigateToProducts}
               className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-black text-sm md:text-lg uppercase tracking-widest overflow-hidden hover:bg-facebook-primary hover:text-white transition-all duration-300 skew-x-[-10deg] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(0,136,204,0.4)]"
             >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black rounded-full group-hover:w-full group-hover:h-full opacity-5"></span>
                <div className="skew-x-[10deg] flex items-center gap-3">
                  VER INVENTARIO DISPONIBLE
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveProduct(null)}></div>
          <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-fade-in-up">
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white hover:text-red-400 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="md:w-1/2 h-64 md:h-auto relative bg-[#020617] flex items-center justify-center">
               <Server size={80} className="text-facebook-primary opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col">
              <span className="text-facebook-primary text-xs font-bold uppercase tracking-widest mb-2">{activeProduct.category}</span>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight">{activeProduct.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProduct.features?.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-300">{f}</span>
                ))}
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                 <div className="flex items-center gap-4 text-sm text-gray-400">
                    <Server size={18} className="text-facebook-primary" />
                    <span>Servidor: US-East (Virginia)</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm text-gray-400">
                    <CheckCircle size={18} className="text-facebook-primary" />
                    <span>Verificación: 100% Garantizada</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm text-gray-400">
                    <Globe size={18} className="text-facebook-primary" />
                    <span>Proxy: Residencial Rotativo</span>
                 </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                 <div>
                    <span className="block text-xs text-gray-500 uppercase">Precio Unitario</span>
                    <span className="text-3xl font-black text-white">$ {activeProduct.price.toFixed(2)}</span>
                 </div>
                 <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-facebook-primary hover:text-white transition-all rounded">
                   Añadir al Carrito
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
