# TripSaver Pages Documentation

## Overview
This document describes all the pages created for the TripSaver travel comparison website.

## Pages Created

### 1. Hotels Page (`/hotels`)
**Location:** `src/app/pages/hotels/`

**Features:**
- List of 6 top destinations (Goa, Bangalore, Manali, Ooty, Jaipur, Kerala)
- Each destination card displays:
  - Destination image
  - Number of available hotels
  - Average price per night
  - Three affiliate booking buttons:
    - Booking.com
    - Agoda
    - MakeMyTrip
- Booking tips section with 3 helpful tips
- Fully responsive design

**Key Data:**
- Destination information with affiliate URLs
- Click tracking for analytics
- Hover effects and animations

---

### 2. Flights Page (`/flights`)
**Location:** `src/app/pages/flights/`

**Features:**
- 6 popular flight routes:
  - Bangalore ↔ Goa
  - Delhi ↔ Mumbai
  - Mumbai ↔ Goa
  - Delhi ↔ Bangalore
  - Chennai ↔ Delhi
  - Kolkata ↔ Mumbai
- Each route card shows:
  - From/To cities with airport codes
  - Flight duration
  - Average price
  - Popular badge for trending routes
  - Three affiliate booking buttons:
    - Booking.com
    - MakeMyTrip
    - Goibibo
- Flight booking tips section with 6 helpful tips
- Fully responsive grid layout

**Key Features:**
- Route visualization with plane icon
- Price comparison
- Platform-specific affiliate links
- Click tracking

---

### 3. Deals Page (`/deals`)
**Location:** `src/app/pages/deals/`

**Features:**
- Featured deals section (3 top deals)
- All deals section with category filters:
  - All Deals
  - Hotels
  - Flights
  - Packages
- 8 travel deals including:
  - Hotels under ₹2,000
  - Flight discounts
  - Holiday packages
- Each deal card displays:
  - Deal image
  - Category badge
  - Title and description
  - Original vs discounted price
  - Discount percentage
  - Platform name
  - Validity date
  - CTA button
- Newsletter subscription section
- Dynamic filtering by category

**Key Features:**
- Interactive filter tabs
- Featured vs regular deals
- Real-time filtering
- Discount calculation
- Date formatting
- Newsletter signup form

---

### 4. Contact Page (`/contact`)
**Location:** `src/app/pages/contact/`

**Features:**
- Contact form with fields:
  - Name (required)
  - Email (required)
  - Subject (required)
  - Message (required)
- Contact information cards:
  - Email: support@tripsaver.com
  - Phone: +91 80 1234 5678
  - Office location: Bangalore, Karnataka
  - Business hours
- Social media links:
  - Facebook
  - Twitter/X
  - Instagram
  - LinkedIn
- FAQ section with 4 common questions:
  - How TripSaver makes money
  - Booking safety
  - Extra fees
  - Deal update frequency

**Key Features:**
- Form validation
- Interactive social buttons
- Responsive layout
- Icon-based information cards

---

### 5. About Page (`/about`)
**Location:** `src/app/pages/about/`

**Features:**
- Hero section with mission statement
- Statistics section:
  - 50K+ Happy Travelers
  - ₹2Cr+ Money Saved
  - 10K+ Hotel Partners
  - 500+ Flight Routes
- Company story section with text and image
- Why Choose TripSaver (4 features):
  - Compare Prices
  - Verified Partners
  - Save More
  - 24/7 Support
- Core values (4 values):
  - Transparency
  - Value
  - Trust
  - Innovation
- How It Works (4 steps):
  1. Search & Compare
  2. Choose Your Deal
  3. Book with Confidence
  4. Enjoy Your Trip
- Trusted partners section:
  - Booking.com
  - Agoda
  - MakeMyTrip
  - Goibibo
- Call-to-action section with buttons to browse deals or contact

**Key Features:**
- Rich content with multiple sections
- Statistics showcase
- Visual storytelling
- Partner logos
- Step-by-step process
- Multiple CTAs

---

## Routing Configuration

The following routes are configured in `app.routes.ts`:

```typescript
{
  path: '',           // Home page
  path: 'hotels',     // Hotels listing
  path: 'flights',    // Flights search
  path: 'deals',      // Travel deals
  path: 'contact',    // Contact form
  path: 'about',      // About page
  path: '**'          // 404 redirect to home
}
```

## Navigation

All pages are accessible through the main navigation menu in the header:
- Home → `/`
- Hotels → `/hotels`
- Flights → `/flights`
- Deals → `/deals`
- Contact → `/contact`
- About → `/about`

Active route highlighting is implemented using `routerLinkActive`.

## Design System

### Color Scheme:
- **Hotels**: Blue gradient (#2563eb → #1e40af)
- **Flights**: Sky blue gradient (#0ea5e9 → #0284c7)
- **Deals**: Purple gradient (#8b5cf6 → #7c3aed)
- **Contact**: Green gradient (#10b981 → #059669)
- **About**: Purple gradient (#667eea → #764ba2)

### Responsive Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1023px
- Desktop: ≥ 1024px

### Common Features:
- Glassmorphism effects
- Hover animations
- Card-based layouts
- Grid systems
- Material Icons
- Gradient backgrounds
- Box shadows
- Smooth transitions

## Affiliate Integration

All pages include affiliate tracking functionality:
- Booking.com affiliate links
- Agoda affiliate links
- MakeMyTrip affiliate links
- Goibibo affiliate links
- Click tracking via console logs (ready for analytics integration)

**Note:** Replace `REPLACE_WITH_AFFILIATE_ID` with actual affiliate IDs before deployment.

## Next Steps

1. **Replace Affiliate IDs:**
   - Update all `REPLACE_WITH_AFFILIATE_ID` placeholders with real IDs
   
2. **Analytics Integration:**
   - Connect console.log tracking to Google Analytics or similar service
   
3. **Backend Integration:**
   - Connect contact form to email service
   - Add newsletter subscription functionality
   
4. **Content Updates:**
   - Replace placeholder images with real destination photos
   - Update deals with current promotions
   - Verify affiliate links are working

5. **Testing:**
   - Test all navigation links
   - Verify form validation
   - Check responsive layouts on various devices
   - Test affiliate link tracking

## File Structure

```
src/app/pages/
├── hotels/
│   ├── hotels.component.ts
│   ├── hotels.component.html
│   └── hotels.component.scss
├── flights/
│   ├── flights.component.ts
│   ├── flights.component.html
│   └── flights.component.scss
├── deals/
│   ├── deals.component.ts
│   ├── deals.component.html
│   └── deals.component.scss
├── contact/
│   ├── contact.component.ts
│   ├── contact.component.html
│   └── contact.component.scss
└── about/
    ├── about.component.ts
    ├── about.component.html
    └── about.component.scss
```

## Technologies Used

- **Angular 18+** - Framework
- **TypeScript** - Programming language
- **SCSS** - Styling
- **Angular Router** - Navigation
- **Angular Forms** - Contact form
- **CommonModule** - Angular common directives
- **Material Icons** - Icon library
- **CSS Grid & Flexbox** - Layouts
- **Gradients & Animations** - Visual effects
