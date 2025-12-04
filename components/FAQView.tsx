
import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, DollarSign, Lock } from 'lucide-react';

const FAQS = [
  {
    category: 'Pagos & Seguridad',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos criptomonedas (USDT, BTC, ETH) a través de pasarela automática y Binance Pay. Garantizamos total anonimato en las transacciones.',
        icon: DollarSign
      },
      {
        q: '¿Es seguro comprar aquí?',
        a: 'Absolutamente. No guardamos logs de tus IPs y todas las transacciones son encriptadas. Nuestra reputación en el mercado nos respalda.',
        icon: Lock
      }
    ]
  },
  {
    category: 'Productos & Garantía',
    items: [
      {
        q: '¿Cuánto tardan en entregar los activos?',
        a: 'La entrega es instantánea y automática (24/7) para el 95% de nuestro inventario. Recibirás un correo con el acceso inmediatamente después de que la blockchain confirme el pago.',
        icon: Zap
      },
      {
        q: '¿Qué garantía tienen los BMs y Perfiles?',
        a: 'Ofrecemos una garantía de reemplazo de 24 horas si el activo presenta Checkpoint o restricciones al primer login. Debes contactar a soporte con las pruebas.',
        icon: ShieldCheck
      },
      {
        q: '¿Los perfiles vienen con documentos?',
        a: 'Sí, nuestros perfiles "Rehabilitados" (SARI) incluyen el documento de identidad (ID) utilizado para la verificación, listo para apelar si es necesario.',
        icon: HelpCircle
      }
    ]
  }
];

export const FAQView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-4xl animate-fade-in-up">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Preguntas <span className="text-facebook-primary">Frecuentes</span></h1>
          <p className="text-gray-400">Todo lo que necesitas saber antes de escalar.</p>
        </div>

        <div className="space-y-12">
          {FAQS.map((section, secIdx) => (
            <div key={secIdx} className="reveal" style={{ transitionDelay: `${secIdx * 0.2}s` }}>
              <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-facebook-primary">{section.category}</h3>
              <div className="grid gap-4">
                {section.items.map((item, idx) => {
                  const id = `${secIdx}-${idx}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div 
                      key={id} 
                      className={`bg-[#0f172a] border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-facebook-primary/50 shadow-[0_0_20px_rgba(0,136,204,0.1)]' : 'border-white/5 hover:border-white/10'}`}
                    >
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-facebook-primary text-white' : 'bg-white/5 text-gray-400'}`}>
                            <item.icon size={20} />
                          </div>
                          <span className={`font-bold text-lg ${isOpen ? 'text-white' : 'text-gray-300'}`}>{item.q}</span>
                        </div>
                        <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-facebook-primary' : ''}`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-20 p-8 bg-gradient-to-r from-facebook-primary/10 to-transparent border border-facebook-primary/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 delay-300">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">¿No encuentras tu respuesta?</h4>
            <p className="text-gray-400 text-sm">Nuestro equipo de soporte está disponible 24/7 en Telegram.</p>
          </div>
          <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded hover:bg-facebook-primary hover:text-white transition-all shadow-lg">
            Contactar Soporte
          </button>
        </div>

      </div>
    </div>
  );
};
