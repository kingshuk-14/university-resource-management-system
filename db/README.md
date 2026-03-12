# MongoDB Database Setup Instructions

## Connection Details
- **Database**: eventdb
- **Connection URL**: mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
- **Username**: supersepm_project
- **Cluster**: campus-events-cluster

## Setup Methods

### Method 1: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to the database:
   - Paste the connection URL
   - Click "Connect"

3. After connecting, create collections:
   - Click on the database "eventdb"
   - Click "Create Collection"
   - Create the following collections:
     - `users`
     - `events`
     - `registrations`
     - `clubs`
     - `announcements`

### Method 2: Using MongoDB CLI

1. Connect to MongoDB:
```bash
mongosh "mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb"
```

2. Create collections:
```javascript
use eventdb
db.createCollection("users")
db.createCollection("events")
db.createCollection("registrations")
db.createCollection("clubs")
db.createCollection("announcements")
```

3. Create indexes:
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ idNumber: 1 }, { unique: true })
db.events.createIndex({ createdBy: 1 })
db.events.createIndex({ startDate: 1 })
db.registrations.createIndex({ userId: 1 })
db.registrations.createIndex({ eventId: 1 })
db.clubs.createIndex({ headId: 1 })
```

### Method 3: Automatic Creation

Collections will be automatically created when the first document is inserted through the Node.js application.

## Database Structure

### Collections Overview

1. **users**: Stores user accounts with role-based access
2. **events**: Stores event information
3. **registrations**: Tracks user registrations for events
4. **clubs**: Stores club information
5. **announcements**: Stores announcements

## Running the Application

1. **Backend**:
```bash
cd backend
npm install
npm start
```

2. **Frontend**:
```bash
cd frontend
npm install
npm start
```

The application will automatically connect to MongoDB using the connection URL in the `.env` file.

## Testing the System

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in the form:
   - Name: Your name
   - Email: Use domain endings for role assignment:
     - @student.com → Student role
     - @admin.com → Admin role
     - @head.com → Club Head role
4. Click "Register"
5. You should see your assigned role

## Default JWT Secret

The JWT secret is configured in `.env`. Change this in production!

Current value: `your_jwt_secret_key_change_in_production`

## Notes

- All tables are created empty
- Data will be added through the application UI
- Authentication is required for protected routes
- Roles are automatically assigned based on email domain
