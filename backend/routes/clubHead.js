const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getClubHeadDashboard,
  getAvailableVenues,
  createEvent,
  submitEventApplication,
  getEventApplications,
  acceptStudentApplication,
  rejectStudentApplication,
} = require('../controllers/clubHeadController');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get dashboard data
router.get('/dashboard', getClubHeadDashboard);

// Get available venues and slots
router.get('/venues', getAvailableVenues);

// Create new event
router.post('/events', createEvent);

// Submit event application (request venue and date)
router.post('/events/:eventId/submit', submitEventApplication);

// Get applications for an event
router.get('/events/:eventId/applications', getEventApplications);

// Accept student application
router.put('/applications/:applicationId/accept', acceptStudentApplication);

// Reject student application
router.put('/applications/:applicationId/reject', rejectStudentApplication);

module.exports = router;
