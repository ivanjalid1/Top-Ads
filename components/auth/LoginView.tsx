
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Send, ArrowLeft } from 'lucide-react';
import { PasswordRecoveryModal } from './PasswordRecoveryModal';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onNavigateRegister: () => void;
  onNavigateHome: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNavigateRegister, onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background Decor - Cyber Style */}
      <div className="absolute inset-0 cyber-grid opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-facebook-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Back to Home Button */}
      <button 
        onClick={onNavigateHome}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-bold uppercase tracking-wider">Volver al inicio</span>
      </button>
      
      <div className="w-full max-w-md px-4 relative z-10 animate-fade-in-up">
        {/* Card */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
          <div className="p-8 md:p-10">
            
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Iniciar Sesión</h1>
              <p className="text-gray-400">Accede a tu cuenta de TopAds Elite</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Usuario</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-black/60 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Contraseña</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-facebook-primary focus:bg-black/60 transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Recovery Link */}
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowRecovery(true)}
                  className="text-xs text-facebook-primary font-medium hover:text-white transition-colors hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-facebook-primary/50 text-white cursor-wait' 
                    : 'bg-white text-facebook-primary hover:bg-facebook-primary hover:text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Iniciando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>

            </form>

            {/* Separator */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-gray-500 text-xs font-bold uppercase">O</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {/* Telegram Login */}
            <button className="w-full py-3.5 bg-[#229ED9]/10 border border-[#229ED9]/30 text-[#229ED9] rounded-xl font-bold hover:bg-[#229ED9] hover:text-white transition-all flex items-center justify-center gap-3 group">
              <Send size={20} className="group-hover:-rotate-12 transition-transform" />
              Continuar con Telegram
            </button>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                ¿No tienes una cuenta?{' '}
                <button 
                  onClick={onNavigateRegister}
                  className="text-white font-bold hover:text-facebook-primary hover:underline transition-colors"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>

      <PasswordRecoveryModal isOpen={showRecovery} onClose={() => setShowRecovery(false)} />
    </div>
  );
};
