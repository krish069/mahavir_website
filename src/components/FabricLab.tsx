import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Check, Sparkles, Send, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface FabricSpecimen {
  id: string;
  name: string;
  composition: string;
  gsm: number;
  weave: string;
  shrinkage: string;
  colorFastness: string;
  tensileStrength: string;
  washTemp: string;
  recommendedFor: string;
  swatchColor: string;
  textureHint: string;
}

export const FabricLab: React.FC = () => {
  const specimens: FabricSpecimen[] = [
    {
      id: 'cotton-drill',
      name: 'Sanforized Long-Staple Cotton Drill',
      composition: '100% Combed Indian Cotton',
      gsm: 280,
      weave: '3/1 Heavy Twill Drill',
      shrinkage: '< 1.2% (Controlled Steam Pre-Shrunk)',
      colorFastness: 'Grade 4.5 (Vat Dyed)',
      tensileStrength: '1,450 N (Warp) / 980 N (Weft)',
      washTemp: 'Up to 75°C Industrial Laundry',
      recommendedFor: 'Plant Boilersuits, Furnace Aprons, Mining Overalls',
      swatchColor: '#1B2A4A',
      textureHint: 'High-density diagonal rib twill with soft mercerized handfeel'
    },
    {
      id: 'poly-twill',
      name: 'Mechanical Heavy Poly-Cotton Twill',
      composition: '65% Polyester / 35% Cotton Blend',
      gsm: 260,
      weave: '2/1 Fine Uniform Twill',
      shrinkage: '< 1.0% (Zero Wrinkle Formulation)',
      colorFastness: 'Grade 4-5 (Disperse Reactive)',
      tensileStrength: '1,620 N (Warp) / 1,100 N (Weft)',
      washTemp: '60°C Standard Cycle',
      recommendedFor: 'Mechanic Dangris, Cargo Pants, Assembly Line Suits',
      swatchColor: '#1E40AF',
      textureHint: 'Oil, coolant and grease shedding smooth finish'
    },
    {
      id: 'cotton-pique',
      name: 'Honeycomb Compact Ring-Spun Pique',
      composition: '100% Super-Combed Bio-Washed Cotton',
      gsm: 240,
      weave: 'Double-Knitted Hexagonal Pique',
      shrinkage: '< 1.8% (Heat-Set Tubular)',
      colorFastness: 'Grade 4.5 (Silicone Soft-Flow)',
      tensileStrength: '820 N Elastic Burst',
      washTemp: '40°C Delicate Corporate',
      recommendedFor: 'Corporate Staff Polos, Tech Hub T-Shirts, Management Apparel',
      swatchColor: '#0F1E36',
      textureHint: 'Breathable cellular ventilation with anti-pilling enzyme wash'
    },
    {
      id: 'hivis-oxford',
      name: '300D Oxford with 3M Scotchlite Reflex',
      composition: '100% High-Tenacity Polyurethane Coated Polyester',
      gsm: 320,
      weave: 'Plain Oxford Basket Weave + 3M 8910 Tape',
      shrinkage: '0.0% (Synthetic Membrane)',
      colorFastness: 'EN ISO 20471 Certified Fluorescent',
      tensileStrength: '1,890 N Ripstop Reinforcement',
      washTemp: '40°C Gentle Wash',
      recommendedFor: 'Highway Parkas, Airport Ground Crew, Warehouse Safety Vests',
      swatchColor: '#EAB308',
      textureHint: '8,000mm Hydrostatic Waterproof PU barrier with prismatic silver reflection'
    }
  ];

  const [selectedSpecimen, setSelectedSpecimen] = useState<FabricSpecimen>(specimens[0]);
  const [courierRequested, setCourierRequested] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [pincode, setPincode] = useState('');

  const handleCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !pincode) return;
    setCourierRequested(true);
    setTimeout(() => {
      setCourierRequested(false);
      setCompanyName('');
      setPincode('');
    }, 4000);
  };

  return (
    <section id="fabric-lab" className="py-20 bg-[#F4F3EE] text-slate-900 border-b border-stone-300 relative overflow-hidden">
      
      {/* Subtle Warm Amber Glow Accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300 mb-12">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-700" />
              MATERIAL ARCHITECTURE & SPECIMEN AUDIT
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-heading">
              The Fabric Laboratory
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-xl font-light">
              We never use bargain greige fabrics. Every uniform lot is woven from certified Indian yarns with lab-tested GSM weight, tensile tear resistance, and anti-bleed reactive dyeing.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Mill Testing Standard</span>
            <span className="text-xs font-mono font-bold text-slate-900">ISO 105-C06 / ASTM D3786</span>
          </div>
        </div>

        {/* 2-Column Interactive Specimen Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specimen Selector & Technical Table */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Fabric Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {specimens.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSpecimen(s)}
                  className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                    selectedSpecimen.id === s.id
                      ? 'border-amber-600 bg-white text-slate-950 shadow-md ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-white/70 text-stone-600 hover:border-stone-300 hover:bg-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full mb-2 border border-stone-300 shadow-xs" style={{ backgroundColor: s.swatchColor }} />
                  <span className="block text-xs font-bold text-slate-950 truncate">{s.name}</span>
                  <span className="block font-mono text-[10px] text-amber-800 font-semibold mt-0.5">{s.gsm} GSM</span>
                </button>
              ))}
            </div>

            {/* Specimen Deep-Dive Card */}
            <motion.div
              key={selectedSpecimen.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 space-y-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 block">Specimen Certificate</span>
                  <h3 className="text-xl font-bold text-slate-950 font-heading">{selectedSpecimen.name}</h3>
                </div>
                <div className="px-3 py-1 bg-amber-50 border border-amber-300 rounded text-xs font-mono font-bold text-amber-900">
                  {selectedSpecimen.gsm} GRAMS / SQ. MTR
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Yarn & Blend</span>
                  <span className="text-slate-950 font-bold text-xs mt-0.5 block">{selectedSpecimen.composition}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Weave Construction</span>
                  <span className="text-slate-950 font-bold text-xs mt-0.5 block">{selectedSpecimen.weave}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Residual Shrinkage</span>
                  <span className="text-emerald-700 font-bold text-xs mt-0.5 block">{selectedSpecimen.shrinkage}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Tensile Strength</span>
                  <span className="text-slate-950 font-bold text-xs mt-0.5 block">{selectedSpecimen.tensileStrength}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Dye Color Fastness</span>
                  <span className="text-amber-800 font-bold text-xs mt-0.5 block">{selectedSpecimen.colorFastness}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase">Wash Disinfection</span>
                  <span className="text-slate-800 font-bold text-xs mt-0.5 block">{selectedSpecimen.washTemp}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-700">
                <span className="text-stone-500 font-mono text-[11px] block uppercase mb-1">Recommended Deployment:</span>
                <p className="font-semibold text-slate-950">{selectedSpecimen.recommendedFor}</p>
                <p className="text-[11px] text-stone-600 mt-1 italic font-serif-couture">{selectedSpecimen.textureHint}</p>
              </div>

            </motion.div>

          </div>

          {/* Right Column: Physical Swatch Courier Request (High Value for 40-60s Buyers) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Flatlay Image Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md group bg-white">
              <img
                src="/src/assets/images/textile_fabric_swatches_1793430419305.jpg"
                alt="Mahavir Corporation Physical Fabric Swatch Desk"
                className="w-full h-56 object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                <span className="text-xs font-mono font-bold text-amber-200">
                  Official Mill Shade Card Book (45+ Colors)
                </span>
              </div>
            </div>

            {/* Courier Dispatch Form */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4 shadow-sm">
              <div>
                <span className="text-xs font-mono text-amber-800 uppercase font-bold tracking-wider block">
                  ZERO-RISK VERIFICATION
                </span>
                <h4 className="text-base font-bold text-slate-950 mt-1 font-heading">
                  Order Free Physical Swatch Book
                </h4>
                <p className="text-xs text-stone-600 mt-1 font-light">
                  We courier physical fabric cut-swatches with certified GSM labels to procurement officers across Maharashtra & India in 48 hours.
                </p>
              </div>

              <form onSubmit={handleCourierSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-mono text-[10px] uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Motors Vendor / MIDC Unit"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 text-slate-950 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-mono text-[10px] uppercase">Destination Pincode (Courier Service)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 411018 (Pune) or 400001 (Mumbai)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 text-slate-950 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Free Swatches via Express Courier</span>
                </button>

                {courierRequested && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-center text-xs font-bold rounded">
                    Courier request logged! Our dispatcher will confirm tracking within 4 hours.
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
