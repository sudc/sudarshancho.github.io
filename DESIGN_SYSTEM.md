# TripSaver Design System

## ✨ Design Philosophy
Clean, modern, minimalist design with color-coded categories for instant recognition.

---

## 🎨 Color Coding System

### Primary Category Colors

#### 🔵 Blue - Travel (Hotels & Flights)
```scss
Primary: #2563eb
Light: #dbeafe
Dark: #1e40af
```
**Usage**: Hotels, Flights, Travel-related features

#### 🟢 Green - Health & Labs
```scss
Primary: #10b981
Light: #d1fae5
Dark: #059669
```
**Usage**: Health tests, Lab bookings, Medicine orders

#### 🟠 Orange - Deals & Offers
```scss
Primary: #f97316
Light: #fed7aa
Dark: #ea580c
```
**Usage**: E-commerce deals, Special offers, Trending products

#### 🟣 Purple - Insurance
```scss
Primary: #8b5cf6
Light: #ede9fe
Dark: #7c3aed
```
**Usage**: Travel insurance, Health insurance, All insurance products

### Neutral Colors
```scss
Text Primary: #1f2937
Text Secondary: #6b7280
Text Muted: #9ca3af
Background Primary: #ffffff
Background Secondary: #f9fafb
Background Accent: #f3f4f6
Border: #e5e7eb
```

---

## 🔘 Button Styles

### CTA Buttons (Color-Coded by Category)

#### Travel Buttons (Hotels/Flights)
- **Text**: "Book Now"
- **Color**: Blue gradient
- **Usage**: Hotel bookings, Flight bookings

#### Health Buttons
- **Text**: "Book Test" / "Order Now"
- **Color**: Green gradient
- **Usage**: Health tests, Medicine orders

#### Insurance Buttons
- **Text**: "Get Quote"
- **Color**: Purple gradient
- **Usage**: Insurance quotes, Policy comparisons

#### Deals Buttons
- **Text**: "View Deal" / "Buy Now"
- **Color**: Orange gradient
- **Usage**: E-commerce products, Special offers

### Button Specifications
```scss
Padding: 0.875rem 1.5rem
Border Radius: 0.75rem (12px)
Font Weight: 700 (Bold)
Font Size: 1rem
Text Transform: Uppercase
Letter Spacing: 0.025em
```

### Hover Effects
- Transform: `translateY(-2px)`
- Shadow increases
- Icon slides right (for arrow icons)
- Smooth transition: `0.3s ease`

---

## 🎴 Card Design

### Category Cards
```scss
Background: white
Border Radius: 1rem (16px)
Padding: 2rem
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Hover Transform: translateY(-6px)
Hover Shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15)
Border: 2px solid transparent (becomes category color on hover)
```

### Deal Cards
```scss
Background: white
Border Radius: 1rem (16px)
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Hover Transform: translateY(-6px)
Image Height: 180px
Padding: 1.5rem
```

---

## 📐 Layout & Spacing

### Grid Systems

#### Mobile First (Default)
```scss
grid-template-columns: 1fr;
gap: 1.5rem;
```

#### Tablet (640px+)
```scss
grid-template-columns: repeat(2, 1fr);
gap: 1.5rem;
```

#### Desktop (1024px+)
```scss
grid-template-columns: repeat(3, 1fr);
gap: 2rem;
```

### Container
```scss
max-width: 1200px;
margin: 0 auto;
padding: 0 1rem (mobile) / 2rem (desktop);
```

### Section Padding
```scss
Mobile: padding: 3rem 1rem;
Desktop: padding: 4rem 2rem;
```

---

## 🔤 Typography

### Font Family
```scss
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

### Font Sizes
```scss
xs: 0.75rem (12px)
sm: 0.875rem (14px)
base: 1rem (16px)
lg: 1.125rem (18px)
xl: 1.25rem (20px)
2xl: 1.5rem (24px)
3xl: 2rem (32px)
4xl: 2.5rem (40px)
```

### Font Weights
```scss
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
Extrabold: 800
```

---

## 🎬 Animations & Transitions

### Standard Transition
```scss
transition: all 0.3s ease;
```

### Hover Transform
```scss
transform: translateY(-6px); // Cards
transform: translateY(-2px); // Buttons
```

### Active State
```scss
transform: translateY(0); // Return to normal
transform: scale(0.98); // Buttons pressed
```

### Icon Animations
```scss
// Arrow forward on hover
.material-icons {
  transition: transform 0.3s ease;
}
&:hover .material-icons {
  transform: translateX(4px);
}
```

---

## 📱 Mobile Responsiveness

### Breakpoints
```scss
$breakpoint-sm: 640px;  // Mobile landscape / Small tablet
$breakpoint-md: 768px;  // Tablet
$breakpoint-lg: 1024px; // Desktop
$breakpoint-xl: 1280px; // Large desktop
```

### Mobile-First Approach
- Start with single column layout
- Scale up to multi-column on larger screens
- Touch-friendly tap targets (min 44x44px)
- Adequate spacing between interactive elements
- Smooth scrolling enabled globally

### Touch Interactions
```scss
// Larger tap targets on mobile
@media (max-width: 640px) {
  button {
    padding: 1rem 1.5rem; // Increased from 0.875rem
    min-height: 48px;
  }
}
```

---

## 🎯 Component Patterns

### Hero Banner
- **Background**: Blue-purple gradient
- **Height**: 550px (min)
- **Content**: Centered with max-width
- **CTA**: White button with hover lift
- **Quick Links**: Glassmorphism cards (4 items, 2x2 grid)

### Category Section
- **Background**: White
- **Cards**: 3-column grid (desktop)
- **Icon**: Rounded square (64x64px) with category color
- **Hover**: Card lifts, border appears in category color

### Featured Deals
- **Background**: Light gray (#f9fafb)
- **Cards**: 3-column grid (desktop)
- **Image**: 180px height
- **Badge**: Discount badge (top-right)
- **CTA**: Color-coded button at bottom

### Footer
- **Background**: Dark (#1a202c)
- **Layout**: 4-column grid (desktop)
- **Disclosure**: Highlighted box with info icon
- **Social**: Circle icons with hover effect

---

## 🎨 Icon Usage

### Material Icons
- **Size**: 24px (standard), 36-40px (hero/large)
- **Color**: Inherits or white (on colored backgrounds)
- **Alignment**: Vertical center with text

### Categories
```
Hotels: hotel
Flights: flight
Health: medical_services
Insurance: security
Deals: local_fire_department / local_offer
```

---

## ✅ Design Checklist

### Every Component Should Have:
- [ ] Mobile-first responsive design
- [ ] Smooth hover effects (0.3s ease)
- [ ] Adequate padding and spacing
- [ ] Touch-friendly tap targets (44x44px min)
- [ ] Proper color contrast (WCAG AA)
- [ ] Loading and empty states
- [ ] Consistent border radius (0.75-1rem)
- [ ] Box shadows for depth

### Color Coding:
- [ ] Blue for Hotels/Flights
- [ ] Green for Health
- [ ] Orange for Deals
- [ ] Purple for Insurance

### Buttons:
- [ ] Descriptive text (Book Now, View Deal, etc.)
- [ ] Color matches category
- [ ] Hover lift effect
- [ ] Active press feedback
- [ ] Icon animation (if applicable)

---

## 🚀 Implementation Examples

### Category Card
```html
<div class="category-card" data-category="hotels">
  <div class="category-icon">
    <span class="material-icons">hotel</span>
  </div>
  <h3 class="category-title">Hotels</h3>
  <p class="category-description">Find the best hotel deals</p>
  <div class="category-affiliates">
    <span class="affiliate-badge">Booking.com</span>
    <span class="affiliate-badge">Agoda</span>
  </div>
</div>
```

### CTA Button (Travel)
```html
<button class="deal-button" data-category="hotels">
  Book Now
  <span class="material-icons">arrow_forward</span>
</button>
```

### CTA Button (Health)
```html
<button class="deal-button" data-category="health">
  Book Test
  <span class="material-icons">arrow_forward</span>
</button>
```

---

## 📊 Before vs After

### Before:
- ❌ Mixed CSS and SCSS files with duplicates
- ❌ Inconsistent color schemes
- ❌ Generic button text ("Get Deal" for everything)
- ❌ Heavy gradients and complex designs
- ❌ Inconsistent spacing and sizing

### After:
- ✅ Clean, consolidated SCSS structure
- ✅ Color-coded categories for instant recognition
- ✅ Context-specific button text
- ✅ Minimalist, modern design
- ✅ Consistent spacing, sizing, and animations
- ✅ Mobile-first responsive approach
- ✅ Smooth interactions throughout

---

## 🎓 Usage Guidelines

### When to Use Each Color:

**Blue (Travel)**
- Hotel bookings
- Flight searches
- Travel packages
- Transportation

**Green (Health)**
- Medical tests
- Lab bookings
- Medicine orders
- Health checkups

**Orange (Deals)**
- Product deals
- Special offers
- E-commerce items
- Trending sales

**Purple (Insurance)**
- Travel insurance
- Health insurance
- Life insurance
- Policy comparisons

### Button Text Guidelines:

| Category | Primary Action | Secondary Action |
|----------|---------------|------------------|
| Hotels | Book Now | View Details |
| Flights | Book Now | Compare Prices |
| Health | Book Test | Order Now |
| Insurance | Get Quote | Compare Plans |
| Deals | View Deal | Buy Now |

---

## 🔧 Maintenance

### File Structure
```
src/app/shared/styles/
└── _variables.scss          // Design tokens

src/styles.scss               // Global base styles

src/app/
├── app.scss                 // App-level header
└── pages/home/
    └── home.component.scss  // Page orchestration

src/app/shared/components/
├── hero-banner/
│   └── *.component.scss    // Component-specific
├── category-cards/
│   └── *.component.scss
├── featured-deals/
│   └── *.component.scss
└── footer/
    └── *.component.scss
```

### Adding a New Component:
1. Import variables: `@use 'src/app/shared/styles/variables' as *;`
2. Use design tokens from variables
3. Follow mobile-first approach
4. Apply appropriate category color
5. Add smooth transitions
6. Test on mobile and desktop

---

## 🎉 Summary

The TripSaver design system provides:
- **Clear visual hierarchy** with color coding
- **Consistent user experience** across all components
- **Mobile-optimized** interactions
- **Accessible** design patterns
- **Maintainable** SCSS structure
- **Smooth animations** for premium feel

All components work together harmoniously while maintaining their individual identity through color coding!
