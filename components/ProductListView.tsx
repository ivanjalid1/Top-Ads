
import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Info, Search, Filter, Check, ChevronDown, ChevronUp, Star, Zap, CheckCircle2 } from 'lucide-react';

const LIST_PRODUCTS: Product[] = [
  // BM FOR AGENCY
  {
    id: '101',
    slug: 'bm1-rehabilitado',
    title: 'BM1 Business Manager Rehabilitado (1 Cuenta de Anuncios)',
    category: 'BM Agency',
    price: 80.00,
    rating: 5,
    reviews: 12,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    stock: 0,
    deliveryType: 'instant',
    features: ['Rehabilitado (Green)', 'ID Verificado', '1 Ad Account']
  },
  {
    id: '102',
    slug: 'bm1-antiguo',
    title: 'BM1 Business Manager Antiguo (Vintage 2019-2022)',
    category: 'BM Agency',
    price: 70.00,
    rating: 4.8,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
    stock: 67,
    deliveryType: 'instant',
    features: ['Antigüedad Garantizada', 'Ads Manager Activo', 'Resistente']
  },
  // CUENTAS PERSONALES
  {
    id: '201',
    slug: 'cuenta-personal-250-limit',
    title: 'Cuenta Personal Facebook Ads - Límite $250 Diario',
    category: 'Personal Ads',
    price: 99.00,
    rating: 5,
    reviews: 99,
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
    stock: 99,
    deliveryType: 'instant',
    features: ['Límite $250 Diario', 'Cookies Incluidas', '2FA Activado']
  },
  {
    id: '202',
    slug: 'cuenta-personal-1500-limit',
    title: 'Cuenta Personal Facebook Ads - Límite $1500 Diario',
    category: 'Personal Ads',
    price: 200.00,
    rating: 5,
    reviews: 50,
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400',
    stock: 50,
    deliveryType: 'instant',
    features: ['High Limit $1500', 'Ideal Escalar', 'Trust Score Alto']
  },
  // BUSINESS MANAGERS
  {
    id: '701',
    slug: 'bm5-sin-limite',
    title: 'BM5 Verificado & Rehabilitado (No Limit)',
    category: 'BM High Limit',
    price: 350.00,
    rating: 5,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    deliveryType: 'instant',
    features: ['5 Cuentas Publicitarias', 'Gasto Ilimitado', 'Documentación Incluida']
  },
  // FARMED ACCOUNTS
  {
    id: '301',
    slug: 'cuenta-facebook-usa-cultivada',
    title: 'Perfil Facebook USA Cultivado (Farmed 2+ Años)',
    category: 'Farmed Profiles',
    price: 25.00,
    rating: 4.5,
    reviews: 200,
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=400',
    stock: 200,
    deliveryType: 'instant',
    features: ['IP Residencial USA', 'Actividad Real', 'Marketplace Activo']
  },
  // EMAILS
  {
    id: '401',
    slug: 'correos-hotmail-alta-calidad',
    title: 'Pack Correos Hotmail Aged (Alta Reputación)',
    category: 'Assets',
    price: 0.50,
    rating: 5,
    reviews: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=400',
    stock: 5000,
    deliveryType: 'instant',
    features: ['Outlook/Hotmail', 'POP3/IMAP', 'No Phone Req']
  }
];

interface ProductListViewProps {
  onSelectItem?: (item: Product) => void;
}

export const ProductListView: React.FC<ProductListViewProps> = ({ onSelectItem }) => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = Array.from(new Set(LIST_PRODUCTS.map(p => p.category)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter Logic
  const filteredProducts = LIST_PRODUCTS.filter(product => {
    // Search
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price
    const price = product.price;
    const matchesMinPrice = minPrice === '' || price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || price <= parseFloat(maxPrice);

    // Category
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'stock') return b.stock! - a.stock!; // Approximation for "popular"
    return 0; 
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setSortBy('default');
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        {/* HEADER SECTION - Structure Aligned with ServicesView */}
        <div className="mb-8 border-b border-white/10 pb-8">
           <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
             Inventario <span className="text-facebook-primary">Premium</span>
           </h1>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                Explora el catálogo más completo de Business Managers, Perfiles y Activos Publicitarios verificados para escalar tus campañas.
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-[#0f172a] px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 {sortedProducts.length} ACTIVOS DISPONIBLES
              </div>
           </div>

           {/* MAIN SEARCH BAR - MOBILE ONLY */}
           <div className="lg:hidden relative mt-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search size={20} className="text-gray-500 group-focus-within:text-facebook-primary transition-colors" />
              </div>
              <input 
               type="text" 
               placeholder="Buscar activos por nombre, categoría..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-facebook-primary focus:ring-1 focus:ring-facebook-primary transition-all shadow-lg text-sm"
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

          {/* SIDEBAR FILTERS (Sticky on Desktop) */}
          <aside 
            className={`w-full lg:w-72 flex-shrink-0 lg:block transition-all duration-500 ease-in-out overflow-hidden lg:sticky lg:top-24 ${
              showMobileFilters 
                ? 'max-h-[1500px] opacity-100 mb-8 lg:mb-0' 
                : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:overflow-visible'
            }`}
          >
            {/* WRAPPER FOR STICKY ELEMENTS */}
            <div className="space-y-4">
              
              {/* DESKTOP SEARCH BAR - ABOVE FILTERS */}
              <div className="hidden lg:block relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500" />
                 </div>
                 <input 
                  type="text" 
                  placeholder="Buscar activos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-facebook-primary focus:ring-1 focus:ring-facebook-primary transition-all shadow-lg"
                 />
              </div>

              {/* FILTERS PANEL */}
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
                      { val: 'priceDesc', label: 'Precio: Mayor a Menor' },
                      { val: 'stock', label: 'Más Stock / Populares' }
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

                {/* Clear */}
                <button 
                  onClick={clearFilters}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-bold transition-all border border-white/5"
                >
                  Limpiar filtros
                </button>

              </div>
            </div>
          </aside>

          {/* PRODUCT LIST AREA */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-32 bg-[#0f172a]/20 rounded-2xl border border-white/5 border-dashed">
                   <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-facebook-primary animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-2 h-2 bg-facebook-primary rounded-full shadow-[0_0_15px_#0088CC] animate-pulse"></div>
                      </div>
                   </div>
                   <div className="text-center space-y-2">
                      <p className="text-facebook-primary font-mono text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
                        Sin Resultados
                      </p>
                      <p className="text-gray-600 text-xs">
                        Intenta ajustar los filtros de búsqueda.
                      </p>
                   </div>
                </div>
              ) : (
                sortedProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="reveal group relative bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden hover:border-facebook-primary/60 transition-all duration-300 ease-out hover:shadow-[0_20px_40px_-15px_rgba(24,119,242,0.3)] hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                    onClick={() => onSelectItem && onSelectItem(product)}
                    style={{transitionDelay: `${index * 0.05}s`}}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-facebook-primary transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"></div>

                    {/* Image Area */}
                    <div className="w-full h-48 bg-black/40 overflow-hidden relative group-hover:border-b-facebook-primary/50 transition-colors">
                       {product.imageUrl ? (
                         <img src={product.imageUrl} alt={product.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-110 duration-700" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-600"><Info size={24} /></div>
                       )}
                       
                       {/* Floating Logo */}
                       <div className="absolute top-3 right-3 z-20 w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(24,119,242,0.8)] ring-2 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white drop-shadow-md">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                       </div>

                       {/* Stock Badge */}
                       <div className="absolute top-3 left-3">
                           {product.stock === 0 ? (
                             <span className="text-[10px] font-bold text-white bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-500 uppercase tracking-wide shadow-lg">Agotado</span>
                           ) : (
                             <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wide">
                                {product.category}
                             </span>
                           )}
                       </div>
                       
                       {product.deliveryType === 'instant' && (
                         <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase tracking-wider bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-green-500/30">
                            <Zap size={10} fill="currentColor" /> Instant
                         </div>
                       )}
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex flex-col flex-1">
                       
                       <div className="flex items-center gap-2 mb-2">
                           <span className="text-xs font-bold text-facebook-primary">Facebook Ads</span>
                           <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                           <span className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                             <Star size={10} fill="currentColor" /> {product.rating}
                           </span>
                       </div>

                       <h3 className="text-lg font-bold text-white leading-tight group-hover:text-facebook-glow transition-colors mb-3 line-clamp-2 min-h-[3rem]">
                         {product.title}
                       </h3>
                       
                       {/* Features */}
                       <div className="space-y-1.5 mb-5 flex-1">
                          {product.features?.slice(0, 3).map((f, i) => (
                             <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                <CheckCircle2 size={12} className="text-facebook-primary shrink-0" />
                                <span className="truncate">{f}</span>
                             </div>
                          ))}
                       </div>

                       {/* Footer Price & Action */}
                       <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-3">
                           <div>
                              <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Precio</p>
                              <div className="text-2xl font-black text-white tracking-tighter">$ {product.price.toFixed(2)}</div>
                           </div>
                           
                           <button 
                             disabled={!product.stock || product.stock === 0}
                             className="bg-white text-black hover:bg-facebook-primary hover:text-white disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed h-10 px-4 rounded-lg text-xs font-black uppercase transition-all shadow-lg flex items-center gap-2 group/btn"
                           >
                             <ShoppingCart size={16} />
                             {product.stock && product.stock > 0 ? 'Comprar' : 'Sin Stock'}
                           </button>
                       </div>
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
