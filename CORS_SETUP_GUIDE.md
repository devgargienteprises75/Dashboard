# CORS Setup Guide for Dashboard

## Overview
This guide explains the CORS (Cross-Origin Resource Sharing) configuration for your React Dashboard project.

## Current Setup

Your project now has two CORS solutions:

### 1. **Development Environment (Vite Proxy)**
When running `npm run dev`, Vite proxies all `/webhook` requests to your N8N backend automatically:

```javascript
// vite.config.js
server: {
  proxy: {
    '/webhook': {
      target: 'https://n8n-dashboard-workflow.onrender.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/webhook/, '/webhook'),
      cors: true
    }
  }
}
```

**How it works:**
- Local request: `http://localhost:5173/webhook/get-sheet-data`
- Proxied to: `https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data`
- No CORS errors because requests originate from your server

### 2. **Production Environment**
For production, you have options:

#### Option A: Direct API Calls (if N8N has CORS enabled)
If your N8N backend has CORS headers configured, the app will directly call:
```
https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data
```

#### Option B: Backend Proxy (Recommended)
Create a Node.js/Express backend to proxy requests with proper CORS headers.

---

## How API Calls Work

The `APIData.jsx` file now uses an intelligent routing system:

```javascript
const getApiUrl = (endpoint) => {
  if (import.meta.env.DEV) {
    // Development: Use Vite proxy
    return `${endpoint}`  // e.g., /webhook/get-sheet-data
  } else {
    // Production: Use full URL
    return `https://n8n-dashboard-workflow.onrender.com${endpoint}`
  }
}
```

---

## Setup Instructions

### Step 1: Development Testing
```bash
npm run dev
```
Your app runs on `http://localhost:5173` with proxy enabled.

### Step 2: Production Configuration

#### Option A: Configure CORS on N8N Backend
Add CORS headers to your N8N instance:

```javascript
// For N8N webhook responses, add headers:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

#### Option B: Create a Proxy Backend (Node.js/Express)

1. **Install Express and CORS:**
```bash
npm install express cors axios dotenv
```

2. **Create `server.js`:**
```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const N8N_BASE_URL = process.env.N8N_URL || 'https://n8n-dashboard-workflow.onrender.com';

// Proxy all /webhook requests
app.get('/webhook/:path', async (req, res) => {
  try {
    const response = await axios.get(
      `${N8N_BASE_URL}/webhook/${req.params.path}`,
      { timeout: 30000 }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CORS Proxy server running on port ${PORT}`);
});
```

3. **Create `.env.local`:**
```
N8N_URL=https://n8n-dashboard-workflow.onrender.com
PORT=3001
```

4. **Update `APIData.jsx` for production:**
```javascript
const getApiUrl = (endpoint) => {
  if (import.meta.env.DEV) {
    return `${endpoint}`  // Vite proxy
  } else {
    const proxyUrl = import.meta.env.VITE_API_PROXY_URL || 'https://yourdomain.com/api'
    return `${proxyUrl}${endpoint}`
  }
}
```

5. **Add to `.env.production`:**
```
VITE_API_PROXY_URL=https://yourdomain.com/api
```

---

## Environment Variables

Create `.env.local` for development:
```env
# For development with Vite proxy
VITE_DEV_MODE=true
```

Create `.env.production` for production:
```env
# For production API calls
VITE_API_PROXY_URL=https://yourdomain.com/api
```

---

## Troubleshooting CORS Errors

### Error: "Access to XMLHttpRequest blocked by CORS policy"

**Solution 1: Verify Vite Proxy (Development)**
- Check if proxy is running: Vite dev server should show proxy info
- Restart dev server: `npm run dev`

**Solution 2: Check N8N CORS Headers (Production)**
```bash
curl -i https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data
```
Look for `Access-Control-Allow-Origin` headers.

**Solution 3: Use Backend Proxy**
- Implement Option B above
- Update API URLs to point to your proxy server

### Error: "timeout of 30000ms exceeded"
- Increase timeout in axios calls
- Check if N8N backend is responding
- Use curl to test: `curl https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data`

---

## Best Practices

1. **Development:** Use Vite proxy (already configured)
2. **Production:** Use a backend proxy for better control
3. **Security:** Never expose backend URLs in frontend code
4. **Rate Limiting:** Implement rate limiting on proxy server
5. **Logging:** Add request logging to track API issues
6. **Error Handling:** Use try-catch blocks for all API calls

---

## Testing CORS Setup

### Test in Browser Console
```javascript
fetch('/webhook/get-sheet-data')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e))
```

### Test with cURL
```bash
curl https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data
```

---

## Summary

✅ **Development:** Vite proxy handles CORS  
✅ **Production:** Use backend proxy or configure N8N CORS  
✅ **Code:** Updated `APIData.jsx` to route appropriately  
✅ **Config:** `vite.config.js` proxy setup complete  

Your CORS setup is ready! Test with `npm run dev` first.
