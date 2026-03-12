const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please provide a valid email').isEmail(),
    body('idNumber', 'ID Number is required').trim().notEmpty(),
    body('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  register
);

// Login Route
router.post(
  '/login',
  [
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// Get user profile (protected route)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        idNumber: user.idNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
