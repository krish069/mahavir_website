import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, ArrowRight, PlusCircle, ShieldCheck } from 'lucide-react';
import { Product, QuoteItem } from '../types';

interface QuickQuoteBuilderProps {
  products: Product[];
  onAddToQuote: (item: QuoteItem) => void;
  onOpenRfq: () => void;
}

export const QuickQuoteBuilder: React.FC<QuickQuoteBuilderProps> = ({
  products,
  onAddToQuote,
  onOpenRfq
}) => {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(100);
  const [selectedColor, setSelectedColor] = useState<string>(products[0]?.colors[0]?.name || 'Navy Blue');
  const [includeEmbroidery, setIncludeEmbroidery] = useState<boolean>(true);
  const [includeBackPrint, setIncludeBackPrint] = useState<boolean>(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const getTierPrice = (qty: number) => {
    if (!product) return 0;
    for (let i = product.priceTiers.length - 1; i >= 0; i--) {
      const tier = product.priceTiers[i];
      if (qty >= tier.minQty) {
        return tier.unitPrice;
      }
    }
    return product.priceTiers[0].unitPrice;
  };

  const unitBasePrice = getTierPrice(quantity);
  const embroideryCost = includeEmbroidery ? 35 : 0;
  const backPrintCost = includeBackPrint ? 55 : 0;
  const unitCustomizationSurcharge = embroideryCost + backPrintCost;
  const effectiveUnitCost = unitBasePrice + unitCustomizationSurcharge;
  const totalCost = effectiveUnitCost * quantity;

  const baseStartingPrice = product.priceTiers[0].unitPrice;
  const bulkSavings = Math.max(0, (baseStartingPrice - unitBasePrice) * quantity);

  const handleQuickAdd = () => {
    const s = Math.round(quantity * 0.15);
    const m = Math.round(quantity * 0.35);
    const l = Math.round(quantity * 0.35);
    const xl = Math.max(0, quantity - (s + m + l));

    const item: QuoteItem = {
      id: `calc-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      color: selectedColor,
      sizeBreakdown: { S: s, M: m, L: l, XL: xl, '2XL': 0, '3XL': 0 },
      totalQty: quantity,
      unitBasePrice,
      customizationTechnique: includeEmbroidery && includeBackPrint ? 'both' : includeEmbroidery ? 'embroidery' : includeBackPrint ? 'printing' : 'plain',
      placements: {
        leftChest: includeEmbroidery,
        rightChest: false,
        fullBack: includeBackPrint,
        leftSleeve: false,
        rightSleeve: false
      },
      customizationSurchargePerPiece: unitCustomizationSurcharge,
      subtotal: totalCost,
      hsnCode: product.hsnCode
    };

    onAddToQuote(item);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 2500);
  };

  return (
    <section id="quote-builder" className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  COMMERCIAL ESTIMATOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                  Calculate Instant Wholesale Order Rates
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                  Adjust order volume and logo options to see accurate factory pricing tiers and volume savings.
                </p>
              </div>

              {/* Product Pills / Buttons */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-2">
                  1. Uniform Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {products.slice(0, 6).map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setSelectedColor(p.colors[0]?.name || '');
                      }}
                      className={`p-2.5 text-left rounded-lg border text-xs transition-colors ${
                        selectedProductId === p.id
                          ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="block truncate font-bold text-white text-xs">{p.name}</span>
                      <span className="font-mono text-[10px] text-amber-400 block mt-0.5">HSN {p.hsnCode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selectors */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">
                    2. Order Quantity:
                  </label>
                  <span className="text-amber-400 font-mono font-bold text-sm">{quantity} Pieces</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {[50, 100, 250, 500, 1000].map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-colors ${
                        quantity === qty
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {qty} pcs
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Branding Checkboxes */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeEmbroidery}
                    onChange={(e) => setIncludeEmbroidery(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Chest Embroidery (+₹35/pc)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeBackPrint}
                    onChange={(e) => setIncludeBackPrint(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Back Screen Print (+₹55/pc)</span>
                </label>
              </div>

            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                  ESTIMATED BILL OF QUANTITIES
                </span>
                <h4 className="font-bold text-white text-base mb-3">{product.name}</h4>

                <div className="space-y-2 text-xs border-t border-slate-800 pt-3 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Factory Rate:</span>
                    <span className="text-white font-bold">₹{unitBasePrice}/pc</span>
                  </div>

                  {unitCustomizationSurcharge > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Customization:</span>
                      <span>+₹{unitCustomizationSurcharge}/pc</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Order Size:</span>
                    <span className="text-white font-bold">{quantity} Pcs</span>
                  </div>

                  {bulkSavings > 0 && (
                    <div className="p-2 bg-emerald-950 border border-emerald-500/40 rounded text-emerald-300 text-xs flex justify-between font-bold">
                      <span>Tier Savings:</span>
                      <span>₹{bulkSavings.toLocaleString('en-IN')} Saved</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Estimated Taxable:</span>
                      <span className="text-2xl font-bold text-amber-400">
                        ₹{totalCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans">+ 5% GST on Invoice</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Lot to Pro-Forma Invoice
                </button>

                {successNotice && (
                  <div className="p-2 bg-emerald-900 border border-emerald-500 text-emerald-200 text-xs rounded text-center font-bold">
                    Added to your wholesale RFQ list!
                  </div>
                )}

                <button
                  type="button"
                  onClick={onOpenRfq}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Pro-Forma Tax Invoice Modal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
