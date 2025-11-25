const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Account = require('../models/Account');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.put('/profile', auth, [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('phone').optional().notEmpty().withMessage('Phone number cannot be empty'),
  body('address.street').optional().notEmpty().withMessage('Street address cannot be empty'),
  body('address.city').optional().notEmpty().withMessage('City cannot be empty'),
  body('address.zipCode').optional().notEmpty().withMessage('Zip code cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const allowedFields = ['firstName', 'lastName', 'phone', 'address'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    updates.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

router.get('/summary', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ owner: req.user._id });
    
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    const accountSummary = {
      total: accounts.length,
      checking: accounts.filter(acc => acc.accountType === 'checking').length,
      savings: accounts.filter(acc => acc.accountType === 'savings').length,
      credit: accounts.filter(acc => acc.accountType === 'credit').length
    };

    const recentTransactions = await Transaction.find({
      $or: accounts.map(acc => ({ fromAccount: acc._id })).concat(
        accounts.map(acc => ({ toAccount: acc._id }))
      )
    })
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalBalance,
      accountSummary,
      recentTransactions,
      accounts: accounts.map(acc => ({
        accountNumber: acc.accountNumber,
        accountType: acc.accountType,
        balance: acc.balance,
        currency: acc.currency,
        status: acc.status
      }))
    });
  } catch (error) {
    console.error('User summary error:', error);
    res.status(500).json({ message: 'Server error fetching user summary' });
  }
});

module.exports = router;
