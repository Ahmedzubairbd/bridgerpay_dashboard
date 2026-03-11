const User = require('../models/User');

// @desc    Get user data
// @route   GET /api/user
// @access  Private
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
