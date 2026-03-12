# Dashboard System Documentation

## Overview

The application now has a complete role-based dashboard system with three main roles:

1. **Student Dashboard** - Browse and apply for events
2. **Club Head Dashboard** - Create and manage events
3. **Admin Dashboard** - Approve events and manage venues

## Architecture

### Backend Routes

All routes are protected with JWT authentication.

#### Student Routes (`/api/student`)
- `GET /dashboard` - Get student dashboard data
- `GET /events` - Get all available events (with filtering)
- `POST /apply` - Apply for an event
- `GET /my-applications` - Get student's applications
- `PUT /applications/:applicationId/withdraw` - Withdraw an application

#### Club Head Routes (`/api/club-head`)
- `GET /dashboard` - Get club head dashboard data
- `GET /venues` - Get available venues and time slots
- `POST /events` - Create a new event
- `POST /events/:eventId/submit` - Submit event application to admin
- `GET /events/:eventId/applications` - Get applications for an event
- `PUT /applications/:applicationId/accept` - Accept student application
- `PUT /applications/:applicationId/reject` - Reject student application

#### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get admin dashboard data
- `GET /pending-requests` - Get pending event requests
- `PUT /events/:eventId/approve` - Approve event
- `PUT /events/:eventId/reject` - Reject event
- `PUT /events/:eventId/request-changes` - Request changes
- `PUT /events/:eventId/suggest-alternative` - Suggest venue/date
- `GET /venues` - Get all venues
- `POST /venues` - Add new venue

### Database Models

#### Event Model
- Tracks event information
- Stores applied and approved venue/date
- Maintains event status through approval workflow
- Links to club head and club

#### StudentApplication Model
- Records student applications for events
- Tracks application status (applied, accepted, rejected, withdrawn)
- Stores student skills submitted with application

#### Venue Model
- Manages available venues
- Stores venue capacity and location

#### TimeSlot Model
- Tracks booked time slots
- Prevents venue conflicts
- Links to events and venues

#### Club Model
- Manages club information
- Associates club head with club
- Tracks club members

### Frontend Routes

#### Student Routes
- `/dashboard/student` - Home/Overview
- `/dashboard/student/events` - Browse available events
- `/dashboard/student/applications` - Track applications
- `/dashboard/student/schedule` - View event schedule

#### Club Head Routes
- `/dashboard/club-head` - Home/Overview
- `/dashboard/club-head/create-event` - Create new event
- `/dashboard/club-head/my-events` - View/manage created events
- `/dashboard/club-head/applications` - Review student applications
- `/dashboard/club-head/members` - Manage club members

#### Admin Routes
- `/dashboard/admin` - Home/Overview
- `/dashboard/admin/pending-requests` - Review pending event requests
- `/dashboard/admin/all-events` - View all events
- `/dashboard/admin/venues` - Manage venues
- `/dashboard/admin/users` - Manage users

## Event Workflow

### Event Creation and Approval Process

```
1. Club Head creates event (status: draft)
2. Club Head submits event with venue/date request (status: submitted)
3. Admin reviews pending request
4. Admin can:
   - Approve (status: approved, venue/date confirmed)
   - Reject (status: rejected, with reason)
   - Request changes (status: changes_requested, with comment)
   - Suggest alternative (status: changes_requested, with suggestion)
5. If approved, time slot is booked automatically
6. Event becomes active and students can apply
```

### Student Application Process

```
1. Student browses available events
2. Student applies for event (submits skills)
3. Application created (status: applied)
4. Club head reviews applications
5. Club head can:
   - Accept (status: accepted)
   - Reject (status: rejected, with comment)
6. Student can withdraw (status: withdrawn)
```

## Components

### Sidebar Component
- Dynamic navigation based on user role
- Collapsible for mobile
- Shows user info
- Logout functionality

### ProtectedRoute Component
- Validates authentication
- Checks user role
- Redirects unauthorized access

### Dashboard Pages
- All pages have "Still Under Construction" message
- Ready for content implementation
- Proper role-based access control

## Key Features

### Conflict Avoidance
- When club head requests venue and date, system checks availability
- Admin can see all booked slots
- Time slot model prevents double-booking
- Alternative venue suggestions available

### Role-Based Access
- Each route checked for appropriate role
- Frontend and backend validation
- Automatic redirection for unauthorized access

### Dynamic Navigation
- Sidebar updates based on user role
- Menu items pre-configured for each role
- No hardcoding of navigation

### Token-Based Authentication
- JWT tokens valid for 7 days
- Automatic redirect on token expiry
- Secure password storage with bcrypt

## Testing

To test the dashboard system:

1. **Register as Student**
   - Use email ending with `@student.com`
   - Login and navigate to Student Dashboard

2. **Register as Club Head**
   - Use email ending with `@head.com`
   - Login and navigate to Club Head Dashboard

3. **Register as Admin**
   - Use email ending with `@admin.com`
   - Login and navigate to Admin Dashboard

4. **Test Navigation**
   - Verify sidebar appears with correct menu items
   - Test route protection (try accessing wrong role's routes)
   - Test logout functionality

## Current Status

✅ Backend routes created and documented
✅ Database models for event workflow
✅ Role-based access control
✅ Frontend dashboard structure
✅ Sidebar with dynamic navigation
✅ Protected routes with role validation
✅ All pages display "Under Construction" message
⏳ Content implementation (next phase)

## Next Steps

1. Implement event creation form (Club Head)
2. Build event browsing and filtering (Student)
3. Create event approval workflow (Admin)
4. Implement student applications
5. Add venue and timeslot management
6. Create event management interfaces
7. Add data visualization and dashboards
