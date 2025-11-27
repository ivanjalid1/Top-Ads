import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { 
  Search, 
  Bell, 
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
  Globe
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
    // Glassmorphism Header Dark
    <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-10">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Logo SVG Elite */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(0,136,204,0.5)]">
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
              <span className="text-xl font-black text-white tracking-tight leading-none">TOP<span className="text-facebook-primary">ADS</span></span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Elite Assets</span>
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
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search Trigger (Global) */}
          <button 
             onClick={onOpenCommand}
             className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/20 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-white/20 transition-all text-sm group"
             title="Buscar Activos"
          >
            <Search size={14} />
            <span className="group-hover:text-white">Buscar...</span>
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
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

          {!user ? (
            /* LOGGED OUT */
            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenCommand}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <Search size={20} />
              </button>
              <button 
                onClick={onLogin}
                className="hidden md:block text-gray-300 hover:text-white font-medium px-2 transition-colors"
              >
                Acceder
              </button>
              <button 
                onClick={onLogin}
                className="bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Zap size={16} fill="black" />
                Unirse
              </button>
            </div>
          ) : (
            /* LOGGED IN */
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-facebook-primary rounded-full shadow-[0_0_10px_#0088CC]"></span>
              </button>
              
              <button className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-facebook-primary rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-[#020617]">1</span>
              </button>

              {/* Balance Badge */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg pl-4 pr-1 py-1">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end leading-none justify-center">
                    <span className="font-bold text-white text-base font-mono tracking-tight">$ {user.balance.toFixed(2)}</span>
                  </div>
                  <button className="w-8 h-8 rounded bg-facebook-primary hover:bg-facebook-glow flex items-center justify-center text-white transition-colors shadow-lg">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* User Avatar */}
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

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-4 w-72 bg-[#0f172a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 py-2 z-50 overflow-hidden backdrop-blur-3xl ring-1 ring-white/5 animate-fade-in-up origin-top-right">
                    <div className="px-5 py-4 border-b border-white/5 bg-black/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-facebook-primary/20 flex items-center justify-center text-facebook-primary">
                          <UserIcon size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-white text-sm">{user.username}</p>
                           <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-wider">
                          Nivel Gold
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      {[
                        { icon: LayoutDashboard, label: 'Panel de Control' },
                        { icon: Package, label: 'Mis Pedidos' },
                        { icon: DollarSign, label: 'Historial de Pagos' },
                        { icon: Shield, label: 'Verificación de Identidad' },
                      ].map((item, idx) => (
                        <a key={idx} href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                          <item.icon size={16} className="group-hover:text-facebook-primary transition-colors" />
                          {item.label}
                        </a>
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
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-black animate-fade-in-up">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-black text-white">TOP<span className="text-facebook-primary">ADS</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400"><X size={28} /></button>
            </div>
            
            <nav className="flex flex-col gap-6 flex-grow">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-medium text-left ${currentView === item.id ? 'text-facebook-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {!user && (
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <button onClick={() => {onLogin(); setIsMobileMenuOpen(false)}} className="py-4 border border-white/20 rounded-xl font-bold text-white">Acceder</button>
                 <button onClick={() => {onLogin(); setIsMobileMenuOpen(false)}} className="py-4 bg-facebook-primary text-white rounded-xl font-bold">Registrarse</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};