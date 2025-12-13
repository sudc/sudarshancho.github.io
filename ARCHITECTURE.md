# TripSaver Affiliate Partner Architecture

## 🎯 Core Design Principles

1. **Single Source of Truth**: All partner configurations in one file
2. **Easy Onboarding**: Add partner object, set enabled = true
3. **Easy Offboarding**: Set enabled = false (no code changes needed)
4. **Automatic Adaptation**: System detects partner count and adjusts UI
5. **Future Scalable**: Works with 1 partner or 100 partners

---

## 📁 Architecture Overview

```
src/app/core/
├── config/
│   └── affiliate-partners.config.ts    # All partner configs
├── services/
│   ├── comparison/
│   │   └── comparison.service.ts       # Smart comparison logic
│   └── analytics/
│       └── analytics.service.ts        # Tracking & UTM
└── shared/
    └── components/
        └── comparison-card/
            └── comparison-card.component.ts  # Reusable UI
```

---

## 🚀 How It Works

### **Current State: Single Partner (Agoda)**
```
When user searches → Show 2-3 similar hotels from Agoda
Algorithm: Rating + Price + Location similarity
```

### **Future State: Multiple Partners**
```
When user searches → Show best option from each partner (3-4 total)
Algorithm: Compare across partners, rank by best value
```

---

## 📝 Onboarding New Partner (3 Steps)

### Step 1: Add Partner Configuration

Edit `affiliate-partners.config.ts`:

```typescript
{
  id: 'newpartner',
  name: 'newpartner',
  displayName: 'New Partner',
  enabled: true,  // ✅ Set to true
  affiliateId: 'YOUR_AFFILIATE_ID',
  logoUrl: 'https://partner-logo-url.com/logo.png',
  color: '#FF5733',
  priority: 2,  // Lower = higher priority in UI
  categories: ['hotels', 'flights', 'all'],
  
  urls: {
    base: 'https://www.newpartner.com',
    hotels: (params) => {
      // Build hotel search URL with affiliate ID
      return `https://www.newpartner.com/hotels?id=${params.hotelId}&affiliate=YOUR_AFFILIATE_ID`;
    },
    flights: (params) => {
      // Build flight search URL with affiliate ID
      return `https://www.newpartner.com/flights?from=${params.from}&to=${params.to}&affiliate=YOUR_AFFILIATE_ID`;
    }
  }
}
```

### Step 2: Add Data Service (if needed)

Create `newpartner-data.service.ts`:

```typescript
@Injectable({ providedIn: 'root' })
export class NewPartnerDataService {
  
  getHotels(city: string): Observable<NewPartnerHotel[]> {
    // Fetch data from partner API or CSV
    return this.http.get<NewPartnerHotel[]>(`/api/newpartner/hotels?city=${city}`);
  }
}
```

### Step 3: Update Comparison Service

Edit `comparison.service.ts`:

```typescript
// In getBestOptionsFromMultiplePartners method
private getBestOptionsFromMultiplePartners(...) {
  const partnerRequests = partners.map(partner => {
    if (partner.id === 'agoda') return this.getAgodaBestOption(options);
    if (partner.id === 'newpartner') return this.getNewPartnerBestOption(options);  // ✅ Add this
    return of(null);
  });
}

// Add new method
private getNewPartnerBestOption(options: ComparisonOptions): Observable<ComparisonResult | null> {
  return this.newPartnerService.getHotels(options.city).pipe(
    map(hotels => {
      if (hotels.length === 0) return null;
      const best = hotels[0]; // Your algorithm here
      return this.mapNewPartnerToComparison(best);
    })
  );
}
```

**That's it!** No changes needed in any page components.

---

## 🔄 Offboarding Partner (1 Step)

Edit `affiliate-partners.config.ts`:

```typescript
{
  id: 'oldpartner',
  name: 'oldpartner',
  displayName: 'Old Partner',
  enabled: false,  // ❌ Set to false
  // ... rest of config stays the same
}
```

**Done!** Partner automatically removed from entire site.

---

## 💡 Usage Examples in Pages

### **Hotels Page - Show Similar Hotels**

```typescript
import { ComparisonService, ComparisonOptions } from '@core/services/comparison/comparison.service';
import { ComparisonCardComponent } from '@shared/components/comparison-card/comparison-card.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, ComparisonCardComponent],
  template: `
    <section class="similar-hotels">
      <h2>Similar Hotels You Might Like</h2>
      <div class="comparison-grid">
        <app-comparison-card 
          *ngFor="let result of similarHotels; let i = index"
          [result]="result"
          [featured]="i === 0"
          (bookClick)="onBookingClick($event)">
        </app-comparison-card>
      </div>
    </section>
  `
})
export class HotelsComponent implements OnInit {
  similarHotels: ComparisonResult[] = [];

  constructor(private comparisonService: ComparisonService) {}

  ngOnInit() {
    const options: ComparisonOptions = {
      category: 'hotels',
      city: 'Mumbai',
      maxResults: 3,
      sortBy: 'rating',
      minRating: 4
    };

    this.comparisonService.compareHotels(options).subscribe(results => {
      this.similarHotels = results;
    });
  }

  onBookingClick(result: ComparisonResult) {
    this.comparisonService.trackComparisonClick(result);
  }
}
```

### **Search Results Page - Compare Best Options**

```typescript
@Component({
  selector: 'app-search-results',
  template: `
    <section class="search-results">
      <h1>Search Results for "{{ searchQuery }}"</h1>
      
      <div class="comparison-mode-badge">
        {{ comparisonMode === 'single' ? 'Showing similar options' : 'Comparing across partners' }}
      </div>

      <div class="results-grid">
        <app-comparison-card 
          *ngFor="let result of searchResults; let i = index"
          [result]="result"
          [featured]="i === 0"
          (bookClick)="onBookingClick($event)">
        </app-comparison-card>
      </div>
    </section>
  `
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: ComparisonResult[] = [];
  comparisonMode: 'single' | 'multi' = 'single';

  constructor(
    private route: ActivatedRoute,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });
  }

  performSearch() {
    const options: ComparisonOptions = {
      category: 'hotels',
      searchQuery: this.searchQuery,
      maxResults: 4,
      sortBy: 'relevance'
    };

    // Get comparison summary
    this.comparisonService.getComparisonSummary(options).subscribe(summary => {
      this.comparisonMode = summary.mode;
      console.log(`Active partners: ${summary.activePartners.join(', ')}`);
    });

    // Get results
    this.comparisonService.compareHotels(options).subscribe(results => {
      this.searchResults = results;
    });
  }

  onBookingClick(result: ComparisonResult) {
    this.comparisonService.trackComparisonClick(result);
  }
}
```

### **Hotel Detail Page - Show Alternatives**

```typescript
@Component({
  selector: 'app-hotel-detail',
  template: `
    <section class="hotel-detail">
      <!-- Main hotel info -->
      <div class="main-hotel">...</div>

      <!-- Alternative options -->
      <section class="alternatives">
        <h2>Alternative Hotels Nearby</h2>
        <div class="alternatives-grid">
          <app-comparison-card 
            *ngFor="let alt of alternatives"
            [result]="alt"
            (bookClick)="onBookingClick($event)">
          </app-comparison-card>
        </div>
      </section>
    </section>
  `
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  alternatives: ComparisonResult[] = [];

  constructor(private comparisonService: ComparisonService) {}

  ngOnInit() {
    // After loading main hotel...
    this.loadAlternatives();
  }

  loadAlternatives() {
    const options: ComparisonOptions = {
      category: 'hotels',
      city: this.hotel.city,
      priceRange: {
        min: this.hotel.price - 1000,
        max: this.hotel.price + 1000
      },
      minRating: this.hotel.rating - 0.5,
      maxResults: 3
    };

    this.comparisonService.compareHotels(options).subscribe(results => {
      // Exclude current hotel
      this.alternatives = results.filter(r => r.id !== this.hotel.id);
    });
  }

  onBookingClick(result: ComparisonResult) {
    this.comparisonService.trackComparisonClick(result);
  }
}
```

---

## 🎨 Automatic UI Adaptation

The system automatically adapts based on active partners:

### **1 Active Partner (Current)**
```
┌─────────────────────┐
│   Similar Hotels    │
├─────────────────────┤
│  Hotel A - Agoda    │
│  Hotel B - Agoda    │
│  Hotel C - Agoda    │
└─────────────────────┘
Algorithm: Same partner, different hotels
```

### **2-4 Active Partners (Future)**
```
┌─────────────────────┐
│  Best from Each     │
├─────────────────────┤
│  Hotel A - Agoda    │
│  Hotel B - Booking  │
│  Hotel C - MMT      │
│  Hotel D - Goibibo  │
└─────────────────────┘
Algorithm: Different partners, best match from each
```

---

## 📊 Smart Algorithm Details

### **Single Partner Mode: Similarity Algorithm**

```typescript
Relevance Score = (Rating × 60%) + (Price Value × 30%) + (Reviews × 10%)

Filters:
- Same location/city
- Similar price range (±20%)
- Minimum rating threshold
- Sort by relevance score
- Return top 2-3 results
```

### **Multi-Partner Mode: Comparison Algorithm**

```typescript
Best Match Per Partner:
1. Get top hotel from each partner
2. Apply same filters (location, price, rating)
3. Calculate relevance score for each
4. Rank all results together
5. Return top 3-4 across all partners

Ensures:
- Diversity (different partners)
- Quality (best from each)
- Relevance (user's criteria)
```

---

## 🔗 Affiliate Link Tracking

All links automatically include:
- ✅ Partner affiliate ID
- ✅ UTM tracking parameters
- ✅ Analytics event tracking

```typescript
// Automatic in comparison.service.ts
const trackedUrl = this.analytics.addUTMToUrl(
  partnerUrl, 
  'tripsaver_comparison',  // utm_source
  'comparison_tool'        // utm_medium
);

// On click
this.analytics.trackAffiliateClick(
  partnerName,
  'comparison',
  hotelName,
  price
);
```

---

## 🎯 Benefits Summary

### **For Development**
✅ Single file to manage all partners  
✅ No page-level code changes needed  
✅ Automatic UI adaptation  
✅ Type-safe configuration  

### **For Business**
✅ Easy partner onboarding (3 steps)  
✅ Easy partner offboarding (1 step)  
✅ A/B testing partners (just toggle enabled)  
✅ Priority control for partner display  

### **For Users**
✅ Always see relevant options  
✅ Best value across all partners  
✅ Clean, consistent UI  
✅ Direct affiliate links (no middleman)  

---

## 🚦 Current vs Future State

| Feature | Current (Agoda Only) | Future (Multi-Partner) |
|---------|---------------------|------------------------|
| Partners | 1 (Agoda) | 2-4+ |
| Comparison | Similar hotels from Agoda | Best from each partner |
| Algorithm | Similarity-based | Cross-partner ranking |
| UI Mode | Single partner | Multi-partner |
| Onboarding | ✅ Ready | Add config + service |

---

## 📝 Checklist: Adding New Partner

- [ ] Add partner object to `affiliate-partners.config.ts`
- [ ] Set `enabled: true` and add `affiliateId`
- [ ] Define `urls.hotels()` and `urls.flights()` functions
- [ ] Create data service (if needed)
- [ ] Add mapping in `comparison.service.ts`
- [ ] Test URL generation
- [ ] Test comparison results
- [ ] Verify affiliate tracking
- [ ] Deploy! 🚀

---

## 🔧 Testing

```typescript
// Test partner configuration
const partner = AffiliatePartnerManager.getPartner('agoda');
console.log('Partner enabled:', partner?.enabled);

// Test URL building
const url = AffiliatePartnerManager.buildHotelUrl('agoda', { 
  city: 'Mumbai',
  checkIn: '2025-12-20' 
});
console.log('Generated URL:', url);

// Test comparison
this.comparisonService.compareHotels({
  category: 'hotels',
  city: 'Goa',
  maxResults: 3
}).subscribe(results => {
  console.log('Comparison results:', results);
});
```

---

## 🎉 Result

**Simple, scalable, future-proof architecture that works with any number of partners!**

- Change one config file → Entire site adapts
- Add partner → Automatically appears everywhere
- Remove partner → Automatically disappears everywhere
- No technical debt
- No code duplication
- Easy to maintain
