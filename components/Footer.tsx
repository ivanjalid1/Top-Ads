import React from 'react';
import { Github, Twitter, MessageCircle, Bitcoin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-facebook-primary to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded bg-white text-black font-black flex items-center justify-center">TA</div>
               <span className="text-xl font-bold text-white tracking-tight">TopAds</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              La plataforma de activos digitales #1 para afiliados y media buyers profesionales. Sin límites, sin bloqueos.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Navegación</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-facebook-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-facebook-primary rounded-full"></span> Inicio</a></li>
              <li><a href="#" className="hover:text-facebook-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-700 rounded-full"></span> Catálogo</a></li>
              <li><a href="#" className="hover:text-facebook-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-700 rounded-full"></span> Servicios</a></li>
              <li><a href="#" className="hover:text-facebook-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-700 rounded-full"></span> FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Legal & Soporte</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Reemplazo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-4">Accede a drops exclusivos antes que nadie.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="email@secure.com" 
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-l-lg text-sm w-full focus:outline-none focus:border-facebook-primary text-white placeholder-gray-600"
              />
              <button className="bg-facebook-primary text-white px-4 py-3 rounded-r-lg hover:bg-facebook-glow transition-all font-bold">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Marquee */}
        <div className="mb-10 pt-10 border-t border-white/5">
           <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-6">Pagos Seguros & Anónimos</p>
           <div className="flex justify-center gap-8 flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-white font-bold border border-white/10 px-4 py-2 rounded bg-white/5">
                 <Bitcoin size={20} className="text-orange-500" />
                 <span>BITCOIN</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold border border-white/10 px-4 py-2 rounded bg-white/5">
                 <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px]">T</div>
                 <span>USDT (TRC20)</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold border border-white/10 px-4 py-2 rounded bg-white/5">
                 <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-black text-[10px]">E</div>
                 <span>ETHEREUM</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold border border-white/10 px-4 py-2 rounded bg-white/5">
                 <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-black text-[10px]">B</div>
                 <span>BINANCE PAY</span>
              </div>
           </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2024 TopAds Elite. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-600 font-mono uppercase tracking-widest">
            <span>System Status: <span className="text-green-500">Operational</span></span>
            <span>Server: <span className="text-blue-500">US-East</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};