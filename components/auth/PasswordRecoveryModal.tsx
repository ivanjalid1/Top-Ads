
import React, { useState } from 'react';
import { X, Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-2">Recuperar Contraseña</h2>
            <p className="text-sm text-gray-500">Ingresa tu email y te enviaremos las instrucciones.</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@email.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-white/5 transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-facebook-primary text-white font-black uppercase tracking-wider py-4 rounded-xl hover:bg-facebook-dark transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 animate-fade-in-up">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">¡Email Enviado!</h3>
              <p className="text-gray-400 text-sm mb-6">Revisa tu bandeja de entrada (y spam) para restablecer tu contraseña.</p>
              <button onClick={onClose} className="text-facebook-primary font-bold hover:underline">
                Cerrar ventana
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
