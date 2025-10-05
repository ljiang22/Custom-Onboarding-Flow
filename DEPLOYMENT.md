# Deployment Guide

This guide will help you deploy the Custom Onboarding Flow application to production.

## 🚀 Quick Deploy (Recommended)

### Frontend: Vercel
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**:
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.herokuapp.com`

### Backend: Railway
1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Railway will auto-detect Node.js**

6. **Set Environment Variables**:
   - In Railway dashboard → Variables tab
   - Add:
     ```
     PORT=3001
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/onboarding-flow
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     ```

7. **Get MongoDB Atlas URI**:
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string
   - Replace `<password>` with your password

## 🔧 Alternative Deployments

### Option 2: Netlify + Render

**Frontend on Netlify**:
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Environment variables: `NEXT_PUBLIC_API_URL`

**Backend on Render**:
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Build command: `npm run build`
5. Start command: `npm start`

### Option 3: Full Vercel (Frontend + Backend)

**Frontend**: Deploy to Vercel (as above)

**Backend**: Use Vercel Serverless Functions
1. Create `api/` folder in frontend
2. Move backend logic to serverless functions
3. Deploy everything to Vercel

## 📋 Pre-Deployment Checklist

### Frontend
- [ ] Environment variables configured
- [ ] API URL points to production backend
- [ ] Build command works: `npm run build`
- [ ] Static export configured in `next.config.js`

### Backend
- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] CORS origin set to frontend URL
- [ ] Build command works: `npm run build`

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Network access configured

## 🧪 Testing Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Check API endpoints
3. **Test Database**: Create a user and verify data
4. **Test Admin Panel**: Configure components
5. **Test Data Table**: View collected data

## 🔍 Troubleshooting

### Common Issues
- **CORS Errors**: Check CORS_ORIGIN in backend
- **API Connection**: Verify NEXT_PUBLIC_API_URL
- **Database Connection**: Check MongoDB URI
- **Build Failures**: Check environment variables

### Debug Steps
1. Check browser console for errors
2. Check backend logs in Railway/Render
3. Verify environment variables
4. Test API endpoints directly

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics for frontend monitoring
- Track page views and performance

### Railway/Render Logs
- Monitor backend logs for errors
- Set up alerts for critical issues

## 🔄 Updates

### Frontend Updates
- Push to GitHub
- Vercel auto-deploys on push

### Backend Updates
- Push to GitHub
- Railway/Render auto-deploys on push

## 💰 Cost Estimation

### Free Tiers
- **Vercel**: Free for personal projects
- **Railway**: $5/month after free tier
- **MongoDB Atlas**: Free M0 cluster
- **Total**: ~$5/month

### Paid Options
- **Vercel Pro**: $20/month
- **Railway Pro**: $20/month
- **MongoDB Atlas**: $9/month (M2 cluster)

## 🎯 Production Checklist

- [ ] Domain name configured (optional)
- [ ] SSL certificates active
- [ ] Environment variables secured
- [ ] Database backups enabled
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance monitoring active

---

**Ready to deploy? Follow the Quick Deploy section above!**
