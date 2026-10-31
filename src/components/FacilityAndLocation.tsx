import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Factory, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const FacilityAndLocation: React.FC = () => {
  return (
    <section id="facility" className="py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 mb-10"
        >
          <div>
            <div className="text-xs font-mono font-bold uppercase text-amber-800 tracking-wider mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
              SECTION 03 / MILL HERITAGE & AUDIT STANDARDS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              Manufacturing Plant & Fabric Quality Verification
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl font-light">
              We operate high-volume cutting, stitching, and finishing facilities in Maharashtra. All shipments are inspected against GSM weight, dimensional stability, and seam strength.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <span>QUALITY REJECTION THRESHOLD:</span>
            <span className="font-bold text-slate-900">&lt; 0.5%</span>
          </div>
        </motion.div>

        {/* 2-Column Physical Craftsmanship Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Swatch & Tailoring Flatlay Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-white shadow-md">
              <img
                src="/src/assets/images/textile_fabric_swatches_1793430419305.jpg"
                alt="Uniform Fabric Swatches and Technical Measurement Drafting"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-white border-t border-slate-200 text-xs flex justify-between items-center">
                <span className="font-semibold text-slate-900">Physical Fabric Swatch Shade Cards</span>
                <span className="text-[11px] font-mono text-slate-500">Free Courier on Request</span>
              </div>
            </div>
          </div>

          {/* Plant Protocols List */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Pre-Shrunk Long-Staple Cotton & Mill-Dye Lots</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We source directly from accredited mills in Ichalkaranji and Ahmedabad. All industrial twills and cotton drill are mercerized and sanforized, ensuring less than 1.5% shrinkage even under high-temp plant laundry.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Triple-Needle Chain Stitch & Stress Bar-Tacks</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Industrial coveralls and dangris endure rigorous kneeling and stretching. We reinforce crotch intersections, pocket borders, and zipper ends with heavy bar-tacks (42 stitches per inch) that prevent field tears.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Free Pre-Production Strike-Off & Shade Card Courier</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Before mass production of 200+ pieces, we stitch an actual sample with your digitized logo and courier it directly to your procurement team for physical sign-off.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Location & Contact Grid */}
        <div id="location" className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                PHYSICAL TRADE LOCATION & FACTORY
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Visit Our Pimpri-Chinchwad Facility
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                We invite corporate purchase heads and plant safety inspectors to visit our manufacturing floor, inspect running lots, and select fabrics directly from our mill shade library.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-bold block">Plant & Sales Office:</span>
                    <span className="text-slate-300">{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-bold block">Direct Desk (Senior Commercial Enquiries):</span>
                    <span className="font-mono text-white">{COMPANY_INFO.phone}</span>
                    <span className="text-slate-400 text-xs block">Alternate: {COMPANY_INFO.phoneAlt} · Monday to Saturday, 9:30 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Verified Location Button */}
              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={COMPANY_INFO.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors shadow"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Location in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Factory Sales Desk</span>
                </a>
              </div>
            </div>

            {/* Right Card: Authentic Map Reference */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 border border-slate-800 text-center">
              <div className="p-6 bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-2">
                <Factory className="w-10 h-10 text-amber-500" />
                <h4 className="font-bold text-white text-base">Mahavir Corporation</h4>
                <p className="text-xs text-slate-400">Uniforms & Industrial Workwear Mills</p>
                <div className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  GSTIN: {COMPANY_INFO.gstin}
                </div>
                <div className="text-[11px] text-slate-500 pt-2">
                  Serving Bhosari MIDC, Chakan Phase I & II, Talegaon, Hinjewadi & Pan-India
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
