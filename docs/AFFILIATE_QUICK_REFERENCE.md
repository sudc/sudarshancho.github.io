# 🚀 Quick Reference: Adding a New Affiliate Partner

## TL;DR - 3 Step Process

### Step 1: Register Partner
File: `src/app/core/config/affiliate-partners.config.ts`

```typescript
export const AFFILIATE_PARTNERS: Record<AffiliatePartnerType, AffiliatePartnerConfig> = {
  // ... existing partners ...
  
  mypartner: {
    id: 'mypartner',
    name: 'My Partner Name',
    logo: '🎯',
    baseUrl: 'https://partner.com/search',
    storeId: 'your-store-id',
    commission: 5,
    countries: ['IN', 'US'],
    active: false,  // Set to true when ready
    queryParams: {
      searchKey: 'q',        // Parameter name for search term
      storeParam: 'aid',     // Parameter name for affiliate ID
    },
    metadata: {
      description: 'Partner description',
      affiliateUrl: 'https://partner.com/affiliate',
      terms: 'Partner Program Terms',
    },
  },
};
```

### Step 2: Update Type Definition (if new partner)

File: `src/app/core/config/affiliate-partners.config.ts`

```typescript
export type AffiliatePartnerType = 'amazon' | 'flipkart' | 'ebay' | 'alibaba' | 'mypartner';
```

### Step 3: Enable in Component

File: `src/app/components/trip-stepper/trip-stepper.component.ts`

```typescript
// Change this line:
selectedAffiliatePartner: AffiliatePartnerType = 'mypartner';  // Your new partner
```

**Done!** ✅ The system will automatically generate correct URLs.

---

## Configuration Fields Explained

| Field | Example | Required | Notes |
|-------|---------|----------|-------|
| `id` | `'amazon'` | ✅ | Unique identifier, matches type |
| `name` | `'Amazon'` | ✅ | Display name for UI |
| `logo` | `'🛍️'` | ✅ | Emoji or icon |
| `baseUrl` | `'https://amazon.in/s'` | ✅ | Partner's search endpoint |
| `storeId` | `'tripsaver21-21'` | ✅ | Your affiliate/store ID |
| `commission` | `5` | ✅ | Estimated commission % |
| `countries` | `['IN', 'US']` | ✅ | ISO country codes |
| `active` | `true` | ✅ | Enable/disable partner |
| `queryParams.searchKey` | `'k'` | ✅ | Search parameter name |
| `queryParams.storeParam` | `'tag'` | ✅ | Affiliate ID parameter name |
| `queryParams.affiliateParam` | `'aid'` | ❌ | Optional additional param |
| `metadata` | `{ description, ... }` | ❌ | Optional metadata |

---

## Finding Partner Parameters

Most affiliate platforms use predictable patterns:

### Amazon
```
URL: https://www.amazon.in/s?k=SEARCH&tag=STORE_ID
searchKey: 'k'
storeParam: 'tag'
```

### Flipkart
```
URL: https://www.flipkart.com/search?q=SEARCH&affid=STORE_ID
searchKey: 'q'
storeParam: 'affid'
```

### eBay
```
URL: https://www.ebay.com/sch/i.html?_nkw=SEARCH&_trksid=STORE_ID
searchKey: '_nkw'
storeParam: '_trksid'
```

**How to find for a new partner:**
1. Search for any product on partner's site
2. Copy the URL
3. Identify the search parameter (usually `q`, `search`, `keyword`)
4. Identify the affiliate parameter (usually in partner docs)

---

## Using AffiliateLinkBuilderService

```typescript
// Inject service
constructor(private affiliateBuilder: AffiliateLinkBuilderService) {}

// Build link for specific partner
const link = this.affiliateBuilder.buildAffiliateLink(
  'travel backpack',
  'amazon'
);
// Returns: { url: '...', partner: 'amazon', ... }

// Build links for multiple partners
const links = this.affiliateBuilder.buildAffiliateLinksMultiPartner(
  'travel backpack',
  ['amazon', 'flipkart']
);

// Get tracking params for GA4
const params = this.affiliateBuilder.generateTrackingParams(
  'amazon',
  'Travel Backpack'
);
// Returns: { event_category: 'AMAZON', event_label: 'Travel Backpack', ... }

// Check partner availability
const available = this.affiliateBuilder.isPartnerAvailableInCountry(
  'flipkart',
  'IN'
);

// Get commission rate
const commission = this.affiliateBuilder.getCommissionRate('amazon');
// Returns: 5
```

---

## Testing Your New Partner

### 1. Check URL Generation
```typescript
const link = this.affiliateBuilder.buildAffiliateLink(
  'test product',
  'mypartner'
);
console.log(link.url);
// Should output: https://partner.com/search?q=test+product&aid=store-id
```

### 2. Verify URL Works
- Open the generated URL in a browser
- Confirm search results appear
- Confirm tracking/affiliate ID is in URL

### 3. Test GA4 Tracking
```typescript
this.affiliateBuilder.generateTrackingParams('mypartner', 'Test Item');
// Verify event_category is 'MYPARTNER'
```

### 4. Test in Component
- Change `selectedAffiliatePartner = 'mypartner'`
- Click "Explore" on a destination
- Verify affiliate links show new partner's results
- Check GA4 tracks new partner correctly

---

## Example: Adding Meesho

```typescript
// In affiliate-partners.config.ts

meesho: {
  id: 'meesho',
  name: 'Meesho',
  logo: '🛒',
  baseUrl: 'https://meesho.com/search',
  storeId: 'tripsaver_aff',
  commission: 7,
  countries: ['IN'],
  active: true,  // Ready to use
  queryParams: {
    searchKey: 'q',
    storeParam: 'affiliate_id',
  },
  metadata: {
    description: 'Social commerce platform in India',
    affiliateUrl: 'https://business.meesho.com/affiliate',
    terms: 'Meesho Affiliate Program',
  },
},
```

Then in type definition:
```typescript
export type AffiliatePartnerType = 'amazon' | 'flipkart' | 'meesho';
```

---

## Troubleshooting

### Partner Links Not Generating
**Check:**
- [ ] Partner is registered in `AFFILIATE_PARTNERS`
- [ ] Partner has `active: true`
- [ ] `searchKey` and `storeParam` are correct
- [ ] URL encoding is working

### GA4 Not Tracking New Partner
**Check:**
- [ ] Partner is registered with correct ID
- [ ] Component's `selectedAffiliatePartner` matches partner ID
- [ ] GA4 is initialized in index.html
- [ ] Check browser console for gtag errors

### URLs Lead to Wrong Results
**Check:**
- [ ] `searchKey` parameter name matches partner's API
- [ ] Search term is URL-encoded correctly
- [ ] Partner's search endpoint format hasn't changed

---

## File Locations Reference

```
📁 src/app/core/
├── 📁 config/
│   ├── 📄 affiliate-partners.config.ts      ← Register partners here
│   └── 📄 destination-categories.config.ts  ← Product categories
├── 📁 services/
│   └── 📄 affiliate-link-builder.service.ts ← URL generation logic
└── 📁 engines/
    └── [recommendation engines]

📁 src/app/components/
└── 📁 trip-stepper/
    ├── 📄 trip-stepper.component.ts         ← Change selectedAffiliatePartner here
    ├── 📄 trip-stepper.component.html       ← Link display template
    └── 📄 trip-stepper.component.scss       ← Link styles
```

---

## Common Parameters by Region

### India (IN)
- Amazon: `tag=` parameter
- Flipkart: `affid=` parameter
- Meesho: `affiliate_id=` parameter

### USA (US)
- Amazon: `tag=` parameter
- eBay: `_trksid=` parameter
- Walmart: `affiliateID=` parameter

### UK (UK)
- Amazon: `tag=` parameter
- eBay: `_trksid=` parameter

---

## When to Add New Partner?

✅ **Add when:**
- Partner has affiliate program
- Store ID / Associate ID obtained
- Parameter naming confirmed
- Commission rate negotiated

❌ **Don't add:**
- Partner doesn't have affiliate program
- Store ID not available
- No commission agreed
- Partner terms prohibit monetization

---

## Support & Questions

If stuck:
1. Check `SCALABLE_AFFILIATE_ARCHITECTURE.md` for detailed guide
2. Review existing partner configs for examples
3. Test URLs manually first
4. Check GA4 for tracking errors
5. Verify partner API hasn't changed
