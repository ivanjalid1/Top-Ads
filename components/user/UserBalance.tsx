
import React, { useState } from 'react';
import { User, Transaction } from '../../types';
import { Plus, RefreshCw, ArrowUpRight, ArrowDownLeft, X, Bitcoin } from 'lucide-react';

interface UserBalanceProps {
  user: User;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'credit', description: 'Carga Saldo (USDT)', reference: '#PAY-9921', date: '12 Oct 10:30', amount: 500, balanceAfter: 1854.30, status: 'finished' },
  { id: 't2', type: 'debit', description: 'Compra Pedido #ORD-8821', reference: '#ORD-8821', date: '12 Oct 11:15', amount: -150, balanceAfter: 1354.30 },
  { id: 't3', type: 'debit', description: 'Compra Pedido #ORD-8820', reference: '#ORD-8820', date: '10 Oct 09:00', amount: -99, balanceAfter: 1504.30 },
];

export const UserBalance: React.FC<UserBalanceProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('50');

  return (
    <div className="space-y-8">
       
       <div className="flex flex-col md:flex-row gap-6">
          {/* Main Balance Card */}
          <div className="flex-1 bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bitcoin size={100} />
             </div>
             
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Saldo Disponible</h2>
             <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-black text-white font-mono tracking-tight">$ {user.balance.toFixed(2)}</span>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                   <RefreshCw size={18} />
                </button>
             </div>

             <button 
               onClick={() => setIsModalOpen(true)}
               className="px-6 py-3 bg-facebook-primary text-white font-bold uppercase tracking-wider rounded-lg shadow-lg hover:bg-facebook-dark transition-all flex items-center gap-2"
             >
                <Plus size={18} /> Cargar Saldo
             </button>
          </div>

          {/* Quick Stats */}
          <div className="w-full md:w-80 space-y-4">
             <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 flex items-center justify-between">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Total Cargado</p>
                   <span className="text-xl font-bold text-white">$ 12,500.00</span>
                </div>
                <div className="p-2 bg-green-500/10 text-green-500 rounded"><ArrowUpRight size={20} /></div>
             </div>
             <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 flex items-center justify-between">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Total Gastado</p>
                   <span className="text-xl font-bold text-white">$ 10,645.70</span>
                </div>
                <div className="p-2 bg-red-500/10 text-red-500 rounded"><ArrowDownLeft size={20} /></div>
             </div>
          </div>
       </div>

       {/* Transactions */}
       <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
             <h3 className="font-bold text-white text-lg">Historial de Transacciones</h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-black/20 text-xs uppercase font-bold text-gray-500">
                   <tr>
                      <th className="px-6 py-4">Descripción</th>
                      <th className="px-6 py-4">Ref</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Monto</th>
                      <th className="px-6 py-4 text-right">Saldo</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {MOCK_TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4 flex items-center gap-3">
                            <div className={`p-1.5 rounded ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                               {tx.type === 'credit' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                            </div>
                            <span className="text-white font-medium">{tx.description}</span>
                         </td>
                         <td className="px-6 py-4 font-mono text-xs">{tx.reference}</td>
                         <td className="px-6 py-4">{tx.date}</td>
                         <td className={`px-6 py-4 font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-white'}`}>
                            {tx.amount > 0 ? '+' : ''} $ {Math.abs(tx.amount).toFixed(2)}
                         </td>
                         <td className="px-6 py-4 text-right font-mono text-gray-500">$ {tx.balanceAfter.toFixed(2)}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {/* ADD FUNDS MODAL */}
       {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
             <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
                
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/20">
                   <h3 className="text-xl font-bold text-white">Cargar Saldo</h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                </div>

                <div className="p-6 space-y-6">
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Monto a cargar (USD)</label>
                      <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-2xl font-black text-white focus:border-facebook-primary focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">Mínimo de carga: $20.00 USD</p>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Método de Pago</label>
                      <div className="p-4 border border-facebook-primary/50 bg-facebook-primary/5 rounded-xl flex items-center justify-between cursor-pointer">
                         <div className="flex items-center gap-3">
                            <Bitcoin size={24} className="text-facebook-primary" />
                            <div>
                               <p className="font-bold text-white text-sm">Criptomonedas</p>
                               <p className="text-xs text-gray-400">USDT, BTC, ETH, LTC</p>
                            </div>
                         </div>
                         <div className="w-4 h-4 rounded-full border-4 border-facebook-primary bg-white"></div>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-black/20 border-t border-white/10">
                   <button className="w-full py-3 bg-facebook-primary text-white font-bold uppercase rounded-lg hover:bg-facebook-dark transition-all shadow-lg">
                      Generar Orden de Pago
                   </button>
                   <p className="text-center text-[10px] text-gray-500 mt-3">Procesado de forma segura por NOWPayments</p>
                </div>

             </div>
          </div>
       )}

    </div>
  );
};
