import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface FooterProps {
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#top" className="text-xl font-bold text-white tracking-tight block">
              Mahavir Corporation
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Established in {COMPANY_INFO.since}, Mahavir Corporation is a premier manufacturer and bulk distributor of corporate uniforms, industrial boilersuits, dangris, high-visibility protective apparel, and security guard uniforms across India.
            </p>
            <div className="text-slate-400 space-y-1 pt-1 font-mono text-[11px]">
              <p>GSTIN: <span className="text-slate-200">{COMPANY_INFO.gstin}</span></p>
              <p>PAN: <span className="text-slate-200">{COMPANY_INFO.pan}</span></p>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Uniform Categories
            </h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-white transition-colors">Corporate Shirts & Trousers</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Cotton Pique Polo T-Shirts</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Heavy-Duty Boilersuits</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Mechanical Dangris (Bibs)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">EN ISO High-Visibility Jackets</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Security Guard Uniform Sets</a></li>
            </ul>
          </div>

          {/* Services & Wholesale */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Wholesale Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#customizer" className="hover:text-white transition-colors">Tajima Computer Embroidery</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Screen & DTF Printing</a></li>
              <li><button type="button" onClick={onOpenRfq} className="hover:text-white transition-colors text-left">Generate Pro-Forma Invoice</button></li>
              <li><a href="#quote-builder" className="hover:text-white transition-colors">Tiered Volume Pricing</a></li>
              <li><a href="#facility" className="hover:text-white transition-colors">Sample Swatch Courier</a></li>
              <li><a href="#facility" className="hover:text-white transition-colors">Fabric GSM & Shrinkage Test</a></li>
            </ul>
          </div>

          {/* Factory Location & Direct Desk */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contact & Plant
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Sector 10, Industrial Area, Pimpri, Maharashtra - 411018</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
              </li>
              <li className="pt-1">
                <a
                  href={COMPANY_INFO.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Google Business Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean typographic separation */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Mahavir Corporation. All rights reserved. Wholesale B2B Uniform Manufacturers.</p>
          <div className="flex items-center gap-4">
            <span>Direct Mill Sourcing</span>
            <span aria-hidden="true">·</span>
            <span>All Maharashtra & Pan-India Dispatch</span>
            <span aria-hidden="true">·</span>
            <span>GST Tax Invoicing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
