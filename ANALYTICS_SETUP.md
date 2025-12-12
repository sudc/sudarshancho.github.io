# 📊 Analytics & Tracking Setup Guide

## Overview
TripSaver uses multiple tracking systems to monitor performance, optimize conversions, and track affiliate commissions.

---

## 🎯 Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** → **Create Property**
3. Enter property name: **TripSaver**
4. Set timezone: **India Standard Time (IST)**
5. Select currency: **INR (₹)**
6. Complete setup

### Step 2: Get Measurement ID
1. In your new property, go to **Admin** → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter website URL: `https://tripsaver.github.io`
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Replace in Code
Find and replace in all HTML files:
```javascript
// Replace this line:
gtag('config', 'G-XXXXXXXXXX');

// With your actual Measurement ID:
gtag('config', 'G-ABC123DEF4');
```

**Files to update:**
- `standalone-index.html`
- `hotels-goa.html`
- Any other landing pages

---

## 📈 Events Being Tracked

### Homepage Events (`standalone-index.html`)

| Event Name | Category | Label | When Triggered |
|------------|----------|-------|----------------|
| `affiliate_click` | Affiliate | Platform name | User clicks any affiliate link |
| `cta_click` | Engagement | Hero Banner - Explore Deals | User clicks hero CTA button |
| `category_click` | Navigation | Category name | User clicks category card |
| `deal_view` | Engagement | Deal title | User clicks deal card (not button) |
| `quick_link_click` | Navigation | Link name | User clicks quick access link |
| `social_click` | Social | Platform name | User clicks social media icon |
| `scroll_depth` | Engagement | 25%/50%/75%/100% | User scrolls page |
| `time_on_page` | Engagement | 30s/60s/120s/300s | User stays on page |
| `page_hidden` | Engagement | User left page | User switches tab/window |
| `page_visible` | Engagement | User returned | User returns to tab |

### Destination Pages Events (`hotels-goa.html`)

| Event Name | Category | Label | When Triggered |
|------------|----------|-------|----------------|
| `hotel_booking_click` | Conversion | Hotel name + Platform | User clicks booking button |

---

## 💰 Affiliate Network Tracking

### 1. Booking.com Affiliate Partner Program

**Sign Up:** https://www.booking.com/affiliate

**Tracking Parameters:**
```
aid=YOUR_AFFILIATE_ID
```

**Example URL:**
```
https://www.booking.com/hotel/in/taj-exotica-goa.html?aid=123456
```

**Dashboard:** Track clicks, bookings, and commissions
- Click-through rate (CTR)
- Conversion rate
- Commission earned (typically 25-40% of Booking.com's commission)

### 2. Agoda Affiliate Program

**Sign Up:** https://partners.agoda.com/

**Tracking Parameters:**
```
cid=YOUR_AFFILIATE_ID
```

**Example URL:**
```
https://www.agoda.com/taj-exotica-resort-spa-goa/hotel/goa-in.html?cid=123456
```

**Dashboard:** YCS Portal
- Real-time booking data
- Commission: 4-7% of booking value

### 3. MakeMyTrip Affiliate Program

**Sign Up:** https://www.makemytrip.com/affiliates/

**Tracking Parameters:**
```
campaign=YOUR_AFFILIATE_ID
```

**Example URL:**
```
https://www.makemytrip.com/hotels/taj_exotica_resort_spa-details-goa.html?campaign=123456
```

**Commission:** 3-5% on hotels, 2-4% on flights

---

## 🔗 Cuelinks / INRDeals Setup (Multi-Network)

### What is Cuelinks?
Cuelinks is an affiliate network aggregator that automatically converts regular links into affiliate links.

### Setup Cuelinks

**Step 1: Sign Up**
1. Go to [Cuelinks.com](https://www.cuelinks.com/)
2. Register as publisher
3. Add website: `tripsaver.github.io`
4. Wait for approval (1-2 days)

**Step 2: Get Cuelinks Script**
After approval, you'll receive a script like:
```html
<script src="//www.cuelinks.com/js/yourpublisherid.js"></script>
```

**Step 3: Add to All Pages**
Add the script before closing `</body>` tag:
```html
  <!-- Cuelinks Auto-Monetization -->
  <script src="//www.cuelinks.com/js/123456.js"></script>
</body>
```

### How Cuelinks Works
- Automatically detects affiliate-compatible links
- Converts Amazon, Flipkart, and 1000+ merchant links
- No need to manually add affiliate IDs
- Provides unified dashboard for all networks

### Cuelinks Dashboard
Track performance at: https://www.cuelinks.com/dashboard
- **Clicks:** Total link clicks
- **Conversions:** Successful purchases
- **Pending:** Awaiting merchant confirmation
- **Approved:** Confirmed earnings
- **Earnings:** Total commission earned

---

## 🎨 Custom Event Tracking

### Add Custom Events

For tracking specific user actions:

```javascript
// Track button click
document.getElementById('myButton').addEventListener('click', function() {
  gtag('event', 'custom_action', {
    'event_category': 'User Interaction',
    'event_label': 'Button Name',
    'value': 1
  });
});

// Track form submission
document.getElementById('myForm').addEventListener('submit', function() {
  gtag('event', 'form_submit', {
    'event_category': 'Lead Generation',
    'event_label': 'Contact Form',
    'value': 1
  });
});
```

---

## 📊 Key Metrics to Monitor

### Google Analytics Dashboard

**Acquisition Metrics:**
- Users (daily/weekly/monthly)
- New vs Returning visitors
- Traffic sources (Organic, Social, Referral, Direct)
- Top landing pages

**Engagement Metrics:**
- Average session duration
- Pages per session
- Bounce rate (aim for <60%)
- Scroll depth (75%+ is excellent)

**Conversion Metrics:**
- Affiliate link CTR (Click-Through Rate)
- Category page views
- Deal button clicks
- Social media clicks

### Affiliate Network Dashboards

**Weekly Review:**
- Total clicks sent
- Conversion rate (bookings/clicks)
- Average order value
- Commission earned
- Top-performing categories

**Monthly Goals:**
- Target: 1,000+ clicks
- Conversion rate: 2-5%
- Revenue: ₹5,000+ per month (growing)

---

## 🚀 Optimization Tips

### Based on Analytics Data

**1. High Bounce Rate on Category Pages**
- Add more compelling CTAs
- Improve page load speed
- Add trust signals (reviews, ratings)

**2. Low Affiliate Link CTR**
- Test button colors and text
- Add urgency (limited time offers)
- Show price comparisons

**3. Popular Categories**
- Create more content for top-performing categories
- Feature popular deals on homepage
- Create dedicated landing pages

**4. Traffic Sources**
- Double down on channels driving most conversions
- Create platform-specific content (Instagram Stories, Pinterest Pins)
- Build backlinks from travel blogs

---

## 🔍 Debugging & Testing

### Check if Analytics is Working

**Method 1: Browser Console**
```javascript
// Open DevTools (F12) → Console
// Click any link and check for logs:
🔗 Affiliate Link Clicked: {...}
📊 GA Event: affiliate_click {...}
```

**Method 2: GA4 Realtime Report**
1. Go to Google Analytics
2. Reports → Realtime
3. Open your website in another tab
4. Click links and see events appear in realtime

**Method 3: Google Tag Assistant**
1. Install [Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Check if GA4 tag is firing

---

## 📱 Social Media UTM Tracking

When sharing on social media, add UTM parameters:

**Instagram Bio Link:**
```
https://tripsaver.github.io/?utm_source=instagram&utm_medium=bio&utm_campaign=profile
```

**Facebook Post:**
```
https://tripsaver.github.io/?utm_source=facebook&utm_medium=post&utm_campaign=hotel_deals
```

**Pinterest Pin:**
```
https://tripsaver.github.io/hotels-goa.html?utm_source=pinterest&utm_medium=pin&utm_campaign=goa_hotels
```

**YouTube Description:**
```
https://tripsaver.github.io/?utm_source=youtube&utm_medium=video_description&utm_campaign=travel_tips
```

---

## ✅ Setup Checklist

- [ ] Created Google Analytics 4 property
- [ ] Replaced GA4 Measurement ID in all HTML files
- [ ] Tested GA4 with Realtime report
- [ ] Signed up for Booking.com affiliate program
- [ ] Signed up for Agoda affiliate program
- [ ] Signed up for MakeMyTrip affiliate program
- [ ] Replaced all `REPLACE_WITH_AFFILIATE_ID` placeholders
- [ ] Signed up for Cuelinks (optional but recommended)
- [ ] Added Cuelinks script (if using)
- [ ] Tested affiliate link redirects
- [ ] Set up UTM parameters for social media
- [ ] Created dashboard bookmarks for all platforms
- [ ] Scheduled weekly performance review

---

## 📞 Support Resources

- **Google Analytics Help:** https://support.google.com/analytics
- **Booking.com Partner Support:** https://partner.booking.com/en-gb/support
- **Agoda Partner Support:** https://partners.agoda.com/support
- **Cuelinks Support:** support@cuelinks.com

---

**Last Updated:** December 12, 2025
