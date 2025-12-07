const request = require('supertest');
const express = require('express');
const nocRoutes = require('../routes/noc');
const NOC = require('../models/NOC');

// Mock the NOC model
jest.mock('../models/NOC');

const app = express();
app.use(express.json());
app.use('/api/noc', nocRoutes);

describe('NOC Controller', () => {
  beforeEach(() => {
    // Clear the in-memory database before each test
    const db = require('../utils/inMemoryDB');
    db.clear();
  });

  describe('POST /api/noc', () => {
    it('should create a new NOC', async () => {
      const nocData = {
        name: 'John Doe',
        age: 30,
        aadhaar: '123456789012',
        address: '123 Main St',
        phone: '1234567890'
      };

      const mockNoc = { ...nocData, _id: 'mockId', save: jest.fn().mockResolvedValue({ ...nocData, _id: 'mockId' }) };
      NOC.mockImplementation(() => mockNoc);

      const response = await request(app)
        .post('/api/noc')
        .send(nocData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(nocData.name);
      expect(response.body.age).toBe(nocData.age);
      expect(mockNoc.save).toHaveBeenCalled();
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        name: '',
        age: 'invalid',
        aadhaar: '123',
        address: '',
        phone: '123'
      };

      // Mock the constructor to throw validation error
      NOC.mockImplementation(() => {
        throw new Error('Validation failed');
      });

      await request(app)
        .post('/api/noc')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/noc', () => {
    it('should return all NOCs', async () => {
      const nocData = {
        name: 'Jane Doe',
        age: 25,
        aadhaar: '987654321098',
        address: '456 Elm St',
        phone: '0987654321'
      };

      const mockNocs = [nocData];
      NOC.find.mockResolvedValue(mockNocs);

      const response = await request(app)
        .get('/api/noc')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe(nocData.name);
      expect(NOC.find).toHaveBeenCalled();
    });
  });

  describe('GET /api/noc/:id', () => {
    it('should return a NOC by ID', async () => {
      const nocData = {
        name: 'Bob Smith',
        age: 40,
        aadhaar: '111111111111',
        address: '789 Oak St',
        phone: '1111111111',
        _id: 'mockId',
        createdAt: new Date()
      };

      NOC.findById.mockResolvedValue(nocData);

      const response = await request(app)
        .get('/api/noc/mockId')
        .expect(200);

      expect(response.body.noc._id).toBe('mockId');
      expect(response.body.noc.name).toBe(nocData.name);
      expect(response.body).toHaveProperty('text');
      expect(NOC.findById).toHaveBeenCalledWith('mockId');
    });

    it('should return 404 for non-existent NOC', async () => {
      NOC.findById.mockResolvedValue(null);

      await request(app)
        .get('/api/noc/nonexistent')
        .expect(404);
    });
  });

  describe('DELETE /api/noc/:id', () => {
    it('should delete a NOC by ID', async () => {
      const nocData = {
        name: 'Alice Johnson',
        age: 35,
        aadhaar: '222222222222',
        address: '321 Pine St',
        phone: '2222222222',
        _id: 'mockId'
      };

      NOC.findByIdAndDelete.mockResolvedValue(nocData);

      await request(app)
        .delete('/api/noc/mockId')
        .expect(200);

      expect(NOC.findByIdAndDelete).toHaveBeenCalledWith('mockId');
    });

    it('should return 404 for deleting non-existent NOC', async () => {
      NOC.findByIdAndDelete.mockResolvedValue(null);

      await request(app)
        .delete('/api/noc/nonexistent')
        .expect(404);
    });
  });
});
