/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Search, Globe, TrendingUp, Calendar, 
  ArrowRight, Share2, Bookmark, Clock, Newspaper, Shield, Zap, Compass
} from 'lucide-react';
import AIChat from './components/AIChat';
import ArticleCard from './components/ArticleCard';
import { Article, Category } from './types';

const ARTICLES: Article[] = [
  {
    id: 'india-1',
    title: 'India-ASEAN Summit: Redefining Maritime Security and Digital Cooperation',
    excerpt: 'Prime Minister outlines a new "Digital Bridge" initiative to link South Asian startups with Southeast Asian markets.',
    content: `In a landmark summit today, India proposed a comprehensive maritime security framework for the Indo-Pacific. The "Act East" policy has evolved into a robust economic partnership, with digital infrastructure at its core.\n\nThe Prime Minister emphasized that "digital sovereignty is the cornerstone of 21st-century diplomacy." Plans for a shared payments interface across ASEAN nations using India's Unified Payments Interface (UPI) technology are already in advanced stages of negotiation.`,
    author: 'Rajesh Kumar',
    category: 'India',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2000&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'india-2',
    title: 'ISRO Unveils Plans for "Shukrayaan": The Indian Mission to Venus',
    excerpt: 'The Indian Space Research Organisation has finalized its orbiter mission to explore the mysteries of the Venusian atmosphere.',
    content: 'Following the success of Mangalyaan and Chandrayaan-3, ISRO is now setting its sights on Earth\'s "evil twin." The Shukrayaan mission will carry high-resolution synthetic aperture radar to map the surface of Venus through its dense clouds.\n\n"We are looking for volcanic activity and chemical markers in the upper atmosphere that could hint at microbial life," said the ISRO Chairperson.',
    author: 'Sita Ramakrishnan',
    category: 'Science',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-3',
    title: 'Mumbai\'s Trans-Harbour Link: A New Era for Urban Infrastructure',
    excerpt: 'The completion of India\'s longest sea bridge is transforming the real estate and logistics landscape of the MMR.',
    content: 'The Mumbai Trans-Harbour Link (MTHL) is now fully operational, cutting travel time between South Mumbai and Navi Mumbai from two hours to just 20 minutes. This 22km engineering marvel is expected to boost GDP growth in the region by 1.5% annually.',
    author: 'Amitabh Shah',
    category: 'Economy',
    date: 'May 3, 2026',
    image: 'https://images.unsplash.com/photo-1566552881560-0be13e8dc060?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-4',
    title: 'Renewable Surge: India Surpasses 200GW Capacity Milestone',
    excerpt: 'Solar and wind projects in Gujarat and Rajasthan lead the charge as the nation pivots toward a green economy.',
    content: 'India has officially crossed the 200GW mark in installed renewable energy capacity. The Khavda Renewable Energy Park in Gujarat is now the world\'s largest single-location project, contributing significantly to this achievement.',
    author: 'Priya Verma',
    category: 'Environment',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-5',
    title: 'The Tech Boom: Bangalore Emerges as Global AI R&D Hub',
    excerpt: 'From chip design to generative models, the Silicon Valley of India is shifting from services to deep-tech products.',
    content: 'Bangalore is no longer just the world\'s back office. Major tech giants and homegrown startups are building specialized AI models for Indian languages and agricultural predictive analytics.',
    author: 'Vikram Rao',
    category: 'Tech',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1596495573105-d14658fb10f1?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-6',
    title: 'Cricket Transformation: New Player Development Model Unveiled',
    excerpt: 'BCCI announces a grassroots initiative to integrate data analytics into local club championships.',
    content: 'The "Cricket Next" project aims to track player performance from the age of 12 using wearable sensors and video analysis. This data-driven approach is set to revolutionize talent scouting in the country.',
    author: 'Sunil Gavaskar Jr.',
    category: 'Sports',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-7',
    title: 'Reviving Silk: The Digital Artisans of Varanasi',
    excerpt: 'Traditional weavers are using blockchain to verify the authenticity of Banarasi silk for the global market.',
    content: 'Varanasi weavers are blending ancient craft with modern technology. By embedding NFC tags in high-end sarees, they are fighting counterfeits and ensuring fair prices in international luxury houses.',
    author: 'Ananya Deshmukh',
    category: 'Culture',
    date: 'May 2, 2026',
    image: 'https://images.unsplash.com/photo-1582236166437-db4a54c9359e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-9',
    title: 'Coalition Dynamics: The Future of Federalism in Indian Politics',
    excerpt: 'As regional parties gain momentum, the balance of power between Centre and States enters a complex negotiation phase.',
    content: 'Political analysts are closely watching the shifting alliances in the upcoming state elections. The emergence of a "Third Front" focused on regional autonomy is challenging the traditional bipolarity of Indian politics.',
    author: 'Sanjay Baru',
    category: 'Politics',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1590483734724-383b85ad92e0?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-10',
    title: 'The Great Himalayan Thaw: Urgent Climate Action Required',
    excerpt: 'Glacial retreat in the Ladakh region is threatening water security for millions downstream.',
    content: 'Satellite imagery confirms that the Siachen glacier is thinning at an unprecedented rate. Experts are calling for a cross-border ecological pact to manage the shared water resources of the Indus basin.',
    author: 'Sonam Wangchuk',
    category: 'Environment',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1544621280-42f397ca4a44?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-11',
    title: 'Cinema Beyond Borders: The Global Ascent of Indian Regional Films',
    excerpt: 'South Indian film industries are outpacing Bollywood in production value and international box office revenue.',
    content: 'The "Pan-India" film phenomenon, spearheaded by directors from Tollywood and Mollywood, is redefining Indian cinema\'s global brand. High-budget epics are finding audiences from Japan to Latin America.',
    author: 'Anupama Chopra',
    category: 'Entertainment',
    date: 'May 3, 2026',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-14',
    title: 'Startup Surge: The Rise of Tier-2 and Tier-3 Innovation Hubs',
    excerpt: 'Cities like Pune, Jaipur, and Indore are becoming the new engines of India\'s product-tech ecosystem.',
    content: 'The democratization of capital and digital talent is driving a shift away from metropolitan saturation. Innovative solutions for agriculture and rural fintech are emerging from the heartland of India.',
    author: 'Kunal Bahl',
    category: 'Economy',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-15',
    title: 'The Great Indian Kitchen: Reimagining Culinary Tradition in a Globalized Era',
    excerpt: 'Modern chefs are using molecular gastronomy to reinterpret regional flavors from Kerala to Nagaland.',
    content: 'The culinary world is witnessing an Indian renaissance. By applying scientific techniques to ancestral recipes, chefs are bringing forgotten indigenous ingredients to the global fine-dining table.',
    author: 'Vikas Khanna',
    category: 'Culture',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-16',
    title: 'Pharma Precision: India\'s Biotechs Lead in Affordable Rare-Disease Treatments',
    excerpt: 'Local research firms are developing generic versions of life-saving orphan drugs at a fraction of global costs.',
    content: 'India\'s reputation as the "pharmacy of the world" is evolving into a biotechnology powerhouse. Recent breakthroughs in gene therapy for hematological disorders are making treatment accessible to thousands in developing nations.',
    author: 'Dr. Kiran Mazumdar-Shaw',
    category: 'Science',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-17',
    title: 'E-Sports Arena: India\'s Newest Professional Frontier',
    excerpt: 'Competitive gaming officially recognized as a sport, paving the way for multi-million dollar investments.',
    content: 'With a massive youth population and affordable high-speed internet, India has become the world\'s fastest-growing E-sports market. Tournament viewership is now rivaling traditional cricket leagues in the 16-24 demographic.',
    author: 'Naman Mathur',
    category: 'Sports',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-12',
    title: 'The "India Stack": Exporting Digital Governance to the Global South',
    excerpt: 'Nations across Africa and Latin America are adopting India\'s open-source modular digital ID and payment systems.',
    content: 'The "Modular Open Source Identity Platform" (MOSIP), developed in India, is becoming the foundation for national ID systems in several emerging economies, showcasing India\'s soft power in technology.',
    author: 'Nandan Nilekani',
    category: 'World',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-13',
    title: 'Opinion: Why India\'s Demographic Dividend Needs a Massive Skill Pivot Now',
    excerpt: 'With more than 50% of the population under 25, the window of opportunity is narrow but transformative.',
    content: 'To avoid a demographic disaster, we must transition from degree-based education to competency-based apprenticeship models. The future of the Indian economy rests on the hands of its skilled technicians.',
    author: 'Raghuram Rajan',
    category: 'Opinion',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-9',
    title: 'Coalition Dynamics: The Future of Federalism in Indian Politics',
    excerpt: 'As regional parties gain momentum, the balance of power between Centre and States enters a complex negotiation phase.',
    content: 'Political analysts are closely watching the shifting alliances in the upcoming state elections. The emergence of a "Third Front" focused on regional autonomy is challenging the traditional bipolarity of Indian politics.',
    author: 'Sanjay Baru',
    category: 'Politics',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fc100a801?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-10',
    title: 'Sensex Hits New Peak: Market Resilience Amid Global Headwinds',
    excerpt: 'Domestic institutional investors lead a massive rally as Indian indices outperform global peers for the fourth consecutive quarter.',
    content: 'The Indian equity markets continue to defy global inflationary trends. Analysts point to strong domestic demand and a surge in retail participation as the primary drivers of this sustained growth.',
    author: 'Uday Kotak',
    category: 'Economy',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1611974714014-489937183ca0?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-11',
    title: 'Olympic Aspirations: India\'s 2036 Bid Gains International Momentum',
    excerpt: 'The Ministry of Sports finalizes a multi-city infrastructure plan to host the world\'s largest sporting event.',
    content: 'From state-of-the-art aquatic centers to optimized public transit, India\'s roadmap for the 2036 Olympic bid is being praised for its focus on long-term urban legacy.',
    author: 'Abhinav Bindra',
    category: 'Sports',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-18',
    title: 'Ayurveda in the Age of AI: Personalizing Traditional Wellness',
    excerpt: 'Digital health platforms are using machine learning to tailor ancient wisdom to modern metabolic profiles.',
    content: 'The convergence of traditional Indian medicine and modern data science is creating a new paradigm for preventative health. Startups are building diagnostic tools that map Ayurvedic prakriti to genomic indicators.',
    author: 'Dr. Pratap Chauhan',
    category: 'Health',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fc100a801?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'india-19',
    title: 'The Slow Movement: How Urban Indians are Reclaiming Mindfulness',
    excerpt: 'From digital detox retreats to sustainable fashion, a new lifestyle trend is taking root in India\'s bustling metros.',
    content: 'As burnout rates soar in corporate India, many are turning to "slow living." This movement emphasizes quality over quantity, fostering community-driven initiatives like urban gardening and heritage walking tours.',
    author: 'Shefalee Vasudev',
    category: 'Lifestyle',
    date: 'May 4, 2026',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop'
  }
];

const CATEGORIES: Category[] = [
  'India', 'World', 'Politics', 'Economy', 'Tech', 
  'Science', 'Culture', 'Opinion', 'Sports', 
  'Entertainment', 'Education', 'Environment',
  'Health', 'Lifestyle'
];

const App: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const mainRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredArticles = activeCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  const featuredArticle = ARTICLES.find(a => a.featured);
  const normalArticles = filteredArticles.filter(a => !a.featured || activeCategory !== 'All');

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col selection:bg-blue-100 selection:text-blue-900 italic-none overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] perspective-1000">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center py-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-sans"><Calendar size={12} className="text-blue-600" /> {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="hidden md:inline flex items-center gap-1 font-sans"><Clock size={12} className="text-blue-600" /> {currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Sign In</button>
              <button className="btn-3d-dark">Subscribe</button>
            </div>
          </div>

          {/* Main Nav */}
          <div className="flex justify-between items-center pb-6 md:pb-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-lg md:hidden shadow-sm"
            >
              <Menu size={24} />
            </button>

            <div className="flex flex-col items-center flex-1 md:flex-initial perspective-1000">
              <motion.h1 
                whileHover={{ rotateX: 8, rotateY: -8, scale: 1.03, z: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="font-display text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter text-slate-900 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] relative cursor-default select-none preserve-3d"
              >
                The Times Newsday
                <span className="absolute -top-6 -right-16 hidden lg:block text-[11px] bg-red-600 text-white px-3 py-1 transform rotate-12 shadow-[4px_4px_10px_rgba(220,38,38,0.4)] font-sans font-black z-20">EST. 2026</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] md:text-sm font-black tracking-[0.6em] uppercase text-slate-900 mt-2 mb-3 bg-white px-6 py-1.5 border-x-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] transform -skew-x-12"
              >
                English Daily Newspaper
              </motion.div>
              <div className="flex items-center gap-8 w-full max-w-2xl">
                <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-slate-900" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-500 whitespace-nowrap font-sans">
                   Veritas . Integritas . Objectivitas
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-slate-300 to-slate-900" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search archive..." 
                  className="pl-12 pr-6 py-3 bg-slate-100 rounded-sm text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48 lg:w-72 transition-all border border-transparent focus:bg-white focus:shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="relative pt-2">
            <nav className="flex items-center justify-start md:justify-center gap-4 md:gap-6 pb-6 overflow-x-auto no-scrollbar px-2">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 transition-all whitespace-nowrap border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-95 ${activeCategory === 'All' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
              >
                Front Page
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 transition-all whitespace-nowrap border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-95 ${activeCategory === cat ? 'bg-blue-700 text-white border-blue-700 shadow-[4px_4px_0px_rgba(29,78,216,0.3)]' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Breaking Ticker */}
      <div className="bg-slate-900 text-white py-4 overflow-hidden whitespace-nowrap border-b-8 border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)] relative z-20 perspective-1000">
        <div className="flex animate-ticker px-6 gap-16 items-center preserve-3d">
          {[1,2,3].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.25em] border-r-2 border-white/5 pr-16 last:border-0 transform translate-z-10">
                <span className="flex items-center gap-3 text-red-500">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]" />
                  LIVE
                </span>
                Sensex Jumps 800 Points Amid Positive Global Cues
              </span>
              <span className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.25em] border-r-2 border-white/5 pr-16 last:border-0 transform translate-z-10">
                <Shield size={20} className="text-blue-400" />
                DIPLOMACY: QUAD Leaders Confirm Presence at New Delhi Strategic Forum
              </span>
              <span className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.25em] border-r-2 border-white/5 pr-16 last:border-0 transform translate-z-10">
                <Zap size={20} className="text-yellow-400" />
                TECH: India\'s First Quantum Research Hub to Open in Hyderabad
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <main 
        ref={mainRef}
        className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 perspective-2000"
      >
        <motion.div 
          style={{ rotateX, scale }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 preserve-3d"
        >
          {/* Featured Article Section */}
          {activeCategory === 'All' && featuredArticle && (
            <ArticleCard 
              article={featuredArticle} 
              priority={true} 
              onClick={setSelectedArticle}
            />
          )}

          {/* Normal Articles */}
          {normalArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.05 }}
            >
              <ArticleCard 
                article={article} 
                onClick={setSelectedArticle}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {normalArticles.length === 0 && !featuredArticle && (
          <div className="text-center py-32 perspective-1000">
            <motion.div
              initial={{ rotateY: 45, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              className="preserve-3d"
            >
              <div className="bg-white p-12 inline-block border-2 border-slate-100 shadow-[20px_20px_40px_rgba(0,0,0,0.05)] transform rotate-x-6">
                <Newspaper size={80} className="mx-auto text-slate-200 mb-8 transform translate-z-20" />
                <p className="text-slate-900 font-display text-4xl mb-4 transform translate-z-30">Archive Empty</p>
                <p className="text-slate-400 font-body text-lg italic transform translate-z-10">No stories found in the {activeCategory} category.</p>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white pt-24 pb-12 mt-auto border-t-8 border-slate-800 perspective-1000">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-24">
            <div className="md:col-span-2">
              <h2 className="font-display text-4xl font-black italic mb-8 tracking-tighter">The Times Newsday</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-body">
                Redefining precision and integrity in global journalism. Our mission is to illuminate the stories that shape our world with unyielding commitment to the truth.
              </p>
              <div className="flex gap-4">
                {['FB', 'TW', 'IG', 'LN'].map(s => (
                  <button key={s} className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs hover:bg-blue-600 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">{s}</button>
                ))}
              </div>
            </div>
            {['Sections', 'The Paper', 'Legal'].map((title, idx) => (
              <div key={idx}>
                <h4 className="font-black text-[11px] uppercase tracking-[0.3em] mb-10 text-slate-500 border-b border-white/10 pb-4">{title}</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-sans font-bold">
                  {idx === 0 && CATEGORIES.slice(0, 6).map(c => <li key={c}><button onClick={() => setActiveCategory(c)} className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> {c}</button></li>)}
                  {idx === 1 && ['Archives', 'Sitemap', 'Work with Us', 'Contact', 'Ethics Policy'].map(i => <li key={i}><a href="#" className="hover:text-white transition-colors">{i}</a></li>)}
                  {idx === 2 && ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Ad Choices', 'Accessibility'].map(i => <li key={i}><a href="#" className="hover:text-white transition-colors">{i}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">
            <p className="flex items-center gap-2"><Shield size={14} className="text-slate-800" /> © 2026 The Times Newsday Publishing Group. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Digital Edition</a>
              <a href="#" className="hover:text-white transition-colors">Editorial Board</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Compass size={14} /> New Delhi Hub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xl flex items-start justify-center p-4 md:p-12 perspective-2000">
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, rotateX: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="bg-white w-full max-w-6xl shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden my-auto preserve-3d border border-white/20"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-8 right-8 z-50 p-3 bg-slate-900 text-white rounded-full hover:scale-110 transition-all shadow-[8px_8px_20px_rgba(0,0,0,0.4)] active:shadow-none translate-z-50"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row min-h-[80vh]">
                <div className="lg:w-1/2 relative overflow-hidden bg-slate-100">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover lg:absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden lg:block" />
                  <div className="absolute bottom-12 left-12 right-12 hidden lg:block">
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 shadow-xl mb-6 inline-block">
                      {selectedArticle.category}
                    </span>
                    <h3 className="text-white font-display text-4xl font-black leading-tight drop-shadow-md">
                      Live Reporting from the Frontier
                    </h3>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto max-h-[80vh] bg-white custom-scrollbar preserve-3d">
                  <div className="mb-16 transform translate-z-10">
                    <div className="flex items-center gap-6 mb-10">
                      <span className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2 shadow-lg">
                        Special Report
                      </span>
                      <div className="h-[2px] flex-1 bg-slate-100" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.9] text-slate-900 mb-12 tracking-tighter drop-shadow-sm transform translate-z-20">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y-2 border-slate-900 py-10 gap-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border-2 border-slate-100 shadow-inner group overflow-hidden">
                          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                            <Newspaper size={32} />
                          </motion.div>
                        </div>
                        <div>
                          <p className="font-display text-2xl text-slate-900 font-bold uppercase tracking-tight">By {selectedArticle.author}</p>
                          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black flex items-center gap-2 mt-1">
                            <Calendar size={14} className="text-blue-500" /> {selectedArticle.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="btn-3d flex items-center gap-2"><Bookmark size={18} /> Save</button>
                         <button className="btn-3d-dark flex items-center gap-2"><Share2 size={18} /> Share</button>
                      </div>
                    </div>
                  </div>

                  <div className="editorial-drop-cap text-slate-800 text-xl md:text-2xl leading-relaxed space-y-10 font-body transform translate-z-10">
                    {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                    <div className="relative py-16 my-16 border-y-4 border-double border-slate-100 bg-slate-50/50 px-8">
                      <span className="absolute -top-6 left-12 bg-white px-6 text-slate-200 font-display text-6xl shadow-sm">"</span>
                      <p className="italic text-slate-900 text-center text-3xl font-serif max-w-2xl mx-auto leading-tight">
                        Journalism is the first rough draft of history. It is our duty to ensure every stroke is etched with precision and absolute truth.
                      </p>
                      <span className="absolute -bottom-10 right-12 bg-white px-6 text-slate-200 font-display text-6xl shadow-sm">"</span>
                    </div>
                    <div className="pt-12 flex flex-wrap gap-4">
                      {['Editorial', 'Analysis', 'Indo-Pacific', 'Strategy'].map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-4 py-2 border border-slate-200"># {tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '-100%', skewX: 10 }}
              animate={{ x: 0, skewX: 0 }}
              exit={{ x: '-100%', skewX: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[85vw] bg-white shadow-[50px_0_100px_rgba(0,0,0,0.3)] p-10 overflow-y-auto flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="font-display text-4xl font-black italic tracking-tighter">The Paper</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-slate-900 text-white rounded-full shadow-lg"
                ><X size={20} /></button>
              </div>
              <nav className="space-y-8 flex-1">
                <button 
                  onClick={() => { setActiveCategory('All'); setIsMenuOpen(false); }}
                  className={`block text-4xl font-display font-black tracking-tight text-left transition-all ${activeCategory === 'All' ? 'text-blue-700 translate-x-4' : 'text-slate-900 hover:translate-x-2'}`}
                >
                  Latest News
                </button>
                <div className="grid grid-cols-1 gap-6 pt-8 border-t border-slate-100">
                  {CATEGORIES.map(c => (
                    <button 
                      key={c}
                      onClick={() => { setActiveCategory(c); setIsMenuOpen(false); }}
                      className={`block text-2xl font-serif italic text-slate-900 font-bold text-left transition-all ${activeCategory === c ? 'text-blue-600 translate-x-4' : 'hover:translate-x-2'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </nav>
              <div className="mt-16 pt-12 border-t-4 border-slate-900 space-y-6">
                <button className="w-full bg-slate-900 text-white py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all">Subscribe Now</button>
                <button className="w-full border-2 border-slate-900 text-slate-900 py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all">Member Login</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AIChat />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 45s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;
