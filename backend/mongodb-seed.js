/**
 * MongoDB Seed Data for TripSaver
 * ================================
 * 
 * This file contains the destinations data to seed into MongoDB
 * 
 * HOW TO USE:
 * 1. Set MONGODB_URI environment variable with your MongoDB connection string
 * 2. Run: node mongodb-seed.js
 * 3. The script will insert all destinations into the 'destinations' collection
 * 
 * STRUCTURE:
 * - state: Destination name (string)
 * - categories: Array of categories (Beach, Mountain, Heritage, etc.)
 * - bestMonths: Array of best months to visit (1-12)
 * - avoidMonths: Array of months to avoid (1-12)
 * - climate: Climate type (tropical, cold, hot, moderate, humid, cool, extreme, cold_desert, wet)
 * - budget: Budget level (budget, moderate, premium)
 * - agoda: Agoda search string for hotels
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'tripsaver';
const COLLECTION_NAME = 'destinations';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable not set');
  process.exit(1);
}

const destinations = [
  {
    state: 'Goa',
    categories: ['Beach', 'Party'],
    bestMonths: [11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'goa-in'
  },
  {
    state: 'Maharashtra',
    categories: ['City', 'Coastal'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'humid',
    budget: 'premium',
    agoda: 'mumbai-in'
  },
  {
    state: 'Maharashtra',
    categories: ['City', 'Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'moderate',
    budget: 'moderate',
    agoda: 'pune-in'
  },
  {
    state: 'Himachal Pradesh',
    categories: ['Mountain', 'Snow'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'budget',
    agoda: 'manali-in'
  },
  {
    state: 'Himachal Pradesh',
    categories: ['Hill', 'Colonial'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'budget',
    agoda: 'shimla-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'jaipur-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Romantic', 'Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'moderate',
    agoda: 'udaipur-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'jodhpur-in'
  },
  {
    state: 'Uttarakhand',
    categories: ['Spiritual', 'Adventure'],
    bestMonths: [3, 4, 5, 10, 11],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'budget',
    agoda: 'rishikesh-in'
  },
  {
    state: 'Delhi',
    categories: ['City', 'Culture', 'Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'hot',
    budget: 'premium',
    agoda: 'delhi-in'
  },
  {
    state: 'Uttar Pradesh',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'extreme',
    budget: 'budget',
    agoda: 'agra-in'
  },
  {
    state: 'Uttar Pradesh',
    categories: ['Spiritual', 'Culture'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'extreme',
    budget: 'budget',
    agoda: 'varanasi-in'
  },
  {
    state: 'Ladakh',
    categories: ['Adventure', 'Mountain'],
    bestMonths: [6, 7, 8, 9],
    avoidMonths: [11, 12, 1, 2, 3],
    climate: 'cold',
    budget: 'premium',
    agoda: 'leh-in'
  },
  {
    state: 'Jammu & Kashmir',
    categories: ['Nature', 'Romantic'],
    bestMonths: [4, 5, 9, 10],
    avoidMonths: [11, 12, 1, 2],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'srinagar-in'
  },
  {
    state: 'Jammu & Kashmir',
    categories: ['Snow', 'Ski'],
    bestMonths: [1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'cold',
    budget: 'premium',
    agoda: 'gulmarg-in'
  },
  {
    state: 'Kerala',
    categories: ['Backwaters', 'Culture'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'kochi-in'
  },
  {
    state: 'Kerala',
    categories: ['Hill', 'Nature'],
    bestMonths: [9, 10, 11, 12, 1],
    avoidMonths: [4, 5],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'munnar-in'
  },
  {
    state: 'Kerala',
    categories: ['Backwaters'],
    bestMonths: [8, 9, 10, 11, 12],
    avoidMonths: [5, 6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'alleppey-in'
  },
  {
    state: 'Tamil Nadu',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [4, 5, 6],
    climate: 'cool',
    budget: 'budget',
    agoda: 'ooty-in'
  },
  {
    state: 'Puducherry',
    categories: ['Beach', 'Culture', 'Colonial'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'puducherry-in'
  },
  {
    state: 'Karnataka',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'moderate',
    budget: 'budget',
    agoda: 'hampi-in'
  },
  {
    state: 'Karnataka',
    categories: ['Hill', 'Nature'],
    bestMonths: [9, 10, 11, 12, 1],
    avoidMonths: [4, 5, 6],
    climate: 'cool',
    budget: 'budget',
    agoda: 'coorg-in'
  },
  {
    state: 'Karnataka',
    categories: ['Beach'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'gokarna-in'
  },
  {
    state: 'West Bengal',
    categories: ['Hill', 'Colonial'],
    bestMonths: [3, 4, 9, 10, 11],
    avoidMonths: [6, 7, 8],
    climate: 'cool',
    budget: 'budget',
    agoda: 'darjeeling-in'
  },
  {
    state: 'Sikkim',
    categories: ['Hill', 'Nature'],
    bestMonths: [3, 4, 5, 10, 11],
    avoidMonths: [6, 7],
    climate: 'cold',
    budget: 'budget',
    agoda: 'gangtok-in'
  },
  {
    state: 'Meghalaya',
    categories: ['Nature', 'Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'wet',
    budget: 'budget',
    agoda: 'shillong-in'
  },
  {
    state: 'Andaman & Nicobar',
    categories: ['Island', 'Beach'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7, 8],
    climate: 'tropical',
    budget: 'premium',
    agoda: 'andaman-in'
  },
  {
    state: 'Punjab',
    categories: ['Spiritual', 'Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'extreme',
    budget: 'budget',
    agoda: 'amritsar-in'
  },
  {
    state: 'Kerala',
    categories: ['Beach', 'Spiritual'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'thiruvananthapuram-in'
  },
  {
    state: 'Tamil Nadu',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [4, 5, 6],
    climate: 'cool',
    budget: 'budget',
    agoda: 'coonoor-in'
  },
  {
    state: 'Maharashtra',
    categories: ['Hill'],
    bestMonths: [9, 10, 11, 12],
    avoidMonths: [5, 6, 7],
    climate: 'moderate',
    budget: 'budget',
    agoda: 'mahabaleshwar-in'
  },
  {
    state: 'Maharashtra',
    categories: ['Hill'],
    bestMonths: [9, 10, 11, 12],
    avoidMonths: [5, 6, 7],
    climate: 'moderate',
    budget: 'budget',
    agoda: 'panchgani-in'
  },
  {
    state: 'Uttarakhand',
    categories: ['Spiritual'],
    bestMonths: [4, 5, 10, 11],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'budget',
    agoda: 'uttarkashi-in'
  },
  {
    state: 'Kerala',
    categories: ['Nature', 'Wildlife'],
    bestMonths: [11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'thekkady-in'
  },
  {
    state: 'Assam',
    categories: ['Wildlife', 'Nature'],
    bestMonths: [11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'wet',
    budget: 'budget',
    agoda: 'kaziranga-in'
  },
  {
    state: 'Karnataka',
    categories: ['Heritage', 'Culture'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'bangalore-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Wildlife'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'moderate',
    agoda: 'jaisalmer-in'
  },
  {
    state: 'Madhya Pradesh',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'khajuraho-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Spiritual', 'Culture'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'pushkar-in'
  },
  {
    state: 'Rajasthan',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'mount-abu-in'
  },
  {
    state: 'Meghalaya',
    categories: ['Nature'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6, 7],
    climate: 'wet',
    budget: 'budget',
    agoda: 'cherrapunji-in'
  },
  {
    state: 'Tamil Nadu',
    categories: ['Heritage', 'Spiritual'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [4, 5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'madurai-in'
  },
  {
    state: 'Uttarakhand',
    categories: ['Hill', 'Lake'],
    bestMonths: [5, 6, 9, 10],
    avoidMonths: [11, 12, 1, 2],
    climate: 'cool',
    budget: 'budget',
    agoda: 'nainital-in'
  },
  {
    state: 'Uttarakhand',
    categories: ['Hill', 'Colonial'],
    bestMonths: [3, 4, 5, 10, 11],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'budget',
    agoda: 'almora-in'
  }
];

async function seedData() {
  let client;
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Drop existing collection to ensure clean data
    console.log('🗑️  Dropping existing destinations collection...');
    try {
      await collection.drop();
    } catch (err) {
      // Collection might not exist yet, that's fine
    }
    
    // Insert all destinations
    console.log(`📝 Inserting ${destinations.length} destinations...`);
    const result = await collection.insertMany(destinations);
    
    console.log(`✅ Successfully inserted ${result.insertedCount} destinations`);
    console.log(`📊 Sample destination:`);
    console.log(destinations[0]);
    
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
    process.exit(1);
  } finally {
    if (client) await client.close();
    console.log('✅ Done!');
  }
}

// Run seeding
seedData();
