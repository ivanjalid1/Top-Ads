
import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, ChevronRight, TrendingUp, Shield, Users, Server, ChevronDown, ChevronUp } from 'lucide-react';
import { ServiceItem } from '../types';

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 1,
    slug: 'mentoria-1-1-agencia',
    title: 'Mentoría 1:1 - Escala tu Agencia',
    category: 'Mentoría',
    price: 299,
    description: 'Sesión privada de 60 minutos con expertos en contingencia. Aprende a estructurar tus activos.',
    features: ['Auditoría de estructura', 'Estrategia personalizada', 'Soporte 7 días'],
    icon: TrendingUp
  },
  {
    id: 2,
    slug: 'pack-recuperacion-activos',
    title: 'Pack de Recuperación de Activos (Apelaciones)',
    category: 'Recuperación',
    price: 150,
    description: 'Servicio "Done-For-You" para apelar BMs, Fan Pages y Perfiles restringidos. Tasa de éxito 85%.',
    features: ['Análisis legal', 'Chat soporte FB interno', 'Garantía reembolso'],
    icon: Shield
  },
  {
    id: 3,
    slug: 'setup-infraestructura-completa',
    title: 'Setup de Infraestructura Completa',
    category: 'Setup & Infra',
    price: 500,
    description: 'Estructura lista para correr tráfico: Multilogin + Proxies + BMs + Perfiles.',
    features: ['Navegador Anti-detect', '5 BMs Verificados', '10 Perfiles Respaldo'],
    icon: Server
  },
  {
    id: 4,
    slug: 'verificacion-business-manager',
    title: 'Verificación de Business Manager (Blue Check)',
    category: 'Setup & Infra',
    price: 800,
    description: 'Proceso de verificación oficial para tu BM. Aumenta la confianza y límites de gasto.',
    features: ['Documentación legal', 'Proceso 14-21 días', 'BM Inmortal'],
    icon: Users
  }
];

interface ServicesViewProps {
  onSelectItem?: (item: ServiceItem) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectItem }) => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setSortBy('default');
  };

  // Filter Logic
  const filteredServices = SERVICES_LIST.filter(s => {
    // Search (Title or Description)
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price
    const matchesMinPrice = minPrice === '' || s.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || s.price <= parseFloat(maxPrice);

    // Category
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(s.category);

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory;
  });

  // Sort Logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return 0; // Default order
  });

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        {/* HEADER SECTION */}
        <div className="mb-8 border-b border-white/10 pb-8">
           <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
             Servicios <span className="text-facebook-primary">Profesionales</span>
           </h1>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                Consultoría, recuperación y setup de infraestructura de la mano de expertos en contingencia.
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-[#0f172a] px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 {sortedServices.length} SERVICIOS ACTIVOS
              </div>
           </div>

           {/* MAIN SEARCH BAR - MOBILE ONLY */}
           <div className="lg:hidden relative mt-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search size={20} className="text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
              </div>
              <input 
               type="text" 
               placeholder="Buscar servicios..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-facebook-primary focus:ring-1 focus:ring-facebook-primary transition-all shadow-lg"
              />
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* MOBILE FILTER TOGGLE */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full bg-[#0f172a] border border-white/10 p-4 rounded-xl flex items-center justify-between text-white font-bold transition-all hover:bg-[#1e293b] active:scale-95 shadow-lg mb-4"
          >
             <span className="flex items-center gap-2"><Filter size={18} className="text-facebook-primary"/> Filtros & Orden</span>
             {showMobileFilters ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
          </button>

          {/* SIDEBAR (Animated) */}
          <aside 
            className={`w-full lg:w-72 flex-shrink-0 lg:block transition-all duration-500 ease-in-out overflow-hidden lg:sticky lg:top-24 ${
              showMobileFilters 
                ? 'max-h-[1500px] opacity-100 mb-8' 
                : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-0'
            }`}
          >
            <div className="space-y-4">
              
              {/* DESKTOP SEARCH BAR - ABOVE FILTERS */}
              <div className="hidden lg:block relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500" />
                 </div>
                 <input 
                  type="text" 
                  placeholder="Buscar servicios..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-facebook-primary focus:ring-1 focus:ring-facebook-primary transition-all shadow-lg"
                 />
              </div>

              {/* FILTERS CONTAINER */}
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 shadow-xl max-h-[calc(100vh-theme(spacing.48))] overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/5 pb-2">
                  <Filter size={20} className="text-facebook-primary" />
                  <h2>Filtros</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Rango de precio</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-1/2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-facebook-primary transition-colors"
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-1/2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-facebook-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Categorías</label>
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

                {/* Sort By */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Ordenar por</label>
                  <div className="space-y-2">
                    {[
                      { val: 'default', label: 'Predeterminado' },
                      { val: 'priceAsc', label: 'Precio: Menor a Mayor' },
                      { val: 'priceDesc', label: 'Precio: Mayor a Menor' }
                    ].map(opt => (
                      <label key={opt.val} className="flex items-center gap-3 cursor-pointer group">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${sortBy === opt.val ? 'border-facebook-primary' : 'border-white/20 group-hover:border-white/40'}`}>
                            {sortBy === opt.val && <div className="w-2 h-2 rounded-full bg-facebook-primary"></div>}
                            <input 
                              type="radio" 
                              name="sort" 
                              value={opt.val} 
                              checked={sortBy === opt.val} 
                              onChange={(e) => setSortBy(e.target.value)} 
                              className="hidden" 
                            />
                         </div>
                         <span className={`text-sm ${sortBy === opt.val ? 'text-white' : 'text-gray-400'}`}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={clearFilters}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-bold transition-all border border-white/5"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </aside>

          {/* SERVICE LIST AREA */}
          <div className="flex-1 min-w-0">
             <div className="space-y-4">
                {sortedServices.length === 0 ? (
                  <div className="text-center py-20 border border-white/5 rounded-xl bg-[#0f172a]/50 border-dashed">
                    <p className="text-gray-500">No se encontraron servicios.</p>
                  </div>
                ) : (
                  sortedServices.map((service, index) => (
                    <div 
                      key={service.id} 
                      className="reveal group bg-[#0f172a] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-facebook-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                       
                       {/* Icon Box */}
                       <div className="w-16 h-16 rounded-xl bg-facebook-primary/10 flex items-center justify-center text-facebook-primary border border-facebook-primary/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <service.icon size={32} />
                       </div>

                       {/* Content */}
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded bg-black/20">{service.category}</span>
                          </div>
                          <h3 
                            className="text-xl font-bold text-white mb-2 group-hover:text-facebook-primary transition-colors cursor-pointer"
                            onClick={() => onSelectItem && onSelectItem(service)}
                          >
                            {service.title}
                          </h3>
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
                       <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center min-w-[140px] border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 gap-4 mt-2 md:mt-0">
                          <div className="text-left md:text-right">
                             <span className="block text-xs text-gray-500">Precio desde</span>
                             <span className="text-2xl font-black text-white">${service.price}</span>
                          </div>
                          <button 
                            onClick={() => onSelectItem && onSelectItem(service)}
                            className="bg-white text-black hover:bg-facebook-primary hover:text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all shadow-lg flex items-center gap-2 group/btn"
                          >
                             Contratar
                             <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                       </div>

                    </div>
                  ))
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
