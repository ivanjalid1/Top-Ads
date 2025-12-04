
import React, { useState } from 'react';
import { Order } from '../../types';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, Eye, X, Download, RefreshCw } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    number: '#ORD-8821',
    date: '12 Oct, 2024',
    status: 'completed',
    paymentStatus: 'paid',
    total: 150.00,
    itemsCount: 2,
    items: [
       { name: 'BM5 Sin Límite', quantity: 1, price: 100, total: 100 },
       { name: 'Perfil USA SARI', quantity: 1, price: 50, total: 50 }
    ],
    paymentMethod: 'Crypto (USDT)'
  },
  {
    id: 'ord_2',
    number: '#ORD-8820',
    date: '10 Oct, 2024',
    status: 'processing',
    paymentStatus: 'paid',
    total: 99.00,
    itemsCount: 1,
    items: [
       { name: 'Cuenta Personal $250 Limit', quantity: 1, price: 99, total: 99 }
    ],
    paymentMethod: 'Balance'
  },
  {
    id: 'ord_3',
    number: '#ORD-8819',
    date: '05 Oct, 2024',
    status: 'cancelled',
    paymentStatus: 'refunded',
    total: 45.00,
    itemsCount: 1,
    items: [
       { name: 'Fan Page 10k', quantity: 1, price: 45, total: 45 }
    ],
    paymentMethod: 'Crypto (BTC)'
  }
];

export const UserOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-black text-white">Mis Pedidos</h1>
          <div className="flex gap-2">
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all ${showFilters ? 'bg-facebook-primary border-facebook-primary text-white' : 'bg-[#0f172a] border-white/10 text-gray-300 hover:text-white hover:border-white/20'}`}
             >
                <Filter size={14} /> Filtros
             </button>
          </div>
       </div>

       {/* Collapsible Filters Panel */}
       {showFilters && (
         <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Status Filter */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Estado del Pedido</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-facebook-primary focus:outline-none appearance-none">
                     <option value="">Todos</option>
                     <option value="pending">Pendiente</option>
                     <option value="processing">Procesando</option>
                     <option value="completed">Completado</option>
                     <option value="cancelled">Cancelado</option>
                  </select>
               </div>

               {/* Date From */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Desde</label>
                  <div className="relative">
                     <Calendar size={16} className="absolute left-3 top-2.5 text-gray-500" />
                     <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-facebook-primary focus:outline-none" />
                  </div>
               </div>

               {/* Date To */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hasta</label>
                  <div className="relative">
                     <Calendar size={16} className="absolute left-3 top-2.5 text-gray-500" />
                     <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-facebook-primary focus:outline-none" />
                  </div>
               </div>
            </div>
            
            <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
               <button className="text-xs font-bold text-gray-500 hover:text-white uppercase flex items-center gap-1">
                  <RefreshCw size={12} /> Limpiar Filtros
               </button>
            </div>
         </div>
       )}

       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f172a] border border-white/5 rounded-xl p-4 flex items-center gap-4">
             <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><Calendar size={20}/></div>
             <div>
                <span className="text-2xl font-black text-white">34</span>
                <p className="text-xs text-gray-500 uppercase font-bold">Total Pedidos</p>
             </div>
          </div>
          <div className="bg-[#0f172a] border border-white/5 rounded-xl p-4 flex items-center gap-4">
             <div className="p-3 bg-green-500/10 text-green-500 rounded-lg"><Download size={20}/></div>
             <div>
                <span className="text-2xl font-black text-white">$ 2,450</span>
                <p className="text-xs text-gray-500 uppercase font-bold">Gasto Total</p>
             </div>
          </div>
       </div>

       {/* Table */}
       <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-black/20 text-xs uppercase font-bold text-gray-500">
                   <tr>
                      <th className="px-6 py-4">Referencia</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Pago</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4 font-mono text-white font-bold">{order.number}</td>
                         <td className="px-6 py-4">{order.date}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                               order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                               'bg-red-500/10 text-red-500'
                            }`}>
                               {order.status}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                               {order.paymentStatus}
                            </span>
                         </td>
                         <td className="px-6 py-4 font-bold text-white">$ {order.total.toFixed(2)}</td>
                         <td className="px-6 py-4 text-right">
                            <button onClick={() => setSelectedOrder(order)} className="text-facebook-primary hover:text-white transition-colors flex items-center gap-1 justify-end font-bold text-xs uppercase">
                               <Eye size={14} /> Detalles
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs text-gray-500">Mostrando 3 de 34</span>
             <div className="flex gap-2">
                <button className="p-2 border border-white/10 rounded hover:bg-white/5 text-gray-400 disabled:opacity-50"><ChevronLeft size={16}/></button>
                <button className="p-2 border border-white/10 rounded hover:bg-white/5 text-gray-400"><ChevronRight size={16}/></button>
             </div>
          </div>
       </div>

       {/* Order Detail Modal */}
       {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
             <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/20">
                   <div>
                      <h3 className="text-xl font-bold text-white">Pedido {selectedOrder.number}</h3>
                      <p className="text-xs text-gray-500">{selectedOrder.date}</p>
                   </div>
                   <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                </div>

                <div className="p-6 space-y-6">
                   <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Estado</span>
                         <span className="text-white font-medium capitalize">{selectedOrder.status}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Método Pago</span>
                         <span className="text-white font-medium">{selectedOrder.paymentMethod}</span>
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Items del Pedido</h4>
                      <div className="space-y-3">
                         {selectedOrder.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border border-white/5 rounded-lg bg-black/10">
                               <div>
                                  <p className="text-white font-bold text-sm">{item.name}</p>
                                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                               </div>
                               <span className="text-white font-mono font-bold">$ {item.total.toFixed(2)}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-white font-bold uppercase">Total Pagado</span>
                      <span className="text-2xl font-black text-facebook-primary">$ {selectedOrder.total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="p-6 bg-black/20 border-t border-white/10 flex justify-end">
                   <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-white text-black font-bold uppercase text-xs rounded hover:bg-gray-200">
                      Cerrar
                   </button>
                </div>
             </div>
          </div>
       )}

    </div>
  );
};
