const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   GET api/user
// @desc    Get user data
// @access  Private
router.get('/', auth, getUser);

module.exports = router;
