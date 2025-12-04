
import React, { useEffect } from 'react';
import { Calendar, User, ArrowRight, Tag, Link as LinkIcon } from 'lucide-react';
import { BlogPost } from '../types';

const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'como-evitar-checkpoint-facebook-ads',
    title: 'Cómo evitar el Checkpoint en Facebook Ads (Guía 2024)',
    excerpt: 'Descubre las técnicas actualizadas de fingerprinting y cookies para mantener tus perfiles vivos por meses.',
    content: 'En esta guía completa aprenderás sobre los nuevos algoritmos de detección de Meta y cómo configurar tu entorno Multilogin para evitar bloqueos instantáneos.',
    date: '12 Oct, 2024',
    author: 'Ivan Jalid',
    category: 'Guías',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    slug: 'verdad-bms-ilimitados',
    title: 'La verdad sobre los BMs "Ilimitados"',
    excerpt: 'Analizamos qué hay detrás de los Business Managers sin límite de gasto y cómo verificar si el tuyo es real.',
    content: 'Muchos vendedores prometen "No Limit" pero entregan cuentas con límite diario oculto de $50. Te enseñamos a auditar tus activos antes de comprarlos.',
    date: '08 Oct, 2024',
    author: 'Team TopAds',
    category: 'Análisis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    slug: 'configuracion-optima-multilogin',
    title: 'Configuración óptima de Multilogin para Media Buyers',
    excerpt: 'Paso a paso para configurar tus proxies y user-agents sin dejar rastro.',
    content: 'Guía técnica: Cómo configurar WebRTC, Canvas Noise y Geo-Spoofing para simular usuarios residenciales reales.',
    date: '25 Sep, 2024',
    author: 'Ivan Jalid',
    category: 'Tutoriales',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400'
  }
];

interface BlogViewProps {
  onSelectPost?: (post: BlogPost) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onSelectPost }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#020617] text-gray-300">
      <div className="container mx-auto px-4 max-w-6xl animate-fade-in-up">
        
        <div className="mb-12 text-center">
           <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Elite <span className="text-facebook-primary">Knowledge</span></h1>
           <p className="text-gray-400">Información privilegiada para escalar tus campañas.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {POSTS.map((post, index) => (
              <article 
                key={post.id} 
                className="reveal group bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden hover:border-facebook-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,136,204,0.15)] cursor-pointer"
                style={{ transitionDelay: `${index * 0.15}s` }}
                onClick={() => onSelectPost && onSelectPost(post)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 bg-facebook-primary text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-lg">{post.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2 font-mono">
                       <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                       <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    </div>
                    
                    {/* SLUG VISUALIZER */}
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-[10px] bg-white/5 text-facebook-primary/80 px-2 py-0.5 rounded border border-white/5 font-mono flex items-center gap-1">
                           <LinkIcon size={10} /> /{post.slug}
                        </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-facebook-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <button className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
                      Leer Artículo <ArrowRight size={16} className="text-facebook-primary" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="reveal w-full lg:w-80 space-y-8" style={{ transitionDelay: '0.4s' }}>
             <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5 shadow-lg">
                <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Categorías</h3>
                <div className="space-y-2">
                   {['Guías', 'Tutoriales', 'Análisis', 'Noticias', 'Casos de Estudio'].map(tag => (
                      <a key={tag} href="#" className="flex items-center justify-between text-sm text-gray-400 hover:text-facebook-primary hover:bg-white/5 px-3 py-2 rounded transition-colors group">
                        <span>{tag}</span>
                        <Tag size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                   ))}
                </div>
             </div>

             <div className="bg-gradient-to-br from-facebook-primary/20 to-facebook-dark/20 p-6 rounded-2xl border border-facebook-primary/20 text-center hover:scale-[1.02] transition-transform duration-300">
                <h3 className="font-bold text-white mb-2">¿Necesitas Ayuda?</h3>
                <p className="text-xs text-gray-300 mb-4">Agenda una auditoría con nuestro equipo experto.</p>
                <button className="w-full py-3 bg-white text-black font-bold text-xs uppercase rounded hover:bg-facebook-primary hover:text-white transition-colors shadow-lg">
                   Contactar Soporte
                </button>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};
