import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, ChevronRight, TrendingUp, Shield, Users, Server } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  icon: any;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 1,
    title: 'Mentoría 1:1 - Escala tu Agencia',
    category: 'Mentoría',
    price: 299,
    description: 'Sesión privada de 60 minutos con expertos en contingencia. Aprende a estructurar tus activos.',
    features: ['Auditoría de estructura', 'Estrategia personalizada', 'Soporte 7 días'],
    icon: TrendingUp
  },
  {
    id: 2,
    title: 'Pack de Recuperación de Activos (Apelaciones)',
    category: 'Recuperación',
    price: 150,
    description: 'Servicio "Done-For-You" para apelar BMs, Fan Pages y Perfiles restringidos. Tasa de éxito 85%.',
    features: ['Análisis legal', 'Chat soporte FB interno', 'Garantía reembolso'],
    icon: Shield
  },
  {
    id: 3,
    title: 'Setup de Infraestructura Completa',
    category: 'Setup & Infra',
    price: 500,
    description: 'Estructura lista para correr tráfico: Multilogin + Proxies + BMs + Perfiles.',
    features: ['Navegador Anti-detect', '5 BMs Verificados', '10 Perfiles Respaldo'],
    icon: Server
  },
  {
    id: 4,
    title: 'Verificación de Business Manager (Blue Check)',
    category: 'Setup & Infra',
    price: 800,
    description: 'Proceso de verificación oficial para tu BM. Aumenta la confianza y límites de gasto.',
    features: ['Documentación legal', 'Proceso 14-21 días', 'BM Inmortal'],
    icon: Users
  }
];

export const ServicesView: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const filteredServices = SERVICES_LIST.filter(s => 
    selectedCategories.length === 0 || selectedCategories.includes(s.category)
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/5 pb-2">
                <Filter size={20} className="text-facebook-primary" />
                <h2>Filtros Servicios</h2>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Tipo de Servicio</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-start gap-3 cursor-pointer group">
                      <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-all mt-0.5 ${selectedCategories.includes(cat) ? 'bg-facebook-primary border-facebook-primary' : 'bg-transparent border-white/20 group-hover:border-white/40'}`}>
                        <input 
                          type="checkbox" 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm leading-tight select-none ${selectedCategories.includes(cat) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedCategories([])}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-bold transition-all border border-white/5"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* SERVICE LIST AREA */}
          <div className="flex-1">
             <div className="mb-6">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">Servicios Profesionales</h1>
                <p className="text-sm text-gray-500 mt-1">Soluciones a medida para media buyers.</p>
             </div>

             <div className="space-y-4">
                {filteredServices.map((service) => (
                  <div key={service.id} className="group bg-[#0f172a] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-facebook-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                     
                     {/* Icon Box */}
                     <div className="w-16 h-16 rounded-xl bg-facebook-primary/10 flex items-center justify-center text-facebook-primary border border-facebook-primary/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <service.icon size={32} />
                     </div>

                     {/* Content */}
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded bg-black/20">{service.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-facebook-primary transition-colors">{service.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                           {service.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                                 <div className="w-1 h-1 bg-facebook-primary rounded-full"></div>
                                 {f}
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Action */}
                     <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center min-w-[140px] border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 gap-4">
                        <div className="text-right">
                           <span className="block text-xs text-gray-500">Precio desde</span>
                           <span className="text-2xl font-black text-white">${service.price}</span>
                        </div>
                        <button className="bg-white text-black hover:bg-facebook-primary hover:text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all shadow-lg flex items-center gap-2 group/btn">
                           Contratar
                           <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                     </div>

                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};