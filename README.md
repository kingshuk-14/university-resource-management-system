# Campus Events Management System

A full-stack web application for managing campus events with user authentication and role-based access control.

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
campus-resource/
├── backend/              # Node.js/Express backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   ├── .env             # Environment variables
│   └── package.json     # Dependencies
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS files
│   │   ├── App.js       # Main App component
│   │   └── index.js     # React entry point
│   ├── .env             # Environment variables
│   └── package.json     # Dependencies
└── db/                  # Database schema and setup
    ├── schema.md        # Database structure
    ├── setup.js         # Setup commands
    └── README.md        # Database instructions
```

## Features

### Authentication & Authorization
- ✅ User Registration with email validation
- ✅ User Login with JWT tokens
- ✅ Role-based access control
- ✅ Automatic role assignment based on email domain:
  - `@student.com` → Student role
  - `@admin.com` → Admin role
  - `@head.com` → Club Head role

### User Management
- ✅ User profile with role information
- ✅ Secure password hashing (bcryptjs)
- ✅ Token-based authentication

### Database
- ✅ MongoDB integration
- ✅ Empty collections ready for data
- ✅ Proper indexing for performance
- ✅ Pre-configured connection URL

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (provided: eventdb)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Verify `.env` file contains:
```
MONGODB_URI=mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Verify `.env` file contains:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

### Database Setup

1. Open MongoDB Compass or use MongoDB CLI
2. Connect to the provided database URL
3. Create empty collections (optional - they'll be created automatically):
   - users
   - events
   - registrations
   - clubs
   - announcements

See `db/README.md` for detailed database setup instructions.

## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@student.com",
  "idNumber": "S001",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@student.com",
    "role": "student",
    "idNumber": "S001"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@student.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get User Profile
```
GET /api/auth/profile
Authorization: Bearer jwt_token_here

Response:
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@student.com",
    "role": "student",
    "idNumber": "S001"
  }
}
```

## Usage

1. Open the application at `http://localhost:3000`
2. Click "Register" to create a new account
3. Fill in your details:
   - Full Name
   - Email (use the appropriate domain for your role)
   - ID Number (Student/Employee ID)
   - Password
4. Click "Register"
5. Your role will be automatically assigned:
   - Email ends with `@student.com` → Student
   - Email ends with `@admin.com` → Admin
   - Email ends with `@head.com` → Club Head
6. Log in with your credentials
7. View your profile and role information on the dashboard

## Testing Credentials

### Student Account
```
Email: student@student.com
ID: S001
Password: test123
```

### Admin Account
```
Email: admin@admin.com
ID: A001
Password: test123
```

### Club Head Account
```
Email: head@head.com
ID: H001
Password: test123
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Security Considerations

⚠️ **Important for Production**:
1. Change the JWT_SECRET in the backend `.env`
2. Use HTTPS instead of HTTP
3. Implement proper CORS policies
4. Add rate limiting for authentication endpoints
5. Use environment-specific configurations
6. Implement email verification
7. Add password reset functionality

## MongoDB Collections

All collections are initially empty and ready for data:

1. **users** - User accounts with hashed passwords
2. **events** - Campus events
3. **registrations** - Event registration records
4. **clubs** - Club information
5. **announcements** - System announcements

See `db/schema.md` for detailed collection schemas.

## Troubleshooting

### MongoDB Connection Error
- Verify the connection URL in `.env`
- Check your internet connection
- Ensure IP is whitelisted in MongoDB Atlas

### Frontend Cannot Connect to Backend
- Verify backend is running on port 5000
- Check `.env` file has correct API_URL
- Clear browser cache and restart

### JWT Token Errors
- Token may have expired (valid for 7 days)
- Clear localStorage and login again
- Check JWT_SECRET matches between frontend and backend

## Future Enhancements

- [ ] Email verification during registration
- [ ] Password reset functionality
- [ ] Event creation and management
- [ ] Event registration system
- [ ] Notification system
- [ ] Real-time updates with WebSockets
- [ ] File uploads for event images
- [ ] Event calendar view
- [ ] User profile customization
- [ ] Admin dashboard

## License

This project is part of the Campus Resource Management System.

## Support

For issues or questions, please contact the development team.
