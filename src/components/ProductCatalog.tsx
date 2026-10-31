import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutGrid, Table, Sparkles, Plus, MessageSquare, Check, ArrowRight, Shield } from 'lucide-react';
import { Product, SectorType } from '../types';
import { COMPANY_INFO } from '../data/products';

interface ProductCatalogProps {
  products: Product[];
  onSelectForCustomizer: (product: Product) => void;
  onQuickAddToQuote: (product: Product, qty?: number) => void;
  onOpenRfq: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25 }
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectForCustomizer,
  onQuickAddToQuote,
  onOpenRfq
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const sectors: SectorType[] = ['All', 'Industrial', 'Corporate', 'High-Vis Safety', 'Security & Facility'];

  const filteredProducts = products.filter(p => {
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hsnCode.includes(searchQuery);
    return matchesSector && matchesSearch;
  });

  const handleAddQuick = (product: Product) => {
    onQuickAddToQuote(product, 50);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 2500);
  };

  const handleProductWhatsApp = (product: Product) => {
    const text = `Hello Mahavir Corporation, I am inquiring about wholesale pricing for *${product.name}* (Fabric: ${product.fabric}, GSM: ${product.gsm}, HSN: ${product.hsnCode}). Please share available color swatches and formal quote.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="catalog" className="py-20 bg-[#FBFBF9] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 mb-8"
        >
          <div>
            <div className="text-xs font-mono font-bold uppercase text-amber-700 tracking-wider mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              SECTION 01 / WHOLESALE SPECIFICATION LEDGER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Uniform & Workwear Catalog
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Manufactured to rigorous industrial endurance standards. Explore pre-shrunk cotton drill coveralls, executive bio-wash polos, and EN ISO 20471 safety parkas.
            </p>
          </div>

          {/* View Mode Toggle (Grid Cards vs Trade Table) */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs text-slate-500 font-medium mr-1 hidden sm:inline">Presentation:</span>
            <div className="flex border border-slate-300 rounded-lg p-0.5 bg-slate-100 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card Ledger</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Trade Table</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sector Tabs & Search Toolbar with Stagger Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10"
        >
          {/* Sector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {sectors.map(sector => (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  selectedSector === sector
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by boilersuit, GSM, twill, HSN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 font-medium transition-shadow shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* VIEW 1: Framer Motion Grid Cards View */}
        {viewMode === 'grid' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => {
                return (
                  <motion.article
                    key={product.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Slot with subtle hover zoom */}
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          HSN {product.hsnCode}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                          {product.fabric}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>{product.sector}</span>
                          <span className="text-slate-400">{product.gsm} GSM</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Technical Spec List */}
                        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-sans">Minimum Order Lot:</span>
                            <span className="font-bold text-slate-900">{product.baseMoq} Pcs MOQ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-sans">Sizes Available:</span>
                            <span className="font-bold text-slate-900">{product.sizes.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-sans">Dispatch Timeline:</span>
                            <span className="font-bold text-slate-900">{product.leadTimeDays} Working Days</span>
                          </div>
                        </div>

                        {/* Wholesale Tiered Rate Schedule */}
                        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                          <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5 mb-2">
                            <span>Lot Volume</span>
                            <span>Factory Direct Unit Rate</span>
                          </div>
                          <div className="space-y-1 text-xs">
                            {product.priceTiers.map((tier, idx) => (
                              <div key={idx} className="flex justify-between items-center text-slate-700">
                                <span className="font-medium text-[11px]">
                                  {tier.maxQty ? `${tier.minQty}–${tier.maxQty} pcs` : `${tier.minQty}+ pcs (Bulk Lot)`}
                                </span>
                                <span className="font-mono font-bold text-slate-950">
                                  ₹{tier.unitPrice} <span className="text-[10px] font-normal text-slate-400">/pc</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 sm:p-6 pt-0">
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleAddQuick(product)}
                          className={`py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                            justAddedId === product.id
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-950 hover:bg-slate-800 text-white active:scale-95'
                          }`}
                        >
                          {justAddedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Quote</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add 50 pcs Lot</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectForCustomizer(product);
                            document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Logo Studio</span>
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                        <button
                          type="button"
                          onClick={() => setActiveProductModal(product)}
                          className="hover:text-slate-900 font-semibold underline underline-offset-2 cursor-pointer"
                        >
                          Tech Specs & Wash Care
                        </button>

                        <button
                          type="button"
                          onClick={() => handleProductWhatsApp(product)}
                          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp Quote</span>
                        </button>
                      </div>
                    </div>

                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* VIEW 2: Wholesale Trade Table Ledger with Stagger Animation */}
        {viewMode === 'table' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white font-mono uppercase text-[11px] tracking-wider">
                    <th className="py-3.5 px-4">HSN</th>
                    <th className="py-3.5 px-4">Uniform Model & Description</th>
                    <th className="py-3.5 px-4">Fabric & GSM</th>
                    <th className="py-3.5 px-4 text-center">MOQ</th>
                    <th className="py-3.5 px-4 text-right">50 Pcs Rate</th>
                    <th className="py-3.5 px-4 text-right">100 Pcs Rate</th>
                    <th className="py-3.5 px-4 text-right">500+ Pcs Rate</th>
                    <th className="py-3.5 px-4 text-center">Quick Action</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-slate-200"
                >
                  {filteredProducts.map(p => {
                    const r50 = p.priceTiers[0]?.unitPrice;
                    const r100 = p.priceTiers[1]?.unitPrice || r50;
                    const r500 = p.priceTiers[p.priceTiers.length - 1]?.unitPrice;

                    return (
                      <motion.tr
                        key={p.id}
                        variants={tableRowVariants}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{p.hsnCode}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-950 block text-sm">{p.name}</span>
                          <span className="text-[11px] text-slate-500">{p.sector} · Lead Time: {p.leadTimeDays} days</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800 block">{p.fabric}</span>
                          <span className="font-mono text-slate-500">{p.gsm} GSM</span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">{p.baseMoq} pcs</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">₹{r50}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-700">₹{r100}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">₹{r500}</td>
                        <td className="py-3.5 px-4 text-center space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleAddQuick(p)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded transition-colors cursor-pointer"
                          >
                            + Add to Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectForCustomizer(p);
                              document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded transition-colors cursor-pointer"
                          >
                            Logo Studio
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Modal for In-Depth Technical Specifications */}
        {activeProductModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-slate-300 max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-200 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-800 uppercase block">
                    Technical Workwear Spec Sheet · HSN {activeProductModal.hsnCode}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-950 mt-0.5">{activeProductModal.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProductModal(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-mono p-1 cursor-pointer"
                >
                  [CLOSE ✕]
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <img
                  src={activeProductModal.image}
                  alt={activeProductModal.name}
                  className="w-full h-44 object-cover rounded-xl border border-slate-200"
                />
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-mono">FABRIC WEAVE & GSM</span>
                    <strong className="text-slate-900 text-sm">{activeProductModal.fabric} ({activeProductModal.gsm} GSM)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">SEAM REINFORCEMENTS</span>
                    <span className="text-slate-700">Bar-tacked stress points & double-needle felled seams</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">WASH CARE & SHRINKAGE</span>
                    <span className="text-slate-700">60°C Industrial wash tested; pre-shrunk &lt; 1.5%</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase text-slate-500 block mb-2">Technical Features:</span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                  {activeProductModal.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAddQuick(activeProductModal);
                    setActiveProductModal(null);
                  }}
                  className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  Add 50 Pcs to Quote
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};
