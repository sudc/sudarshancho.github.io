# 🤖 TripSaver Recommendation Engines

## Overview

TripSaver uses three intelligent engines working together to provide personalized travel recommendations:

1. **Destination Scoring Engine** - Scores destinations based on user preferences
2. **Trip Readiness Engine** - Evaluates user's preparedness for travel
3. **Recommendation Engine** - Combines both for comprehensive recommendations

---

## 1. Destination Scoring Engine v2.0.0

### Purpose
Intelligently scores destinations (0-110 points) based on multiple factors.

### Scoring Breakdown

| Factor | Max Points | Description |
|--------|-----------|-------------|
| **Perfect Timing** | 40 | Visiting in best months vs. avoid months |
| **Budget Match** | 30 | Exact or close budget alignment |
| **Category Match** | 25 | Interest/activity alignment (12 pts per match) |
| **Climate Preference** | 15 | Weather pattern preferences |
| **Popularity Bonus** | 5 | Extra points for trending destinations |
| **Total** | **110** | Maximum possible score |

### Example Calculation

```
User wants: Beach destination, ₹20k budget, traveling in December

Goa Evaluation:
- Perfect Timing: +40 (December is best month)
- Budget Match: +30 (Moderate budget = ₹15-30k ✓)
- Category Match: +12 (Beach category matches)
- Climate: +15 (Tropical climate preferred)
- Popularity: +5 (Goa is popular)
───────────────────────────
Total Score: 102/110 (92.7%)
Result: HIGHLY RECOMMENDED 🏆
```

### Badges Awarded

- **Perfect Season** - Traveling in ideal months
- **Budget Match** - Exact budget category fit
- **Perfect Match** - 2+ interest categories match
- **Great Weather** - Climate preference aligned
- **Popular Choice** - Trending/popular destination

### Usage

```typescript
const scoringEngine = inject(DestinationScoringEngine);

const input = {
  userPreferences: {
    month: 12,
    budget: 'moderate',
    categories: ['Beach', 'Party'],
    climate: ['tropical']
  }
};

const result = await scoringEngine.process(input);
// result.recommendations contains scored destinations
```

---

## 2. Trip Readiness Engine v1.0.0

### Purpose
Evaluates user's preparedness across 4 key dimensions.

### Evaluation Categories

| Category | Points | What It Checks |
|----------|--------|----------------|
| **Budget Preparedness** | 25 | Available funds vs. estimated cost |
| **Document Readiness** | 25 | Passport validity, visa status |
| **Timing & Planning** | 25 | Lead time, booking flexibility |
| **Seasonal Timing** | 25 | Peak/off-peak/shoulder season |
| **Total** | **100** | Overall readiness score |

### Status Levels

#### Per Category:
- **Excellent** (≥90%): Everything perfect
- **Good** (≥75%): Minor improvements possible
- **Needs Attention** (≥50%): Some preparation required
- **Critical** (<50%): Urgent action needed

#### Overall Trip Status:
- **Ready** (≥85%): Book now!
- **Almost Ready** (≥70%): Few minor items
- **Needs Preparation** (≥50%): Several steps needed
- **Not Ready** (<50%): Significant preparation required

### Example Evaluation

```
International Trip - Thailand, ₹80k budget, 45 days lead time

Evaluation:
┌─────────────────────────┬────────┬────────┐
│ Category                │ Score  │ Status │
├─────────────────────────┼────────┼────────┤
│ Budget Preparedness     │ 22/25  │ Good   │
│ (₹75k available/₹80k)   │        │        │
│                         │        │        │
│ Document Readiness      │ 15/25  │ Needs  │
│ (Valid passport, no visa)│       │ Attn   │
│                         │        │        │
│ Timing & Planning       │ 12/25  │ Good   │
│ (45 days lead time)     │        │        │
│                         │        │        │
│ Seasonal Timing         │ 20/25  │ Good   │
│ (Shoulder season)       │        │        │
└─────────────────────────┴────────┴────────┘
Overall: 69/100 - ALMOST READY

Action Items:
✓ Apply for Thai visa (2-3 weeks processing)
✓ Save additional ₹5k for buffer
✓ Book flights within 1 week for best prices

Estimated Preparation: 2-3 weeks
```

### Usage

```typescript
const readinessEngine = inject(TripReadinessEngine);

const input = {
  budget: {
    available: 75000,
    estimated: 80000
  },
  documents: {
    passport: {
      valid: true,
      expiryDate: new Date('2026-12-31')
    },
    visa: {
      required: true,
      valid: false
    }
  },
  timing: {
    departureDate: new Date('2026-02-15'),
    returnDate: new Date('2026-02-25'),
    flexibility: 'flexible'
  },
  destination: {
    type: 'international',
    seasonality: 'shoulder'
  }
};

const result = await readinessEngine.process(input);
// result.overallStatus, result.scores, result.actionItems
```

---

## 3. Recommendation Engine v1.0.0

### Purpose
Master engine combining destination scoring and trip readiness for comprehensive recommendations.

### Scoring Formula

```
Final Score = (Destination Score × 70%) + (Readiness Score × 30%)
```

**Rationale**: Destination quality matters more (70%), but preparedness is important (30%).

### Recommendation Types

| Score Range | Type | Meaning | Action |
|-------------|------|---------|--------|
| 80-100 | **Highly Recommended** | Perfect fit! | Book confidently |
| 65-79 | **Recommended** | Great choice | Good option |
| 50-64 | **Consider** | Decent option | Evaluate carefully |
| 0-49 | **Not Recommended** | Poor fit | Look elsewhere |

### Example Combined Recommendation

```
User Profile:
- Wants: Beach, moderate budget, December
- Budget: ₹25k available / ₹28k estimated
- Lead time: 30 days
- Documents: All valid

Destination: Goa
├─ Destination Score: 95/110 (86%)
│  ├─ Perfect timing ✓
│  ├─ Budget match ✓
│  ├─ Beach category ✓
│  └─ Badges: Perfect Season, Budget Match
│
└─ Readiness Score: 88/100 (88%)
   ├─ Budget: Good (89% funded)
   ├─ Documents: Excellent (domestic)
   ├─ Timing: Good (30 days)
   └─ Season: Off-peak (best prices)

Combined Calculation:
(86 × 0.7) + (88 × 0.3) = 60.2 + 26.4 = 86.6

Final Score: 87/100
Recommendation: HIGHLY RECOMMENDED 🏆

Benefits:
✓ Perfect match for your preferences
✓ You're well-prepared to book
✓ Great timing for best deals
✓ No preparation blockers

Warnings: None

Next Steps:
1. Review hotels on Agoda
2. Book within 3 days for current prices
3. Consider travel insurance
```

### Usage

```typescript
const recommendationEngine = inject(RecommendationEngine);

const input = {
  userPreferences: {
    month: 12,
    budget: 'moderate',
    categories: ['Beach']
  },
  tripDetails: {
    budget: {
      available: 25000,
      estimated: 28000
    },
    timing: {
      departureDate: new Date('2026-01-15'),
      returnDate: new Date('2026-01-22'),
      flexibility: 'flexible'
    },
    destination: {
      type: 'domestic',
      seasonality: 'off-peak'
    }
  }
};

const result = await recommendationEngine.process(input);
// result.recommendations with enhanced scores
// result.tripReadiness with detailed evaluation
// result.summary with statistics
```

---

## Architecture

```
┌──────────────────────────────────────────┐
│     RecommendationEngine (Master)        │
│                                          │
│  Combines both engines with weighting    │
└────────────┬─────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌─────────┐   ┌─────────────┐
│ Dest    │   │ Trip        │
│ Scoring │   │ Readiness   │
│ Engine  │   │ Engine      │
└────┬────┘   └─────────────┘
     │
     ▼
┌─────────────┐
│  MongoDB    │
│  Service    │
└─────────────┘
     │
     ▼
┌─────────────┐
│  MongoDB    │
│  Database   │
│  45 dests   │
└─────────────┘
```

---

## Data Flow

```
User Input
   │
   ├─→ Month, Budget, Categories
   │   └─→ Destination Scoring Engine
   │       └─→ MongoDB Service
   │           └─→ Get All Destinations
   │               └─→ Score Each Destination
   │                   └─→ Return Top Matches
   │
   ├─→ Trip Details (Optional)
   │   └─→ Trip Readiness Engine
   │       └─→ Evaluate 4 Categories
   │           └─→ Return Readiness Status
   │
   └─→ Both Results
       └─→ Recommendation Engine
           └─→ Combine with Weights
               └─→ Final Recommendations
```

---

## MongoDB Integration

### Collections Used

#### `destinations` (45 documents)
```javascript
{
  _id: "goa",
  state: "Goa",
  categories: ["Beach", "Party"],
  bestMonths: [11, 12, 1, 2],
  avoidMonths: [6, 7, 8],
  climate: "tropical",
  budget: "moderate",
  agoda: "goa-in"
}
```

#### `trust_badges` (optional)
```javascript
{
  _id: "ai-powered",
  icon: "🤖",
  title: "AI-Powered",
  description: "45+ destinations scored using intelligent algorithms",
  order: 1
}
```

#### `trust_messages` (optional)
```javascript
{
  _id: "no-bias",
  message: "We never accept payment to influence destination rankings",
  category: "transparency",
  order: 1
}
```

---

## Fallback System

If MongoDB is unavailable, engines automatically fall back to static data:

```typescript
// Automatic fallback in DestinationScoringEngine
try {
  const destinations = await this.mongoService.getAllDestinations();
} catch (error) {
  // Falls back to DESTINATIONS_DATA from destinations.data.ts
  const destinations = Object.entries(DESTINATIONS_DATA);
}
```

This ensures the app **always works**, with or without database connectivity.

---

## Testing

### Unit Test Example (Destination Scoring)

```typescript
it('should score Goa highly for beach in December', async () => {
  const input = {
    userPreferences: {
      month: 12,
      budget: 'moderate',
      categories: ['Beach']
    }
  };
  
  const result = await engine.process(input);
  const goa = result.recommendations.find(r => r.destinationId === 'goa');
  
  expect(goa.score).toBeGreaterThan(80);
  expect(goa.badges).toContain('Perfect Season');
});
```

---

## Performance Considerations

- **Caching**: Consider caching MongoDB results for 1 hour
- **Lazy Loading**: Engines only loaded when needed
- **Batch Queries**: Fetch all destinations in single query
- **Static Fallback**: Instant response if DB is slow
- **Component-level DI**: No eager instantiation

---

## Future Enhancements

1. **Machine Learning**: Learn from user bookings
2. **Historical Data**: Track price trends
3. **User Feedback**: Incorporate ratings
4. **A/B Testing**: Optimize scoring weights
5. **Real-time Pricing**: Integrate live hotel prices
6. **Weather API**: Real-time weather data
7. **Social Proof**: Show popular choices

---

## Maintenance

### Updating Scoring Weights

Edit `destination-scoring.engine.ts`:

```typescript
// Current weights
if (dest.bestMonths.includes(prefs.month)) {
  score += 40; // Adjust this value
}
```

### Adding New Factors

1. Add to scoring logic in engine
2. Update methodology page
3. Update this documentation
4. Test with various inputs

### Adding New Destinations

1. Add to `destinations.data.ts`
2. Run data seeder to update MongoDB
3. Verify scoring works correctly

---

## Support & Troubleshooting

### Common Issues

**Q: Recommendations seem incorrect**
- Check user input validation
- Verify MongoDB data is up to date
- Review scoring weights

**Q: MongoDB connection failing**
- Check CORS configuration
- Verify API key and endpoint
- Fallback should activate automatically

**Q: Scores too high/low**
- Adjust weights in scoring engine
- Review factor importance
- Test with edge cases

---

**Built with ❤️ for transparent, unbiased travel recommendations**
