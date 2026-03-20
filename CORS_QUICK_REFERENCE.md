# CORS Setup - Quick Reference

## What Changed ✅

1. **vite.config.js** - Added proxy server for `/webhook` routes
2. **APIData.jsx** - Updated to use smart routing (dev proxy vs production API)
3. **Documentation** - Created comprehensive setup guides

---

## Quick Start

### Development
```bash
npm run dev
```
- Runs on `http://localhost:5173`
- Vite proxy handles CORS automatically
- No configuration needed!

### Test In Browser
```javascript
// Open DevTools Console and run:
fetch('/webhook/get-sheet-data')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e))
```

---

## For Production

### Option 1: Configure N8N CORS (Simplest)
Add headers to N8N webhook responses:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Option 2: Deploy Backend Proxy (Recommended)

**Step 1:** Install dependencies
```bash
npm install express cors axios dotenv
```

**Step 2:** Run proxy server
```bash
node proxy-server.js
```

**Step 3:** Create `.env` file
```env
PORT=3001
N8N_URL=https://n8n-dashboard-workflow.onrender.com
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

**Step 4:** Update API URL
In `APIData.jsx`:
```javascript
const proxyUrl = 'https://yourdomain.com/api'
return `${proxyUrl}${endpoint}`
```

---

## Files Created

- 📄 `CORS_SETUP_GUIDE.md` - Comprehensive guide
- 📄 `proxy-server.js` - Express backend proxy template
- 📄 `.env.example` - Environment variables reference
- 📄 `CORS_QUICK_REFERENCE.md` - This file

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_DEV_MODE` | Enable dev mode | `true` |
| `VITE_API_PROXY_URL` | Production proxy URL | `https://api.yourdomain.com` |
| `VITE_N8N_URL` | N8N backend URL | `https://n8n-dashboard-workflow.onrender.com` |
| `PORT` | Proxy server port | `3001` |
| `N8N_URL` | N8N for proxy server | `https://n8n-dashboard-workflow.onrender.com` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:5173,https://yourdomain.com` |

---

## Troubleshooting

### "CORS policy blocked"
- ✅ Development: Restart `npm run dev`
- ✅ Production: Check CORS headers with `curl -i https://...`
- ✅ Production: Deploy backend proxy

### "Request timeout"
- Increase timeout in axios calls
- Check if N8N is online
- Monitor network in browser DevTools

### "Cannot find module"
- Run: `npm install`
- Check all dependencies are installed

---

## How It Works

```
┌─────────────┐
│   Browser   │
│ localhost:  │
│     5173    │
└─────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Vite Dev Server (DEV)     │
│  Proxies /webhook requests  │
└─────────────────────────────┘
       │
       ▼
    (CORS handled!)
       │
       ▼
┌──────────────────────────────┐
│      N8N Backend             │
│  n8n-dashboard-workflow      │
│   .onrender.com              │
└──────────────────────────────┘
```

**Production Flow (with backend proxy):**
```
Browser → Your Proxy Server → N8N Backend
           (handles CORS)
```

---

## Testing Commands

**Test Vite proxy (dev):**
```bash
curl http://localhost:5173/webhook/get-sheet-data
```

**Test N8N directly:**
```bash
curl https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data
```

**Check CORS headers:**
```bash
curl -i -X OPTIONS https://n8n-dashboard-workflow.onrender.com/webhook/get-sheet-data
```

**Test backend proxy:**
```bash
curl http://localhost:3001/webhook/get-sheet-data
```

---

## Next Steps

1. ✅ Run `npm run dev` and test
2. 📝 For production, choose Option 1 or Option 2
3. 🚀 Deploy your app
4. 🧪 Test CORS with curl or browser DevTools
5. 📊 Monitor API responses in Network tab

---

## Support

For detailed information, see:
- `CORS_SETUP_GUIDE.md` - Full comprehensive guide
- `proxy-server.js` - Backend proxy implementation
- `.env.example` - Environment variable template
