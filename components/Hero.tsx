import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ShieldCheck, ArrowRight, Terminal, Cpu, X, Server, Lock, Globe, Fingerprint, RefreshCcw, Wifi, Activity, Database, Radio, Globe2, ShieldAlert } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Cuenta de Anuncios Personales Límite $250/día [Fuerte+Recomendado]',
    category: 'Cuentas Personales',
    price: 99.00,
    rating: 5.0,
    reviews: 42,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', 
    features: ['País/Moneda/Zona Modificable', 'Límite $250 Diario', 'Alta Resistencia'],
    stock: 99,
    deliveryType: 'instant'
  },
  {
    id: '2',
    title: 'Cuenta de Anuncios Personales Límite $1500/día',
    category: 'Cuentas Personales',
    price: 200.00,
    rating: 5.0,
    reviews: 18,
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800', 
    features: ['Límite Alto $1500', 'Lista para Escalar', 'Entrega Inmediata'],
    stock: 50,
    deliveryType: 'instant'
  },
  {
    id: '3',
    title: 'Perfil USA Super Antiguo Rehabilitado (SARI) + ID',
    category: 'Perfiles Rehabilitados',
    price: 120.00,
    rating: 5.0,
    reviews: 156,
    imageUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800', 
    features: ['Incluye Tarjeta ID', 'Perfil Premium Antiguo', 'Green Status'],
    stock: 7,
    deliveryType: 'instant'
  },
  {
    id: '7',
    title: 'BM5 Sin Límite Verificado & Rehabilitado [Recomendado]',
    category: 'Business Managers',
    price: 350.00,
    rating: 5.0,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
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
    // Simular carga
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    // Timer lógica
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

  return (
    <main className="flex-grow pt-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/5 pb-20">
        <div className="absolute inset-0 bg-[#020617]"></div>
        <div className="absolute inset-0 cyber-grid opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-facebook-primary to-transparent opacity-50"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-facebook-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

        <div className="container mx-auto px-4 relative z-10 text-center mt-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.85] select-none mix-blend-screen relative animate-fade-in-up">
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

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Activos blindados para escalar sin restricciones. <span className="text-white font-bold bg-white/5 px-2 py-1 rounded">0% Bloqueos. 100% Verificados.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
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

      {/* PRODUCTS PREVIEW */}
      <section id="products-section" className="py-24 relative bg-[#020617]">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
         
         <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter">Inventario <span className="text-facebook-primary">Destacado</span></h2>
                  <p className="text-gray-400 font-mono text-sm flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    NEXT RESTOCK: <span className="text-white font-bold">{restockTime}</span>
                  </p>
               </div>
               
               <button 
                onClick={onNavigateToProducts}
                className="text-facebook-primary font-bold uppercase tracking-wider flex items-center gap-2 hover:text-white transition-colors"
               >
                 Ver Todo <ArrowRight size={16} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading 
                ? [...Array(4)].map((_, i) => <ProductCard key={i} product={MOCK_PRODUCTS[0]} onQuickView={() => {}} isLoading={true} />)
                : MOCK_PRODUCTS.slice(0, 4).map((product, idx) => (
                    <div key={product.id} className="animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      <ProductCard product={product} onQuickView={setActiveProduct} />
                    </div>
                  ))
              }
            </div>

            <div className="mt-20 flex justify-center animate-fade-in-up">
              <button 
                onClick={onNavigateToProducts}
                className="px-8 py-4 border border-facebook-primary text-facebook-primary hover:bg-facebook-primary hover:text-white transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(0,136,204,0.1)] hover:shadow-[0_0_30px_rgba(0,136,204,0.4)]"
              >
                 <Cpu size={18} />
                 Explorar Lista Completa
              </button>
            </div>
         </div>
      </section>

      {/* INFRAESTRUCTURA BLINDADA (REDESIGN PICANTE) */}
      <section className="py-32 border-t border-white/5 bg-[#010409] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,18,0)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        
        <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div className="max-w-2xl">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 bg-facebook-primary rounded-sm animate-spin"></span>
                    <span className="font-mono text-facebook-primary text-sm uppercase tracking-[0.2em]">System_Architecture_v3.0</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                   Infraestructura <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Anti-Detección</span>
                 </h2>
               </div>
               <div className="text-right hidden md:block">
                  <div className="text-5xl font-black text-facebook-primary tabular-nums">99.9%</div>
                  <div className="text-sm text-gray-500 font-mono uppercase tracking-widest">Uptime Garantizado</div>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* CARD 1: FINGERPRINT SPOOFING (Large) */}
              <div className="md:col-span-8 group relative bg-[#0b1121] rounded-3xl border border-white/10 overflow-hidden hover:border-facebook-primary/50 transition-all duration-500">
                 <div className="absolute inset-0 bg-facebook-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Fingerprint size={120} className="text-facebook-primary" />
                 </div>
                 
                 <div className="p-10 h-full flex flex-col relative z-10">
                    <div className="w-14 h-14 bg-facebook-primary/10 rounded-xl flex items-center justify-center border border-facebook-primary/20 mb-8 text-facebook-primary group-hover:scale-110 transition-transform duration-500">
                       <ShieldCheck size={28} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-4">Cloaking de Hardware (Spoofing)</h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                       No vendemos simples cuentas. Cada activo incluye una <span className="text-white font-bold">máscara de hardware única</span> (Canvas, WebGL, AudioContext) que simula dispositivos reales (iPhone 14, Pixel 7, Mac M1). Totalmente indetectable para los algoritmos de rastreo.
                    </p>

                    <div className="mt-auto bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-facebook-primary/80 overflow-hidden">
                       <div className="flex gap-2 mb-1"><span className="text-green-500">➜</span> <span>Injecting_Noise: Canvas_Hash... [OK]</span></div>
                       <div className="flex gap-2 mb-1"><span className="text-green-500">➜</span> <span>Spoofing_Audio_Context... [OK]</span></div>
                       <div className="flex gap-2"><span className="text-green-500">➜</span> <span>WebRTC_Leak_Protection: ENABLED</span></div>
                    </div>
                 </div>
              </div>

              {/* CARD 2: NETWORK (Tall) */}
              <div className="md:col-span-4 group relative bg-[#0b1121] rounded-3xl border border-white/10 overflow-hidden hover:border-green-500/50 transition-all duration-500 flex flex-col">
                 <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="p-10 flex-grow relative z-10">
                    <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20 mb-8 text-green-500 group-hover:scale-110 transition-transform duration-500">
                       <Globe2 size={28} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">Red 5G Residencial</h3>
                    <p className="text-gray-400 mb-6">
                       IPs residenciales limpias (AT&T, Verizon, Vodafone). Tu tráfico parece el de un usuario doméstico real, no un datacenter sospechoso.
                    </p>
                    
                    <div className="flex items-center gap-3 text-sm font-mono text-green-400 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
                       <Activity size={14} className="animate-pulse" />
                       <span>Trust_Score: 100/100</span>
                    </div>
                 </div>
                 
                 {/* Visual Map Decor */}
                 <div className="h-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-10 relative">
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping delay-700"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping delay-1000"></div>
                 </div>
              </div>

              {/* CARD 3: AI COOKIE FARMING */}
              <div className="md:col-span-6 group relative bg-[#0b1121] rounded-3xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                 <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="p-10 relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-500 group-hover:scale-110 transition-transform duration-500">
                          <Cpu size={28} />
                       </div>
                       <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-500/20">AI Powered</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">Farm de Cookies con IA</h3>
                    <p className="text-gray-400">
                       Nuestros bots navegan sitios reales (Amazon, YouTube, News) generando un historial de navegación humano y orgánico antes de entregarte la cuenta.
                    </p>
                 </div>
              </div>

               {/* CARD 4: CHECKPOINT KILLER */}
               <div className="md:col-span-6 group relative bg-[#0b1121] rounded-3xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-500">
                 <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="p-10 relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20 text-red-500 group-hover:scale-110 transition-transform duration-500">
                          <ShieldAlert size={28} />
                       </div>
                       <span className="px-3 py-1 bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wider rounded border border-red-500/20">Auto-Heal</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">Checkpoint Killer</h3>
                    <p className="text-gray-400">
                       Sistema automatizado de resolución de Checkpoints (ZRD/2FA). Si una cuenta cae en revisión, nuestra API intenta recuperarla al instante o genera un reemplazo.
                    </p>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* CTA FULL SCREEN */}
      <section className="min-h-[90vh] relative overflow-hidden flex flex-col items-center justify-center py-32 bg-[#020617]">
        <div className="absolute inset-0 bg-facebook-primary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#0f172a] to-[#020617]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
             <span className="text-[30vw] font-black text-white whitespace-nowrap animate-pulse-slow leading-none">
               ELITE
             </span>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
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
               className="group relative inline-flex items-center justify-center px-16 py-8 bg-white text-black font-black text-2xl uppercase tracking-widest overflow-hidden hover:bg-facebook-primary hover:text-white transition-all duration-300 skew-x-[-10deg] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(0,136,204,0.4)]"
             >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black rounded-full group-hover:w-full group-hover:h-full opacity-5"></span>
                <div className="skew-x-[10deg] flex items-center gap-5">
                  VER INVENTARIO DISPONIBLE
                  <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
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
            
            <div className="md:w-1/2 h-64 md:h-auto relative bg-[#020617]">
               <img src={activeProduct.imageUrl} className="w-full h-full object-cover opacity-80" alt="" loading="lazy" decoding="async" />
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
                    <Lock size={18} className="text-facebook-primary" />
                    <span>Acceso: 2FA + Cookies Incluidas</span>
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