
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header / Tabs */}
        <div className="flex text-center border-b border-white/5">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'login' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Iniciar Sesión
            {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-facebook-primary shadow-[0_0_10px_#0088CC]"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'register' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Crear Cuenta
            {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-facebook-primary shadow-[0_0_10px_#0088CC]"></div>}
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">
              {activeTab === 'login' ? 'Bienvenido de nuevo' : 'Únete a la Élite'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeTab === 'login' 
                ? 'Accede a tu panel de control y gestiona tus activos.' 
                : 'Crea tu cuenta y empieza a escalar tus campañas hoy.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeTab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Usuario</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Tu nombre de usuario"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-white/5 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="ejemplo@email.com"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-white/5 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-white/5 transition-all"
                  required
                />
              </div>
            </div>

            {activeTab === 'login' && (
               <div className="flex justify-end">
                  <button type="button" className="text-xs text-facebook-primary hover:text-white transition-colors">
                    ¿Olvidaste tu contraseña?
                  </button>
               </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-facebook-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 mt-4 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                <>
                  {activeTab === 'login' ? 'Acceder' : 'Registrarse'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>

          {activeTab === 'register' && (
             <div className="mt-6 p-4 bg-facebook-primary/10 rounded-xl border border-facebook-primary/20 flex gap-3">
                <Zap className="text-facebook-primary flex-shrink-0" size={20} />
                <p className="text-xs text-gray-400 leading-relaxed">
                  Al registrarte obtienes acceso inmediato al catálogo premium y soporte prioritario 24/7.
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
