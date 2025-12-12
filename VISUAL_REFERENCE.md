# 🎨 Quick Visual Reference

## Color Palette at a Glance

### 🔵 Travel (Hotels & Flights)
```
Primary:   #2563eb  ██████  Blue
Light:     #dbeafe  ██████  Light Blue
Dark:      #1e40af  ██████  Dark Blue
```
**Use for**: Hotel bookings, Flight searches, Travel packages

---

### 🟢 Health & Labs
```
Primary:   #10b981  ██████  Green
Light:     #d1fae5  ██████  Light Green
Dark:      #059669  ██████  Dark Green
```
**Use for**: Medical tests, Lab bookings, Medicine orders

---

### 🟠 Deals & Offers
```
Primary:   #f97316  ██████  Orange
Light:     #fed7aa  ██████  Light Orange
Dark:      #ea580c  ██████  Dark Orange
```
**Use for**: E-commerce deals, Special offers, Product sales

---

### 🟣 Insurance
```
Primary:   #8b5cf6  ██████  Purple
Light:     #ede9fe  ██████  Light Purple
Dark:      #7c3aed  ██████  Dark Purple
```
**Use for**: Travel insurance, Health insurance, Policies

---

## Button Quick Reference

### Hotels/Flights (Blue)
```html
<button class="deal-button" data-category="hotels">
  Book Now
  <span class="material-icons">arrow_forward</span>
</button>
```
**Visual**: Blue gradient button with white text

---

### Health (Green)
```html
<button class="deal-button" data-category="health">
  Book Test
  <span class="material-icons">arrow_forward</span>
</button>
```
**Visual**: Green gradient button with white text

---

### Insurance (Purple)
```html
<button class="deal-button" data-category="insurance">
  Get Quote
  <span class="material-icons">arrow_forward</span>
</button>
```
**Visual**: Purple gradient button with white text

---

### Deals (Orange)
```html
<button class="deal-button" data-category="deals">
  View Deal
  <span class="material-icons">arrow_forward</span>
</button>
```
**Visual**: Orange gradient button with white text

---

## Component Examples

### Category Card (Hotels)
```
┌─────────────────────────┐
│                         │
│       [Blue Icon]       │  ← 64x64px rounded square
│                         │
│        Hotels           │  ← Bold title
│                         │
│  Find the best hotel    │  ← Description
│  deals and save big     │
│                         │
│  [Booking.com] [Agoda]  │  ← Affiliate badges
│   [MakeMyTrip]          │
│                         │
└─────────────────────────┘
  ↑ White card with shadow
  ↑ Blue border on hover
```

---

### Featured Deal Card (Health)
```
┌─────────────────────────┐
│  [Image: 180px]    50%  │  ← Discount badge
│                     OFF │
├─────────────────────────┤
│                         │
│  Health                 │  ← Category tag
│                         │
│  Full Body Checkup      │  ← Deal title
│  @ ₹999                 │
│                         │
│  Comprehensive health   │  ← Description
│  package with 60+ tests │
│                         │
│  📍 Healthians  ⏰ 10d  │  ← Platform & Expiry
│                         │
│   ┌─────────────────┐   │
│   │   BOOK TEST  →  │   │  ← Green CTA button
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

---

## Spacing Reference

### Card Padding
```
Mobile:  1.5rem (24px)
Desktop: 2rem (32px)
```

### Grid Gaps
```
Mobile:  1.5rem (24px)
Desktop: 2rem (32px)
```

### Button Padding
```
Vertical:   0.875rem (14px)
Horizontal: 1.5rem (24px)
```

### Section Padding
```
Mobile:  3rem 1rem (48px 16px)
Desktop: 4rem 2rem (64px 32px)
```

---

## Typography Scale

```
Hero Title:       2.5rem (40px) - Bold
Section Title:    2rem (32px) - Bold
Card Title:       1.25rem (20px) - Bold
Body Text:        1rem (16px) - Regular
Small Text:       0.875rem (14px) - Regular
Tiny Text:        0.75rem (12px) - Regular
```

---

## Shadow Levels

### Cards (Default)
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

### Cards (Hover)
```css
box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
```

### Buttons (Default)
```css
box-shadow: 0 4px 12px rgba(CATEGORY_COLOR, 0.3);
```

### Buttons (Hover)
```css
box-shadow: 0 6px 16px rgba(CATEGORY_COLOR, 0.4);
```

---

## Animation Speeds

```
Fast:     0.15s ease  (Quick micro-interactions)
Standard: 0.3s ease   (Most hover effects)
Slow:     0.5s ease   (Page transitions)
```

---

## Border Radius

```
Small:  0.5rem (8px)   - Tags, small badges
Medium: 0.75rem (12px) - Buttons
Large:  1rem (16px)    - Cards
Extra:  1.5rem (24px)  - Hero sections
Full:   9999px         - Pills, badges
```

---

## Responsive Breakpoints

```
Mobile:    0-639px      (1 column)
Tablet:    640-1023px   (2 columns)
Desktop:   1024px+      (3 columns)
```

---

## Icon Sizes

```
Small:    18px  (Inline with text)
Standard: 24px  (Buttons)
Medium:   32px  (Category icons)
Large:    40px  (Hero quick links)
XL:       48-64px (Feature icons)
```

---

## Category Icons

```
Hotels:     hotel
Flights:    flight
Health:     medical_services
Insurance:  security
Deals:      local_offer
```

---

## Hover Effects Summary

### Cards
```
- Lift: translateY(-6px)
- Shadow increases
- Border appears (category color)
- Transition: 0.3s ease
```

### Buttons
```
- Lift: translateY(-2px)
- Shadow increases
- Arrow icon slides right (4px)
- Transition: 0.3s ease
```

### Badges/Pills
```
- Lift: translateY(-2px)
- Background darkens
- Scale slightly (1.02)
- Transition: 0.3s ease
```

---

## Mobile Touch Targets

### Minimum Sizes
```
Buttons:  44x44px minimum
Cards:    Full width, min 60px height
Icons:    32x32px minimum clickable area
Links:    44px height minimum
```

---

## Accessibility

### Color Contrast Ratios
```
Normal Text:       4.5:1 (WCAG AA)
Large Text (18px): 3:1 (WCAG AA)
```

### Focus States
```css
outline: 2px solid #2563eb;
outline-offset: 2px;
```

---

## Common Gradients

### Blue (Travel)
```css
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
```

### Green (Health)
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Orange (Deals)
```css
background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
```

### Purple (Insurance)
```css
background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
```

### Hero Banner
```css
background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #8b5cf6 100%);
```

---

## Quick Decision Tree

**Need a button color?**
- Hotels/Flights → Blue
- Health/Labs → Green
- Deals/Offers → Orange
- Insurance → Purple

**Need button text?**
- Hotels/Flights → "Book Now"
- Health → "Book Test" or "Order Now"
- Insurance → "Get Quote"
- Deals → "View Deal" or "Buy Now"

**Need card spacing?**
- Mobile → 1.5rem
- Desktop → 2rem

**Need a grid?**
- Mobile → 1 column
- Tablet → 2 columns
- Desktop → 3 columns

**Need an icon?**
- Hotels → `hotel`
- Flights → `flight`
- Health → `medical_services`
- Insurance → `security`
- Deals → `local_offer`

---

## Copy-Paste Ready

### Blue Button (Hotels)
```html
<button class="deal-button" data-category="hotels">
  Book Now <span class="material-icons">arrow_forward</span>
</button>
```

### Green Button (Health)
```html
<button class="deal-button" data-category="health">
  Book Test <span class="material-icons">arrow_forward</span>
</button>
```

### Orange Button (Deals)
```html
<button class="deal-button" data-category="deals">
  View Deal <span class="material-icons">arrow_forward</span>
</button>
```

### Purple Button (Insurance)
```html
<button class="deal-button" data-category="insurance">
  Get Quote <span class="material-icons">arrow_forward</span>
</button>
```

---

**Keep this handy for quick reference while developing! 🚀**
