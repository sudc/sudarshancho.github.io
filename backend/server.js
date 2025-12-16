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

const MONGODB_API_URL = 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1';
const MONGODB_API_KEY = process.env.MONGODB_API_KEY || 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TripSaver Backend' });
});

// Proxy endpoint for getting all destinations
app.post('/api/destinations', async (req, res) => {
  try {
    console.log('📍 Fetching destinations from MongoDB...');
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
      return res.status(response.status).json({ error: data });
    }

    console.log(`✅ Fetched ${data.documents?.length || 0} destinations`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching destinations:', error.message);
    res.status(500).json({ error: error.message });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 TripSaver Backend running on port ${PORT}`);
  console.log(`📍 Service: https://your-service.onrender.com`);
  console.log(`💚 Health check: GET ${PORT === 3000 ? 'http://localhost' : 'https://your-service.onrender.com'}/api/health\n`);
});
