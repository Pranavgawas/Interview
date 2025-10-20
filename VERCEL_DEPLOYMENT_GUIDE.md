# 🚀 Vercel Deployment Guide

## Step 1: Add Environment Variables to Vercel

You need to add your Firebase credentials as **Environment Variables** in the Vercel dashboard.

### Go to Vercel Dashboard:
1. Visit https://vercel.com/dashboard
2. Select your project (or create a new one by importing this GitHub repo)
3. Go to **Settings** → **Environment Variables**

### Add These Variables:

Copy these values from your `.env` file and add them one by one:

| Variable Name | Value (from your .env) |
|---------------|------------------------|
| `FIREBASE_PROJECT_ID` | `employee-detail-management` |
| `FIREBASE_PRIVATE_KEY_ID` | `bc767f21590b30a69f5fc84cbb013414e355d47a` |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChy0pDax+rF+oB\nm2Maewwx+DSufVGfus+dP9u90za3AAVF3pYcI92FutmfDvb2Tze2jAp0OXc4L1vS\ndQ7RaVJTDWOz4JZjWn2JAeq9aVrkn0FZrEzO+C0f2aSWQd0LtRj6QUnWcpqTxsV+\ndfa2+x4XrGm7cBd82b49AZ94dSfWtaV3q+e3gwemNJEYDItYRiE1d1XKY+rmSzUo\nWFtgZmqQ4Qfx270Mg7Y9FxoPeMUEYDNwebMayNXj6Hkfq/nlnIDzykSHIF6S+VMD\nYvBZVGw00koPJqHIGDXc5lowr7veoW/FU3ajHpYHiQI3+nvQVGp0gKcYnUZ2Xj85\neKlSs3PjAgMBAAECggEAD6IhhF8q+bC/WzVk/4+JL6DgkkWop+r4maSsemyYulkF\nqWknDwQGKSBTW9Op2EXyR7DDZ9SPqP2mfTDzZBetrTm7ewuF7Ia3X5AwWun9rt6W\nhXApIcyIK64vgZdOoQ14IuJBHLgJKKNJvPzwAGFGWJo/wy1DD7zIbYOlIZIMbeoL\nA+j4bQCeWiilUmiLGTV9EGeGdlEtVI+jyQ8DeLPuxB5GdP2pOoTcZhZh42kyrR9b\n6QhZ6uh6+EsMrYdCQLtm+6GoTB5zVmyRxmmJPpAVLuJQoYSicC3SQ9s+awK4MkG7\nXKR2eIy1bK5SZoc2tllwKkBbCaZyFRQLlpguyZ5KBQKBgQDOfxqgx2yNiUFggk4U\nyj81tlG8YNIdlLN4l+EqEPHOb+wVzIj71bYfA3MdrjyF+16zsZW0+rcmJ41MxrdF\ns5fN0eh3pb79SG7FNKMLUIuapJRJN1VDARBY9VA+5G9/JNT+J+Ng4MzHTv/TX0lv\nadz3QT/sUWYmkcnoC+c3+UU0XQKBgQDIlMFe88PKbdfcwjfsgj097iyeXvjiIPDX\nrrFDjduENugbguz+IRxYOQXWwFCOlNGsXEzhg1xCAe3ciuzpEs2MqlC7sCGMbmIJ\n5aikpry9y9nYqn05eLGyRJEP/Qem8nBZBUexyL12xxmAeS3/I0rHPS07ftpRAozq\nYo5gCODFPwKBgHDc78TouuAxINaK4fpjAGFvIQWBNdaNK/rBqIPBdyiJ69OOU2Cx\n0jTpQcX7MYFZfs1gRp8AWZI1E/nestUZ7+LC0/hxUw5ExKZsuqC4iVUglxvdbnCM\n6E525kE5wecQTooLay/MLqDRAOqarhyDFA7gTvvvEZILJPv7ZYkmaTjRAoGAEDJS\n2wP8D2CHScA1G9f4cgPFfpRUrI3UZNYqYjYWP7rfSzlrQaoSy9zu58RnvNuvgqeB\nXcRpsrrNJj3hm4B1MKKgGkfCrcBMEliFIaaFHx5S3PgHXJiuYKLAw/W+pHB3Ofj/\nLQ/0nJ6/JGykljGXXDdIa8F2h4wZLOQAcyjEXakCgYBadWDhBk7soWsTGXTpqu1Y\n9a2qT2BPQHE20/yoadG0ef5rzd4To0ct3NM9/3n978mxpEpOxx4uU871hqAzmhg6\n+nTbXJoZikWdlGbG2ydaNumRp+qcNwzPQgC3BJPR2Xsh+OjKykf/BeKs4k4GhEhN\n3HCNc2GYM1xyWmKcKrUdBA==\n-----END PRIVATE KEY-----\n` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@employee-detail-management.iam.gserviceaccount.com` |
| `FIREBASE_CLIENT_ID` | `114423737089963416829` |
| `FIREBASE_CERT_URL` | `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40employee-detail-management.iam.gserviceaccount.com` |

**Important Notes:**
- For `FIREBASE_PRIVATE_KEY`: Make sure to include the entire key with `\n` characters preserved
- Set these for **All Environments** (Production, Preview, Development)

## Step 2: Update vercel.json

The `vercel.json` file is already configured correctly. It references the environment variables you'll add in the dashboard.

## Step 3: Deploy

### Option A: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository: `Pranavgawas/Interview`
3. Vercel will auto-detect the configuration
4. Click **Deploy**

### Option B: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Verify Deployment

After deployment, your app will be live at:
```
https://your-project-name.vercel.app
```

Test the API:
```bash
curl https://your-project-name.vercel.app/api/employees
```

---

## 🔧 Troubleshooting

### Error: "Secret does not exist"
**Solution:** You forgot to add the environment variables in Vercel dashboard. Go to Settings → Environment Variables and add them.

### Error: "FIREBASE_PRIVATE_KEY" format issue
**Solution:** Make sure the private key includes `\n` for newlines. In the Vercel dashboard, paste it exactly as shown in your `.env` file.

### Error: "Build failed"
**Solution:** Make sure `frontend/dist` exists. Run `npm run build` locally first to test.

---

## 📊 What Gets Deployed

- **Frontend**: React app (built from `frontend/`)
- **API**: Serverless functions (from `api/employees.js`)
- **Database**: Firebase Firestore (credentials from environment variables)

---

## 🚀 Auto-Deploy on Push

Once connected to GitHub, Vercel will automatically:
1. Deploy on every push to `main`
2. Create preview deployments for pull requests
3. Show build logs in the dashboard

---

## 💰 Pricing

- **Vercel**: Free tier (Hobby plan) includes:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS

- **Firebase**: Free tier includes:
  - 50K reads/day
  - 20K writes/day
  - 1GB storage

Perfect for your employee management app!

---

## 📝 Next Steps

1. ✅ Add environment variables to Vercel dashboard
2. ✅ Push code to GitHub (already done)
3. ✅ Deploy via Vercel dashboard or CLI
4. ✅ Test your live app

Your deployment will be complete! 🎉
