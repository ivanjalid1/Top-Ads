import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProductListView } from './components/ProductListView';
import { ServicesView } from './components/ServicesView';
import { BlogView } from './components/BlogView';
import { FAQView } from './components/FAQView';
import { ItemDetailView } from './components/ItemDetailView';
import { CartView } from './components/CartView';
import { UserLayout } from './components/user/UserLayout';
import { UserDashboard } from './components/user/UserDashboard';
import { UserOrders } from './components/user/UserOrders';
import { UserProfile } from './components/user/UserProfile';
import { UserBalance } from './components/user/UserBalance';
// Replaced AuthModal with dedicated views
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { User, Product, ServiceItem, BlogPost } from './types';
import { RefreshCw, Search, X, Command, ChevronRight, Flame, Send } from 'lucide-react';

const MOCK_USER: User = {
  id: 'u1',
  username: 'ivanjalid1',
  email: 'ivanjalid2@gmail.com',
  balance: 1854.30,
  role: 'User'
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState<Product | ServiceItem | BlogPost | null>(null);

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

  const handleLoginSuccess = () => {
    setUser(MOCK_USER);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string, item?: Product | ServiceItem | BlogPost) => {
    if (item) {
      setSelectedItem(item);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    if (currentView === 'detail' && selectedItem) {
      return (
        <ItemDetailView 
          item={selectedItem} 
          onBack={() => {
            // Smart back navigation
            if ('stock' in selectedItem) handleNavigate('products');
            else if ('icon' in selectedItem) handleNavigate('services');
            else if ('author' in selectedItem) handleNavigate('blog');
            else handleNavigate('home');
          }} 
        />
      );
    }

    switch(currentView) {
      // AUTH VIEWS
      case 'login':
        return (
          <LoginView 
            onLoginSuccess={handleLoginSuccess} 
            onNavigateRegister={() => handleNavigate('register')} 
            onNavigateHome={() => handleNavigate('home')}
          />
        );
      case 'register':
        return (
          <RegisterView 
            onLoginSuccess={handleLoginSuccess} 
            onNavigateLogin={() => handleNavigate('login')} 
            onNavigateHome={() => handleNavigate('home')}
          />
        );

      // PUBLIC VIEWS
      case 'products':
        return <ProductListView onSelectItem={(item) => handleNavigate('detail', item)} />;
      case 'services':
        return <ServicesView onSelectItem={(item) => handleNavigate('detail', item)} />;
      case 'blog':
        return <BlogView onSelectPost={(post) => handleNavigate('detail', post)} />;
      case 'faq':
        return <FAQView />;
      case 'cart':
        return <CartView />;
      
      // USER DASHBOARD VIEWS
      case 'dashboard':
        return (
          <UserLayout activeSection="dashboard" onNavigate={handleNavigate} onLogout={handleLogout}>
             <UserDashboard user={user!} onNavigate={handleNavigate} />
          </UserLayout>
        );
      case 'orders':
        return (
          <UserLayout activeSection="orders" onNavigate={handleNavigate} onLogout={handleLogout}>
             <UserOrders />
          </UserLayout>
        );
      case 'profile':
        return (
          <UserLayout activeSection="profile" onNavigate={handleNavigate} onLogout={handleLogout}>
             <UserProfile user={user!} />
          </UserLayout>
        );
      case 'balance':
        return (
          <UserLayout activeSection="balance" onNavigate={handleNavigate} onLogout={handleLogout}>
             <UserBalance user={user!} />
          </UserLayout>
        );

      case 'home':
      default:
        return <Hero onNavigateToProducts={() => handleNavigate('products')} />;
    }
  };

  const isAuthPage = ['login', 'register'].includes(currentView);
  // Define views that should NOT have a footer (Auth pages + User Dashboard pages)
  const NO_FOOTER_VIEWS = ['login', 'register', 'dashboard', 'orders', 'profile', 'balance'];
  const showFooter = !NO_FOOTER_VIEWS.includes(currentView);

  return (
    // DARK MODE CONTAINER
    <div className="min-h-screen flex flex-col bg-[#020617] text-white font-sans selection:bg-facebook-primary selection:text-white overflow-x-hidden relative">
      
      {!isAuthPage && (
        <Header 
          user={user} 
          onLogin={() => handleNavigate('login')} 
          onLogout={handleLogout} 
          onOpenCommand={() => setIsCommandOpen(true)}
          onNavigate={handleNavigate}
          currentView={currentView}
        />
      )}
      
      {renderView()}
      
      {showFooter && <Footer />}

      {!isAuthPage && (
        <>
          {/* Floating Toggle for Demo Purposes (Right Side) */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
            <button 
              onClick={() => user ? handleLogout() : handleNavigate('login')}
              className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-all border border-gray-200"
              title="Simular Login/Logout"
            >
              <RefreshCw size={24} className={user ? "" : "animate-spin"} />
            </button>
          </div>

          {/* SUPPORT WIDGET AREA (Left Side) */}
          <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
            
            {/* CHAT POPUP WINDOW - Compact & Clean */}
            {isChatOpen && (
              <div className="mb-4 w-[85vw] max-w-[300px] bg-[#f8fafc] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-fade-in-up border border-white/20 text-gray-800 ring-1 ring-black/5">
                 {/* Chat Header */}
                 <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
                    <div>
                       <h3 className="font-bold text-gray-900 text-xs tracking-tight">TopAds | Soporte Elite</h3>
                       <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">En línea</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(false)}
                      className="bg-gray-50 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all border border-gray-100"
                    >
                       <X size={14} />
                    </button>
                 </div>

                 {/* Chat Body */}
                 <div className="p-4 bg-[#f1f5f9] min-h-[100px] flex flex-col">
                    <div className="bg-white p-3 rounded-xl rounded-tl-none text-xs text-gray-600 leading-relaxed shadow-sm border border-gray-100 relative">
                       <p className="mb-1">Hola <span className="font-bold text-gray-900">Media Buyer</span>. 👋</p>
                       <p>¿En qué podemos ayudarte hoy?</p>
                       <span className="absolute -bottom-4 left-1 text-[8px] text-gray-400 font-medium">Recibido 22:48</span>
                    </div>
                 </div>

                 {/* Chat Actions */}
                 <div className="p-3 bg-white border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                       {/* WhatsApp Button */}
                       <button className="group relative flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-[#25D366] to-[#128C7E] text-white py-2.5 rounded-lg font-bold text-[10px] transition-all shadow hover:shadow-md active:scale-95">
                          <div className="flex items-center gap-1.5">
                             <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="drop-shadow-sm"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                             WhatsApp
                          </div>
                       </button>
                       
                       {/* Telegram Button */}
                       <button className="group relative flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] text-white py-2.5 rounded-lg font-bold text-[10px] transition-all shadow hover:shadow-md active:scale-95">
                          <div className="flex items-center gap-1.5">
                             <Send size={14} className="group-hover:-rotate-12 transition-transform drop-shadow-sm" />
                             Telegram
                          </div>
                       </button>
                    </div>
                    <div className="mt-2 text-center">
                       <p className="text-[8px] text-gray-400 font-medium bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-100">
                         Respuesta: <span className="text-gray-600 font-bold">~2 min</span>
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
        </>
      )}

      {/* COMMAND PALETTE OVERLAY */}
      {!isAuthPage && isCommandOpen && (
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