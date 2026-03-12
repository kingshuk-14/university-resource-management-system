const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getStudentDashboard,
  getAllEvents,
  applyForEvent,
  getStudentApplications,
  withdrawApplication,
} = require('../controllers/studentController');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get dashboard data
router.get('/dashboard', getStudentDashboard);

// Get all available events
router.get('/events', getAllEvents);

// Apply for an event
router.post('/apply', applyForEvent);

// Get my applications
router.get('/my-applications', getStudentApplications);

// Withdraw application
router.put('/applications/:applicationId/withdraw', withdrawApplication);

module.exports = router;
