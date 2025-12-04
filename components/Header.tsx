import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { User } from '../types';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  ChevronDown, 
  Plus, 
  LayoutDashboard,
  DollarSign,
  Package,
  User as UserIcon,
  LogOut,
  X,
  Shield,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLogin: () => void;
  onOpenCommand?: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onLogin, onOpenCommand, onNavigate, currentView }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'products', label: 'Productos' },
    { id: 'services', label: 'Servicios' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    // Glassmorphism Header: Very transparent background + Strong Blur
    <header className="fixed top-0 w-full z-[100] bg-[#020617]/10 backdrop-blur-xl border-b border-white/5 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-10">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,136,204,0.5)]">
                 <path d="M20 4L4 12V20C4 28.8 10.8 37 20 39.2C29.2 37 36 28.8 36 20V12L20 4Z" fill="url(#paint0_linear)" className="opacity-90"/>
                 <path d="M20 12V28M14 18L20 12L26 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                 <defs>
                   <linearGradient id="paint0_linear" x1="4" y1="4" x2="36" y2="39.2" gradientUnits="userSpaceOnUse">
                     <stop stopColor="#0088CC"/>
                     <stop offset="1" stopColor="#004466"/>
                   </linearGradient>
                 </defs>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg md:text-xl font-black text-white tracking-tight leading-none">TOP<span className="text-facebook-primary">ADS</span></span>
              <span className="text-[8px] md:text-[10px] text-gray-400 font-mono tracking-widest uppercase hidden sm:block">Elite Assets</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  currentView === item.id 
                    ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Search Trigger (Global) - Desktop */}
          <button 
             onClick={onOpenCommand}
             className="hidden lg:flex items-center gap-2 w-64 px-4 py-2.5 bg-black/20 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-white/20 transition-all text-sm group"
             title="Buscar Activos"
          >
            <Search size={16} />
            <span className="group-hover:text-white">Buscar...</span>
          </button>

          {/* Language Selector - Desktop */}
          <div className="relative hidden lg:block" ref={langMenuRef}>
            <button 
              onClick={toggleLangMenu}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-sm font-medium text-gray-300 transition-all"
            >
              <Globe size={14} />
              <span>ES</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden z-50 animate-fade-in-up origin-top-right">
                {[
                  { code: 'ES', label: 'Español', flag: '🇪🇸' },
                  { code: 'EN', label: 'English', flag: '🇺🇸' },
                  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
                ].map((lang) => (
                  <button 
                    key={lang.code}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart - Always Visible */}
          <button 
            onClick={() => onNavigate('cart')}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors relative"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-facebook-primary rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-[#020617]">2</span>
          </button>

          {!user ? (
            /* LOGGED OUT */
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={onLogin} 
                className="text-gray-300 hover:text-white font-medium px-2 transition-colors"
              >
                Acceder
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Zap size={16} fill="black" />
                Unirse
              </button>
            </div>
          ) : (
            /* LOGGED IN */
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Balance Display - Hidden on very small screens, shown in dropdown instead */}
              <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg pl-3 pr-1 py-1">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end leading-none justify-center">
                    <span className="font-bold text-white text-sm md:text-base font-mono tracking-tight">$ {user.balance.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('balance')}
                    className="w-7 h-7 md:w-8 md:h-8 rounded bg-facebook-primary hover:bg-facebook-glow flex items-center justify-center text-white transition-colors shadow-lg"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* User Menu Trigger - Visible on Mobile too now */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center gap-3 pl-2 py-1 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className="text-gray-500 hidden md:block" />
                </button>

                {isUserMenuOpen && (
                  // FIXED: Removed opacity/transparency from bg color (bg-[#0f172a] solid) for readability
                  <div className="absolute right-0 top-full mt-4 w-72 bg-[#0f172a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 py-2 z-50 overflow-hidden ring-1 ring-white/5 animate-fade-in-up origin-top-right">
                    <div className="px-5 py-4 border-b border-white/5 bg-black/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-facebook-primary/20 flex items-center justify-center text-facebook-primary">
                          <UserIcon size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-white text-sm">{user.username}</p>
                           <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
                           {/* Show balance in dropdown on mobile */}
                           <p className="text-sm font-mono text-green-400 font-bold mt-1 sm:hidden">$ {user.balance.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Panel de Control' },
                        { id: 'orders', icon: Package, label: 'Mis Pedidos' },
                        { id: 'balance', icon: DollarSign, label: 'Historial de Pagos' },
                        { id: 'profile', icon: Shield, label: 'Verificación de Identidad' },
                      ].map((item, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => {
                            onNavigate(item.id);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                        >
                          <item.icon size={16} className="group-hover:text-facebook-primary transition-colors" />
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-white/5 p-2 mt-1">
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Desconectar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white bg-white/5 p-2 rounded-lg border border-white/5 active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY - STRUCTURED & ALIGNED TOP */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[110] lg:hidden bg-[#020617]/95 backdrop-blur-2xl animate-fade-in-up flex flex-col h-[100dvh] overflow-hidden">
          {/* Mobile Menu Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#020617]/50 shrink-0">
              <span className="text-xl font-black text-white">TOP<span className="text-facebook-primary">ADS</span></span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 active:scale-95 transition-transform border border-white/5"
              >
                <X size={20} />
              </button>
          </div>
          
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            
            {/* Mobile Search - Integrated Top */}
            <div className="mb-6">
               <button 
                 onClick={() => {onOpenCommand?.(); setIsMobileMenuOpen(false);}}
                 className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-gray-400 hover:border-white/20 transition-all shadow-inner"
               >
                 <Search size={18} />
                 <span className="text-sm font-medium">Buscar activos, BMs, perfiles...</span>
               </button>
            </div>

            {/* Mobile Nav Links - Aligned Top */}
            <nav className="flex flex-col gap-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 mb-1">Navegación</h3>
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-base font-bold text-left py-3 px-4 rounded-xl transition-all flex items-center justify-between group ${
                    currentView === item.id 
                    ? 'text-white bg-white/5 border border-white/10 shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {/* Active Indicator Dot */}
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${currentView === item.id ? 'bg-facebook-primary shadow-[0_0_8px_#1877F2]' : 'bg-gray-700 group-hover:bg-gray-500'}`}></span>
                    {item.label}
                  </span>
                  <ChevronRight size={16} className={`transition-transform ${currentView === item.id ? 'text-facebook-primary' : 'text-gray-700 group-hover:text-gray-500'}`} />
                </button>
              ))}
            </nav>

            {/* Spacer to push footer to bottom */}
            <div className="mt-auto"></div>

            {/* Footer Actions (Auth & Lang) */}
            <div className="space-y-4 pt-6 border-t border-white/5 mt-6">
                {/* Mobile User Actions */}
                {!user && (
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                        onClick={() => {onLogin(); setIsMobileMenuOpen(false)}} 
                        className="w-full py-3 border border-white/10 rounded-xl font-bold text-white text-sm uppercase tracking-wide hover:bg-white/5 transition-all"
                     >
                       Acceder
                     </button>
                     <button 
                        onClick={() => {onNavigate('register'); setIsMobileMenuOpen(false)}} 
                        className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-wide shadow-lg hover:bg-gray-200 transition-all"
                     >
                       Unirse
                     </button>
                  </div>
                )}
                
                {/* Mobile Language - Compact Row */}
                <div className="flex justify-center items-center gap-2 py-2">
                   <span className="text-xs font-bold text-gray-600 uppercase mr-2">Idioma:</span>
                   {['ES', 'EN', 'RU'].map(lang => (
                     <button key={lang} className="px-3 py-1.5 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 transition-all">
                        {lang}
                     </button>
                   ))}
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
};