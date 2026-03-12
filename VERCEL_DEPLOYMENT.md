# Deployment Guide - Vercel & MongoDB Atlas

Complete guide to deploy Campus Events Management System to Vercel with MongoDB Atlas database.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Vercel)](#backend-deployment-vercel)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Environment Variables](#environment-variables)
6. [Testing Deployment](#testing-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (already provided with connection string)
- Node.js installed locally (for testing)

---

## MongoDB Atlas Setup

Your database is already configured:
- **Connection URL**: `mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb`
- **Status**: Ready to use
- **Collections**: Already defined in schema

No additional setup needed for MongoDB - it's configured and ready.

---

## Backend Deployment (Vercel)

### Step 1: Create Vercel Configuration Files

#### Create `backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret",
    "NODE_ENV": "production"
  }
}
```

#### Create `backend/.env.production`

```
MONGODB_URI=mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
JWT_SECRET=your_production_jwt_secret_change_this
PORT=3001
NODE_ENV=production
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
cd backend
git init
git add .
git commit -m "Backend deployment ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campus-resource.git
git push -u origin main
```

### Step 3: Deploy Backend to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Choose "Campus Resource" (or your repo name)
5. Configure project:
   - **Framework**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
   - **Start Command**: Leave empty (Vercel auto-detects)

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add:
     ```
     MONGODB_URI = mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
     JWT_SECRET = your_production_jwt_secret_here
     NODE_ENV = production
     ```

7. Click "Deploy"

### Step 4: Get Backend URL

After deployment completes:
- You'll get a URL like: `https://campus-resource-backend.vercel.app`
- Save this URL - you'll need it for frontend configuration
- Test it: `https://campus-resource-backend.vercel.app/api/health`

---

## Frontend Deployment (Vercel)

### Step 1: Update API URL

#### Edit `frontend/.env.production`

```
REACT_APP_API_URL=https://campus-resource-backend.vercel.app
```

Replace with your actual backend URL from previous step.

#### Edit `frontend/src/services/authService.js` (if needed)

Verify it uses environment variable:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### Step 2: Create Vercel Configuration

#### Create `frontend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Step 3: Update `frontend/package.json`

Ensure build script is correct:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Step 4: Push Frontend to GitHub

```bash
cd frontend
git add .
git commit -m "Frontend deployment ready"
git push
```

### Step 5: Deploy Frontend to Vercel

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select your repository
4. Choose "Frontend" folder
5. Configure:
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - **REACT_APP_API_URL** = `https://your-backend-url.vercel.app`

7. Click "Deploy"

### Step 6: Get Frontend URL

After deployment:
- You'll get a URL like: `https://campus-resource.vercel.app`
- This is your live application!

---

## Environment Variables

### Backend Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| MONGODB_URI | `mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb` | Database connection |
| JWT_SECRET | `your_secure_secret_key` | Change for production! |
| NODE_ENV | `production` | Vercel sets automatically |
| PORT | Auto-assigned | Vercel handles this |

### Frontend Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| REACT_APP_API_URL | `https://your-backend.vercel.app` | Backend URL |

**Important**: Environment variables in frontend must start with `REACT_APP_`

---

## Testing Deployment

### Test Backend

```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Register user
curl -X POST https://your-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@student.com",
    "idNumber": "S001",
    "password": "test123"
  }'
```

### Test Frontend

1. Open `https://your-frontend.vercel.app`
2. Register with test account
3. Verify dashboard loads
4. Test role assignment:
   - `@student.com` → Student Dashboard
   - `@head.com` → Club Head Dashboard
   - `@admin.com` → Admin Dashboard

---

## Deployment Checklist

### Backend
- [ ] `vercel.json` created
- [ ] `.env.production` configured
- [ ] All dependencies in `package.json`
- [ ] GitHub repository connected
- [ ] Environment variables added to Vercel
- [ ] Backend deploys without errors
- [ ] Health check endpoint works

### Frontend
- [ ] `vercel.json` created
- [ ] `.env.production` configured with backend URL
- [ ] `authService.js` uses environment variable
- [ ] `package.json` has correct build command
- [ ] GitHub repository connected
- [ ] Environment variables added to Vercel
- [ ] Frontend builds successfully
- [ ] Can access live URL

---

## Troubleshooting

### Backend Issues

#### Deployment fails with "Module not found"
- Ensure all dependencies are in `backend/package.json`
- Run `npm install` locally to test
- Check `vercel.json` configuration

#### Database connection error
- Verify MongoDB connection string
- Check MongoDB Atlas IP whitelist
- Ensure `MONGODB_URI` env var is set in Vercel

#### CORS errors
- Add frontend URL to CORS whitelist in `backend/server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

#### API calls return 404
- Verify backend URL in frontend `.env.production`
- Check Vercel deployment is complete
- Test backend endpoint directly with curl

### Frontend Issues

#### Cannot connect to backend
- Verify `REACT_APP_API_URL` in Vercel environment variables
- Check backend is deployed and running
- Test backend health check endpoint
- Clear browser cache

#### Build fails
- Run `npm install` locally
- Run `npm run build` locally to test
- Check for missing files or imports
- Verify `package.json` has all dependencies

#### Routes not working
- Ensure `vercel.json` has correct route configuration
- Check React Router setup
- Verify page imports are correct

#### Environment variables not loading
- Rebuild after adding environment variables
- Must restart deployment after env var changes
- Check variable names start with `REACT_APP_` (frontend only)

### MongoDB Issues

#### Connection timeout
- Check internet connection
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas
- Ensure correct username/password

#### "Authentication failed"
- Verify MongoDB credentials
- Check for special characters in password (should be URL encoded)
- Ensure user has database access

---

## Production Tips

### Security

1. **Change JWT Secret**
   ```
   OLD: your_jwt_secret_key_change_in_production
   NEW: Generate strong random string
   ```
   Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **Enable HTTPS**
   - Vercel automatically provides SSL/TLS

3. **Add rate limiting** (optional)
   ```bash
   npm install express-rate-limit
   ```

4. **Update CORS**
   - Set specific origin instead of '*'

### Performance

1. **Enable caching**
   - Add `Cache-Control` headers
   
2. **Optimize images**
   - Compress frontend assets

3. **Monitor logs**
   - Check Vercel Logs dashboard regularly

---

## Post-Deployment

### Update README
Update root `README.md` with live URLs:
```markdown
## Live Application

- **Frontend**: https://your-frontend.vercel.app
- **Backend**: https://your-backend.vercel.app
- **API Docs**: See DASHBOARD_DOCUMENTATION.md
```

### Set Custom Domain (Optional)

1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your custom domain
4. Point DNS records to Vercel

### Monitor Deployment

- Check Vercel Analytics
- Monitor backend logs for errors
- Set up error alerts
- Test critical flows regularly

---

## Rollback

If deployment has issues:

1. **Vercel Dashboard**: Click "Deployments" tab
2. Select previous working deployment
3. Click "..."
4. Select "Promote to Production"

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Node.js on Vercel**: https://vercel.com/docs/functions/serverless-functions/node-js
- **React on Vercel**: https://vercel.com/guides/deploying-react-with-vercel
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

## FAQs

### Q: Can I use same Vercel account for frontend and backend?
**A**: Yes! They can be separate projects in same Vercel team.

### Q: How to update code after deployment?
**A**: Just push to GitHub - Vercel auto-deploys on push to main branch.

### Q: Why is my backend slow on first request?
**A**: Cold starts are normal for serverless functions. Response improves after first request.

### Q: How much does Vercel hosting cost?
**A**: Vercel has a generous free tier. Check https://vercel.com/pricing for details.

### Q: Can I use a different database?
**A**: Yes! Update `MONGODB_URI` environment variable. Currently configured for MongoDB Atlas.

---

## Deployment Summary

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Backend (Node.js) | Vercel | Deploy | `https://your-backend.vercel.app` |
| Frontend (React) | Vercel | Deploy | `https://your-frontend.vercel.app` |
| Database | MongoDB Atlas | Ready | Configured |

---

**Deployment Date**: [DATE]
**Last Updated**: March 13, 2026
**Status**: ✅ Ready for Production
