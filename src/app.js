const express = require('express');
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
