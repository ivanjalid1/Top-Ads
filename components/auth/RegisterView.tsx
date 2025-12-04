import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, ShieldCheck, ArrowLeft } from 'lucide-react';

interface RegisterViewProps {
  onLoginSuccess: () => void;
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onLoginSuccess, onNavigateLogin, onNavigateHome }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptData: false,
    acceptMarketing: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Password Strength State
  const [passStrength, setPassStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setPassStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
      match: password.length > 0 && password === confirmPassword
    });
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.username) newErrors.push('Usuario es requerido');
    if (!formData.email) newErrors.push('Email es requerido');
    if (!Object.values(passStrength).every(Boolean)) newErrors.push('La contraseña no cumple los requisitos');
    if (!formData.acceptData) newErrors.push('Debes aceptar la política de datos');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API Register
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 2000);
  };

  return (
    // UPDATED CONTAINER: min-h-[100dvh], pt-24 for mobile clearance, items-start to allow scrolling
    <div className="min-h-[100dvh] pt-24 pb-20 md:pt-10 md:pb-10 flex items-start md:items-center justify-center bg-[#020617] relative overflow-y-auto overflow-x-hidden">
      {/* Background Decor - Cyber Style (Green tint for Register) */}
      <div className="fixed inset-0 cyber-grid opacity-30 animate-pulse-slow pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back to Home Button - Fixed position on mobile to stay visible but out of flow */}
      <button 
        onClick={onNavigateHome}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group bg-[#020617]/50 backdrop-blur-md rounded-full pr-4 py-1"
      >
        <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-bold uppercase tracking-wider">Volver</span>
      </button>

      <div className="w-full max-w-3xl px-4 relative z-10 animate-fade-in-up">
        {/* Card */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
          <div className="p-6 md:p-10">
            
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Crear Cuenta</h1>
              <p className="text-gray-400">Únete a la élite de anunciantes digitales</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              
              {/* SECTION 1: MANDATORY */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-6 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" /> Información de Cuenta
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Usuario *</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                      <input 
                        name="username" type="text" placeholder="Tu usuario" required
                        value={formData.username} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0088CC] focus:shadow-[0_0_20px_rgba(0,136,204,0.3)] focus:bg-black/60 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email *</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                      <input 
                        name="email" type="email" placeholder="ejemplo@email.com" required
                        value={formData.email} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0088CC] focus:shadow-[0_0_20px_rgba(0,136,204,0.3)] focus:bg-black/60 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Contraseña *</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                      <input 
                        name="password" type={showPassword ? 'text' : 'password'} placeholder="Tu contraseña" required
                        value={formData.password} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#0088CC] focus:shadow-[0_0_20px_rgba(0,136,204,0.3)] focus:bg-black/60 transition-all duration-300"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-white">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Confirmar *</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
                      <input 
                        name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Repite contraseña" required
                        value={formData.confirmPassword} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#0088CC] focus:shadow-[0_0_20px_rgba(0,136,204,0.3)] focus:bg-black/60 transition-all duration-300"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-white">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Panel */}
                <div className="mt-6 bg-black/30 rounded-xl p-4 border border-white/5">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Requisitos de Seguridad</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-2 ${passStrength.length ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.length ? <Check size={14} /> : <X size={14} />} Mínimo 8 caracteres
                    </div>
                    <div className={`flex items-center gap-2 ${passStrength.uppercase ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.uppercase ? <Check size={14} /> : <X size={14} />} Una mayúscula
                    </div>
                    <div className={`flex items-center gap-2 ${passStrength.lowercase ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.lowercase ? <Check size={14} /> : <X size={14} />} Una minúscula
                    </div>
                    <div className={`flex items-center gap-2 ${passStrength.number ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.number ? <Check size={14} /> : <X size={14} />} Un número
                    </div>
                    <div className={`flex items-center gap-2 ${passStrength.special ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.special ? <Check size={14} /> : <X size={14} />} Un carácter especial
                    </div>
                    <div className={`flex items-center gap-2 ${passStrength.match ? 'text-green-400' : 'text-gray-500'}`}>
                      {passStrength.match ? <Check size={14} /> : <X size={14} />} Contraseñas coinciden
                    </div>
                  </div>
                </div>
              </div>

              {/* CONSENTS */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${formData.acceptData ? 'bg-green-500 border-green-500' : 'border-white/20 group-hover:border-white/40'}`}>
                    {formData.acceptData && <Check size={14} className="text-black" />}
                  </div>
                  <input type="checkbox" name="acceptData" checked={formData.acceptData} onChange={handleChange} className="hidden" />
                  <span className="text-sm text-gray-400 select-none">Acepto la política de privacidad y el tratamiento de mis datos personales. <span className="text-red-500">*</span></span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${formData.acceptMarketing ? 'bg-green-500 border-green-500' : 'border-white/20 group-hover:border-white/40'}`}>
                    {formData.acceptMarketing && <Check size={14} className="text-black" />}
                  </div>
                  <input type="checkbox" name="acceptMarketing" checked={formData.acceptMarketing} onChange={handleChange} className="hidden" />
                  <span className="text-sm text-gray-400 select-none">Deseo recibir ofertas exclusivas y novedades en mi correo.</span>
                </label>
              </div>

              {/* ERRORS */}
              {errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-sm font-bold mb-1">Por favor corrige los siguientes errores:</p>
                  <ul className="list-disc list-inside text-xs text-red-300">
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              )}

              {/* SUBMIT */}
              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-green-600/50 text-white cursor-wait' 
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                {isLoading ? 'Registrando...' : 'Crear Cuenta'}
              </button>

            </form>

            {/* LOGIN LINK */}
            <div className="mt-8 text-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-gray-500 text-xs font-bold uppercase">O</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <p className="text-sm text-gray-400">
                ¿Ya tienes una cuenta?{' '}
                <button 
                  onClick={onNavigateLogin}
                  className="text-white font-bold hover:text-green-400 hover:underline transition-colors"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};