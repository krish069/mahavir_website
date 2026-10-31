import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, FileText, CheckCircle2, Sparkles, Factory, ShieldCheck, Users } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface HeroProps {
  onOpenRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq }) => {
  const modelShowcases = [
    {
      id: 'ind',
      category: 'PLANT & INDUSTRIAL WORKWEAR',
      role: 'Heavy Mechanical & Tooling Coveralls',
      modelSubtitle: 'Worn by plant technicians and shop-floor engineers across Maharashtra’s automotive & stamping units.',
      image: '/src/assets/images/model_industrial_boilersuit_1793444001730.jpg',
      badge: '280 GSM Sanforized Cotton Drill',
      price: '₹620–₹780 / pc',
      details: '14 bar-tacks · Concealed brass 2-way zipper · Action-pleat back'
    },
    {
      id: 'corp',
      category: 'CORPORATE & TECH EXECUTIVE',
      role: 'Bio-Wash Combed Cotton Pique Polos',
      modelSubtitle: 'Worn by client-facing engineering heads, tech campus teams, and corporate staff in air-conditioned environments.',
      image: '/src/assets/images/model_corporate_polo_1793444004339.jpg',
      badge: '240 GSM Bio-Wash Pique',
      price: '₹260–₹380 / pc',
      details: 'Zero lint balling · Anti-curl knitted collar · Dense chest embroidery'
    },
    {
      id: 'hivis',
      category: 'CERTIFIED INFRASTRUCTURE SAFETY',
      role: 'EN ISO 20471 Class 3 Reflective Parkas',
      modelSubtitle: 'Worn by highway project managers, construction supervisors, and airport ground crews for maximum 360° visibility.',
      image: '/src/assets/images/model_hivis_safety_1793444005478.jpg',
      badge: '3M Scotchlite 8910 Silver Reflex',
      price: '₹110–₹1,150 / pc',
      details: '8,000mm Hydrostatic PU Waterproofing · Mic loops · Radio tabs'
    },
    {
      id: 'sec',
      category: 'SECURITY CADRE UNIFORMS',
      role: 'Structured Epaulette Guard Uniform Sets',
      modelSubtitle: 'Worn by professional facility protection forces, corporate security officers, and industrial watchmen.',
      image: '/src/assets/images/model_security_uniform_1793444004858.jpg',
      badge: 'High-Twist Worsted Suiting',
      price: '₹660–₹850 / pc',
      details: 'Reinforced shoulder epaulettes · Heavy duty belt loops · Permanent crease'
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const current = modelShowcases[activeTab];

  return (
    <section id="top" className="relative bg-[#FBFBF9] text-slate-900 border-b border-slate-200 overflow-hidden">
      
      {/* Editorial Watermark / Subtle Texture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:py-20 relative z-10">
        
        {/* Heritage Trust Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-100/80 border border-amber-300 text-amber-900 font-mono font-bold text-[11px] rounded">
              MAHARASHTRA MILL EST. {COMPANY_INFO.since}
            </span>
            <span className="text-slate-600 font-medium hidden sm:inline">
              Pimpri-Chinchwad / Pune Industrial Hub · Direct Wholesale Dispatch
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-600">
            <span>GSTIN: <strong className="text-slate-900">{COMPANY_INFO.gstin}</strong></span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span className="text-amber-800 font-bold">100% DIRECT FACTORY PRICING</span>
          </div>
        </div>

        {/* Hero Top Lead-In: Large Team Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          
          {/* Left: Strong Architectural Typography */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-800 uppercase">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>THE ARCHITECTURE OF WORKWEAR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-950 font-heading leading-[1.12]">
              Uniforms Crafted for the People Who Power{' '}
              <span className="font-serif-couture italic text-amber-800 font-normal">Modern Industry.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
              From heavy-gauge cotton drill boilersuits on factory shop-floors to executive bio-wash polos in corporate boardrooms. Mahavir Corporation supplies direct-to-enterprise bulk workwear with in-house Tajima multi-needle embroidery and tax-compliant B2B invoicing.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Minimum Order</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">50 Pieces</span>
                <span className="text-[10px] text-slate-500">Pure wholesale lots</span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">In-House Branding</span>
                <span className="text-base font-bold text-amber-800 font-mono mt-0.5 block truncate">Tajima 12-Head</span>
                <span className="text-[10px] text-slate-500">Fade-proof thread</span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Production Flow</span>
                <span className="text-base font-bold text-emerald-800 font-mono mt-0.5 block">7–10 Days</span>
                <span className="text-[10px] text-slate-500">Fast Pan-India delivery</span>
              </div>
            </div>

            {/* Clear Primary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore Uniform Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenRfq}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Instant Pro-Forma Tax Invoice</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-xl border border-slate-300 transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Right: Real Team Commercial Banner Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <img
                src="/src/assets/images/model_hero_workwear_team_1793444002411.jpg"
                alt="Diverse Team of Professionals Wearing Mahavir Corporation Uniforms"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Industrial & Corporate Workwear Collection</span>
                  <span className="text-slate-500 text-[11px]">Real workforce uniforms photographed on site</span>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[10px] font-bold rounded">
                  2026/27 Catalog
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Interactive Model Inspector */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold block">
                INTERACTIVE WEARER SHOWCASE
              </span>
              <h3 className="text-xl font-bold text-slate-950 font-heading">
                See How Our Garments Fit on Real Professionals
              </h3>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {modelShowcases.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {item.category.split(' ')[0]} {item.category.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

          {/* Model Card Stage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.role}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold rounded">
                {current.badge}
              </div>

              <h4 className="text-2xl font-bold text-slate-950 font-heading">
                {current.role}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {current.modelSubtitle}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 flex justify-between items-center">
                <span>{current.details}</span>
                <span className="font-bold text-amber-800 text-sm">{current.price}</span>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="#catalog"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Order Lot in Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#customizer"
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-lg border border-slate-300 transition-colors"
                >
                  <span>Test Logo on this Model</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
