# TripSaver Backend Service

Simple Node.js/Express backend proxy for MongoDB API calls from GitHub Pages.

## Features

- ✅ CORS proxy for MongoDB Data API
- ✅ Health check endpoint
- ✅ Destination search and retrieval
- ✅ Production-ready with error handling
- ✅ Free deployment on Render.com

## Endpoints

### GET /api/health
Health check endpoint.

```bash
curl https://your-service.onrender.com/api/health
```

Response:
```json
{ "status": "ok", "service": "TripSaver Backend" }
```

### POST /api/destinations
Get all destinations from MongoDB.

```bash
curl -X POST https://your-service.onrender.com/api/destinations \
  -H "Content-Type: application/json"
```

Response:
```json
{
  "documents": [
    {
      "_id": "goa",
      "name": "Goa",
      "budget": "moderate",
      ...
    }
  ]
}
```

### POST /api/search
Search destinations with filter.

```bash
curl -X POST https://your-service.onrender.com/api/search \
  -H "Content-Type: application/json" \
  -d '{"filter": {"budget": "budget"}}'
```

### GET /api/destinations/:id
Get single destination by ID.

```bash
curl https://your-service.onrender.com/api/destinations/goa
```

## Deployment on Render.com

### Step 1: Create Render Account
Visit https://render.com and sign up (free)

### Step 2: Connect GitHub
- Click "New +"
- Select "Web Service"
- Connect your GitHub account
- Select `tripsaver/tripsaver.github.io` repository

### Step 3: Configure Service
- **Name:** `tripsaver-backend`
- **Branch:** `master`
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`
- **Instance Type:** Free

### Step 4: Add Environment Variables (Optional)
If you want to override MongoDB API key:
- Key: `MONGODB_API_KEY`
- Value: Your API key

### Step 5: Deploy
Click "Create Web Service" and watch it deploy!

Your backend URL will be: `https://tripsaver-backend.onrender.com`

## Using Backend in Angular

Update `mongodb.service.ts`:

```typescript
getAllDestinations(): Observable<Destination[]> {
  const backendUrl = 'https://tripsaver-backend.onrender.com/api/destinations';
  
  return this.http.post<MongoResponse<Destination>>(
    backendUrl,
    {},
    { headers: this.getHeaders() }
  ).pipe(
    timeout(5000),
    map(response => response.documents || []),
    catchError(error => {
      console.error('Backend failed:', error);
      return of([]);
    })
  );
}
```

## Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:3000
```

Test health check:
```bash
curl http://localhost:3000/api/health
```

## Security Notes

- API key is stored on server (not exposed to browser)
- CORS is limited to GitHub Pages origin
- All traffic to MongoDB is encrypted
- Consider using API key with restricted permissions for production

## Troubleshooting

### 403 Forbidden
- Check MongoDB API key is correct
- Verify MongoDB Atlas IP whitelist includes Render.com IPs

### 502 Bad Gateway
- Check if service is running (`npm start`)
- Check logs on Render.com dashboard

### No destinations returned
- Verify MongoDB collection name is `destinations`
- Check MongoDB credentials
- Verify database name is `tripsaver`

## Free Tier Limits (Render.com)

- ✅ 750 hours/month
- ✅ Web services sleep after 15 min inactivity
- ✅ Wake on first request (no cold start issue for users)
- ⚠️ Limited memory (512 MB)
- ⚠️ Limited CPU

For production, upgrade to paid plan ($10+/month).

## License

MIT
