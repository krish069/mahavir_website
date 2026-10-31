import React, { useState } from 'react';
import { Menu, X, FileText, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface NavbarProps {
  onOpenRfq: () => void;
  quoteItemsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq, quoteItemsCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors font-heading"
        >
          Mahavir Corporation
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-700">
          <a
            href="#catalog"
            className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog Ledger
          </a>
          <a
            href="#customizer"
            className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
          >
            Logo Studio
          </a>
          <a
            href="#quote-builder"
            className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
          >
            Invoice & RFQ
          </a>
          <a
            href="#facility"
            className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
          >
            Mill Facility
          </a>
          <a
            href="#location"
            className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
          >
            Factory Map
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenRfq}
            className="relative px-4 py-2.5 text-xs font-extrabold text-white bg-slate-950 rounded-xl hover:bg-slate-800 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Pro-Forma Invoice</span>
            {quoteItemsCount > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[10px] font-mono font-bold flex items-center justify-center">
                {quoteItemsCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Accessible Mobile Nav Menu for 40-60 demographic */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Wholesale Catalog Ledger
          </a>
          <a
            href="#customizer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Embroidery & Print Tech-Pack Studio
          </a>
          <a
            href="#quote-builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Commercial Rate Estimator
          </a>
          <a
            href="#facility"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Mill Facility & Fabric Lab
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Pimpri-Chinchwad Factory Location
          </a>
          
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-lg flex items-center justify-center gap-2 shadow"
            >
              <FileText className="w-4 h-4" />
              Open Pro-Forma Tax Invoice ({quoteItemsCount} items)
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full py-2.5 bg-slate-100 text-slate-900 font-bold text-xs rounded-lg flex items-center justify-center gap-2 border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Sales Desk: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
