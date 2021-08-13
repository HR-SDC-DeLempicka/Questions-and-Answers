/* eslint-disable no-undef */
const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);
const db = require('../db/db.js');

describe('Put', () => {
  it('gets 200 code from helpful questions', async () => {
    const response = await request.put('/api/qa/questions/2/helpful');

    expect(response.status).toBe(200);
  });

  it('increments value in helpful questions', async () => {
    const num = await db.query('select helpful from questions where id = 5');
    const response = await request.put('/api/qa/questions/5/helpful');
    const newNum = await db.query('select helpful from questions where id = 5');
    expect(newNum.rows[0].helpful).toBe(num.rows[0].helpful + 1);
  });

  it('gets 200 code from reported questions', async () => {
    const response = await request.put('/api/qa/questions/2/report');

    expect(response.status).toBe(200);
  });

  it('updates bit value to 1 when reported', async () => {
    const response = await request.put('/api/qa/questions/13/report');
    const num = await db.query('select cast(reported as int) from questions where id = 13');
    expect(num.rows[0].reported).toBe(1);
  });

  it('gets 200 code from helpful answers', async () => {
    const response = await request.put('/api/qa/answers/2/helpful');

    expect(response.status).toBe(200);
  });

  it('increments value in helpful questions', async () => {
    const num = await db.query('select helpful from answers where id = 13');
    const response = await request.put('/api/qa/answers/13/helpful');
    const newNum = await db.query('select helpful from answers where id = 13');
    expect(newNum.rows[0].helpful).toBe(num.rows[0].helpful + 1);
  });

  it('gets 200 code from reported answers', async () => {
    const response = await request.put('/api/qa/answers/2/report');

    expect(response.status).toBe(200);
  });

  it('updates bit value to 1 when reported', async () => {
    const response = await request.put('/api/qa/answers/14/report');
    const num = await db.query('select cast(reported as int) from answers where id = 14');
    expect(num.rows[0].reported).toBe(1);
  });
});