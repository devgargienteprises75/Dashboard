/**
 * Express CORS Proxy Server
 * 
 * This server proxies requests to your N8N backend with proper CORS headers.
 * 
 * Installation:
 * npm install express cors axios dotenv
 * 
 * Running:
 * node server.js
 * 
 * Environment Variables (.env):
 * PORT=3001
 * N8N_URL=https://n8n-dashboard-workflow.onrender.com
 * ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Parse JSON bodies
app.use(express.json());

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600 // Cache preflight requests for 1 hour
}));

// Environment variables
const N8N_BASE_URL = process.env.N8N_URL || 'https://n8n-dashboard-workflow.onrender.com';
const PORT = process.env.PORT || 3001;

// Request timeout
const TIMEOUT = 30000; // 30 seconds

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Proxy GET requests to N8N webhooks
 */
app.get('/webhook/:path(*)', async (req, res) => {
  try {
    const webhookPath = req.params.path;
    const targetUrl = `${N8N_BASE_URL}/webhook/${webhookPath}`;
    
    console.log(`Proxying to: ${targetUrl}`);
    
    const response = await axios.get(targetUrl, {
      timeout: TIMEOUT,
      validateStatus: () => true // Don't throw on any status
    });
    
    // Forward the response
    res.status(response.status);
    
    // Copy important headers
    if (response.headers['content-type']) {
      res.set('Content-Type', response.headers['content-type']);
    }
    
    res.json(response.data);
    
  } catch (error) {
    console.error('Proxy Error:', error.message);
    
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
});

/**
 * Proxy POST requests to N8N webhooks
 */
app.post('/webhook/:path(*)', async (req, res) => {
  try {
    const webhookPath = req.params.path;
    const targetUrl = `${N8N_BASE_URL}/webhook/${webhookPath}`;
    
    console.log(`Proxying POST to: ${targetUrl}`);
    
    const response = await axios.post(targetUrl, req.body, {
      timeout: TIMEOUT,
      validateStatus: () => true
    });
    
    res.status(response.status);
    
    if (response.headers['content-type']) {
      res.set('Content-Type', response.headers['content-type']);
    }
    
    res.json(response.data);
    
  } catch (error) {
    console.error('Proxy Error:', error.message);
    
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS policy violation', origin: req.headers.origin });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════════════════╗
    ║      N8N CORS Proxy Server Started                 ║
    ║      Port: ${PORT}
    ║      N8N URL: ${N8N_BASE_URL}
    ║      Allowed Origins: ${allowedOrigins.join(', ')}
    ║      Health: http://localhost:${PORT}/health
    ╚════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
