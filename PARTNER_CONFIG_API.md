# 🚀 New Partner Config API - Quick Reference

## 📁 Import Statement

```typescript
import { 
  PARTNERS, 
  getActivePartners, 
  getPartner, 
  buildPartnerUrl,
  getPartnersForDisplay
} from '../../../core/config/partners.config';
```

---

## 🔧 Common Use Cases

### **1. Build Affiliate URL**

```typescript
// Hotel search URL
const hotelUrl = buildPartnerUrl('agoda', 'hotels', {
  city: 'Mumbai',
  checkIn: '2025-12-20',
  checkOut: '2025-12-25',
  adults: 2
});
// → https://www.agoda.com/search?cid=1955073&city=Mumbai&...

// Generic search URL
const searchUrl = buildPartnerUrl('agoda', 'search', {
  destination: 'Goa'
});
// → https://www.agoda.com/search?cid=1955073&city=Goa&hl=en-us
```

### **2. Get All Active Partners**

```typescript
const activePartners = getActivePartners();
// Returns: [{ id: 'agoda', name: 'agoda', displayName: 'Agoda', ... }]

console.log(`We have ${activePartners.length} active partners`);
// → "We have 2 active partners" (Agoda + MakeMyTrip)
```

### **3. Get Specific Partner**

```typescript
const agoda = getPartner('agoda');
if (agoda) {
  console.log(agoda.displayName); // → "Agoda"
  console.log(agoda.color);       // → "#FF6600"
  console.log(agoda.affiliateId); // → "1955073"
}

const bookingcom = getPartner('bookingcom');
// → null (inactive partner)
```

### **4. Footer/Display Links**

```typescript
const footerLinks = getPartnersForDisplay();
// Returns: [
//   { id: 'agoda', name: 'Agoda', url: '...', logo: '...', color: '#FF6600' },
//   { id: 'makemytrip', name: 'MakeMyTrip', url: '...', logo: '...', color: '#E73C34' }
// ]

// Use in template
footerLinks.forEach(partner => {
  console.log(`${partner.name}: ${partner.url}`);
});
```

### **5. Direct URL Builder (Advanced)**

```typescript
const partner = getPartner('agoda');
if (partner) {
  const url = partner.urls.hotels({
    city: 'Dubai',
    adults: 2,
    rooms: 1
  });
  console.log(url);
}
```

---

## 🔄 Migration Examples

### **Before (Old API)**

```typescript
// ❌ OLD - Multiple imports
import { getAgodaHotelLink } from '../../../core/config/agoda-affiliate.config';
import { getPartnerLink } from '../../../core/config/partner-links.config';

// ❌ OLD - Inconsistent API
const agodaUrl = getAgodaHotelLink({ city: 'Mumbai' });
const mmtUrl = getPartnerLink('makemytrip');
```

### **After (New API)**

```typescript
// ✅ NEW - Single import
import { buildPartnerUrl } from '../../../core/config/partners.config';

// ✅ NEW - Consistent API
const agodaUrl = buildPartnerUrl('agoda', 'hotels', { city: 'Mumbai' });
const mmtUrl = buildPartnerUrl('makemytrip', 'search', { destination: 'Mumbai' });
```

---

## 📋 Component Examples

### **Example 1: Popular Destinations**

```typescript
import { Component } from '@angular/core';
import { buildPartnerUrl } from '../../../core/config/partners.config';

export class PopularDestinationsComponent {
  destinations = [
    {
      city: 'Goa',
      country: 'India',
      imageUrl: '/assets/goa.jpg',
      affiliateUrl: buildPartnerUrl('agoda', 'hotels', { city: 'Goa' })
    },
    {
      city: 'Dubai',
      country: 'UAE',
      imageUrl: '/assets/dubai.jpg',
      affiliateUrl: buildPartnerUrl('agoda', 'hotels', { city: 'Dubai' })
    }
  ];
}
```

### **Example 2: Footer Links**

```typescript
import { Component } from '@angular/core';
import { getPartnersForDisplay } from '../../../core/config/partners.config';

export class FooterComponent {
  partnerLinks = getPartnersForDisplay();
  // Auto-populates with all active partners
  // Updates automatically when partners.config changes
}
```

### **Example 3: Dynamic Affiliate Links**

```typescript
import { Component } from '@angular/core';
import { buildPartnerUrl, getActivePartners } from '../../../core/config/partners.config';

export class HotelCardComponent {
  generateAffiliateLinks(hotelCity: string) {
    // Get all active partners
    const partners = getActivePartners();
    
    // Generate affiliate link for each
    return partners.map(partner => ({
      name: partner.displayName,
      url: buildPartnerUrl(partner.id, 'hotels', { city: hotelCity }),
      color: partner.color
    }));
  }
}
```

---

## 🎯 Type Definitions

### **HotelParams**
```typescript
interface HotelParams {
  destination?: string;
  city?: string;
  cityId?: string;
  hotelId?: string;
  checkIn?: string;      // Format: 'YYYY-MM-DD'
  checkOut?: string;     // Format: 'YYYY-MM-DD'
  adults?: number;
  rooms?: number;
}
```

### **SearchParams**
```typescript
interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
}
```

### **PartnerConfig**
```typescript
interface PartnerConfig {
  id: string;              // 'agoda', 'makemytrip'
  name: string;            // 'agoda'
  displayName: string;     // 'Agoda'
  active: boolean;         // true/false
  affiliateId: string;     // '1955073'
  logo?: string;           // URL to logo
  color: string;           // '#FF6600'
  urls: {
    hotels: (params?: HotelParams) => string;
    search: (params?: SearchParams) => string;
  };
  descriptions: {
    general: string;
    specific: string;
  };
}
```

---

## ⚡ Performance Tips

### **1. Cache Partner References**

```typescript
// ✅ GOOD - Cache in constructor
export class MyComponent {
  private agoda = getPartner('agoda');
  
  generateUrl(city: string) {
    return this.agoda?.urls.hotels({ city });
  }
}

// ❌ BAD - Repeated lookups
export class MyComponent {
  generateUrl(city: string) {
    return getPartner('agoda')?.urls.hotels({ city });
  }
}
```

### **2. Use getPartnersForDisplay() for UI**

```typescript
// ✅ GOOD - Optimized for display
const partners = getPartnersForDisplay();

// ❌ BAD - Manual mapping
const partners = getActivePartners().map(p => ({
  id: p.id,
  name: p.displayName,
  url: p.urls.search({}),
  ...
}));
```

---

## 🔍 Debugging Tips

### **Check Active Partners**
```typescript
console.log('Active partners:', getActivePartners().length);
getActivePartners().forEach(p => {
  console.log(`- ${p.displayName} (ID: ${p.id})`);
});
```

### **Test URL Generation**
```typescript
const testUrl = buildPartnerUrl('agoda', 'hotels', { city: 'TestCity' });
console.log('Generated URL:', testUrl);
// Should include affiliate ID (cid=1955073)
```

### **Verify Partner Exists**
```typescript
const partner = getPartner('agoda');
if (!partner) {
  console.error('Partner not found or inactive');
} else {
  console.log('Partner active:', partner.displayName);
}
```

---

## 🚨 Common Mistakes

### **1. Wrong Partner ID**
```typescript
// ❌ WRONG
buildPartnerUrl('Agoda', 'hotels', { city: 'Mumbai' });
// Partner IDs are lowercase: 'agoda', not 'Agoda'

// ✅ CORRECT
buildPartnerUrl('agoda', 'hotels', { city: 'Mumbai' });
```

### **2. Wrong URL Type**
```typescript
// ❌ WRONG
buildPartnerUrl('agoda', 'hotel', { city: 'Mumbai' });
// Type must be 'hotels' or 'search'

// ✅ CORRECT
buildPartnerUrl('agoda', 'hotels', { city: 'Mumbai' });
```

### **3. Null Check Missing**
```typescript
// ❌ WRONG
const partner = getPartner('bookingcom');
const url = partner.urls.hotels({ city: 'Mumbai' });
// bookingcom is inactive, getPartner returns null

// ✅ CORRECT
const partner = getPartner('bookingcom');
if (partner) {
  const url = partner.urls.hotels({ city: 'Mumbai' });
}
```

---

## 📚 Related Files

- **Config**: `src/app/core/config/partners.config.ts` (278 lines)
- **Engine**: `src/app/core/services/recommendation/recommendation.engine.ts`
- **Architecture**: `CORE_ARCHITECTURE_FLOW.md`
- **Cleanup**: `CLEANUP_COMPLETED.md`

---

**Last Updated**: December 13, 2025  
**API Version**: 1.0 (Stable)
