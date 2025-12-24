# 🏗️ Scalable Affiliate Partner Architecture

## Overview

The affiliate system is now designed to be **partner-agnostic and infinitely scalable**. Adding a new affiliate partner (Amazon, Flipkart, eBay, etc.) requires only configuration changes—**NO component logic changes needed**.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Trip Stepper Component                        │
│  (User clicks "Explore Destination" button)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │  AffiliateLinkBuilderService          │
        │  (Dynamically generates URLs)         │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌─────────────────────────┐         ┌──────────────────────┐
│ destination-            │         │ affiliate-partners-  │
│ categories.config.ts    │         │ config.ts            │
│                         │         │                      │
│ ✅ Partner-Agnostic    │         │ ✅ All Partner Defs  │
│ • Search Queries       │         │ • Amazon             │
│ • Product Names        │         │ • Flipkart           │
│ • Icons                │         │ • eBay               │
│                         │         │ • AliExpress         │
└─────────────────────────┘         │ • [Future Partners]  │
                                    └──────────────────────┘
        │
        ▼
┌──────────────────────────────────────────┐
│     Generated Affiliate Link              │
│  https://www.amazon.in/s?                │
│  k=beachwear+sunscreen&                  │
│  tag=tripsaver21-21                      │
└──────────────────────────────────────────┘
```

---

## File Structure

```
src/app/core/
├── config/
│   ├── affiliate-partners.config.ts      ✨ NEW: Partner Definitions
│   └── destination-categories.config.ts  ✨ REFACTORED: Partner-Agnostic
└── services/
    └── affiliate-link-builder.service.ts ✨ NEW: URL Generator
```

---

## Key Components

### 1️⃣ **affiliate-partners.config.ts** (Extensible Registry)

Defines all affiliate partners with their configuration:

```typescript
export const AFFILIATE_PARTNERS: Record<AffiliatePartnerType, AffiliatePartnerConfig> = {
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    baseUrl: 'https://www.amazon.in/s',
    storeId: 'tripsaver21-21',           // Store/Associate ID
    commission: 5,                       // Commission percentage
    countries: ['IN', 'US', 'UK'],       // Available regions
    active: true,
    queryParams: {
      searchKey: 'k',                    // Search parameter name
      storeParam: 'tag',                 // Affiliate ID param
    },
  },
  
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    baseUrl: 'https://www.flipkart.com/search',
    storeId: 'fslogin7',
    commission: 8,
    countries: ['IN'],
    active: false,                       // Not yet active
    queryParams: {
      searchKey: 'q',                    // Different param name
      storeParam: 'affid',
    },
  },
  
  // Add more partners here...
};
```

**To add a new partner:**

```typescript
// Add to AFFILIATE_PARTNERS object:
mynewpartner: {
  id: 'mynewpartner',
  name: 'My New Partner',
  baseUrl: 'https://partner.com/search',
  storeId: 'your-store-id',
  commission: 6,
  countries: ['IN', 'US'],
  active: false,  // Enable when ready
  queryParams: {
    searchKey: 'search_term',
    storeParam: 'affiliate_id',
  },
},
```

That's it! No component changes needed.

---

### 2️⃣ **destination-categories.config.ts** (Partner-Agnostic Categories)

Contains product categories **without hardcoded affiliate URLs**:

```typescript
export const DESTINATION_CATEGORIES: Record<DestinationType, ProductCategory[]> = {
  beach: [
    {
      name: 'Beachwear & Sunscreen',
      icon: '🏖️',
      searchQuery: 'beachwear sunscreen SPF',  // ✅ Generic search term
      aliases: ['beach wear', 'sun protection'],
    },
    // More categories...
  ],
  // More destination types...
};
```

**Benefits:**
- ✅ Single source of truth for product categories
- ✅ Works with ANY affiliate partner
- ✅ Easy to A/B test different partners
- ✅ Language-agnostic (search queries can be translated)

---

### 3️⃣ **AffiliateLinkBuilderService** (Dynamic URL Generator)

Generates affiliate URLs on-the-fly:

```typescript
// Example usage:
const link = affiliateLinkBuilder.buildAffiliateLink(
  'beachwear sunscreen SPF',    // From destination category
  'amazon'                       // Selected partner
);

// Returns:
{
  url: 'https://www.amazon.in/s?k=beachwear+sunscreen+SPF&tag=tripsaver21-21',
  partner: 'amazon',
  searchQuery: 'beachwear sunscreen SPF',
  encoded: true
}
```

**Key Methods:**

| Method | Purpose | Parameters |
|--------|---------|-----------|
| `buildAffiliateLink()` | Generate single affiliate link | searchQuery, partnerId |
| `buildAffiliateLinksMultiPartner()` | Generate links for multiple partners | searchQuery, partnerIds[] |
| `generateTrackingParams()` | GA4 tracking parameters | partner, productName |
| `isPartnerAvailableInCountry()` | Check partner availability | partnerId, countryCode |
| `getCommissionRate()` | Get partner commission % | partnerId |

---

## How It Works End-to-End

### Step 1: User Clicks "Explore Destination"

```html
<!-- trip-stepper.component.html -->
<button (click)="toggleExplorePanel(rec.destination.id)">
  Explore {{ rec.destination.name }} →
</button>
```

### Step 2: Component Fetches Categories

```typescript
// trip-stepper.component.ts
getDestinationCategories(destinationType: string) {
  const categories = getDestinationCategories(destinationType);
  
  // Convert generic categories to affiliate links
  return categories.map(category => ({
    name: category.name,
    icon: category.icon,
    url: this.affiliateLinkBuilder.buildAffiliateLink(
      category.searchQuery,
      this.selectedAffiliatePartner  // Dynamic partner selection
    ).url
  }));
}
```

### Step 3: Service Builds URL

```typescript
// AffiliateLinkBuilderService
buildAffiliateLink('beachwear sunscreen SPF', 'amazon') {
  const partner = AFFILIATE_PARTNERS['amazon'];
  const url = new URL(partner.baseUrl);
  
  url.searchParams.append('k', 'beachwear sunscreen SPF');
  url.searchParams.append('tag', 'tripsaver21-21');
  
  return {
    url: url.toString(),
    partner: 'amazon',
    searchQuery: 'beachwear sunscreen SPF',
  };
}
```

### Step 4: User Clicks Link

```html
<!-- trip-stepper.component.html -->
<a 
  [href]="item.url"
  target="_blank"
  (click)="trackAffiliateClick(item.name)">
  {{ item.icon }} {{ item.name }}
</a>
```

### Step 5: Analytics Tracking

```typescript
trackAffiliateClick(itemName: string) {
  const trackingParams = this.affiliateLinkBuilder.generateTrackingParams(
    this.selectedAffiliatePartner,
    itemName
  );
  
  gtag('event', 'affiliate_click', trackingParams);
  // Sends: { 
  //   event_category: 'AMAZON', 
  //   event_label: 'Beachwear & Sunscreen',
  //   partner: 'amazon',
  //   source: 'destination_explore_panel'
  // }
}
```

---

## Adding a New Affiliate Partner (Complete Walkthrough)

Let's say you want to add **Flipkart**:

### Step 1: Update `affiliate-partners.config.ts`

```typescript
// Change active: false → true
flipkart: {
  id: 'flipkart',
  name: 'Flipkart',
  baseUrl: 'https://www.flipkart.com/search',
  storeId: 'your-flipkart-affiliate-id',
  commission: 8,
  countries: ['IN'],
  active: true,  // ✅ Enable it
  queryParams: {
    searchKey: 'q',      // Flipkart uses 'q' for search
    storeParam: 'affid', // Flipkart uses 'affid' for affiliate
  },
},
```

### Step 2: Update Component to Allow Selection

```typescript
// trip-stepper.component.ts
selectedAffiliatePartner: AffiliatePartnerType = 'flipkart';  // Change default
```

### Step 3: (Optional) Add Partner Selector UI

```html
<!-- trip-stepper.component.html -->
<div class="partner-selector">
  <label>Shop from:</label>
  <select [(ngModel)]="component.selectedAffiliatePartner">
    <option value="amazon">Amazon</option>
    <option value="flipkart">Flipkart</option>
  </select>
</div>
```

**That's it!** The system will automatically:
- ✅ Generate Flipkart URLs instead of Amazon
- ✅ Use 'q' parameter instead of 'k'
- ✅ Use Flipkart's affiliate ID
- ✅ Track Flipkart clicks separately in GA4

---

## Advanced Scenarios

### A/B Testing Different Partners

```typescript
// Show Amazon to 50%, Flipkart to 50%
const randomPartner = Math.random() > 0.5 ? 'amazon' : 'flipkart';
this.selectedAffiliatePartner = randomPartner;
```

### Country-Specific Partner Selection

```typescript
const userCountry = 'IN';
const availablePartners = getActivePartnersForCountry(userCountry);
this.selectedAffiliatePartner = availablePartners[0].id;
```

### Commission-Based Partner Selection

```typescript
// Always show highest-commission partner
const activePartners = getAllActivePartners();
const bestPartner = activePartners.reduce((best, current) =>
  current.commission > best.commission ? current : best
);
this.selectedAffiliatePartner = bestPartner.id;
```

### Multi-Partner Display

```typescript
// Show links for all active partners
const links = this.affiliateLinkBuilder.buildAffiliateLinksMultiPartner(
  'beachwear sunscreen',
  ['amazon', 'flipkart', 'ebay']
);

// User sees: "Shop on Amazon | Shop on Flipkart | Shop on eBay"
```

---

## Configuration Checklist for New Partner

When adding a new affiliate partner, ensure:

- [ ] Partner configuration in `affiliate-partners.config.ts`
- [ ] Correct base URL for partner's search
- [ ] Correct parameter names for search query
- [ ] Correct parameter name for affiliate/store ID
- [ ] Store ID / Associate ID / Affiliate ID from partner
- [ ] List of supported countries
- [ ] Commission rate
- [ ] `active: true/false` flag
- [ ] Test generated URLs in browser
- [ ] Verify affiliate links work and track properly
- [ ] Add to GA4 event tracking labels

---

## Benefits of This Architecture

| Feature | Benefit |
|---------|---------|
| **Partner-Agnostic Categories** | Add 100+ new products without touching code |
| **Dynamic URL Generation** | Switch partners without redeploying |
| **Service-Based** | Reusable across components |
| **GA4 Integration** | Track partner performance separately |
| **Country Filtering** | Show relevant partners per region |
| **A/B Testing Ready** | Easy to test different partners |
| **Commission Tracking** | Monitor earning potential |
| **Scalable** | Add unlimited partners |

---

## File Dependencies

```
trip-stepper.component.ts
  ├── imports AffiliateLinkBuilderService
  ├── imports destination-categories.config
  └── uses selectedAffiliatePartner property
  
AffiliateLinkBuilderService
  └── imports affiliate-partners.config
  
affiliate-partners.config.ts
  └── (No dependencies - pure configuration)
  
destination-categories.config.ts
  └── (No dependencies - pure data)
```

---

## Next Steps

1. ✅ **Amazon** - Currently active and working
2. 🔄 **Flipkart** - Ready to activate (config complete)
3. 📋 **eBay** - Ready to activate (config complete)
4. 📋 **AliExpress** - Ready to activate (config complete)
5. 🚀 **[Your New Partner]** - Follow the walkthrough above

---

## Questions?

The system is designed to be self-documenting through types:

```typescript
// Types guide you:
type AffiliatePartnerType = 'amazon' | 'flipkart' | 'ebay' | 'alibaba';
interface AffiliatePartnerConfig { /* All required fields */ }
interface ProductCategory { /* All required fields */ }
```

All methods have JSDoc comments explaining parameters and return values.
