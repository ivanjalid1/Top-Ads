import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Info, Search, Filter, Check, X } from 'lucide-react';

const LIST_PRODUCTS: Product[] = [
  // BM FOR AGENCY
  {
    id: '101',
    title: 'BM1 Business Manager Rehabilitado (1 Cuenta de Anuncios - Rehabilitado)',
    category: 'BM for Agency Ad Accounts',
    price: 80.00,
    rating: 5,
    reviews: 0,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150',
    stock: 0,
    deliveryType: 'instant'
  },
  {
    id: '102',
    title: 'BM1 Business Manager Antiguo (1 Cuenta de Anuncios - Creado 1-4 años)',
    category: 'BM for Agency Ad Accounts',
    price: 70.00,
    rating: 5,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=150',
    stock: 67,
    deliveryType: 'instant'
  },
  // CUENTAS PERSONALES
  {
    id: '201',
    title: 'Cuenta de Anuncios Personales Límite $250/día [Fuerte+Recomendado]',
    category: 'Cuentas Personales de Alto Límite',
    price: 99.00,
    rating: 5,
    reviews: 99,
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150',
    stock: 99,
    deliveryType: 'instant'
  },
  {
    id: '202',
    title: 'Cuenta de Anuncios Personales con Límite de $1500/día',
    category: 'Cuentas Personales de Alto Límite',
    price: 200.00,
    rating: 5,
    reviews: 50,
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=150',
    stock: 50,
    deliveryType: 'instant'
  },
  // BUSINESS MANAGERS
  {
    id: '701',
    title: 'BM5 Sin Límite Verificado & Rehabilitado [Recomendado]',
    category: 'Business Managers de Alto Límite',
    price: 350.00,
    rating: 5,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=150',
    stock: 4,
    deliveryType: 'instant'
  },
  // FARMED ACCOUNTS
  {
    id: '301',
    title: 'Cuenta Facebook USA Cultivada (Creada 2022-2023)',
    category: 'Farmed Accounts',
    price: 25.00,
    rating: 5,
    reviews: 200,
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=150',
    stock: 200,
    deliveryType: 'instant'
  },
  // EMAILS
  {
    id: '401',
    title: 'Cuentas de Correo Hotmail de Alta Calidad (100% seguras)',
    category: 'Emails',
    price: 0.50,
    rating: 5,
    reviews: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=150',
    stock: 5000,
    deliveryType: 'instant'
  }
];

export const ProductListView: React.FC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');

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
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/5 pb-2">
                <Filter size={20} className="text-facebook-primary" />
                <h2>Filtros</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Buscar productos</label>
                <div className="relative">
                   <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-facebook-primary transition-colors pl-9"
                   />
                   <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
                </div>
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
                      {selectedCategories.includes(cat) && <div className="ml-auto w-1 h-4 bg-facebook-primary rounded-full"></div>}
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
          </aside>

          {/* PRODUCT LIST AREA */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-end">
               <div>
                  <h1 className="text-2xl font-black text-white uppercase tracking-tight">Inventario</h1>
                  <p className="text-sm text-gray-500 mt-1">Mostrando {sortedProducts.length} resultados</p>
               </div>
            </div>

            <div className="space-y-4">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 border border-white/5 rounded-xl bg-[#0f172a]/50 border-dashed">
                  <p className="text-gray-500">No se encontraron productos.</p>
                </div>
              ) : (
                sortedProducts.map((product) => (
                  <div key={product.id} className="group bg-[#0f172a] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-5 hover:border-facebook-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    
                    {/* Image Thumbnail */}
                    <div className="w-full sm:w-24 h-24 flex-shrink-0 rounded-lg bg-black/40 overflow-hidden border border-white/5 relative">
                       {product.imageUrl ? (
                         <img src={product.imageUrl} alt={product.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-600"><Info size={20} /></div>
                       )}
                       {product.stock === 0 && (
                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white bg-red-500/80 px-2 py-0.5 rounded">AGOTADO</span>
                         </div>
                       )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                       <span className="text-[10px] font-bold text-facebook-primary uppercase tracking-wider mb-1">{product.category}</span>
                       <h3 className="text-base font-bold text-white leading-tight group-hover:text-facebook-glow transition-colors mb-2">
                         {product.title}
                       </h3>
                       {product.deliveryType === 'instant' && (
                         <div className="flex items-center gap-1.5 text-[10px] text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            Entrega Instantánea Automática
                         </div>
                       )}
                    </div>

                    {/* Actions / Price */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6 min-w-[140px]">
                       <div className="text-right">
                          <div className={`text-xs font-bold mb-0.5 ${product.stock && product.stock > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                            {product.stock && product.stock > 0 ? `${product.stock} disponibles` : 'Sin Stock'}
                          </div>
                          <div className="text-xl font-black text-white">$ {product.price.toFixed(2)}</div>
                       </div>

                       <div className="flex items-center gap-2">
                          <button 
                            disabled={!product.stock || product.stock === 0}
                            className="bg-facebook-primary hover:bg-facebook-dark disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all shadow-lg hover:shadow-facebook-primary/20"
                          >
                            Comprar
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            <ShoppingCart size={16} />
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