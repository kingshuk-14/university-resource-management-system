# Deployment Files & Setup Guide

## Files Added for Vercel Deployment

### Configuration Files

1. **`backend/vercel.json`**
   - Vercel configuration for Node.js backend
   - Configures serverless function
   - Routes all requests to `server.js`

2. **`backend/.env.production`**
   - Production environment variables for backend
   - Contains MongoDB connection (already configured)
   - JWT secret placeholder (needs to be changed)

3. **`frontend/vercel.json`**
   - Vercel configuration for React frontend
   - Configures static build deployment
   - Routes all requests to `index.html` (SPA routing)

4. **`frontend/.env.production`**
   - Production environment variables for frontend
   - Contains backend API URL placeholder
   - Must be updated with your backend deployment URL

### Documentation Files

1. **`VERCEL_DEPLOYMENT.md`** (Main Guide)
   - Complete deployment guide with all steps
   - Environment variable configuration
   - Troubleshooting section
   - FAQs and best practices

2. **`VERCEL_QUICK_DEPLOY.md`** (Quick Reference)
   - 5-step quick deployment guide
   - File checklist
   - Common issues and solutions

---

## What You Need To Do

### Step 1: Prepare for GitHub
```bash
# Ensure all files are committed
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Step 2: Deploy Backend

**Visit**: https://vercel.com/dashboard

1. Click "Add New" → "Project"
2. Import your GitHub repository
3. **Very Important**: Set Root Directory to `backend`
4. Add Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb`
   - `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `NODE_ENV`: `production`
5. Click "Deploy"
6. **COPY YOUR BACKEND URL** (You'll need it next)

### Step 3: Deploy Frontend

1. Click "Add New" → "Project" again
2. Import same repository
3. **Very Important**: Set Root Directory to `frontend`
4. Add Environment Variables:
   - `REACT_APP_API_URL`: Paste the backend URL from Step 2
5. Click "Deploy"
6. **Your frontend URL is now LIVE!**

---

## File Structure After Deployment Setup

```
campus-resource/
├── backend/
│   ├── vercel.json          ← NEW: Vercel config
│   ├── .env.production      ← NEW: Production env vars
│   ├── server.js
│   ├── package.json
│   └── ... (other files)
│
├── frontend/
│   ├── vercel.json          ← NEW: Vercel config
│   ├── .env.production      ← NEW: Production env vars
│   ├── package.json
│   └── ... (other files)
│
├── VERCEL_DEPLOYMENT.md     ← NEW: Full deployment guide
├── VERCEL_QUICK_DEPLOY.md   ← NEW: Quick reference
├── README.md                (existing)
└── ... (other docs)
```

---

## Settings Reference

### Backend (Node.js + Express)
- **Framework**: Node.js
- **Root Directory**: `backend`
- **Build Command**: `npm install` (default)
- **Start Command**: Auto-detected from `package.json`
- **Environment Variables**: See Step 2 above

### Frontend (React)
- **Framework**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `build` (default)
- **Environment Variables**: See Step 3 above

---

## How the Deployment Works

### Backend Flow
```
GitHub Push
    ↓
Vercel detects change in /backend
    ↓
Vercel runs: npm install
Vercel starts: Node.js server
    ↓
Express server runs on Vercel serverless
    ↓
Connects to MongoDB Atlas
    ↓
Backend URL: https://your-backend.vercel.app
```

### Frontend Flow
```
GitHub Push
    ↓
Vercel detects change in /frontend
    ↓
Vercel runs: npm run build
    ↓
React builds to /build folder
    ↓
Vercel serves static files + SPA routing
    ↓
Frontend calls backend using REACT_APP_API_URL
    ↓
Frontend URL: https://your-frontend.vercel.app
```

---

## Critical Steps Not To Miss

⚠️ **Important Notes:**

1. **Set Root Directory Correctly**
   - Backend project: Root Directory = `backend`
   - Frontend project: Root Directory = `frontend`
   - If overlooked, deployment will fail

2. **Backend URL in Frontend**
   - After backend deploys, copy the URL
   - Add it to frontend's `REACT_APP_API_URL` environment variable
   - Frontend must know where backend is deployed

3. **Generate New JWT Secret**
   - Don't use the placeholder
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Only you should know this secret

4. **Test After Deployment**
   - Test backend health: `https://your-backend.vercel.app/api/health`
   - Test frontend: Open frontend URL in browser
   - Try registering a user

---

## Environment Variables Explained

### Backend Variables

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `MONGODB_URI` | MongoDB connection string | Vercel Backend Project Settings |
| `JWT_SECRET` | Secret for signing tokens | Vercel Backend Project Settings |
| `NODE_ENV` | `production` | Vercel Backend Project Settings |

### Frontend Variables

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `REACT_APP_API_URL` | Your backend deployment URL | Vercel Frontend Project Settings |

**Note**: Frontend variables must start with `REACT_APP_`

---

## Accessing Your Live Application

After successful deployment:

```
Frontend: https://your-frontend-url.vercel.app
Backend:  https://your-backend-url.vercel.app
```

Test by:
1. Visiting frontend URL
2. Click "Register"
3. Create account with:
   - Name: Test User
   - Email: test@student.com
   - ID: S001
   - Password: test123
4. You should see Student Dashboard

---

## Common Deployment Issues & Fixes

### Issue: Backend deployment fails
**Fix**: 
- Check `backend/vercel.json` exists and is valid JSON
- Ensure `server.js` exists
- Verify `package.json` has all dependencies

### Issue: Frontend can't reach backend
**Fix**:
- Verify `REACT_APP_API_URL` is set in Vercel
- Check URL matches your backend deployment
- Trigger frontend re-deployment after changing URL

### Issue: Database connection fails
**Fix**:
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas allows Vercel IPs (should be allowed by default)
- Verify database exists

### Issue: "Module not found" on deployment
**Fix**:
- Run `npm install` locally
- Verify `package.json` is in correct directory
- Check all dependencies are listed

For more issues, see: `VERCEL_DEPLOYMENT.md` → Troubleshooting section

---

## Redeploying After Changes

### Automatic (Recommended)
```bash
# Just push to GitHub
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically redeploys!
```

### Manual (From Vercel Dashboard)
1. Go to your Vercel project
2. Click "Deployments" tab
3. Click "Redeploy"

---

## Monitoring Your Deployment

### Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click your project
3. View:
   - **Deployments**: See all versions
   - **Logs**: Real-time server logs
   - **Analytics**: Traffic and performance
   - **Settings**: Manage variables and domains

### Check Backend Logs
```bash
# From Vercel dashboard → Backend Project → Logs tab
# Watch real-time logs
```

### Check Frontend Build
```bash
# From Vercel dashboard → Frontend Project → Logs tab
# See build output and errors
```

---

## Next Steps Checklist

- [ ] Read the deployment guides
- [ ] Generate JWT secret
- [ ] Push code to GitHub
- [ ] Deploy backend to Vercel
- [ ] Copy backend URL
- [ ] Deploy frontend with backend URL
- [ ] Test both applications
- [ ] Share live URLs with team
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)

---

## Additional Resources

**For Detailed Information**, see:
- `VERCEL_DEPLOYMENT.md` - Complete guide
- `VERCEL_QUICK_DEPLOY.md` - Quick reference
- `README.md` - Project overview
- `DASHBOARD_DOCUMENTATION.md` - API documentation

**External Resources**:
- Vercel Docs: https://vercel.com/docs
- Create React App: https://create-react-app.dev/
- Express.js: https://expressjs.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

## Support

If you encounter issues:

1. **Check Vercel Logs**: Most errors shown in deployment logs
2. **Read Troubleshooting**: See VERCEL_DEPLOYMENT.md
3. **Verify Configuration**: Double-check all file contents
4. **Test Locally**: Run `npm start` to verify before deploying

---

**You're all set! Your deployment files are ready.** 🚀

For step-by-step instructions, see: `VERCEL_QUICK_DEPLOY.md`
