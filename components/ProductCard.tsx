import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Eye, ArrowRight, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  isLoading?: boolean;
  hideImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, isLoading = false, hideImage = false }) => {

  if (isLoading) {
    return (
      <div className={`bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 animate-pulse flex flex-col ${hideImage ? 'h-auto' : 'h-[400px]'}`}>
        {!hideImage && <div className="h-48 bg-white/5 flex-shrink-0" />}
        <div className="p-5 space-y-4 flex-1">
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="h-6 bg-white/5 rounded w-3/4" />
          <div className="mt-8 h-10 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-facebook-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,136,204,0.1)] flex flex-col h-full hover:-translate-y-1">
      
      {/* Quick View Action (Hidden until hover) */}
      <button 
        onClick={() => onQuickView(product)}
        className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-facebook-primary text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        title="Vista Rápida"
      >
        <Eye size={16} />
      </button>

      {/* Image Area */}
      {!hideImage && (
        <div className="relative h-48 overflow-hidden bg-[#020617] cursor-pointer flex-shrink-0" onClick={() => onQuickView(product)}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-60"></div>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          
          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 z-20">
              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-lg">
                {product.category}
              </span>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative z-20">
        
        {/* Category if Image is Hidden */}
        {hideImage && (
          <div className="mb-3">
             <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-facebook-primary/10 text-facebook-primary border border-facebook-primary/20">
                {product.category}
             </span>
          </div>
        )}

        {/* Header: ID + Rating */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] text-gray-500 font-mono tracking-widest">ID: {product.id}</span>
          <div className="flex items-center gap-1 text-yellow-500">
             <Star size={10} fill="currentColor" />
             <span className="text-[10px] font-bold text-gray-400">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-base font-bold text-white mb-2 leading-snug group-hover:text-facebook-primary transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem]"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </h3>
        
        {/* Stock Status */}
        <div className="mb-6 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${product.stock && product.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-medium ${product.stock && product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {product.stock && product.stock > 0 ? 'Stock Disponible' : 'Agotado'}
            </span>
            {product.deliveryType === 'instant' && (
                <span className="ml-auto text-[10px] flex items-center gap-1 text-facebook-glow">
                    <Zap size={10} fill="currentColor" /> Instant
                </span>
            )}
        </div>
        
        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-bold">Precio</span>
                <span className="text-xl font-black text-white tracking-tight">
                  $ {product.price.toFixed(2)}
                </span>
             </div>

             <button className="flex-1 bg-white text-black text-xs font-bold uppercase py-3 rounded-lg hover:bg-facebook-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg group/btn">
                Comprar
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
             </button>
        </div>
      </div>
    </div>
  );
};