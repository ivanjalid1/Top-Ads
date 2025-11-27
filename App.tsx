import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProductListView } from './components/ProductListView';
import { ServicesView } from './components/ServicesView';
import { BlogView } from './components/BlogView';
import { FAQView } from './components/FAQView';
import { User } from './types';
import { RefreshCw, Search, X, Command, ChevronRight, Flame, Send } from 'lucide-react';

const MOCK_USER: User = {
  id: 'u1',
  username: 'ivanjalid1',
  email: 'ivanjalid2@gmail.com',
  balance: 1854.30,
  role: 'User'
};

function App() {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // Command Palette Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = () => {
    setUser(MOCK_USER);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderView = () => {
    switch(currentView) {
      case 'products':
        return <ProductListView />;
      case 'services':
        return <ServicesView />;
      case 'blog':
        return <BlogView />;
      case 'faq':
        return <FAQView />;
      case 'home':
      default:
        return <Hero onNavigateToProducts={() => setCurrentView('products')} />;
    }
  };

  return (
    // DARK MODE CONTAINER
    <div className="min-h-screen flex flex-col bg-[#020617] text-white font-sans selection:bg-facebook-primary selection:text-white overflow-x-hidden relative">
      <Header 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onOpenCommand={() => setIsCommandOpen(true)}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      {renderView()}
      
      <Footer />

      {/* Floating Toggle for Demo Purposes (Right Side) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <button 
          onClick={() => user ? handleLogout() : handleLogin()}
          className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-all border border-gray-200"
          title="Simular Login/Logout"
        >
          <RefreshCw size={24} className={user ? "" : "animate-spin"} />
        </button>
      </div>

      {/* SUPPORT WIDGET AREA (Left Side) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
        
        {/* CHAT POPUP WINDOW */}
        {isChatOpen && (
          <div className="mb-4 w-[360px] bg-[#f8fafc] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-fade-in-up border border-white/20 text-gray-800 ring-1 ring-black/5">
             {/* Chat Header */}
             <div className="bg-white p-5 flex justify-between items-start border-b border-gray-100">
                <div>
                   <h3 className="font-bold text-gray-900 text-base tracking-tight">TopAds | Soporte Elite</h3>
                   <div className="flex items-center gap-2 mt-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-gray-500 font-medium">Equipo en línea</span>
                   </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="bg-gray-100 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"
                >
                   <X size={16} />
                </button>
             </div>

             {/* Chat Body */}
             <div className="p-5 bg-[#f1f5f9] min-h-[140px] flex flex-col">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none text-[13px] text-gray-600 leading-relaxed shadow-sm border border-gray-100 relative">
                   <p>Hola <span className="font-bold text-gray-900">Media Buyer</span>. 👋</p>
                   <p className="mt-2">Nuestro equipo está listo para ayudarte con BMs, perfiles o dudas sobre tu pedido. Elige tu canal preferido abajo.</p>
                   <span className="absolute -bottom-5 left-1 text-[10px] text-gray-400 font-medium">Recibido 22:48</span>
                </div>
             </div>

             {/* Chat Actions */}
             <div className="p-5 bg-white border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                   {/* WhatsApp Button */}
                   <button className="group relative flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#25D366] to-[#128C7E] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-95 border-t border-white/20">
                      <div className="flex items-center gap-2">
                         <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="drop-shadow-sm"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                         WhatsApp
                      </div>
                   </button>
                   
                   {/* Telegram Button */}
                   <button className="group relative flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_12px_rgba(34,158,217,0.3)] hover:shadow-[0_8px_20px_rgba(34,158,217,0.4)] hover:-translate-y-1 active:scale-95 border-t border-white/20">
                      <div className="flex items-center gap-2">
                         <Send size={18} className="group-hover:-rotate-12 transition-transform drop-shadow-sm" />
                         Telegram
                      </div>
                   </button>
                </div>
                <div className="mt-4 text-center">
                   <p className="text-[10px] text-gray-400 font-medium bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100">
                     Tiempo de respuesta promedio: <span className="text-gray-600 font-bold">~2 minutos</span>
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* TRIGGER BUTTON (Pill style) */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-[#1877F2] text-white pl-4 pr-6 py-3 rounded-full font-bold flex items-center gap-3 shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:scale-105 hover:bg-[#166fe5] transition-all group animate-fade-in-up"
          >
            <div className="relative">
                {/* White Flame Icon */}
                <Flame size={20} className="text-white fill-white" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1877F2]"></span>
            </div>
            <span className="text-sm tracking-wide">Soporte</span>
          </button>
        )}
      </div>

      {/* COMMAND PALETTE OVERLAY */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] p-4">
           <div className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
              <div className="flex items-center px-4 py-4 border-b border-white/10">
                 <Search className="text-gray-400 mr-3" />
                 <input 
                   type="text" 
                   placeholder="Buscar activos, BMs, ID de pedido..." 
                   className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                   autoFocus
                 />
                 <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">ESC</span>
                    <button onClick={() => setIsCommandOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                 </div>
              </div>
              <div className="p-2">
                 <p className="px-4 py-2 text-xs text-gray-500 uppercase font-bold tracking-wider">Sugerencias Rápidas</p>
                 <ul>
                    {['BM Limit 250', 'Perfil USA', 'Fan Page 10k', 'Mis Pedidos'].map((item, i) => (
                       <li key={i}>
                          <button className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 rounded-lg group transition-colors text-gray-300 hover:text-white">
                             <div className="flex items-center gap-3">
                                <Command size={16} className="text-gray-500 group-hover:text-facebook-primary" />
                                <span>{item}</span>
                             </div>
                             <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-black/20 px-4 py-2 text-xs text-gray-500 flex justify-between">
                 <span>Pro Tip: Usa las flechas para navegar</span>
                 <span>TopAds Command v1.0</span>
              </div>
           </div>
           <div className="absolute inset-0 -z-10" onClick={() => setIsCommandOpen(false)}></div>
        </div>
      )}

    </div>
  );
}

export default App;