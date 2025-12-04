
import React, { useState } from 'react';
import { User } from '../../types';
import { Shield, User as UserIcon, Save, Key } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
       
       <h1 className="text-2xl font-black text-white">Mi Perfil</h1>

       {/* Tabs */}
       <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'info' ? 'border-facebook-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
             <div className="flex items-center gap-2"><UserIcon size={16} /> Info Personal</div>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'security' ? 'border-facebook-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
             <div className="flex items-center gap-2"><Shield size={16} /> Seguridad</div>
          </button>
       </div>

       {activeTab === 'info' && (
          <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6 animate-fade-in-up">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Username</label>
                   <input type="text" value={user.username} disabled className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                   <input type="email" value={user.email} disabled={!isEditing} className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none ${!isEditing ? 'opacity-70' : ''}`} />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Telegram User</label>
                   <input type="text" placeholder="@usuario" disabled={!isEditing} className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none ${!isEditing ? 'opacity-70' : ''}`} />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Teléfono (Opcional)</label>
                   <input type="text" disabled={!isEditing} className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none ${!isEditing ? 'opacity-70' : ''}`} />
                </div>
             </div>

             <div className="flex items-center gap-4">
                {isEditing ? (
                   <>
                      <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-facebook-primary text-white font-bold uppercase rounded-lg hover:bg-facebook-dark transition-all flex items-center gap-2">
                         <Save size={16} /> Guardar Cambios
                      </button>
                      <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-transparent border border-white/10 text-gray-400 font-bold uppercase rounded-lg hover:text-white transition-all">
                         Cancelar
                      </button>
                   </>
                ) : (
                   <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-white text-black font-bold uppercase rounded-lg hover:bg-gray-200 transition-all">
                      Editar Perfil
                   </button>
                )}
             </div>
          </div>
       )}

       {activeTab === 'security' && (
          <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6 animate-fade-in-up">
             <div className="max-w-md">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Key size={18} className="text-facebook-primary" /> Cambiar Contraseña</h3>
                
                <div className="space-y-4 mb-8">
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Contraseña Actual</label>
                      <input type="password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nueva Contraseña</label>
                      <input type="password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Confirmar Nueva Contraseña</label>
                      <input type="password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-facebook-primary focus:outline-none" />
                   </div>
                </div>

                <button className="px-6 py-2 bg-facebook-primary text-white font-bold uppercase rounded-lg hover:bg-facebook-dark transition-all">
                   Actualizar Password
                </button>
             </div>
          </div>
       )}

    </div>
  );
};
