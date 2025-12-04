
import React from 'react';
import { LayoutDashboard, ShoppingBag, User, Wallet, LogOut } from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
  activeSection: 'dashboard' | 'orders' | 'profile' | 'balance';
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children, activeSection, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Mis Pedidos', icon: ShoppingBag },
    { id: 'balance', label: 'Mi Saldo', icon: Wallet },
    { id: 'profile', label: 'Mi Perfil', icon: User },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION - Hidden on mobile, visible on desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
             <div className="bg-[#0f172a] border border-white/5 rounded-xl p-4 shadow-lg sticky top-28">
                <div className="mb-6 px-4">
                   <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Menú Usuario</h2>
                </div>
                
                <nav className="space-y-1">
                   {menuItems.map(item => (
                     <button
                       key={item.id}
                       onClick={() => onNavigate(item.id)}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                         activeSection === item.id 
                           ? 'bg-facebook-primary text-white shadow-lg shadow-facebook-primary/20' 
                           : 'text-gray-400 hover:bg-white/5 hover:text-white'
                       }`}
                     >
                        <item.icon size={18} />
                        {item.label}
                     </button>
                   ))}
                </nav>

                <div className="mt-8 pt-4 border-t border-white/5">
                   <button 
                     onClick={onLogout}
                     className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
                   >
                      <LogOut size={18} />
                      Cerrar Sesión
                   </button>
                </div>
             </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 animate-fade-in-up">
             {children}
          </main>

        </div>
      </div>
    </div>
  );
};
