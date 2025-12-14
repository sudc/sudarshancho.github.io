/**
 * MongoDB Verification Script
 * ===========================
 * 
 * This script verifies that your MongoDB collections are properly set up
 * and displays sample data from each collection.
 * 
 * Usage:
 * node verify-mongodb.js
 */

const { MongoClient } = require('mongodb');

// @ symbol in password encoded as %40
const connectionString = 'mongodb+srv://sudarshanchoudhary5_db_user:Sbabu%40954080@cluster0.fyzaiop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'tripsaver';

async function verifyData() {
  const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    const db = client.db(dbName);
    
    // Check destinations
    console.log('📍 DESTINATIONS COLLECTION:');
    console.log('=' .repeat(50));
    const destinationsCount = await db.collection('destinations').countDocuments();
    console.log(`Total destinations: ${destinationsCount}`);
    
    const sampleDest = await db.collection('destinations').findOne({});
    if (sampleDest) {
      console.log(`Sample destination: ${sampleDest.name} (${sampleDest._id})`);
      console.log(`Categories: ${sampleDest.categories.join(', ')}`);
      console.log(`Budget: ${sampleDest.budget_level}`);
      console.log(`Best months: ${sampleDest.best_months.join(', ')}`);
    }
    
    // List all destinations
    const allDests = await db.collection('destinations').find({}).project({ _id: 1, name: 1 }).toArray();
    console.log('\nAll destinations:');
    allDests.forEach(d => console.log(`  - ${d._id}: ${d.name}`));
    
    // Check trust badges
    console.log('\n\n🎯 TRUST BADGES COLLECTION:');
    console.log('=' .repeat(50));
    const badgesCount = await db.collection('trust_badges').countDocuments();
    console.log(`Total badges: ${badgesCount}`);
    
    const allBadges = await db.collection('trust_badges').find({}).toArray();
    console.log('\nAll badges:');
    allBadges.forEach(b => console.log(`  - ${b.engine_type}: ${b.badge_label} ${b.badge_icon}`));
    
    // Check trust messages
    console.log('\n\n💬 TRUST MESSAGES COLLECTION:');
    console.log('=' .repeat(50));
    const messagesCount = await db.collection('trust_messages').countDocuments();
    console.log(`Total messages: ${messagesCount}`);
    
    const messagesByType = await db.collection('trust_messages').aggregate([
      { $group: { _id: '$message_type', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\nMessages by type:');
    messagesByType.forEach(m => console.log(`  - ${m._id}: ${m.count} messages`));
    
    // Sample messages
    const sampleMessages = await db.collection('trust_messages').find({}).limit(3).toArray();
    console.log('\nSample messages:');
    sampleMessages.forEach(m => console.log(`  - ${m._id} (${m.context}): "${m.content.substring(0, 60)}..."`));
    
    console.log('\n\n✅ All collections verified successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Destinations: ${destinationsCount}`);
    console.log(`   Trust Badges: ${badgesCount}`);
    console.log(`   Trust Messages: ${messagesCount}`);
    console.log(`   Total Documents: ${destinationsCount + badgesCount + messagesCount}`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run verification
verifyData();
