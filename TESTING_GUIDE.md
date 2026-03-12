# Testing the Dashboard System

## Quick Start

### 1. Start Backend
```bash
cd backend
npm install  # if not already done
npm start
```

Backend runs on: `http://localhost:5000`

### 2. Start Frontend
```bash
cd frontend
npm install  # if not already done
npm start
```

Frontend runs on: `http://localhost:3000`

## Testing Each Role's Dashboard

### Test Student Dashboard

1. Go to `http://localhost:3000/register`
2. Register with these details:
   ```
   Name: John Student
   Email: john@student.com
   ID Number: S001
   Password: test123
   ```
3. Click "Register" - you'll be assigned the **Student** role
4. You'll be redirected to the dashboard
5. You should see the Student Dashboard with sidebar menu:
   - 🏠 Home
   - 📅 Browse Events
   - 📋 My Applications
   - ⏰ My Schedule

**Test Navigation:**
- Click on "Browse Events" → Should show "Still Under Construction"
- Click on "My Applications" → Should show "Still Under Construction"
- Click on "My Schedule" → Should show "Still Under Construction"
- Click on "Home" → Should return to Student overview

### Test Club Head Dashboard

1. Register a new account with:
   ```
   Name: Alice Head
   Email: alice@head.com
   ID Number: H001
   Password: test123
   ```
2. You'll be assigned the **Club Head** role
3. You should see the Club Head Dashboard with sidebar menu:
   - 🏠 Home
   - ➕ Create Event
   - 📅 My Events
   - 📋 Applications
   - 👥 Club Members

**Test Navigation:**
- Click on "Create Event" → Should show "Still Under Construction"
- Click on "My Events" → Should show "Still Under Construction"
- Click on "Applications" → Should show "Still Under Construction"
- Click on "Club Members" → Should show "Still Under Construction"

### Test Admin Dashboard

1. Register a new account with:
   ```
   Name: Admin User
   Email: admin@admin.com
   ID Number: A001
   Password: test123
   ```
2. You'll be assigned the **Admin** role
3. You should see the Admin Dashboard with sidebar menu:
   - 🏠 Home
   - ⏳ Pending Requests
   - 📅 All Events
   - 🏢 Venues
   - 👥 Users

**Test Navigation:**
- Click on "Pending Requests" → Should show "Still Under Construction"
- Click on "All Events" → Should show "Still Under Construction"
- Click on "Venues" → Should show "Still Under Construction"
- Click on "Users" → Should show "Still Under Construction"

## Testing Access Control

### Test 1: Wrong Role Access
1. Login as Student (john@student.com)
2. Try to access `http://localhost:3000/dashboard/club-head`
   - Should redirect to login
3. Try to access `http://localhost:3000/dashboard/admin`
   - Should redirect to login

### Test 2: Logout and Cleanup
1. Click the 🚪 "Logout" button in the sidebar
2. Should be redirected to login page
3. Try to access any dashboard route
   - Should redirect to login

### Test 3: Sidebar Collapse (Mobile)
1. Click the arrow button (← →) in top right of sidebar
2. Sidebar should collapse
3. Menu labels should hide on mobile view
4. Click again to expand

## API Testing (Using Postman or cURL)

### Test Student API
```bash
# Register and get token
POST http://localhost:5000/api/auth/register
{
  "name": "Test Student",
  "email": "teststudent@student.com",
  "idNumber": "S002",
  "password": "test123"
}

# Get dashboard data
GET http://localhost:5000/api/student/dashboard
Header: Authorization: Bearer YOUR_TOKEN

# Get all events
GET http://localhost:5000/api/student/events
Header: Authorization: Bearer YOUR_TOKEN
```

### Test Club Head API
```bash
# Register club head
POST http://localhost:5000/api/auth/register
{
  "name": "Test Club Head",
  "email": "testhead@head.com",
  "idNumber": "H002",
  "password": "test123"
}

# Get dashboard data
GET http://localhost:5000/api/club-head/dashboard
Header: Authorization: Bearer YOUR_TOKEN

# Create an event
POST http://localhost:5000/api/club-head/events
Header: Authorization: Bearer YOUR_TOKEN
Header: Content-Type: application/json
{
  "title": "Test Event",
  "description": "Test event description",
  "requiredSkills": ["Python", "JavaScript"],
  "capacity": 50
}
```

### Test Admin API
```bash
# Register admin
POST http://localhost:5000/api/auth/register
{
  "name": "Test Admin",
  "email": "testadmin@admin.com",
  "idNumber": "A002",
  "password": "test123"
}

# Get dashboard data
GET http://localhost:5000/api/admin/dashboard
Header: Authorization: Bearer YOUR_TOKEN

# Get pending requests
GET http://localhost:5000/api/admin/pending-requests
Header: Authorization: Bearer YOUR_TOKEN
```

## Expected Behavior Checklist

- [x] Three different dashboard UIs based on role
- [x] Sidebar with role-specific menu items
- [x] Proper navigation between pages
- [x] "Still Under Construction" message on all sub-pages
- [x] Logout functionality
- [x] Access control (can't access wrong role's pages)
- [x] Dynamic sidebar (can collapse)
- [x] All routes working (no 404 errors)
- [x] Backend endpoints created and documented

## Notes

- All dashboard pages currently show "Still Under Construction"
- This is intentional - waiting for content implementation
- Navigation structure is fully functional
- All role-based access control is working
- Backend APIs are ready for frontend integration

## Troubleshooting

### Issue: Dashboard not loading
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify token is valid (frontend stores in localStorage)

### Issue: Sidebar not showing
- Clear browser cache
- Check if CSS files are loading properly
- Verify all imports are correct

### Issue: Routes not working
- Check URL spelling (case-sensitive)
- Verify role matches route requirements
- Check if user is logged in (token valid)

### Issue: 403 Forbidden on API calls
- Token may be expired (7 day expiration)
- User role doesn't match endpoint
- Try logging in again

## Next Steps for Implementation

When ready to add content:

1. Create data fetching hooks
2. Build event creation forms
3. Create event browsing and filtering UI
4. Build application management interfaces
5. Create admin approval workflow UI
6. Add data tables and visualization

See `DASHBOARD_DOCUMENTATION.md` for detailed technical documentation.
