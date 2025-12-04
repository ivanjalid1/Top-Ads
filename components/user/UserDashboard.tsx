
import React from 'react';
import { User } from '../../types';
import { ShoppingBag, Clock, CheckCircle, XCircle, ArrowRight, Eye } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onNavigate }) => {
  return (
    <div className="space-y-10 md:space-y-8 pb-10">
       
       {/* Welcome Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 border-b border-white/5 pb-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-black text-white">Hola, {user.username} 👋</h1>
             <p className="text-gray-400 mt-2 text-sm md:text-base">Aquí tienes el resumen de tu actividad reciente.</p>
          </div>
          <div className="text-left md:text-right bg-[#0f172a] md:bg-transparent p-4 md:p-0 rounded-xl border border-white/5 md:border-0 w-full md:w-auto">
             <span className="text-xs text-gray-500 uppercase font-bold tracking-wider block mb-1">Saldo Disponible</span>
             <div className="text-4xl md:text-3xl font-black text-white font-mono tracking-tight">$ {user.balance.toFixed(2)}</div>
          </div>
       </div>

       {/* Stats Cards */}
       <div>
         <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 md:hidden">Resumen General</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Pedidos', value: '16', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Pendientes', value: '2', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
              { label: 'Completados', value: '12', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
              { label: 'Cancelados', value: '2', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
            ].map((stat, i) => (
               <div key={i} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                        <stat.icon size={22} />
                     </div>
                     <span className="text-3xl font-black text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
               </div>
            ))}
         </div>
       </div>

       {/* Recent Orders */}
       <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h3 className="font-bold text-white text-lg">Pedidos Recientes</h3>
             <button onClick={() => onNavigate('orders')} className="w-full sm:w-auto px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-facebook-primary hover:text-white uppercase flex items-center justify-center gap-2 transition-colors border border-white/5">
               Ver Historial <ArrowRight size={12} />
             </button>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-400 min-w-[600px]">
                <thead className="bg-black/20 text-xs uppercase font-bold text-gray-500">
                   <tr>
                      <th className="px-6 py-4">Pedido #</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {[
                     { id: '#ORD-8821', date: '12 Oct, 2024', status: 'completed', total: 150.00 },
                     { id: '#ORD-8820', date: '10 Oct, 2024', status: 'processing', total: 99.00 },
                     { id: '#ORD-8819', date: '05 Oct, 2024', status: 'cancelled', total: 45.00 },
                   ].map((order, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4 font-mono text-white font-medium">{order.id}</td>
                         <td className="px-6 py-4">{order.date}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                               order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                               order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                               'bg-red-500/10 text-red-500 border border-red-500/20'
                            }`}>
                               {order.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 font-bold text-white">$ {order.total.toFixed(2)}</td>
                         <td className="px-6 py-4 text-right">
                            <button onClick={() => onNavigate('orders')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                               <Eye size={16} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {/* Quick Actions */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <button onClick={() => onNavigate('products')} className="p-6 bg-[#0f172a] border border-white/5 rounded-xl hover:border-facebook-primary/50 hover:bg-white/5 transition-all text-left group shadow-sm">
             <h4 className="font-bold text-white mb-2 group-hover:text-facebook-primary transition-colors text-lg">Explorar Catálogo</h4>
             <p className="text-sm text-gray-500">Encuentra nuevos activos para escalar tus campañas.</p>
          </button>
          <button onClick={() => onNavigate('orders')} className="p-6 bg-[#0f172a] border border-white/5 rounded-xl hover:border-facebook-primary/50 hover:bg-white/5 transition-all text-left group shadow-sm">
             <h4 className="font-bold text-white mb-2 group-hover:text-facebook-primary transition-colors text-lg">Rastrear Pedido</h4>
             <p className="text-sm text-gray-500">Revisa el estado de tus compras recientes.</p>
          </button>
          <button onClick={() => onNavigate('profile')} className="p-6 bg-[#0f172a] border border-white/5 rounded-xl hover:border-facebook-primary/50 hover:bg-white/5 transition-all text-left group shadow-sm">
             <h4 className="font-bold text-white mb-2 group-hover:text-facebook-primary transition-colors text-lg">Seguridad Cuenta</h4>
             <p className="text-sm text-gray-500">Actualiza tu contraseña o activa 2FA.</p>
          </button>
       </div>
    </div>
  );
};
