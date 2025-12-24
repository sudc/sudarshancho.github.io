/**
 * Backend API Tests for Affiliate Config
 * Tests the Express endpoints and MongoDB operations
 * 
 * To run: npm test (in backend folder)
 */

const request = require('supertest');
const { MongoClient } = require('mongodb');
const express = require('express');

describe('Affiliate Config API Endpoints', () => {
  let app;
  let db;
  let client;
  const testDbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/tripsaver-test';
  const apiUrl = '/api/affiliate-config';

  const defaultConfig = {
    _id: 'active',
    activePartner: 'agoda',
    partners: {
      agoda: {
        id: 'agoda',
        name: 'Agoda',
        logo: '🏨',
        baseUrl: 'https://www.agoda.com',
        affiliateId: '1955073',
        commission: 12,
        active: true,
        description: 'Best hotel deals in Asia',
        type: 'hotel'
      },
      amazon: {
        id: 'amazon',
        name: 'Amazon',
        logo: '🛍️',
        baseUrl: 'https://www.amazon.in',
        affiliateId: 'tripsaver21-21',
        commission: 5,
        active: true,
        description: 'Travel essentials and gear',
        type: 'shopping'
      },
      abhibus: {
        id: 'abhibus',
        name: 'AbhiBus',
        logo: '🚌',
        baseUrl: 'https://inr.deals/kQK6mx',
        affiliateId: 'kQK6mx',
        commission: 8,
        active: true,
        description: 'Bus tickets across India',
        type: 'bus'
      }
    },
    lastUpdated: new Date(),
    updatedBy: 'test'
  };

  beforeAll(async () => {
    // Connect to test database
    client = new MongoClient(testDbUri);
    await client.connect();
    db = client.db('tripsaver-test');

    // Clear affiliate-config collection
    await db.collection('affiliate-config').deleteMany({});
  });

  afterAll(async () => {
    // Clean up
    await db.collection('affiliate-config').deleteMany({});
    await client.close();
  });

  describe('GET /api/affiliate-config', () => {
    it('should return config when it exists', async () => {
      // Insert test config
      await db.collection('affiliate-config').insertOne(defaultConfig);

      const response = await request(app).get(apiUrl);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe('active');
      expect(response.body.activePartner).toBe('agoda');
      expect(response.body.partners.agoda).toBeDefined();
      expect(response.body.partners.agoda.affiliateId).toBe('1955073');
    });

    it('should auto-initialize config if not found', async () => {
      // Clear collection
      await db.collection('affiliate-config').deleteMany({});

      const response = await request(app).get(apiUrl);

      expect(response.status).toBe(200);
      expect(response.body.partners).toBeDefined();
      expect(Object.keys(response.body.partners).length).toBeGreaterThan(0);
    });

    it('should contain only active partners (no booking/expedia)', async () => {
      const response = await request(app).get(apiUrl);

      expect(response.body.partners.agoda).toBeDefined();
      expect(response.body.partners.amazon).toBeDefined();
      expect(response.body.partners.abhibus).toBeDefined();
      expect(response.body.partners.booking).toBeUndefined();
      expect(response.body.partners.expedia).toBeUndefined();
    });

    it('should have correct commission rates', async () => {
      const response = await request(app).get(apiUrl);

      expect(response.body.partners.agoda.commission).toBe(12);
      expect(response.body.partners.amazon.commission).toBe(5);
      expect(response.body.partners.abhibus.commission).toBe(8);
    });

    it('should have correct affiliate IDs', async () => {
      const response = await request(app).get(apiUrl);

      expect(response.body.partners.agoda.affiliateId).toBe('1955073');
      expect(response.body.partners.amazon.affiliateId).toBe('tripsaver21-21');
      expect(response.body.partners.abhibus.affiliateId).toBe('kQK6mx');
    });

    it('should mark all partners as active', async () => {
      const response = await request(app).get(apiUrl);

      Object.values(response.body.partners).forEach((partner: any) => {
        expect(partner.active).toBe(true);
      });
    });
  });

  describe('GET /api/affiliate-config/init', () => {
    beforeEach(async () => {
      await db.collection('affiliate-config').deleteMany({});
    });

    it('should initialize config on first call', async () => {
      const response = await request(app).get(`${apiUrl}/init`);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('initialized');
      expect(response.body.config.partners).toBeDefined();
    });

    it('should return already_exists on subsequent calls', async () => {
      // First call
      await request(app).get(`${apiUrl}/init`);

      // Second call
      const response = await request(app).get(`${apiUrl}/init`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('already_exists');
    });

    it('should initialize with correct partner structure', async () => {
      const response = await request(app).get(`${apiUrl}/init`);

      expect(response.body.config.partners.agoda.id).toBe('agoda');
      expect(response.body.config.partners.agoda.type).toBe('hotel');
      expect(response.body.config.partners.amazon.type).toBe('shopping');
      expect(response.body.config.partners.abhibus.type).toBe('bus');
    });
  });

  describe('POST /api/affiliate-config/reinitialize', () => {
    it('should delete and recreate config', async () => {
      // Insert old config with booking
      const oldConfig = {
        ...defaultConfig,
        partners: {
          ...defaultConfig.partners,
          booking: {
            id: 'booking',
            name: 'Booking.com',
            active: false,
            affiliateId: 'old-id'
          }
        }
      };
      await db.collection('affiliate-config').deleteOne({ _id: 'active' });
      await db.collection('affiliate-config').insertOne(oldConfig);

      const response = await request(app).post(`${apiUrl}/reinitialize`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('reinitialized');
      expect(response.body.config.partners.booking).toBeUndefined();
      expect(response.body.config.partners.agoda).toBeDefined();
    });

    it('should only include active partners after reinitialize', async () => {
      const response = await request(app).post(`${apiUrl}/reinitialize`);

      const partners = Object.values(response.body.config.partners);
      partners.forEach((p: any) => {
        expect(p.active).toBe(true);
      });
    });
  });

  describe('POST /api/affiliate-config', () => {
    it('should update config', async () => {
      const updateData = {
        activePartner: 'amazon'
      };

      const response = await request(app)
        .post(apiUrl)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.config.activePartner).toBe('amazon');
    });

    it('should preserve partners when updating', async () => {
      const updateData = {
        activePartner: 'abhibus'
      };

      const response = await request(app)
        .post(apiUrl)
        .send(updateData);

      expect(response.body.config.partners.agoda).toBeDefined();
      expect(response.body.config.partners.amazon).toBeDefined();
    });
  });

  describe('PATCH /api/affiliate-config/:partnerId', () => {
    it('should update specific partner affiliate ID', async () => {
      const newId = 'NEW_AGODA_ID';

      const response = await request(app)
        .patch(`${apiUrl}/agoda`)
        .send({ affiliateId: newId });

      expect(response.status).toBe(200);
      expect(response.body.config.partners.agoda.affiliateId).toBe(newId);
    });

    it('should not affect other partners', async () => {
      const originalAmazonId = 'tripsaver21-21';

      await request(app)
        .patch(`${apiUrl}/agoda`)
        .send({ affiliateId: 'ANOTHER_NEW_ID' });

      const getResponse = await request(app).get(apiUrl);

      expect(getResponse.body.partners.amazon.affiliateId).toBe(originalAmazonId);
    });
  });

  describe('Partner Validation', () => {
    it('should have baseUrl for all partners', async () => {
      const response = await request(app).get(apiUrl);

      Object.values(response.body.partners).forEach((partner: any) => {
        expect(partner.baseUrl).toBeDefined();
        expect(partner.baseUrl).toMatch(/^https?:\/\//);
      });
    });

    it('should have affiliateId for all partners', async () => {
      const response = await request(app).get(apiUrl);

      Object.values(response.body.partners).forEach((partner: any) => {
        expect(partner.affiliateId).toBeDefined();
        expect(partner.affiliateId.length).toBeGreaterThan(0);
      });
    });

    it('should have valid partner types', async () => {
      const response = await request(app).get(apiUrl);
      const validTypes = ['hotel', 'shopping', 'bus', 'both'];

      Object.values(response.body.partners).forEach((partner: any) => {
        expect(validTypes).toContain(partner.type);
      });
    });

    it('should have commission rates', async () => {
      const response = await request(app).get(apiUrl);

      Object.values(response.body.partners).forEach((partner: any) => {
        expect(partner.commission).toBeDefined();
        expect(partner.commission).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid partner ID in PATCH', async () => {
      const response = await request(app)
        .patch(`${apiUrl}/nonexistent`)
        .send({ affiliateId: 'test-id' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should return error on server issues', async () => {
      // This would test actual server error scenarios
      // Depends on specific error handling implementation
    });
  });

  describe('Data Persistence', () => {
    it('should persist config between requests', async () => {
      // Set active partner
      await request(app)
        .post(apiUrl)
        .send({ activePartner: 'amazon' });

      // Verify persistence
      const response = await request(app).get(apiUrl);

      expect(response.body.activePartner).toBe('amazon');
    });

    it('should persist affiliate ID updates', async () => {
      const newId = 'UPDATED_AMAZON_ID';

      await request(app)
        .patch(`${apiUrl}/amazon`)
        .send({ affiliateId: newId });

      const response = await request(app).get(apiUrl);

      expect(response.body.partners.amazon.affiliateId).toBe(newId);
    });
  });
});

describe('Booking.com Removal', () => {
  it('should not return booking partner in config', async () => {
    const response = await request(app).get('/api/affiliate-config');

    expect(response.body.partners.booking).toBeUndefined();
    expect(response.body.partners.expedia).toBeUndefined();
  });

  it('should only have agoda, amazon, abhibus as active', async () => {
    const response = await request(app).get('/api/affiliate-config');

    const partnerIds = Object.keys(response.body.partners);
    expect(partnerIds).toEqual(expect.arrayContaining(['agoda', 'amazon', 'abhibus']));
    expect(partnerIds.length).toBe(3);
  });
});

describe('CORS and Security', () => {
  it('should allow requests from authorized origins', async () => {
    const response = await request(app)
      .get('/api/affiliate-config')
      .set('Origin', 'https://tripsaver.github.io');

    expect(response.status).toBe(200);
  });

  it('should return proper Content-Type header', async () => {
    const response = await request(app).get('/api/affiliate-config');

    expect(response.type).toMatch(/json/);
  });
});
