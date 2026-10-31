import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface QuickContactBarProps {
  onOpenRfq: () => void;
  quoteItemsCount: number;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({
  onOpenRfq,
  quoteItemsCount
}) => {
  const handleQuickWhatsApp = () => {
    const text = `Hello Mahavir Corporation, I am contacting you for a bulk uniform quotation for my company. Please connect me with your wholesale sales team.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <aside
      aria-label="Quick contact and quote shortcuts"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2 max-h-[14vh]"
    >
      {/* 1. Direct Phone Call Button (High contrast, perfect for 40-60 age group) */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-full shadow-lg border border-slate-700 transition-transform hover:scale-105"
        title="Call Mahavir Corporation Sales Desk"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        <span>{COMPANY_INFO.phone}</span>
      </a>

      {/* 2. WhatsApp Direct Inquiry Button */}
      <button
        type="button"
        onClick={handleQuickWhatsApp}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-full shadow-xl transition-transform hover:scale-105 cursor-pointer"
        title="Chat on WhatsApp with Wholesale Team"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden xs:inline">WhatsApp Inquiries</span>
        <span className="xs:hidden">WhatsApp</span>
      </button>

      {/* 3. Floating RFQ Drawer Button */}
      <button
        type="button"
        onClick={onOpenRfq}
        className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full shadow-xl transition-transform hover:scale-105 cursor-pointer"
        title="Open Bulk RFQ & Pro-Forma Tax Invoice"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">RFQ Invoice</span>
        {quoteItemsCount > 0 && (
          <span className="w-5 h-5 bg-slate-950 text-white rounded-full text-[10px] font-mono font-bold flex items-center justify-center -mr-1">
            {quoteItemsCount}
          </span>
        )}
      </button>
    </aside>
  );
};
