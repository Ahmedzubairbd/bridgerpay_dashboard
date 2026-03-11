const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// @route   GET api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions
// @desc    Add multiple transactions (batch)
// @access  Private
router.post('/batch', auth, async (req, res) => {
    const { batchId, batchName, rows } = req.body;

    try {
        const newTransactions = rows.map(row => ({
            user: req.user.id,
            batchId,
            batchName,
            data: row
        }));

        await Transaction.insertMany(newTransactions);
        res.json({ msg: 'Batch uploaded successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/transactions/batch/:batchId
// @desc    Delete a batch of transactions
// @access  Private
router.delete('/batch/:batchId', auth, async (req, res) => {
    try {
        await Transaction.deleteMany({ user: req.user.id, batchId: req.params.batchId });
        res.json({ msg: 'Batch deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/transactions
// @desc    Delete all transactions for user
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        await Transaction.deleteMany({ user: req.user.id });
        res.json({ msg: 'All data cleared' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
