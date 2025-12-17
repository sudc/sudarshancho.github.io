# TripSaver Backend - MongoDB Data Setup

## 📋 Overview

The TripSaver backend now reads destination data from MongoDB instead of static files. This document explains how to seed the database and verify the setup.

## 🚀 Quick Start

### 1. Seed MongoDB with Destinations Data

Run the seed script on your local machine (or anywhere with Node.js):

```bash
# Set your MongoDB connection string
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/tripsaver?retryWrites=true&w=majority"

# Run the seed script
cd backend
node mongodb-seed.js
```

Expected output:
```
🔗 Connecting to MongoDB...
🗑️  Dropping existing destinations collection...
📝 Inserting 44 destinations...
✅ Successfully inserted 44 destinations
✅ Done!
```

### 2. Verify Data in MongoDB

Go to MongoDB Atlas Dashboard:
1. Select your cluster
2. Go to **Collections** tab
3. Navigate to `tripsaver` → `destinations`
4. You should see 44 destinations with proper structure

### 3. Test Backend API

Once deployed to Render:

```bash
# Get all destinations
curl https://tripsaver-github-io.onrender.com/api/destinations

# Expected response:
[
  {
    "state": "Goa",
    "categories": ["Beach", "Party"],
    "bestMonths": [11, 12, 1, 2],
    "avoidMonths": [6, 7, 8],
    "climate": "tropical",
    "budget": "moderate",
    "agoda": "goa-in"
  },
  ...
]
```

## 📊 Data Structure

Each destination document in MongoDB has:

```javascript
{
  state: String,                    // e.g., "Goa"
  categories: Array<String>,        // e.g., ["Beach", "Party"]
  bestMonths: Array<Number>,        // 1-12, e.g., [11, 12, 1, 2]
  avoidMonths: Array<Number>,       // 1-12, e.g., [6, 7, 8]
  climate: String,                  // tropical, cold, hot, moderate, humid, cool, extreme, cold_desert, wet
  budget: String,                   // budget, moderate, premium
  agoda: String                     // Agoda search string, e.g., "goa-in"
}
```

## 🔄 Data Flow

### Before (Static)
```
Frontend → Engine → DESTINATIONS_DATA (static) → Recommendations
```

### Now (MongoDB)
```
Frontend → Engine → HTTP GET /api/destinations (MongoDB) → Recommendations
                 ↓
              (fallback to static if backend fails)
```

## 🛠️ Backend API Endpoints

### Health Check
```bash
GET /api/health
→ { status: "ok", database: "connected", timestamp: "..." }
```

### Get All Destinations
```bash
GET /api/destinations
→ [ { state: "Goa", ... }, ... ]
```

### Search Destinations
```bash
POST /api/search
Body: { "query": "beach" }
→ [ { state: "Puducherry", ... }, ... ]
```

### Get Single Destination
```bash
GET /api/destinations/:id
→ { state: "Goa", ... }
```

## ⚙️ Configuration

### Environment Variables (Render)

Add to Render service settings:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tripsaver?retryWrites=true&w=majority
```

### Angular Environment Files

Already configured in:
- `src/environments/environment.ts` → `http://localhost:3000` (dev)
- `src/environments/environment.prod.ts` → `https://tripsaver-github-io.onrender.com` (prod)

## 🧪 Testing

### Local Testing

1. Start backend locally:
```bash
cd backend
MONGODB_URI="your-connection-string" npm start
```

2. In another terminal, test the API:
```bash
curl http://localhost:3000/api/destinations
```

3. Frontend should auto-fetch from `http://localhost:3000`

### Production Testing

1. Deploy to Render (auto-deploy on git push)
2. Check backend health:
   ```bash
   curl https://tripsaver-github-io.onrender.com/api/health
   ```
3. Load frontend at https://tripsaver.github.io
4. Select interests and verify recommendations appear
5. Check browser console (F12) for API calls

## 📝 Console Logs

When working correctly, you should see:

**Backend (Render logs):**
```
✅ Connected to MongoDB Atlas
🚀 TripSaver Backend running on port 3000
```

**Frontend (Browser console):**
```
📡 Fetching destinations from MongoDB backend...
✅ Loaded 44 destinations from MongoDB
```

## 🔄 Updating Destination Data

To modify destinations data:

1. Edit `backend/mongodb-seed.js` (update the `destinations` array)
2. Run `node mongodb-seed.js` with proper `MONGODB_URI`
3. Verify data in MongoDB Atlas
4. Frontend will automatically use new data (no code changes needed)

## 🆘 Troubleshooting

### Backend Error: "Cannot find module 'mongodb'"
**Fix:** Ensure `backend/package.json` has `"mongodb": "^6.3.0"`

### Backend Error: "MONGODB_URI is not defined"
**Fix:** Add `MONGODB_URI` environment variable to Render service settings

### Frontend Still Using Static Data
**Possible Causes:**
1. Backend API not responding → Check backend is deployed and healthy
2. CORS issue → Check backend CORS configuration includes frontend URL
3. Network error → Check browser Network tab (F12 → Network)
4. Fallback active → Check console logs for error message

### Empty Recommendations
**Possible Causes:**
1. MongoDB empty → Run seed script
2. No destinations matching interests → Check destination categories
3. Score threshold too high → Currently set to 25% (can adjust in code)

## 📚 Related Files

- **Backend:** `backend/server.js`, `backend/package.json`
- **Engine:** `src/app/core/engines/destination-scoring/destination-scoring.engine.ts`
- **Service:** `src/app/core/services/mongodb/mongodb.service.ts`
- **Fallback Data:** `src/app/core/engines/destination/destinations.data.ts` (still used if backend fails)
- **Seed Script:** `backend/mongodb-seed.js` (this file)

## ✅ Verification Checklist

- [ ] MongoDB cluster created and connection string obtained
- [ ] Environment variable `MONGODB_URI` added to Render
- [ ] Backend deployed successfully to Render
- [ ] Seed script run: `node backend/mongodb-seed.js`
- [ ] 44 destinations visible in MongoDB Atlas
- [ ] Backend health check works: `curl .../api/health`
- [ ] Frontend loads recommendations from backend (check console logs)
- [ ] Static fallback works if backend is temporarily down
