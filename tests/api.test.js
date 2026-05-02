const http = require('http');
const app = require('../server');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('POST /sum API — integration tests', () => {
  test('returns correct sum for valid input (10 + 20 = 30)', async () => {
    const response = await fetch('http://localhost:3001/sum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 10, b: 20 }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.result).toBe(30);
  });

  test('returns 400 for non-numeric input', async () => {
    const response = await fetch('http://localhost:3001/sum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'hello', b: 20 }),
    });
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  test('handles negative numbers via API', async () => {
    const response = await fetch('http://localhost:3001/sum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: -5, b: -10 }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.result).toBe(-15);
  });
});
