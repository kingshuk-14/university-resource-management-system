# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Start the Backend
```bash
cd backend
npm install
npm start
```
✅ Backend will run on `http://localhost:5000`

### Step 2: Start the Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```
✅ Frontend will open at `http://localhost:3000`

### Step 3: Test Registration
1. Click "Register" on the home page
2. Fill in your details:
   - **Name**: Your name
   - **Email**: Use one of these formats:
     - `john@student.com` → Gets **Student** role
     - `admin@admin.com` → Gets **Admin** role  
     - `head@head.com` → Gets **Club Head** role
   - **ID Number**: Your ID (e.g., S001, A001, H001)
   - **Password**: At least 6 characters
3. Click "Register"
4. You'll see your assigned role and be redirected to the dashboard

### Step 4: Login
- Use the same email and password you just registered with
- You'll see your profile with your role displayed

## 📁 Project Structure

```
campus-resource/
├── backend/     → Node.js + Express API
├── frontend/    → React web app
└── db/          → MongoDB schemas & setup docs
```

## 🔑 Key Features

✅ **User Registration** - Quick signup with email-based role assignment
✅ **Login** - Secure JWT-based authentication
✅ **Role-Based Access** - Student, Admin, Club Head roles
✅ **Dashboard** - View your profile and role information
✅ **Empty Database** - Ready for your data

## 🎯 Role Assignment Rules

| Email Domain | Role Assigned |
|:--|:--|
| `@student.com` | Student |
| `@admin.com` | Admin |
| `@head.com` | Club Head |

## 🔗 Database Connection

✅ Already configured! The database URL is in `backend/.env`:
```
MongoDB: eventdb
Connection: MongoDB Atlas (campus-events-cluster)
Status: Empty and ready to use
```

## 📝 Sample Test Accounts

Try registering with these emails to see role assignment in action:

```
testuser@student.com  → Student role
testadmin@admin.com   → Admin role
testhead@head.com     → Club Head role
```

## ⚠️ Important Notes

1. **Passwords** must be at least 6 characters
2. **Email** must be unique (can't register twice with same email)
3. **ID Number** must be unique
4. **Role is automatic** based on email domain
5. **JWT tokens** expire after 7 days

## 🆘 Troubleshooting

**Backend won't start?**
- Delete `node_modules` and run `npm install` again
- Check port 5000 is not in use

**Frontend shows connection error?**
- Ensure backend is running
- Clear browser cache with Ctrl+Shift+Delete

**Database connection failed?**
- Check internet connection
- Verify MongoDB credentials in `backend/.env`

## 📚 What's Included?

✅ Complete Node.js backend with Express
✅ React frontend with routing
✅ MongoDB integration with schemas
✅ JWT authentication system
✅ Role-based access control
✅ Professional UI with gradients
✅ Empty collections ready for data
✅ Comprehensive documentation

## 🎓 Learning Path

1. Start with `README.md` for full documentation
2. Check `db/schema.md` for database structure
3. Review `backend/models/User.js` for user schema
4. Examine `frontend/src/pages/Register.js` for frontend flow

## ✨ What's Next?

After the basic setup is working, you can:
- [ ] Add event creation functionality
- [ ] Create event registration system
- [ ] Build event calendar view
- [ ] Add admin dashboard features
- [ ] Implement notifications
- [ ] Add more collections for events, clubs, etc.

Happy coding! 🚀
