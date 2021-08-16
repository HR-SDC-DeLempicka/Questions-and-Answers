/* eslint-disable no-undef */
const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);q

describe('Post', () => {
  it('gets 201 code from questions', async () => {
    const response = await request.post('/api/qa/questions');

    expect(response.status).toBe(201);
  });

  it('gets 201 code from answers', async () => {
    const response = await request.post('/api/qa/questions/2/answers');

    expect(response.status).toBe(201);
  });
});