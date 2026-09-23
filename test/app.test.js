const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  it('should get jwt token', async () => {
    const res = await request(app).post('/login');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should queue email', async () => {
    const res = await request(app)
      .post('/email')
      .send({ to: 'test@test.com', body: 'Hello' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Email queued');
  });
});
