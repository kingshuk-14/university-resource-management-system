const User = require('../models/User');
const Event = require('../models/Event');
const Venue = require('../models/Venue');
const TimeSlot = require('../models/TimeSlot');

// Get admin dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get pending event applications
    const pendingEvents = await Event.find({ status: 'submitted' })
      .populate('clubHeadId', 'name email')
      .sort({ createdAt: -1 });

    // Get all events
    const allEvents = await Event.find().sort({ createdAt: -1 });

    // Get venues
    const venues = await Venue.find();

    res.json({
      user,
      pendingEvents,
      allEvents,
      venues,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get pending event requests
const getPendingRequests = async (req, res) => {
  try {
    const pendingEvents = await Event.find({
      status: { $in: ['submitted', 'changes_requested'] },
    })
      .populate('clubHeadId', 'name email')
      .sort({ createdAt: -1 });

    res.json(pendingEvents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve event request
const approveEventRequest = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'submitted' && event.status !== 'changes_requested') {
      return res
        .status(400)
        .json({ message: 'Event cannot be approved in current status' });
    }

    // Approve the applied location and date
    event.approvedLocation = event.appliedLocation;
    event.approvedStartDate = event.appliedStartDate;
    event.approvedEndDate = event.appliedEndDate;
    event.status = 'approved';
    event.adminComment = null;

    // Create time slot booking
    const venue = await Venue.findOne({ name: event.appliedLocation });
    if (venue) {
      const timeSlot = new TimeSlot({
        venueId: venue._id,
        eventId: event._id,
        startDate: event.appliedStartDate,
        endDate: event.appliedEndDate,
        isBooked: true,
        bookedBy: event.clubHeadId,
      });
      await timeSlot.save();
    }

    await event.save();

    res.json({ message: 'Event approved', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject event request
const rejectEventRequest = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { comment } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.status = 'rejected';
    event.adminComment = comment || 'Your event request was rejected by admin';

    await event.save();

    res.json({ message: 'Event rejected', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Request changes
const requestChanges = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { comment } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.status = 'changes_requested';
    event.adminComment = comment || 'Please make changes to your event request';

    await event.save();

    res.json({ message: 'Changes requested', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Suggest alternative venue and date
const suggestAlternative = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { alternateLocation, alternateStartDate, alternateEndDate, comment } =
      req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.status = 'changes_requested';
    event.adminComment =
      comment ||
      `Please consider using ${alternateLocation} instead. Suggested dates: ${alternateStartDate} to ${alternateEndDate}`;

    await event.save();

    res.json({
      message: 'Alternative suggestion sent to club head',
      event,
      suggestion: {
        location: alternateLocation,
        startDate: alternateStartDate,
        endDate: alternateEndDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ name: 1 });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new venue
const addVenue = async (req, res) => {
  try {
    const { name, capacity, location, description } = req.body;

    const existingVenue = await Venue.findOne({ name });
    if (existingVenue) {
      return res.status(400).json({ message: 'Venue already exists' });
    }

    const venue = new Venue({
      name,
      capacity,
      location,
      description,
    });

    await venue.save();

    res.status(201).json({ message: 'Venue added successfully', venue });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAdminDashboard,
  getPendingRequests,
  approveEventRequest,
  rejectEventRequest,
  requestChanges,
  suggestAlternative,
  getAllVenues,
  addVenue,
};
