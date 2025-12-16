const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for your GitHub Pages domain
app.use(cors({
  origin: ['https://tripsaver.github.io', 'http://localhost:4200', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_API_URL = 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1';
const MONGODB_API_KEY = process.env.MONGODB_API_KEY || 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8';

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'TripSaver Backend', 
    status: 'ok',
    endpoints: {
      health: 'GET /api/health',
      destinations: 'POST /api/destinations',
      search: 'POST /api/search',
      destinationById: 'GET /api/destinations/:id'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ Health check requested');
  res.json({ status: 'ok', service: 'TripSaver Backend', timestamp: new Date() });
});

// Proxy endpoint for getting all destinations
app.post('/api/destinations', async (req, res) => {
  try {
    console.log('📍 [POST /api/destinations] Fetching destinations from MongoDB...');
    const response = await fetch(`${MONGODB_API_URL}/action/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'tripsaver',
        collection: 'destinations'
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ MongoDB Error:', data);
      return res.status(response.status).json({ error: data, message: 'MongoDB API error' });
    }

    console.log(`✅ [POST /api/destinations] Fetched ${data.documents?.length || 0} destinations`);
    res.json(data);
  } catch (error) {
    console.error('❌ [POST /api/destinations] Error:', error.message);
    res.status(500).json({ error: error.message, service: 'destinations' });
  }
});

// Proxy endpoint for searching destinations
app.post('/api/search', async (req, res) => {
  try {
    const { filter } = req.body;
    console.log('🔍 Searching destinations with filter:', filter);

    const response = await fetch(`${MONGODB_API_URL}/action/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'tripsaver',
        collection: 'destinations',
        filter: filter || {}
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ MongoDB Error:', data);
      return res.status(response.status).json({ error: data });
    }

    console.log(`✅ Found ${data.documents?.length || 0} destinations`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error searching destinations:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get single destination by ID
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching destination: ${id}`);

    const response = await fetch(`${MONGODB_API_URL}/action/findOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'tripsaver',
        collection: 'destinations',
        filter: { _id: id }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ MongoDB Error:', data);
      return res.status(response.status).json({ error: data });
    }

    console.log(`✅ Fetched destination: ${id}`);
    res.json(data);
  } catch (error) {
    console.error(`❌ Error fetching destination ${req.params.id}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: 'Not Found', 
    path: req.path,
    method: req.method,
    message: 'Use one of the available endpoints',
    endpoints: {
      health: 'GET /api/health',
      destinations: 'POST /api/destinations',
      search: 'POST /api/search',
      destinationById: 'GET /api/destinations/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 TripSaver Backend running on port ${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   - GET  /               (service info)`);
  console.log(`   - GET  /api/health     (health check)`);
  console.log(`   - POST /api/destinations (get all)`);
  console.log(`   - POST /api/search     (search)`);
  console.log(`   - GET  /api/destinations/:id (get by id)\n`);
});
