# MongoDB Affiliate Configuration Management

## Overview

Active partner and affiliate IDs are now stored in MongoDB automatically. This allows you to:
- ✅ Update affiliate IDs without redeploying code
- ✅ Switch partners dynamically
- ✅ Track configuration changes with timestamps
- ✅ Manage configuration via API or CLI

---

## Backend Setup

### 1. **New API Endpoints**

Added to `backend/server.js`:

```javascript
GET  /api/affiliate-config          // Get current config
POST /api/affiliate-config          // Update entire config
PATCH /api/affiliate-config/:partnerId  // Update single partner ID
```

### 2. **MongoDB Collection**

Collection: `affiliate-config`
Document structure:
```javascript
{
  _id: 'active',
  activePartner: 'amazon',
  affiliateIds: {
    amazon: 'tripsaver21-21',
    agoda: 'YOUR_AGODA_ID',
    booking: 'booking-affiliate-id'
  },
  lastUpdated: ISODate("2025-12-24T..."),
  updatedBy: 'system'
}
```

---

## Frontend Setup

### 1. **AffiliateConfigService**

New service: `src/app/core/services/affiliate-config.service.ts`

Methods:
- `loadConfig()` - Fetch from MongoDB
- `getCurrentConfig()` - Get cached config
- `waitForConfig()` - Promise-based waiting
- `updateConfig(config)` - Update full config
- `updateAffiliateId(partnerId, id)` - Update single ID
- `getActivePartner()` - Get active partner
- `getAffiliateId(partnerId)` - Get specific ID
- `setActivePartner(partnerId)` - Switch partner

### 2. **Integration with TripStepperComponent**

In `ngOnInit()`:
```typescript
ngOnInit(): void {
  this.affiliateConfigService.loadConfig().subscribe(
    (config) => {
      console.log('✅ Config loaded:', config);
      this.cdr.markForCheck();
    },
    (error) => {
      console.warn('⚠️ Using default config:', error);
    }
  );
}
```

---

## Usage

### Option A: REST API (Programmatic)

**Get current config:**
```bash
curl http://localhost:3000/api/affiliate-config
```

**Update active partner:**
```bash
curl -X POST http://localhost:3000/api/affiliate-config \
  -H "Content-Type: application/json" \
  -d '{"activePartner": "agoda"}'
```

**Update affiliate ID:**
```bash
curl -X PATCH http://localhost:3000/api/affiliate-config/amazon \
  -H "Content-Type: application/json" \
  -d '{"affiliateId": "new-amazon-id-123"}'
```

### Option B: CLI Admin Tool

Created: `backend/affiliate-config-admin.js`

**Run:**
```bash
cd backend
MONGODB_URI='mongodb+srv://user:pass@cluster.mongodb.net/tripsaver' \
  node affiliate-config-admin.js
```

**Interactive menu:**
```
Options:
1. Update active partner
2. Update affiliate ID
3. Update all config
4. View current config
5. Exit
```

---

## Environment Variables

Required in backend:
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tripsaver
```

Optional in frontend (`src/environments/environment.ts`):
```typescript
export const environment = {
  affiliateConfigApiUrl: 'https://api.yourdomain.com/api/affiliate-config'
  // or use default localhost
};
```

---

## Workflow Examples

### Example 1: Update Agoda Affiliate ID

Using CLI:
```
$ node affiliate-config-admin.js
Select option: 2
Partner ID: agoda
Affiliate ID: AGODA_123456_ABC
✅ Affiliate ID updated for agoda
```

✅ **Automatically:**
1. MongoDB document updated
2. Frontend polls `/api/affiliate-config`
3. New ID used in all Agoda links
4. No deployment needed!

### Example 2: Switch Active Partner

Using API:
```bash
curl -X POST https://tripsaver-api.onrender.com/api/affiliate-config \
  -H "Content-Type: application/json" \
  -d '{
    "activePartner": "booking",
    "affiliateIds": {
      "amazon": "tripsaver21-21",
      "agoda": "YOUR_AGODA_ID",
      "booking": "booking-partner-id"
    }
  }'
```

### Example 3: Programmatic Update (JavaScript)

```typescript
// In component or service
constructor(private affiliateConfig: AffiliateConfigService) {}

updatePartner(newPartnerId: string) {
  this.affiliateConfig.setActivePartner(newPartnerId).subscribe(() => {
    console.log('Partner switched!');
    window.location.reload(); // Refresh to apply
  });
}
```

---

## File Structure

```
backend/
├── server.js                          // ✅ Updated with endpoints
└── affiliate-config-admin.js          // ✅ New CLI tool

src/app/core/services/
├── affiliate-config.service.ts        // ✅ New service
└── ...

src/app/components/trip-stepper/
├── trip-stepper.component.ts          // ✅ Updated to use service
└── ...
```

---

## Fallback Behavior

If MongoDB is unavailable:
1. Frontend loads from hardcoded `affiliate-config.ts`
2. User sees warning in console
3. App continues to work with defaults
4. Automatic retry on next load

---

## Security Considerations

⚠️ **Current Setup (Development)**
- No authentication on API endpoints
- Suitable for internal use

✅ **Production Recommendations**
- Add API key authentication
- Restrict to admin users
- Use HTTPS only
- Log all changes
- Add audit trail

Example with API key:
```typescript
// In affiliate-config.service.ts
private headers = new HttpHeaders({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
});

loadConfig(): Observable<AffiliateConfigData> {
  return this.http.get<AffiliateConfigData>(
    this.apiUrl,
    { headers: this.headers }
  );
}
```

---

## Monitoring & Logging

All changes are logged:
- Console output in backend
- MongoDB timestamp (`lastUpdated`)
- `updatedBy` field for tracking
- Frontend console logs on load/update

View logs:
```bash
# Monitor backend
tail -f backend.log | grep "Affiliate"

# Check MongoDB
db.affiliate-config.find()
```

---

## Testing

### Test 1: Load Config on Startup
```typescript
// In component ngOnInit()
this.affiliateConfig.loadConfig().subscribe(
  config => console.log('✅ Config loaded:', config)
);
```

### Test 2: Update Affiliate ID
```bash
curl -X PATCH http://localhost:3000/api/affiliate-config/amazon \
  -H "Content-Type: application/json" \
  -d '{"affiliateId": "test-amazon-12345"}'
```

### Test 3: Verify in Frontend
```typescript
// In component
getAffiliateId() {
  return this.affiliateConfig.getAffiliateId('amazon');
}
```

---

## Deployment Checklist

- [ ] `MONGODB_URI` set in Render environment
- [ ] Backend deployed with new endpoints
- [ ] Frontend deployed with new service
- [ ] Initial config seeded in MongoDB
- [ ] Test API endpoints from frontend
- [ ] Admin tool tested locally
- [ ] Fallback to hardcoded config verified
- [ ] Logging working in console
- [ ] Security headers added (if needed)

---

## Troubleshooting

### "Affiliate config not found"
- Seed initial config:
  ```bash
  node affiliate-config-admin.js
  # Select option 3, enter initial values
  ```

### "Failed to load affiliate config"
- Check backend URL
- Verify CORS settings
- Check MongoDB connection
- See browser console for details

### Changes not reflecting
- Check if component reloaded config
- MongoDB takes few seconds to sync
- Clear browser cache
- Check `lastUpdated` timestamp

### API returning 404
- Verify endpoint: `/api/affiliate-config`
- Check backend is running
- Verify MongoDB collection exists

---

## Next Steps

1. ✅ Deploy backend with new endpoints
2. ✅ Deploy frontend with new service
3. ✅ Seed initial config in MongoDB
4. ✅ Test all endpoints
5. 🔄 Monitor for any issues
6. 📊 Plan auto-refresh mechanism (optional)

---

**Updated:** 2025-12-24  
**Status:** Ready for deployment  
**Authors:** GitHub Copilot
