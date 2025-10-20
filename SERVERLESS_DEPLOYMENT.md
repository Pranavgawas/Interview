# 🚀 Serverless Employee Management System

This project has been converted to a **serverless architecture** using Firebase Cloud Functions and Firebase Hosting.

## 📋 Architecture Overview

```
Frontend (React + Vite)
    ↓ (hosted on Firebase Hosting)
    ↓
Firebase Cloud Functions (Serverless API)
    ↓
Firestore Database
```

## 🛠️ Local Development

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install functions dependencies
cd functions && npm install && cd ..
```

### 2. Build Frontend

```bash
npm run build
```

### 3. Test Locally with Firebase Emulators

```bash
# Start Firebase emulators (Functions + Hosting)
firebase emulators:start
```

This will start:
- **Hosting**: http://localhost:5000
- **Functions**: http://localhost:5001
- **Firestore UI**: http://localhost:4000

## 🌐 Deploy to Production

### Prerequisites

1. **Firebase CLI** must be installed globally:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

### Deployment Steps

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy everything** (Hosting + Functions):
   ```bash
   firebase deploy
   ```

3. **Deploy only Functions**:
   ```bash
   firebase deploy --only functions
   ```

4. **Deploy only Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

## 📡 API Endpoints

All API endpoints are serverless Cloud Functions:

### Base URL (Production)
```
https://us-central1-employee-detail-management.cloudfunctions.net/api
```

Or when accessed through Firebase Hosting:
```
https://employee-detail-management.web.app/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## 📦 Project Structure

```
Interview/
├── functions/              # Firebase Cloud Functions (Serverless Backend)
│   ├── index.js           # Main function with Express API
│   └── package.json       # Functions dependencies
├── frontend/              # React Frontend
│   ├── src/
│   └── dist/             # Built files (after npm run build)
├── backend/              # ⚠️ OLD - No longer used (can be deleted)
├── firebase.json         # Firebase configuration
├── .firebaserc          # Firebase project config
└── package.json         # Root package.json

```

## ⚙️ Configuration Files

### `firebase.json`
Configures Firebase Hosting and Functions:
- Routes `/api/**` requests to Cloud Functions
- Serves frontend from `frontend/dist`
- SPA routing for React

### `.firebaserc`
Links to your Firebase project: `employee-detail-management`

## 💰 Pricing (Firebase Free Tier)

✅ **Completely FREE** for small projects:
- **Cloud Functions**: 2M invocations/month
- **Hosting**: 10 GB storage, 360 MB/day transfer
- **Firestore**: 50K reads, 20K writes, 20K deletes per day

## 🔧 Scripts

### Root `package.json`
```bash
npm run build          # Build frontend for production
npm install            # Install all dependencies
```

### `functions/package.json`
```bash
npm run serve          # Start functions emulator
npm run deploy         # Deploy functions only
npm run logs           # View function logs
```

## 🔐 Environment Variables

No `.env` file needed for production! Firebase Admin SDK uses the default service account when deployed to Firebase.

For local development with emulators, ensure Firestore is initialized in Firebase Console.

## 🚨 Common Issues

### 1. CORS Errors
The Cloud Function already includes CORS configuration. If you still face issues:
```javascript
app.use(cors({ origin: true }));
```

### 2. Cold Start
First request may take 3-5 seconds (Cloud Functions cold start). Subsequent requests are fast.

### 3. Node Version
Ensure you're using Node 22 (as specified in `functions/package.json`).

## 📊 Monitoring

View logs and metrics in Firebase Console:
```bash
firebase functions:log
```

Or visit: https://console.firebase.google.com/project/employee-detail-management/functions

## 🎉 Benefits of Serverless

✅ **No server management** - Firebase handles everything
✅ **Auto-scaling** - Scales automatically with traffic
✅ **Pay per use** - Only pay for actual requests
✅ **Global CDN** - Fast content delivery worldwide
✅ **Zero downtime** - Automatic deployments
✅ **Built-in SSL** - HTTPS by default

## 🔄 Migration from Express Server

The old Express server (`backend/server.js`) is **no longer needed**. The API has been migrated to Firebase Cloud Functions with the same endpoints and functionality.

### Can I delete the backend folder?
Yes, after confirming everything works with Firebase Functions, you can safely delete:
- `backend/` directory
- Express and nodemon from root `package.json` (optional)

## 📚 Additional Resources

- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firestore Docs](https://firebase.google.com/docs/firestore)

---

**Need help?** Check Firebase Console or run `firebase --help`
