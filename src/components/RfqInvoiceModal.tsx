import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileText,
  Printer,
  Send,
  MessageSquare,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { QuoteItem, RfqCompanyDetails, Product } from '../types';
import { COMPANY_INFO } from '../data/products';

interface RfqInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuoteItem: (index: number, updated: QuoteItem) => void;
  onRemoveQuoteItem: (index: number) => void;
  allProducts: Product[];
  onAddProductQuick: (product: Product) => void;
}

export const RfqInvoiceModal: React.FC<RfqInvoiceModalProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuoteItem,
  onRemoveQuoteItem,
  allProducts,
  onAddProductQuick
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [companyDetails, setCompanyDetails] = useState<RfqCompanyDetails>({
    companyName: 'Larsen & Infra Projects Pvt Ltd',
    contactPerson: 'Rajesh Solanki',
    designation: 'Procurement Head',
    email: 'procurement@larseninfra.example.com',
    phone: '+91 98234 11223',
    gstin: '27AAACL1234D1Z5',
    deliveryCity: 'Pune',
    deliveryState: 'Maharashtra',
    pincode: '411026',
    notes: 'Require pre-production sample for embroidery approval before bulk lot dispatch. Dispatch needed in 15 days.',
    poReference: 'PO-REQ-8491'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteNumber] = useState(`MC-EST-${Math.floor(100000 + Math.random() * 900000)}`);
  const currentDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  if (!isOpen) return null;

  // Calculate totals
  const totalQuantity = quoteItems.reduce((acc, item) => acc + item.totalQty, 0);
  const rawSubtotal = quoteItems.reduce((acc, item) => acc + item.subtotal, 0);

  // Bulk Discount based on volume
  let bulkDiscountRate = 0;
  if (totalQuantity >= 500) bulkDiscountRate = 0.12;
  else if (totalQuantity >= 250) bulkDiscountRate = 0.08;
  else if (totalQuantity >= 100) bulkDiscountRate = 0.05;

  const bulkDiscountAmount = Math.round(rawSubtotal * bulkDiscountRate);
  const taxableAmount = rawSubtotal - bulkDiscountAmount;

  // Indian GST: 5% on uniforms <= ₹1000, 12% on heavy safety parkas / protective suits
  const isInterState = companyDetails.deliveryState.toLowerCase().trim() !== 'maharashtra';
  const effectiveGSTRate = 0.05; // Standard 5% apparel GST
  const totalGST = Math.round(taxableAmount * effectiveGSTRate);
  const cgst = isInterState ? 0 : Math.round(totalGST / 2);
  const sgst = isInterState ? 0 : Math.round(totalGST / 2);
  const igst = isInterState ? totalGST : 0;
  const grandTotal = taxableAmount + totalGST;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const summary = quoteItems
      .map(
        item =>
          `• ${item.productName} (${item.color}) - Total: ${item.totalQty} pcs [S:${item.sizeBreakdown.S}, M:${item.sizeBreakdown.M}, L:${item.sizeBreakdown.L}, XL:${item.sizeBreakdown.XL}, 2XL:${item.sizeBreakdown['2XL']}]`
      )
      .join('\n');

    const text = `*New Bulk RFQ / Pro-Forma Inquiry*\nQuote Ref: *${quoteNumber}*\nCompany: *${companyDetails.companyName}*\nContact: *${companyDetails.contactPerson} (${companyDetails.phone})*\nGSTIN: ${companyDetails.gstin}\nCity: ${companyDetails.deliveryCity}\n\n*Required Items:*\n${summary}\n\n*Estimated Total Quantity:* ${totalQuantity} pcs\n*Estimated Taxable Subtotal:* ₹${taxableAmount.toLocaleString('en-IN')}\n\nPlease confirm manufacturing lead time and final PI dispatch.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">Wholesale RFQ & Pro-Forma Tax Invoice</h3>
              <p className="text-xs text-slate-400">
                Official B2B Bulk Order Quotation Engine · Mahavir Corporation
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
            {[
              { num: 1, label: 'Uniform Items' },
              { num: 2, label: 'Branding & Logo' },
              { num: 3, label: 'Company & Delivery' },
              { num: 4, label: 'Pro-Forma Invoice' }
            ].map(s => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num as any)}
                className={`flex items-center gap-2 transition-colors ${
                  step === s.num
                    ? 'text-amber-600 font-bold'
                    : step > s.num
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === s.num
                      ? 'bg-amber-600 text-white shadow'
                      : step > s.num
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* STEP 1: Uniform Items & Size Matrix */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">1. Selected Uniform Inventory</h4>
                  <p className="text-xs text-slate-500">
                    Review quantities, size breakdowns (S to 3XL), and volume tiered pricing.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Quantity:</span>
                  <span className="text-lg font-mono font-bold text-slate-900">{totalQuantity} pieces</span>
                </div>
              </div>

              {quoteItems.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-sm font-semibold text-slate-600">Your quotation list is currently empty.</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">Add products from our wholesale catalog or mockup customizer.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {allProducts.slice(0, 3).map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onAddProductQuick(p)}
                        className="px-3 py-1.5 text-xs bg-white border border-slate-300 hover:border-amber-500 rounded-lg font-medium text-slate-700 shadow-sm"
                      >
                        + Add {p.name} (50 pcs)
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{item.productName}</span>
                            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {item.color}
                            </span>
                            <span className="text-xs font-mono text-slate-500">HSN: {item.hsnCode}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Base: ₹{item.unitBasePrice}/pc · Customization: +₹{item.customizationSurchargePerPiece}/pc ({item.customizationTechnique})
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold font-mono text-slate-900">
                            ₹{item.subtotal.toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveQuoteItem(idx)}
                            className="text-xs text-red-600 hover:text-red-700 font-medium block mt-1"
                          >
                            Remove Line
                          </button>
                        </div>
                      </div>

                      {/* Size Matrix Breakdown Inputs */}
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Size Allocation Matrix (Pieces):
                        </span>
                        <div className="grid grid-cols-6 gap-2">
                          {(['S', 'M', 'L', 'XL', '2XL', '3XL'] as const).map(size => (
                            <div key={size} className="text-center">
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">{size}</label>
                              <input
                                type="number"
                                min="0"
                                value={item.sizeBreakdown[size]}
                                onChange={(e) => {
                                  const val = Math.max(0, parseInt(e.target.value) || 0);
                                  const updatedBreakdown = { ...item.sizeBreakdown, [size]: val };
                                  const newTotal = Object.values(updatedBreakdown).reduce((a, b) => a + b, 0);
                                  const unitCost = item.unitBasePrice + item.customizationSurchargePerPiece;
                                  onUpdateQuoteItem(idx, {
                                    ...item,
                                    sizeBreakdown: updatedBreakdown,
                                    totalQty: newTotal,
                                    subtotal: newTotal * unitCost
                                  });
                                }}
                                className="w-full text-center py-1 text-xs font-bold border border-slate-300 rounded focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-right text-xs font-semibold text-slate-600">
                          Line Total: <span className="font-mono text-slate-900">{item.totalQty} pcs</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Volume Discount Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                <span>
                  <strong>Wholesale Volume Advantage:</strong> Orders $\ge$ 250 pcs earn 8% bulk discount; $\ge$ 500 pcs earn 12% off.
                </span>
                {bulkDiscountRate > 0 && (
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Active: {bulkDiscountRate * 100}% Discount (Saved ₹{bulkDiscountAmount})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Branding & Customization Specs */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900">2. Custom Embroidery & Printing Specifications</h4>
                <p className="text-xs text-slate-500">
                  Review logo attachments, placement coordinates, and Japanese Tajima multi-head embroidery configurations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Branding Quality Standard
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li>• <strong>Thread:</strong> High-sheen polyester Madeira / Coats embroidery threads (fade-proof).</li>
                    <li>• <strong>Punching / Digitizing:</strong> Free professional punching format (.DST) included for bulk lots.</li>
                    <li>• <strong>Backing:</strong> Non-woven tear-away fusible stabilizer ensuring zero garment puckering.</li>
                    <li>• <strong>Printing:</strong> High-density plastisol or DTF screen printing with wash fastness grade 4-5.</li>
                  </ul>

                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Pre-Production Proofing:</span>
                    <p className="text-xs text-slate-500">
                      Before whole-lot stitching, our master pattern master will stitch an actual fabric swatch sample and send physical/HD photo proof for your management sign-off.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                  <h5 className="text-sm font-bold text-slate-900">Customized Line Items</h5>
                  {quoteItems.filter(i => i.customizationTechnique !== 'plain').length === 0 ? (
                    <p className="text-xs text-slate-400">All current lines are configured as plain uniforms without logo embroidery.</p>
                  ) : (
                    <div className="space-y-3">
                      {quoteItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-200">
                          {item.logoDataUrl && (
                            <img src={item.logoDataUrl} alt="Logo" className="w-10 h-10 object-contain p-1 bg-white border rounded" />
                          )}
                          <div className="text-xs flex-1">
                            <span className="font-bold text-slate-900 block">{item.productName}</span>
                            <span className="text-slate-500">
                              Technique: <strong className="text-amber-800">{item.customizationTechnique}</strong> · Surcharge: ₹{item.customizationSurchargePerPiece}/pc
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Company & Delivery Information */}
          {step === 3 && (
            <form onSubmit={handleSubmitRfq} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900">3. Corporate Entity & Delivery Details</h4>
                <p className="text-xs text-slate-500">
                  Provide company GSTIN and billing address for formal B2B Tax Pro-Forma Invoice generation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={companyDetails.companyName}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company GSTIN Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 27AAACL1234D1Z5"
                    value={companyDetails.gstin}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={companyDetails.contactPerson}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. HR Manager / Plant Head"
                    value={companyDetails.designation}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, designation: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Email Address *</label>
                  <input
                    type="email"
                    required
                    value={companyDetails.email}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={companyDetails.phone}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery City & State *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Pune)"
                      value={companyDetails.deliveryCity}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, deliveryCity: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State (e.g. Maharashtra)"
                      value={companyDetails.deliveryState}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, deliveryState: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    value={companyDetails.pincode}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Specific Instructions / Timeline Requirements</label>
                <textarea
                  rows={2}
                  value={companyDetails.notes}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Generate B2B Pro-Forma Tax Invoice & Submit Formal RFQ
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Formal Pro-Forma Tax Invoice View */}
          {step === 4 && (
            <div className="space-y-6">
              
              {/* Submission banner if submitted */}
              {isSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h5 className="font-bold text-emerald-950 text-sm">Wholesale RFQ Submitted Successfully!</h5>
                      <p className="text-xs text-emerald-800">
                        Formal quotation reference <strong>{quoteNumber}</strong> logged. An official PDF copy has been drafted for your finance approval.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-300">
                    Lead Time: 7–10 Working Days
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    Print / Save PDF Invoice
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send via WhatsApp to Director
                  </button>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  Valid for: <span className="font-bold text-slate-900">{validUntilDate}</span>
                </div>
              </div>

              {/* AUTHENTIC TAX INVOICE DOCUMENT (PRINTABLE CONTAINER) */}
              <div
                id="printable-invoice"
                className="bg-white border-2 border-slate-300 rounded-xl p-6 sm:p-8 text-slate-900 font-sans shadow-md"
              >
                
                {/* Invoice Header */}
                <div className="border-b-2 border-slate-900 pb-5 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block">
                        ESTABLISHED 1994 · WHOLESALE UNIFORM MANUFACTURERS
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                        MAHAVIR CORPORATION
                      </h2>
                      <p className="text-xs text-slate-600 mt-1 max-w-md">
                        {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                      </p>
                      <div className="text-xs text-slate-600 mt-1 space-x-3">
                        <span><strong>Phone:</strong> {COMPANY_INFO.phone}</span>
                        <span><strong>GSTIN:</strong> {COMPANY_INFO.gstin}</span>
                        <span><strong>PAN:</strong> {COMPANY_INFO.pan}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded uppercase tracking-wider mb-2">
                        PRO-FORMA TAX INVOICE
                      </span>
                      <div className="text-xs space-y-0.5">
                        <p><strong>Quotation No:</strong> <span className="font-mono text-amber-800 font-bold">{quoteNumber}</span></p>
                        <p><strong>Date:</strong> {currentDate}</p>
                        <p><strong>Valid Until:</strong> {validUntilDate}</p>
                        <p><strong>Place of Supply:</strong> {companyDetails.deliveryState} (27)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billed To / Shipped To Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 text-xs">
                  <div>
                    <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Billed & Supplied To:
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{companyDetails.companyName}</h4>
                    <p className="text-slate-600 mt-0.5">Attn: {companyDetails.contactPerson} ({companyDetails.designation})</p>
                    <p className="text-slate-600">GSTIN: <strong className="font-mono text-slate-900">{companyDetails.gstin || 'UNREGISTERED'}</strong></p>
                    <p className="text-slate-600">Phone: {companyDetails.phone} · Email: {companyDetails.email}</p>
                  </div>

                  <div>
                    <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Delivery Destination & Terms:
                    </span>
                    <p className="text-slate-700"><strong>City/State:</strong> {companyDetails.deliveryCity}, {companyDetails.deliveryState} - {companyDetails.pincode}</p>
                    <p className="text-slate-700"><strong>Dispatch Mode:</strong> Insured Surface Cargo / Door Delivery</p>
                    <p className="text-slate-700"><strong>Payment Terms:</strong> 50% Advance with PO, 50% against Delivery / Dispatch</p>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-800 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Sr.</th>
                        <th className="py-2.5 px-3">Description of Uniform & Specifications</th>
                        <th className="py-2.5 px-3 text-center">HSN</th>
                        <th className="py-2.5 px-3 text-center">Qty (Pcs)</th>
                        <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                        <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {quoteItems.map((item, i) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-mono font-medium">{i + 1}</td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block">{item.productName}</span>
                            <span className="text-slate-500">Color: {item.color} · Sizes: S:{item.sizeBreakdown.S}, M:{item.sizeBreakdown.M}, L:{item.sizeBreakdown.L}, XL:{item.sizeBreakdown.XL}, 2XL:{item.sizeBreakdown['2XL']}</span>
                            {item.customizationSurchargePerPiece > 0 && (
                              <span className="block text-[11px] text-amber-800 font-medium">
                                + Incl. Custom {item.customizationTechnique} (+₹{item.customizationSurchargePerPiece}/pc)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center font-mono">{item.hsnCode}</td>
                          <td className="py-3 px-3 text-center font-bold font-mono">{item.totalQty}</td>
                          <td className="py-3 px-3 text-right font-mono">₹{item.unitBasePrice + item.customizationSurchargePerPiece}</td>
                          <td className="py-3 px-3 text-right font-bold font-mono">₹{item.subtotal.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Subtotals & Taxes Calculation */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-slate-900 pt-4 text-xs">
                  
                  {/* Bank Details & Terms */}
                  <div className="w-full sm:w-1/2 space-y-3">
                    <div className="p-3 bg-slate-50 rounded border border-slate-200">
                      <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1 text-[11px]">
                        Bank Account Details for RTGS / NEFT:
                      </span>
                      <p><strong>Bank:</strong> {COMPANY_INFO.bankDetails.bankName}</p>
                      <p><strong>Account Name:</strong> {COMPANY_INFO.bankDetails.accountName}</p>
                      <p><strong>Account No:</strong> <span className="font-mono font-bold">{COMPANY_INFO.bankDetails.accountNumber}</span></p>
                      <p><strong>IFSC Code:</strong> <span className="font-mono font-bold">{COMPANY_INFO.bankDetails.ifsc}</span></p>
                      <p><strong>Branch:</strong> {COMPANY_INFO.bankDetails.branch}</p>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      * Fabric sample swatch & embroidery physical strike-off dispatched within 48h of initial order receipt.
                    </p>
                  </div>

                  {/* Calculations */}
                  <div className="w-full sm:w-1/2 space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-600">Total Pieces:</span>
                      <span className="font-mono font-bold text-slate-900">{totalQuantity} Pcs</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-600">Gross Subtotal:</span>
                      <span className="font-mono font-medium">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {bulkDiscountAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-200 text-emerald-700 font-medium">
                        <span>Bulk Discount ({bulkDiscountRate * 100}%):</span>
                        <span className="font-mono">- ₹{bulkDiscountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-600">Taxable Net Amount:</span>
                      <span className="font-mono font-bold text-slate-900">₹{taxableAmount.toLocaleString('en-IN')}</span>
                    </div>

                    {isInterState ? (
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600">IGST (5%):</span>
                        <span className="font-mono">₹{igst.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">CGST (2.5%):</span>
                          <span className="font-mono">₹{cgst.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">SGST (2.5%):</span>
                          <span className="font-mono">₹{sgst.toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between py-2 border-t-2 border-slate-900 bg-amber-50 px-2 rounded font-bold text-sm text-slate-950">
                      <span>Total Invoice Amount (INR):</span>
                      <span className="font-mono text-base text-amber-900">₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Sign-off */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
                  <div>
                    <p>Computer generated pro-forma quotation.</p>
                    <p>Location Verification: <a href={COMPANY_INFO.locationUrl} target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">Google Business Profile Map Link</a></p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 uppercase">For Mahavir Corporation</p>
                    <div className="h-10"></div>
                    <p className="font-medium">Authorized Commercial Signatory</p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < 3 && (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleSubmitRfq}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <span>Review & Finalize Invoice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
