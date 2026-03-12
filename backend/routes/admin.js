const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getAdminDashboard,
  getPendingRequests,
  approveEventRequest,
  rejectEventRequest,
  requestChanges,
  suggestAlternative,
  getAllVenues,
  addVenue,
} = require('../controllers/adminController');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get dashboard data
router.get('/dashboard', getAdminDashboard);

// Get pending event requests
router.get('/pending-requests', getPendingRequests);

// Approve event request
router.put('/events/:eventId/approve', approveEventRequest);

// Reject event request
router.put('/events/:eventId/reject', rejectEventRequest);

// Request changes
router.put('/events/:eventId/request-changes', requestChanges);

// Suggest alternative venue and date
router.put('/events/:eventId/suggest-alternative', suggestAlternative);

// Get all venues
router.get('/venues', getAllVenues);

// Add new venue
router.post('/venues', addVenue);

module.exports = router;
