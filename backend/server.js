require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const clubHeadRoutes = require('./routes/clubHead');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Configure CORS for production and development
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://campussync-phi.vercel.app',
    'https://sepmbackend.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Campus Resource Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      student: '/api/student',
      clubHead: '/api/club-head',
      admin: '/api/admin',
      health: '/api/health'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/club-head', clubHeadRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
