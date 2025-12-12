# TripSaver - Affiliate Setup Guide

## Overview
TripSaver is an affiliate marketing platform that helps users save money on hotels, flights, health services, insurance, and deals by comparing prices across multiple platforms.

## Categories Defined

### 1. **Hotels**
- **Platforms**: Booking.com, Agoda, MakeMyTrip
- **Commission Range**: 3-7%
- **Affiliate Networks**: Booking.com Affiliate Partner Program, Admitad, Cuelinks

### 2. **Flights**
- **Platforms**: Cleartrip, MakeMyTrip, TravelPayouts
- **Commission Range**: 2-4%
- **Affiliate Networks**: TravelPayouts, Admitad, INRDeals

### 3. **Health & Labs**
- **Platforms**: 1mg, PharmEasy, Healthians, Thyrocare
- **Commission Range**: 5-20%
- **Affiliate Networks**: Cuelinks, Admitad, INRDeals

### 4. **Insurance**
- **Platforms**: PolicyBazaar
- **Commission Range**: Varies by policy type
- **Affiliate Networks**: PolicyBazaar Affiliate Program, Cuelinks

### 5. **Deals / Trending Offers**
- **Platforms**: Amazon, Flipkart, Swiggy, Zomato
- **Commission Range**: 1-15%
- **Affiliate Networks**: Amazon Associates, Flipkart Affiliate, Cuelinks

---

## Homepage Layout Structure

### 1. **Hero Banner**
- Gradient background with compelling headline
- Quick access cards for main categories
- CTA button to scroll to categories
- Mobile responsive design

### 2. **Category Cards Section**
- Grid layout displaying all 5 categories
- Each card shows:
  - Category icon (Material Icons)
  - Category name and description
  - Affiliated platforms as clickable badges
  - Hover effects for better UX
- Click on card or badge redirects to affiliate link

### 3. **Featured Deals Section**
- Trending deals carousel/grid
- Deal cards include:
  - Discount badge
  - Platform name
  - Deal title and description
  - Expiry countdown
  - CTA button
- Dynamic data from `featured-deals.json`

### 4. **Existing Sections**
- Popular Destinations
- Top Deals
- Travel Guides
- Why Choose Us

### 5. **Footer**
- Company information
- Quick links (About, How It Works, Careers, Blog)
- Support links (Help Center, Contact, FAQ, Terms)
- Legal links (Privacy, Cookies, Disclaimer, Affiliate Disclosure)
- Social media links
- Affiliate disclosure disclaimer box
- Copyright notice

---

## Affiliate Link Collection Steps

### Step 1: Sign Up for Affiliate Networks

#### Primary Networks (India-focused):
1. **INRDeals** - https://www.inrdeals.com/
   - Multi-category affiliate network
   - Supports hotels, flights, health, deals
   
2. **Cuelinks** - https://www.cuelinks.com/
   - Universal affiliate linking platform
   - Auto-converts normal links to affiliate links
   
3. **Admitad** - https://www.admitad.com/
   - International network with Indian merchants
   - Good for travel and e-commerce

#### Platform-Specific Programs:
4. **Booking.com Affiliate Partner Program**
   - Direct partnership
   - Higher commission rates
   - https://www.booking.com/affiliate

5. **TravelPayouts**
   - Flight search and booking aggregator
   - https://www.travelpayouts.com/

6. **Amazon Associates India**
   - For deals and product recommendations
   - https://affiliate.amazon.in/

7. **Flipkart Affiliate**
   - E-commerce deals
   - https://affiliate.flipkart.com/

### Step 2: Generate Affiliate Links

For each category, create affiliate links for:

#### Hotels:
- Top destinations (Mumbai, Delhi, Bangalore, Goa, etc.)
- Booking.com search pages with destination parameters
- Agoda city pages
- MakeMyTrip hotel listing pages

#### Flights:
- Popular routes (Mumbai-Delhi, Delhi-Bangalore, etc.)
- Cleartrip flight search
- MakeMyTrip flights
- TravelPayouts search widgets

#### Health & Labs:
- Specific test packages (Full Body Checkup, Thyroid Test, etc.)
- Medicine categories
- Healthians and Thyrocare test links
- 1mg and PharmEasy category pages

#### Insurance:
- Travel insurance comparison pages
- Health insurance comparison pages
- PolicyBazaar direct links

#### Deals:
- Category-specific pages (Electronics, Fashion, etc.)
- Festival/sale pages
- Amazon best sellers
- Flipkart trending products

### Step 3: Maintain Affiliate Link Spreadsheet

Create a spreadsheet with the following columns:

| Category | Destination/Service | Platform | Affiliate URL | Commission % | Status | Notes | Last Updated |
|----------|-------------------|----------|---------------|-------------|--------|-------|--------------|
| Hotels | Mumbai | Booking.com | [URL] | 5% | Active | - | 2025-12-12 |
| Flights | Mumbai-Delhi | Cleartrip | [URL] | 3% | Active | - | 2025-12-12 |
| Health | Full Body Checkup | Healthians | [URL] | 15% | Active | - | 2025-12-12 |

### Step 4: Update JSON Files

Replace placeholder links in:
- `src/assets/data/affiliate-links.json`
- `src/assets/data/featured-deals.json`
- `src/assets/data/categories.json`

---

## Implementation Checklist

### ✅ Completed:
- [x] Define 5 main categories with affiliate partners
- [x] Create category data structure (`categories.json`)
- [x] Create affiliate link management system (`affiliate-links.json`)
- [x] Build hero banner component
- [x] Build category cards component
- [x] Build featured deals component
- [x] Build footer with About/Contact/Disclaimer
- [x] Integrate all components into home page
- [x] Add Material Icons and Font Awesome
- [x] Setup HttpClient for data loading

### 🔄 Next Steps:
- [ ] Sign up for affiliate networks (INRDeals, Cuelinks, Admitad, Booking.com)
- [ ] Generate real affiliate links for each category
- [ ] Create spreadsheet to track affiliate URLs
- [ ] Replace placeholder links with actual affiliate URLs
- [ ] Test all affiliate redirects
- [ ] Add affiliate disclosure page
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Setup analytics to track clicks and conversions
- [ ] Implement SEO optimization for category pages

---

## File Structure

```
src/
├── app/
│   ├── pages/
│   │   └── home/
│   │       ├── home.component.ts (Updated with new components)
│   │       ├── home.component.html (New layout)
│   │       └── home.component.css (Additional styles)
│   └── shared/
│       └── components/
│           ├── hero-banner/
│           │   ├── hero-banner.component.ts
│           │   ├── hero-banner.component.html
│           │   └── hero-banner.component.scss
│           ├── category-cards/
│           │   ├── category-cards.component.ts
│           │   ├── category-cards.component.html
│           │   └── category-cards.component.scss
│           ├── featured-deals/
│           │   ├── featured-deals.component.ts
│           │   ├── featured-deals.component.html
│           │   └── featured-deals.component.scss
│           └── footer/
│               ├── footer.component.ts
│               ├── footer.component.html
│               └── footer.component.scss
└── assets/
    └── data/
        ├── categories.json (All categories and affiliates)
        ├── affiliate-links.json (Detailed affiliate URLs)
        └── featured-deals.json (Trending deals data)
```

---

## Updating Affiliate Links

To update affiliate links after signup:

1. Open `src/assets/data/affiliate-links.json`
2. Replace `PLACEHOLDER_AFFILIATE_LINK` with actual affiliate URL
3. Update commission percentage
4. Change status from "pending" to "active"
5. Add notes about tracking parameters if needed

Example:
```json
{
  "destination": "Mumbai",
  "platform": "Booking.com",
  "url": "https://www.booking.com/searchresults.html?city=-2092174&aid=YOUR_AFFILIATE_ID",
  "commission": "5%",
  "notes": "Using Booking.com Partner Program"
}
```

---

## Legal Requirements

### Affiliate Disclosure
- Clearly display on every page that contains affiliate links
- Include in footer (already implemented)
- Create dedicated disclosure page
- Follow FTC guidelines

### Privacy Policy
- Disclose use of cookies for affiliate tracking
- Explain data collection practices
- User rights and contact information

### Terms of Service
- Define usage terms
- Limitation of liability
- Third-party platform disclaimers

---

## Monetization Strategy

1. **Commission-based**: Earn when users make bookings through affiliate links
2. **CPM/CPC**: Some networks pay per click or impression
3. **Bonus programs**: Performance bonuses from affiliate networks
4. **Exclusive deals**: Partner directly for better rates

---

## Testing Before Launch

1. Verify all affiliate links redirect correctly
2. Test on multiple devices and browsers
3. Check mobile responsiveness
4. Validate affiliate tracking parameters
5. Test category filtering and search
6. Ensure deals expiry logic works
7. Verify footer links
8. Test social media sharing

---

## Support & Resources

- **Booking.com Affiliate**: https://www.booking.com/affiliate
- **Admitad India**: https://www.admitad.com/en/webmaster/
- **Cuelinks**: https://www.cuelinks.com/
- **INRDeals**: https://www.inrdeals.com/

For questions or issues, refer to the respective affiliate network's documentation.
