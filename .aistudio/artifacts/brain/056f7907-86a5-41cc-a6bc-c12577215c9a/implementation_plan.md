# Mahavir Corporation — B2B Uniform & Workwear Platform

A modern, accessible wholesale uniform portal and quotation engine built for Mahavir Corporation. Designed with high visual contrast, intuitive navigation, and clean typography to seamlessly bridge traditional business buyers (40–60 age group) with modern corporate procurement managers.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed and will guide the build:
> - **Visual Identity**: Premium industrial navy blue (`#0F2942` / `#1E3A8A`), high-visibility industrial amber accents (`#D97706` / `#F59E0B`), and crisp white with generous spacing.
> - **Invoicing & RFQ**: Formal multi-step Request For Quotation (RFQ) flow with immediate tax-compliant pro-forma B2B invoice generation, downloadable PDF/print preview, and email confirmation dispatch.
> - **Customization**: Interactive visual garment mockup customizer supporting client logo upload, live placement toggles (chest embroidery, back screen-print, sleeve badge), thread/print color selection, and automated per-piece customization pricing tiers.
> - **Dual-Generation Accessibility**: High-legibility font sizing, prominent one-click "Call Direct" & WhatsApp quick-action buttons for traditional clients, alongside digital quotation builders.

---

### 1. Overview & Core Concept

- **What It Does**: Mahavir Corporation supplies workwear and uniforms in bulk across diverse corporate, industrial, and institutional sectors:
  - **Corporate & Executive**: Premium formal shirts, structured trousers, executive blazers, polo t-shirts.
  - **Industrial & Factory**: Heavy-duty cotton boilersuits, dungarees (dangris), mechanical work coats.
  - **Safety & Hi-Vis**: EN/ISO compliant reflective vests, high-visibility jackets, flame-retardant coveralls.
  - **Security & Facilities**: Guard epaulette shirts, tactical security trousers, durable utility uniforms.
  - **Healthcare & Hospitality**: Chef coats, aprons, lab coats, and medical scrubs.
- **Target Audience / Persona**:
  - *Traditional Senior Business Owners & Factory Supervisors (Ages 40–60)*: Prefer clear phone/WhatsApp access, straightforward price-per-dozen/hundred lists, high contrast, zero clutter, and clear offline payment or PO terms.
  - *Modern Corporate Procurement & HR Executives*: Want fast digital filtering by sector/fabric GSM, online logo mockup previews, minimum order quantity (MOQ) tier breakdowns, and instant PDF quotation/pro-forma invoices for internal purchase approvals.
- **Key Value**: Eliminates days of back-and-forth phone negotiations with a transparent wholesale pricing ladder, instant custom logo preview, and direct quotation/invoice generation.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Browse & Filter Wholesale Catalog**:
   - Filter by Sector (Industrial, Corporate, High-Vis, Security, Hospitality).
   - Filter by Fabric & Specs (100% Cotton, Poly-Cotton Twill, GSM weight, Reflective 3M tape).
   - View bulk tiered pricing tables (MOQ 50 pcs, 100 pcs, 500 pcs, 1000+ pcs) with volume discounts.
2. **Interactive Branding & Logo Customizer**:
   - Select uniform item (e.g., Industrial Coverall or Corporate Polo).
   - Upload company logo (PNG/SVG/JPG).
   - Choose technique: Precision Multi-Head Computer Embroidery or Screen / DTF Printing.
   - Select placement: Left Chest, Right Chest, Full Back, Left/Right Sleeve.
   - Live visual preview renders the uploaded logo directly on realistic garment silhouettes.
3. **Formal RFQ & Pro-Forma Invoice Generation**:
   - Step 1: Uniform selection & size breakdown (S, M, L, XL, XXL, 3XL matrix).
   - Step 2: Custom branding options (embroidery/print placements).
   - Step 3: Company & delivery details (GSTIN, company name, delivery timeline, Pune/Maharashtra or Pan-India destination).
   - Step 4: Instant pro-forma tax invoice preview with breakdown of fabric cost, embroidery setup fee, GST (5% / 12%), and bulk volume discount.
   - One-click actions: "Download PDF Pro-Forma Invoice", "Submit RFQ & Send Email Confirmation", and "Inquire on WhatsApp with Pre-filled Specs".
4. **Quick Accessibility & Location Trust**:
   - Direct integration link to Google Maps business location (`https://share.google/eSgPiM4GDa52ZbRxb`).
   - Sticky bottom-right dual quick contact pill (WhatsApp / Direct Call) optimized for mobile and desktop senior buyers.

#### Visual Identity & Theme
- **Aesthetic Direction**: Established Industrial Precision & Corporate Reliability. Utilitarian, crisp, trustworthy, and modern.
- **Color Palette (60-30-10 Rule)**:
  - *Dominant Neutral Canvas (60%)*: Clean white (`#FFFFFF`) and architectural mist (`#F8FAFC`).
  - *Structural Surfaces (30%)*: Industrial deep navy (`#0F2942`, `#1E293B`) with hairline slate borders (`#E2E8F0`).
  - *Accent & High-Intent Points (10%)*: Industrial amber / safety gold (`#D97706`, `#F59E0B`) for primary CTAs, quote badges, and key actions.
- **Typography & Scale**:
  - *Display*: `Outfit` / `Plus Jakarta Sans` with bold corporate authority.
  - *Body*: `Plus Jakarta Sans` at 16px with comfortable 1.6 line height for effortless legibility.
  - *Data & Pricing Tables*: Tabular numerals (`tabular-nums`) with clear Indian Rupee (₹) formatting.
- **Accessible UI for Older Demographics**:
  - Minimum touch target size $\ge 44\text{px}$ on all interactive controls.
  - High-contrast text exceeding WCAG AAA standards (7:1+ contrast on navy and amber).
  - Prominent phone and WhatsApp contact numbers with clear labels rather than cryptic icons alone.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Interactive Customizer & Mockup Engine**
  - *Chosen Approach*: Lightweight HTML5 Canvas / SVG garment projection overlay with real-time logo repositioning and drag-and-drop file upload.
  - *Why*: Instant client feedback without server-side image processing delay, giving procurement officers a clear visual proof before submitting RFQs.
  - *Alternatives Considered*: Static checkbox-only selection (rejected: lacked visual clarity for corporate decision-makers).
- **Decision 2: Formal Pro-Forma B2B Invoice & Quotation Engine**
  - *Chosen Approach*: Interactive quotation builder that compiles selected lines, size matrices, and customization surcharges into an authentic GST-compliant pro-forma invoice with printable/downloadable styling.
  - *Why*: Wholesale corporate clients require formal invoices for accounting approvals before PO issuance.
- **Decision 3: Dual Action Paths (Digital Self-Service vs. Phone/WhatsApp)**
  - *Chosen Approach*: Every product and quotation summary includes both a digital formal RFQ flow and an instant 1-tap WhatsApp button with auto-formatted BOM specs.
  - *Why*: Accommodates both 40–60 traditional procurement heads who prefer personal verbal or WhatsApp communication, and modern tech-first corporate buyers.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Mahavir Corporation App                         │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark · Catalog · Customizer · RFQ · Contact) │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐ │
│  │   Catalog & Filters   │  │   Interactive Uniform Customizer       │ │
│  │  - Sector Filter      │  │  - Garment Type & Color Selector        │ │
│  │  - Fabric / GSM Specs │  │  - Logo Upload (PNG/SVG)                │ │
│  │  - MOQ & Tier Rates   │  │  - Placement: Chest / Back / Sleeve    │ │
│  │  - Quick Add to Quote │  │  - Technique: Embroidery vs Printing    │ │
│  └───────────┬───────────┘  └───────────────────┬────────────────────┘ │
│              │                                  │                      │
│              └─────────────────┬────────────────┘                      │
│                                ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │           Wholesale Quote & Pro-Forma Invoice Manager             │ │
│  │  - Size Breakdown Matrix (S, M, L, XL, 2XL, 3XL)                  │ │
│  │  - Custom Embroidery / Print Line Items                           │ │
│  │  - Tiered Bulk Discount Engine (50/100/500/1000+ pcs)             │ │
│  │  - GST (5%/12%) & Shipping Calculation                            │ │
│  │  - Formal Multi-Step RFQ & Tax Pro-Forma Invoice Renderer         │ │
│  │  - Download / Print PDF Invoice & WhatsApp Inquiry Payload        │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  Footer & Location Trust (Google Maps Embed · Factory Address · Contact)│
└────────────────────────────────────────────────────────────────────────┘
```

#### State & Data Models
- **Catalog Item**: id, name, sector, fabric, gsm, features, baseMoq, priceTiers (`{ minQty, unitPrice }`), garmentColors, imagePlaceholder, availableTechniques.
- **Quote Item**: productId, color, sizeQuantities (`{ S, M, L, XL, 2XL, 3XL }`), logoAssetUrl, logoTechnique, logoPlacements, notes.
- **RFQ Submission**: quoteNumber, customerName, companyName, gstin, email, phone, deliveryAddress, targetDate, items, subtotal, discount, gst, totalAmount, status.
