# Vercel Deployment Quick Start

## Step-by-Step Deployment (5 minutes)

### 1. Prepare Files ✅
- ✅ `backend/vercel.json` - Created
- ✅ `backend/.env.production` - Created
- ✅ `frontend/vercel.json` - Created
- ✅ `frontend/.env.production` - Created

### 2. Push to GitHub

```bash
# From project root
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### 3. Deploy Backend

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Set Root Directory: `backend`
5. Add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
   JWT_SECRET = (generate random string)
   NODE_ENV = production
   ```
6. Click "Deploy"
7. **Copy your backend URL** (example: `https://campus-resource-backend.vercel.app`)

### 4. Deploy Frontend

1. Click "New Project" again
2. Select same repository
3. Set Root Directory: `frontend`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL = (paste backend URL from step 3)
   ```
5. Click "Deploy"
6. **Your frontend URL is live!** (example: `https://campus-resource.vercel.app`)

### 5. Test

```bash
# Test backend
curl https://your-backend-url/api/health

# Test frontend
Open https://your-frontend-url in browser
Register with: test@student.com
```

---

## Files Created for Deployment

### Backend
```
backend/
├── vercel.json              ← Deployment configuration
├── .env.production          ← Production environment variables
└── server.js               (existing)
```

### Frontend
```
frontend/
├── vercel.json              ← Deployment configuration
├── .env.production          ← Production environment variables
└── package.json            (existing)
```

---

## Environment Variables to Update

### In Vercel Dashboard - Backend Project
```
MONGODB_URI: mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
JWT_SECRET: [GENERATE RANDOM STRING]
NODE_ENV: production
```

### In Vercel Dashboard - Frontend Project
```
REACT_APP_API_URL: [YOUR BACKEND URL FROM BACKEND DEPLOYMENT]
```

---

## Generate JWT Secret

Run this in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy output and use as JWT_SECRET in Vercel.

---

## Deployment URLs

After successful deployment:

| Component | URL |
|-----------|-----|
| Frontend | `https://your-project.vercel.app` |
| Backend API | `https://your-backend.vercel.app` |
| API Health Check | `https://your-backend.vercel.app/api/health` |

---

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't deploy | Check `vercel.json` syntax, ensure `server.js` exists |
| Frontend can't reach backend | Verify `REACT_APP_API_URL` matches backend deploy URL |
| DB connection error | Verify `MONGODB_URI` in backend environment variables |
| Build fails | Run `npm install && npm run build` locally to verify |

---

## Documentation

For detailed deployment guide, see: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## Important Notes

1. **Generate New JWT Secret** - Don't use default in production
2. **Update Backend URL in Frontend** - Must be done after backend deploys
3. **Test Immediately** - Verify both frontend and backend after deployment
4. **Monitor Logs** - Check Vercel dashboard for errors in first 24 hours
5. **Keep Main Branch Clean** - Vercel auto-deploys on push to main

---

## Next Steps

1. ✅ Push code to GitHub
2. ⏳ Deploy backend to Vercel (get URL)
3. ⏳ Update frontend `.env.production` with backend URL
4. ⏳ Deploy frontend to Vercel
5. ✅ Test both applications
6. ✅ Share live URLs with team

---

**Ready to Deploy? Follow the 5-step guide above!** 🚀
