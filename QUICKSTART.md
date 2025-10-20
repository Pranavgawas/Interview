# 🚀 Quick Start - Serverless Deployment

## Test Locally (5 minutes)

### 1. Login to Firebase
```bash
firebase login
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Start Emulators
```bash
npm run emulator
```

Visit: **http://localhost:5000**

---

## Deploy to Production (2 minutes)

### 1. Build and Deploy Everything
```bash
npm run deploy
```

That's it! Your app will be live at:
- **https://employee-detail-management.web.app**
- **https://employee-detail-management.firebaseapp.com**

---

## Quick Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build frontend |
| `npm run emulator` | Test locally |
| `npm run deploy` | Deploy everything |
| `npm run deploy:hosting` | Deploy frontend only |
| `npm run deploy:functions` | Deploy API only |
| `npm run logs` | View function logs |

---

## What Changed?

✅ **Before**: Express server on Node.js (needs hosting)
✅ **After**: Firebase Cloud Functions (serverless, auto-scaling)

### Benefits:
- 🎯 **No server management**
- 💰 **Free tier generous** (2M function calls/month)
- 🚀 **Auto-scaling** 
- 🌍 **Global CDN**
- 🔐 **Built-in SSL**

---

For detailed docs, see [SERVERLESS_DEPLOYMENT.md](./SERVERLESS_DEPLOYMENT.md)
