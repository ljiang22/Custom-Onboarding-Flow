# Backend Deployment Guide

## 🚀 Deploy Backend to Railway

### Step 1: Prepare Backend
Your backend is already built and ready! The build process creates:
- `dist/` folder with compiled JavaScript
- All TypeScript files converted to JavaScript
- Dependencies installed

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Set Root Directory**: `backend`
6. **Railway will auto-detect Node.js**

### Step 3: Environment Variables

In Railway dashboard, add these environment variables:

```
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onboarding-flow
CORS_ORIGIN=https://your-vercel-url.vercel.app
```

### Step 4: MongoDB Atlas Setup

1. **Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)**
2. **Create free account**
3. **Create new cluster** (free M0 tier)
4. **Create database user**
5. **Get connection string**
6. **Update MONGODB_URI in Railway**

### Step 5: Get Railway URL

After deployment, Railway will give you a URL like:
`https://your-project-name.railway.app`

### Step 6: Update Frontend

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-railway-url.railway.app/api`

## 🔧 Local Testing

Test your backend locally:

```bash
cd backend
npm run build
npm start
```

Visit: http://localhost:3001/api/users

## 📋 Deployment Checklist

- [ ] Backend builds successfully (`npm run build`)
- [ ] Railway deployment successful
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set in Railway
- [ ] Frontend API URL updated in Vercel
- [ ] Test API endpoints work
- [ ] Test full application flow

## 🧪 Testing Endpoints

After deployment, test these URLs:
- `https://your-railway-url.railway.app/api/users`
- `https://your-railway-url.railway.app/api/config`

## 🚨 Troubleshooting

### Build Errors
- Check Railway build logs
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

### Connection Errors
- Check MongoDB URI format
- Verify network access in MongoDB Atlas
- Check CORS_ORIGIN matches your frontend URL

### Runtime Errors
- Check Railway logs
- Verify environment variables
- Test database connection
