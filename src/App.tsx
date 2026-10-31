/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { FabricLab } from './components/FabricLab';
import { UniformCustomizer } from './components/UniformCustomizer';
import { QuickQuoteBuilder } from './components/QuickQuoteBuilder';
import { FacilityAndLocation } from './components/FacilityAndLocation';
import { Footer } from './components/Footer';
import { QuickContactBar } from './components/QuickContactBar';
import { RfqInvoiceModal } from './components/RfqInvoiceModal';
import { PRODUCTS } from './data/products';
import { Product, QuoteItem } from './types';

export default function App() {
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [selectedCustomizerProduct, setSelectedCustomizerProduct] = useState<Product>(PRODUCTS[0]);

  // Seed with realistic B2B initial lot so user immediately sees how quotes & invoices calculate
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      id: 'init-polo-1',
      productId: 'prod-corp-polo',
      productName: 'Executive 240 GSM Bio-Wash Combed Cotton Pique Polo',
      color: 'Corporate Navy',
      sizeBreakdown: { S: 15, M: 35, L: 35, XL: 15, '2XL': 0, '3XL': 0 },
      totalQty: 100,
      unitBasePrice: 330,
      customizationTechnique: 'embroidery',
      placements: {
        leftChest: true,
        rightChest: false,
        fullBack: false,
        leftSleeve: false,
        rightSleeve: false
      },
      logoDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23F59E0B" stroke="%23FFFFFF" stroke-width="1.5"><polygon points="12 2 2 22 22 22"/><text x="12" y="18" font-size="6" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="%230F2942">CORP</text></svg>',
      logoFileName: 'Corporate_Emblem.svg',
      customizationSurchargePerPiece: 35,
      subtotal: (330 + 35) * 100,
      hsnCode: '6109'
    },
    {
      id: 'init-boilersuit-2',
      productId: 'prod-ind-boilersuit',
      productName: 'Industrial Heavy Cotton Drill Coverall (Boilersuit)',
      color: 'Navy Blue',
      sizeBreakdown: { S: 5, M: 15, L: 20, XL: 10, '2XL': 0, '3XL': 0 },
      totalQty: 50,
      unitBasePrice: 780,
      customizationTechnique: 'embroidery',
      placements: {
        leftChest: true,
        rightChest: false,
        fullBack: false,
        leftSleeve: false,
        rightSleeve: false
      },
      customizationSurchargePerPiece: 35,
      subtotal: (780 + 35) * 50,
      hsnCode: '6211'
    }
  ]);

  const handleAddToQuote = (item: QuoteItem) => {
    setQuoteItems(prev => [item, ...prev]);
  };

  const handleUpdateQuoteItem = (index: number, updated: QuoteItem) => {
    setQuoteItems(prev => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const handleRemoveQuoteItem = (index: number) => {
    setQuoteItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuickAddProduct = (product: Product, qty: number = 50) => {
    const s = Math.round(qty * 0.15);
    const m = Math.round(qty * 0.35);
    const l = Math.round(qty * 0.35);
    const xl = Math.max(0, qty - (s + m + l));

    const tier = product.priceTiers.find(t => qty >= t.minQty && (!t.maxQty || qty <= t.maxQty)) || product.priceTiers[0];
    const unitPrice = tier.unitPrice;

    const newItem: QuoteItem = {
      id: `quick-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      productName: product.name,
      color: product.colors[0]?.name || 'Standard',
      sizeBreakdown: { S: s, M: m, L: l, XL: xl, '2XL': 0, '3XL': 0 },
      totalQty: qty,
      unitBasePrice: unitPrice,
      customizationTechnique: 'plain',
      placements: {
        leftChest: false,
        rightChest: false,
        fullBack: false,
        leftSleeve: false,
        rightSleeve: false
      },
      customizationSurchargePerPiece: 0,
      subtotal: unitPrice * qty,
      hsnCode: product.hsnCode
    };

    handleAddToQuote(newItem);
  };

  const handleSelectForCustomizer = (product: Product) => {
    setSelectedCustomizerProduct(product);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-slate-900 flex flex-col selection:bg-amber-600 selection:text-white font-sans">
      
      {/* 1. Top Navigation Bar */}
      <Navbar
        onOpenRfq={() => setIsRfqModalOpen(true)}
        quoteItemsCount={quoteItems.length}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* 2. Cinematic Hero Section with Interactive Category Staging */}
        <Hero
          onOpenRfq={() => setIsRfqModalOpen(true)}
        />

        {/* 3. Wholesale Specification Ledger & Trade Table */}
        <ProductCatalog
          products={PRODUCTS}
          onSelectForCustomizer={handleSelectForCustomizer}
          onQuickAddToQuote={handleQuickAddProduct}
          onOpenRfq={() => setIsRfqModalOpen(true)}
        />

        {/* 4. Interactive Fabric & Textile Laboratory (Tactile Swatch Inspector) */}
        <FabricLab />

        {/* 5. In-House Embroidery & Screen Printing Tech-Pack Studio */}
        <UniformCustomizer
          products={PRODUCTS}
          onAddToQuote={handleAddToQuote}
          onOpenRfq={() => setIsRfqModalOpen(true)}
        />

        {/* 6. Commercial Wholesale Order Estimator */}
        <QuickQuoteBuilder
          products={PRODUCTS}
          onAddToQuote={handleAddToQuote}
          onOpenRfq={() => setIsRfqModalOpen(true)}
        />

        {/* 7. Manufacturing Heritage & Physical Location Trust */}
        <FacilityAndLocation />
      </main>

      {/* 8. Corporate & Industrial Footer */}
      <Footer onOpenRfq={() => setIsRfqModalOpen(true)} />

      {/* 9. High-Contrast Sticky Quick-Connect Bar for 40-60 Demographic */}
      <QuickContactBar
        onOpenRfq={() => setIsRfqModalOpen(true)}
        quoteItemsCount={quoteItems.length}
      />

      {/* 10. Official B2B Pro-Forma Tax Invoice & RFQ Generator */}
      <RfqInvoiceModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuoteItem={handleUpdateQuoteItem}
        onRemoveQuoteItem={handleRemoveQuoteItem}
        allProducts={PRODUCTS}
        onAddProductQuick={handleQuickAddProduct}
      />

    </div>
  );
}
