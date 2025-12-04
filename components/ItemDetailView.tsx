
import React, { useState } from 'react';
import { Product, ServiceItem, BlogPost } from '../types';
import { ArrowLeft, Star, ShoppingCart, Check, Shield, Globe, Zap, Server, ChevronRight, Calendar, User, BookOpen } from 'lucide-react';

interface ItemDetailViewProps {
  item: Product | ServiceItem | BlogPost;
  onBack: () => void;
}

export const ItemDetailView: React.FC<ItemDetailViewProps> = ({ item, onBack }) => {
  // Helper type guards
  const isProduct = (i: any): i is Product => 'stock' in i;
  const isService = (i: any): i is ServiceItem => 'icon' in i;
  const isBlog = (i: any): i is BlogPost => 'author' in i;

  const getProduct = () => item as Product;
  const getService = () => item as ServiceItem;
  const getBlog = () => item as BlogPost;

  const [activeImage, setActiveImage] = useState(
    isProduct(item) ? item.imageUrl : 
    isBlog(item) ? item.image : ''
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in-up">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium">Volver al listado</span>
        </button>

        {/* --- BLOG LAYOUT (Title First, Then Image, Then Content) --- */}
        {isBlog(item) ? (
          <div className="max-w-4xl mx-auto">
             {/* Header Section */}
             <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                   <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-facebook-primary/10 text-facebook-primary border border-facebook-primary/20">
                     {item.category}
                   </span>
                   <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                   <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                      <Calendar size={12} /> {item.date}
                   </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  {item.title}
                </h1>

                <div className="flex items-center justify-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-white/10">
                      <User size={20} className="text-gray-400" />
                   </div>
                   <div className="text-left">
                      <p className="text-xs text-gray-500 uppercase font-bold">Escrito por</p>
                      <p className="text-sm text-white font-medium">{item.author}</p>
                   </div>
                </div>
             </div>

             {/* Featured Image */}
             <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-20"></div>
             </div>

             {/* Content */}
             <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-loose">
                <p className="text-xl text-white font-light mb-8 border-l-4 border-facebook-primary pl-6 italic">
                   {item.excerpt}
                </p>
                <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 mb-8">
                   <p>{item.content}</p>
                   <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
             </div>

             {/* Blog CTA */}
             <div className="mt-16 p-8 bg-gradient-to-r from-facebook-primary/10 to-[#020617] rounded-2xl border border-facebook-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">¿Te gustó este artículo?</h3>
                   <p className="text-sm text-gray-400">Suscríbete para recibir guías avanzadas de contingencia.</p>
                </div>
                <button className="px-8 py-3 bg-white text-black font-bold uppercase rounded-xl hover:bg-facebook-primary hover:text-white transition-all shadow-lg">
                   Suscribirme al Newsletter
                </button>
             </div>
          </div>
        ) : (
          /* --- PRODUCT / SERVICE LAYOUT (Split View) --- */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT COLUMN: Media / Icon */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl aspect-square lg:aspect-video flex items-center justify-center group">
                {isProduct(item) ? (
                  <>
                    <img 
                      src={activeImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.deliveryType === 'instant' && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                        <Zap size={14} className="text-facebook-glow" fill="currentColor" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Entrega Instantánea</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-facebook-primary p-12 bg-facebook-primary/5 rounded-full border border-facebook-primary/20 shadow-[0_0_50px_rgba(0,136,204,0.2)]">
                     <Server size={80} />
                  </div>
                )}
              </div>
              
              {/* Features Grid (Only for Products/Services) */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><Shield size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Garantía</p>
                      <p className="text-white font-medium">24h Reemplazo</p>
                    </div>
                 </div>
                 <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Globe size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Proxy</p>
                      <p className="text-white font-medium">Residencial</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                 <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-facebook-primary/10 text-facebook-primary border border-facebook-primary/20">
                   {item.category}
                 </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                {item.title}
              </h1>

              {/* Sub-header info */}
              {isProduct(item) && (
                <div className="flex items-center gap-4 mb-8">
                   <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                   </div>
                   <span className="text-sm text-gray-500 font-medium border-l border-white/10 pl-4">{item.reviews} Reviews Verificadas</span>
                </div>
              )}

              {/* Price */}
              <div className="text-4xl font-black text-white mb-8 pb-8 border-b border-white/5 flex items-end gap-2">
                 $ {(item as any).price.toFixed(2)}
                 <span className="text-sm text-gray-500 font-medium mb-1.5 uppercase tracking-wide">/ Unidad</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Descripción</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {isProduct(item) ? (item.description || 'Activo digital de alta calidad verificado por nuestro equipo de expertos. Este activo ha pasado por rigurosos controles de calidad y está listo para ser utilizado en campañas de escala. Incluye cookies, user-agents y fingerprinting limpio.') : 
                   isService(item) ? item.description : ''
                  }
                </p>
              </div>

              {/* Feature List */}
              <div className="mb-10 bg-[#0f172a]/50 p-6 rounded-xl border border-white/5">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Especificaciones Técnicas</h3>
                 <ul className="space-y-3">
                   {(item as any).features?.map((feature: string, i: number) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="mt-0.5 p-0.5 bg-facebook-primary rounded-full">
                           <Check size={10} className="text-white" />
                        </div>
                        {feature}
                     </li>
                   ))}
                 </ul>
              </div>

              {/* CTA Actions */}
              <div className="mt-auto flex flex-col gap-4">
                 {isProduct(item) && item.stock === 0 ? (
                   <button disabled className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase rounded-xl cursor-not-allowed">
                      Agotado Temporalmente
                   </button>
                 ) : (
                   <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-white text-black font-black uppercase tracking-wider rounded-xl hover:bg-facebook-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group">
                         {isProduct(item) ? 'Comprar Ahora' : 'Contratar Servicio'} 
                         <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      {isProduct(item) && (
                        <button className="px-6 py-4 bg-[#0f172a] border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors">
                          <ShoppingCart size={20} />
                        </button>
                      )}
                   </div>
                 )}
                 
                 <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-2">
                    <Shield size={12} /> Compra protegida y encriptada
                 </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
