/* eslint-disable no-undef */
const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Get Questions', () => {
  it('should respond with 200 status code', async () => {
    const response = await request.get('/api/qa/questions');

    expect(response.status).toBe(200);
  });
});

describe('Get Answers', () => {
  it('should respond with 200 status code', async () => {
    const response = await request.get('/api/qa/questions/2/answers');

    expect(response.status).toBe(200);
  });
});