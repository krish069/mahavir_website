import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Check, ShieldCheck, Sparkles, PlusCircle, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { Product, QuoteItem, CustomizationTechnique, LogoPlacementConfig } from '../types';

interface UniformCustomizerProps {
  products: Product[];
  onAddToQuote: (quoteItem: QuoteItem) => void;
  onOpenRfq: () => void;
}

export const UniformCustomizer: React.FC<UniformCustomizerProps> = ({
  products,
  onAddToQuote,
  onOpenRfq
}) => {
  const customizableProducts = products.filter(p => p.supportsEmbroidery || p.supportsPrinting);
  const [selectedProduct, setSelectedProduct] = useState<Product>(customizableProducts[0] || products[0]);
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct.colors[0]?.name || 'Navy Blue');
  const [technique, setTechnique] = useState<CustomizationTechnique>('embroidery');
  const [threadColor, setThreadColor] = useState<string>('#F59E0B'); // Safety Gold
  const [threadName, setThreadName] = useState<string>('Madeira #1988 Industrial Gold');

  const [placements, setPlacements] = useState<LogoPlacementConfig>({
    leftChest: true,
    rightChest: false,
    fullBack: false,
    leftSleeve: false,
    rightSleeve: false
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('Company_Emblem_Vector.svg');
  const [logoScale, setLogoScale] = useState<number>(100);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const threadLibrary = [
    { name: 'Madeira #1988 Safety Gold', hex: '#F59E0B' },
    { name: 'Madeira #1001 Bleached White', hex: '#FFFFFF' },
    { name: 'Madeira #1842 Fleet Navy', hex: '#1E3A8A' },
    { name: 'Madeira #1637 Signal Red', hex: '#DC2626' },
    { name: 'Madeira #1800 Jet Black', hex: '#18181B' },
    { name: 'Madeira #1610 Metallic Silver', hex: '#94A3B8' }
  ];

  const handleProductChange = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedColor(prod.colors[0]?.name || '');
    if (!prod.supportsEmbroidery && technique === 'embroidery') {
      setTechnique('printing');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlacement = (key: keyof LogoPlacementConfig) => {
    setPlacements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Exact surcharge math based on industrial embroidery and printing rates
  const getCustomizationSurcharge = () => {
    let cost = 0;
    const isEmb = technique === 'embroidery';
    if (placements.leftChest) cost += isEmb ? 35 : 25;
    if (placements.rightChest) cost += isEmb ? 35 : 25;
    if (placements.fullBack) cost += isEmb ? 90 : 55;
    if (placements.leftSleeve) cost += isEmb ? 30 : 20;
    if (placements.rightSleeve) cost += isEmb ? 30 : 20;
    return cost;
  };

  const surcharge = getCustomizationSurcharge();
  const baseRate = selectedProduct.priceTiers[1]?.unitPrice || selectedProduct.priceTiers[0].unitPrice;
  const netGarmentUnitCost = baseRate + surcharge;

  // Stitch count calculation
  const estimatedStitches = (placements.leftChest ? 8500 : 0) + (placements.rightChest ? 6000 : 0) + (placements.fullBack ? 24000 : 0) + (placements.leftSleeve ? 5000 : 0);

  const defaultMockupLogo = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23F59E0B" stroke="%23FFFFFF" stroke-width="1.5"><polygon points="12 2 2 22 22 22"/><text x="12" y="18" font-size="6" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="%230F2942">CORP</text></svg>';
  const activeLogo = logoPreview || defaultMockupLogo;

  const handleAddCustomizedLot = () => {
    const defaultBreakdown = {
      S: 15,
      M: 35,
      L: 35,
      XL: 15,
      '2XL': 0,
      '3XL': 0
    };
    const totalQty = 100;

    const newItem: QuoteItem = {
      id: `custom-${Date.now()}`,
      productId: selectedProduct.id,
      productName: `${selectedProduct.name} (Custom Embroidered)`,
      color: selectedColor,
      sizeBreakdown: defaultBreakdown,
      totalQty,
      unitBasePrice: baseRate,
      customizationTechnique: technique,
      placements,
      logoDataUrl: activeLogo,
      logoFileName,
      customizationSurchargePerPiece: surcharge,
      subtotal: netGarmentUnitCost * totalQty,
      hsnCode: selectedProduct.hsnCode
    };

    onAddToQuote(newItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section id="customizer" className="py-20 bg-[#FBFBF9] text-slate-900 border-b border-stone-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300 mb-10"
        >
          <div>
            <div className="text-xs font-mono font-bold uppercase text-amber-800 tracking-wider mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
              SECTION 02 / IN-HOUSE BRANDING & TECH-PACK STUDIO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              Embroidery & Printing Customizer
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl font-light">
              Preview your corporate logo digitizing directly on real uniform photography. We operate 12-head Tajima multi-needle machinery with Madeira polyester threads.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-600">
            DIGITIZING: <span className="text-emerald-700 font-bold">FREE ON 50+ PCS LOTS</span>
          </div>
        </motion.div>

        {/* 2-Column Tech Studio Grid with Staggered Slide In */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Photography with Technical Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 flex flex-col items-center shadow-sm"
          >
            
            {/* Tech Header */}
            <div className="w-full flex justify-between items-center pb-4 mb-4 border-b border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 font-mono text-[10px] uppercase block">Selected Garment</span>
                <strong className="text-slate-950 text-sm">{selectedProduct.name}</strong>
              </div>
              <div className="text-right">
                <span className="text-stone-500 font-mono text-[10px] uppercase block">Fabric & Shade</span>
                <span className="text-amber-800 font-mono font-bold">{selectedColor} ({selectedProduct.gsm} GSM)</span>
              </div>
            </div>

            {/* REAL GARMENT PHOTO WITH CAD OVERLAY */}
            <div className="relative w-full max-w-md aspect-[4/3] bg-stone-100 rounded-lg overflow-hidden border border-stone-200 shadow-md flex items-center justify-center">
              
              {/* Authentic Product Photography */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Technical Calibration Grid Overlay */}
              <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />

              {/* Chest Embroidery Target Frame & Logo */}
              {placements.leftChest && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: '32%',
                    left: '38%',
                    transform: `translate(-50%, -50%) scale(${logoScale / 100})`
                  }}
                >
                  <div className="border border-dashed border-amber-600 bg-white/95 p-2 rounded backdrop-blur-xs flex flex-col items-center shadow-lg">
                    <img
                      src={activeLogo}
                      alt="Logo Mockup Left Chest"
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[8px] font-mono font-bold text-amber-900 mt-0.5 whitespace-nowrap bg-amber-100/90 px-1 rounded">
                      {technique === 'embroidery' ? 'Chest Embroidery (8.5k st.)' : 'Screen Print'}
                    </span>
                  </div>
                </div>
              )}

              {/* Right Chest Badge */}
              {placements.rightChest && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: '32%',
                    left: '62%',
                    transform: `translate(-50%, -50%) scale(${logoScale / 100})`
                  }}
                >
                  <div className="border border-dashed border-stone-400 bg-white/95 p-1.5 rounded flex flex-col items-center shadow-md">
                    <img
                      src={activeLogo}
                      alt="Logo Mockup Right Chest"
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-[8px] font-mono text-stone-700 mt-0.5 font-bold">Name / ID Tab</span>
                  </div>
                </div>
              )}

              {/* Full Back Warning/Banner Indicator */}
              {placements.fullBack && (
                <div className="absolute bottom-3 left-3 right-3 bg-amber-600 text-white p-2 rounded text-center text-xs font-mono font-bold shadow-md">
                  FULL BACK EMBROIDERY / SCREEN PRINT INCLUDED (+₹{technique === 'embroidery' ? '90' : '55'}/pc)
                </div>
              )}

              {/* Sleeve Badge Indicator */}
              {(placements.leftSleeve || placements.rightSleeve) && (
                <div className="absolute top-3 right-3 bg-slate-900/90 text-white border border-slate-700 px-2 py-1 rounded text-[10px] font-mono shadow-sm">
                  Sleeve Emblem Active
                </div>
              )}
            </div>

            {/* Quality Inspection Notice */}
            <div className="mt-4 w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-600 flex items-center justify-between font-mono">
              <span>EST. STITCH DENSITY: <strong className="text-slate-950 font-bold">{estimatedStitches.toLocaleString()} stitches</strong></span>
              <span>FORMAT: <strong className="text-amber-800 font-bold">.DST / Tajima</strong></span>
            </div>

          </motion.div>

          {/* Right Column: Industrial Specifications & Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            
            {/* Step 1: Uniform Model */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 mb-2">
                1. Select Garment Model
              </label>
              <select
                value={selectedProduct.id}
                onChange={(e) => {
                  const p = products.find(x => x.id === e.target.value);
                  if (p) handleProductChange(p);
                }}
                className="w-full bg-stone-50 border border-stone-300 text-slate-950 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {customizableProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Base ₹{p.priceTiers[1]?.unitPrice || p.priceTiers[0].unitPrice}/pc)
                  </option>
                ))}
              </select>

              {/* Colors */}
              <div className="mt-3">
                <span className="block text-[11px] font-semibold text-stone-600 mb-1.5">
                  Fabric Color: <strong className="text-slate-950">{selectedColor}</strong>
                </span>
                <div className="flex gap-2">
                  {selectedProduct.colors.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c.name ? 'border-amber-600 ring-2 ring-amber-600/40 scale-110 shadow-xs' : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Branding Technique & Thread */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm space-y-4">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600">
                2. Branding Technique & Logo File
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTechnique('embroidery')}
                  className={`p-3 text-left border rounded-lg transition-colors cursor-pointer ${
                    technique === 'embroidery'
                      ? 'border-amber-600 bg-amber-50 text-slate-950 font-bold ring-1 ring-amber-600/30'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="font-bold block text-sm text-slate-950">Computer Embroidery</span>
                  <span className="text-[10px] text-stone-500">Tajima 12-head Madeira threads</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTechnique('printing')}
                  className={`p-3 text-left border rounded-lg transition-colors cursor-pointer ${
                    technique === 'printing'
                      ? 'border-amber-600 bg-amber-50 text-slate-950 font-bold ring-1 ring-amber-600/30'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="font-bold block text-sm text-slate-950">Screen / DTF Print</span>
                  <span className="text-[10px] text-stone-500">Plastisol ink wash fastness</span>
                </button>
              </div>

              {/* Upload Input */}
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-stone-100 text-slate-950 text-xs font-bold rounded border border-stone-300 shadow-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-700" />
                  <span>Upload Logo (PNG, SVG, JPG)</span>
                </button>
                <span className="block text-[10px] text-stone-500 mt-1 font-mono">
                  Current file: {logoFileName}
                </span>
              </div>
            </div>

            {/* Step 3: Placements Checklist */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-sm">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 mb-2">
                3. Branding Placement Locations
              </label>

              <div className="space-y-1.5 text-xs">
                {[
                  { key: 'leftChest' as const, label: 'Left Chest (Corporate Logo)', cost: technique === 'embroidery' ? 35 : 25 },
                  { key: 'rightChest' as const, label: 'Right Chest (Employee / Shift ID)', cost: technique === 'embroidery' ? 35 : 25 },
                  { key: 'fullBack' as const, label: 'Full Back (Company / Safety Banner)', cost: technique === 'embroidery' ? 90 : 55 },
                  { key: 'leftSleeve' as const, label: 'Left Sleeve (Department Badge)', cost: technique === 'embroidery' ? 30 : 20 }
                ].map(pos => (
                  <button
                    key={pos.key}
                    type="button"
                    onClick={() => togglePlacement(pos.key)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      placements[pos.key]
                        ? 'border-amber-600 bg-amber-50/70 text-slate-950 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        placements[pos.key] ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'border-stone-300 bg-white'
                      }`}>
                        {placements[pos.key] && '✓'}
                      </div>
                      <span className="text-slate-900 font-medium">{pos.label}</span>
                    </div>
                    <span className="font-mono text-amber-800 font-bold text-xs">+₹{pos.cost}/pc</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Commercial Output Box */}
            <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-300 text-xs space-y-3 shadow-xs">
              <div className="flex justify-between items-baseline border-b border-amber-200 pb-2">
                <span className="text-stone-700 font-mono font-medium">NET FACTORY RATE:</span>
                <span className="text-2xl font-extrabold text-amber-900 font-mono">
                  ₹{netGarmentUnitCost} <span className="text-xs text-stone-600 font-normal">/pc + GST</span>
                </span>
              </div>

              <div className="space-y-1 text-stone-700 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span>Base Uniform:</span>
                  <span className="font-semibold text-slate-950">₹{baseRate}</span>
                </div>
                <div className="flex justify-between text-amber-900 font-semibold">
                  <span>Customization Surcharge:</span>
                  <span>+₹{surcharge}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Punching & Digitizing Fee:</span>
                  <span>WAIVED (Orders &gt; 50 pcs)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddCustomizedLot}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Configured Lot (100 Pcs) to RFQ Invoice
                </button>

                {addedSuccess && (
                  <div className="mt-2 p-2 bg-emerald-100 border border-emerald-300 text-emerald-900 text-center font-bold text-xs rounded">
                    Lot added to RFQ & Pro-Forma Tax Invoice!
                  </div>
                )}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
