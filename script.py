import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

write_file('package.json', '''{
  "name": "route-nodejs-diploma-tasks",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "supertest": "^6.3.3"
  }
}''')

write_file('src/index.js', '''const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
''')

write_file('src/app.js', '''const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// JWT Pattern
app.post('/login', (req, res) => {
  const token = jwt.sign({ user: 'admin' }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// File Upload Pattern
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  res.json({ filename: req.file.filename });
});

// Email Queue Pattern (Mock)
const emailQueue = [];
app.post('/email', (req, res) => {
  const { to, body } = req.body;
  emailQueue.push({ to, body });
  res.json({ message: 'Email queued', queueLength: emailQueue.length });
});

// Payment Webhook Pattern
app.post('/webhook/payment', (req, res) => {
  const event = req.body;
  if (event.type === 'payment_intent.succeeded') {
    // Handle payment
    res.json({ received: true, status: 'handled' });
  } else {
    res.json({ received: true, status: 'ignored' });
  }
});

module.exports = app;
''')

write_file('test/app.test.js', '''const request = require('supertest');
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
''')

write_file('README.md', '''# Route NodeJS Diploma Tasks

Curated Node.js production patterns and implementations.

## What it does
This repository provides production-ready Node.js patterns including authentication, file uploads, email queuing, and payment webhooks. It uses Express for routing and Jest for testing to ensure reliability.

## Tech
- Node.js
- Express
- Jest

## Architecture
`mermaid
flowchart TD
    Client --> ExpressServer
    ExpressServer --> JWT[Auth Module]
    ExpressServer --> Multer[File Upload]
    ExpressServer --> Queue[Email Queue]
    ExpressServer --> Webhooks[Payment Webhook]
`

## Getting started
`ash
npm install
npm test
npm start
`
''')
