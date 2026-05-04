import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  priority?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, priority = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group cursor-pointer perspective-2000 ${priority ? 'md:col-span-2 lg:col-span-3' : ''}`}
      onClick={() => onClick(article)}
    >
      <div className="paper-lift preserve-3d p-6 bg-white border border-slate-200 shadow-sm flex flex-col space-y-5">
        <div className="relative overflow-hidden aspect-[16/9] bg-slate-100 transform translate-z-10 shadow-lg ring-1 ring-black/5">
          <motion.img 
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-slate-900 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/10 shadow-lg">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-4 transform translate-z-30">
          <div className="flex justify-between items-start gap-4">
            <h3 className={`font-display leading-[1] text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight ${priority ? 'text-4xl md:text-6xl' : 'text-xl md:text-2xl'}`}>
              {article.title}
            </h3>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-sm transform group-hover:translate-z-20 group-hover:bg-white group-hover:shadow-md transition-all">
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-900" />
            </div>
          </div>
          <p className="text-slate-600 line-clamp-3 text-sm md:text-base leading-relaxed font-body transform translate-z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            {article.excerpt}
          </p>
          <div className="pt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-t border-slate-200">
            <span className="text-slate-900 underline decoration-blue-500/30 underline-offset-4">By {article.author}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
