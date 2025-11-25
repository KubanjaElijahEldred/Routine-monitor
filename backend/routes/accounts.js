const express = require('express');
const { body, validationResult } = require('express-validator');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, [
  body('accountType').isIn(['checking', 'savings', 'credit']).withMessage('Invalid account type'),
  body('initialDeposit').optional().isFloat({ min: 0 }).withMessage('Initial deposit must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountType, initialDeposit = 0, currency = 'USD' } = req.body;

    const account = new Account({
      accountType,
      currency,
      owner: req.user._id,
      balance: initialDeposit
    });

    account.generateAccountNumber();
    await account.save();

    if (initialDeposit > 0) {
      const transaction = new Transaction({
        type: 'deposit',
        amount: initialDeposit,
        currency,
        description: 'Initial deposit',
        fromAccount: null,
        toAccount: account._id,
        status: 'completed'
      });
      
      transaction.generateTransactionId();
      await transaction.save();
    }

    await account.populate('owner', 'firstName lastName email');

    res.status(201).json({
      message: 'Account created successfully',
      account
    });
  } catch (error) {
    console.error('Account creation error:', error);
    res.status(500).json({ message: 'Server error creating account' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ owner: req.user._id })
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({ accounts });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ message: 'Server error fetching accounts' });
  }
});

router.get('/:accountNumber', auth, async (req, res) => {
  try {
    const account = await Account.findOne({ 
      accountNumber: req.params.accountNumber,
      owner: req.user._id 
    }).populate('owner', 'firstName lastName email');

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ account });
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ message: 'Server error fetching account' });
  }
});

router.post('/:accountNumber/deposit', auth, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description } = req.body;

    const account = await Account.findOne({ 
      accountNumber: req.params.accountNumber,
      owner: req.user._id 
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (account.status !== 'active') {
      return res.status(400).json({ message: 'Account is not active' });
    }

    await account.updateBalance(amount, 'credit');

    const transaction = new Transaction({
      type: 'deposit',
      amount,
      currency: account.currency,
      description: description || 'Deposit',
      fromAccount: null,
      toAccount: account._id,
      status: 'completed'
    });

    transaction.generateTransactionId();
    await transaction.save();

    res.json({
      message: 'Deposit successful',
      account,
      transaction
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error processing deposit' });
  }
});

router.post('/:accountNumber/withdraw', auth, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description } = req.body;

    const account = await Account.findOne({ 
      accountNumber: req.params.accountNumber,
      owner: req.user._id 
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (account.status !== 'active') {
      return res.status(400).json({ message: 'Account is not active' });
    }

    await account.updateBalance(amount, 'debit');

    const transaction = new Transaction({
      type: 'withdrawal',
      amount,
      currency: account.currency,
      description: description || 'Withdrawal',
      fromAccount: account._id,
      toAccount: null,
      status: 'completed'
    });

    transaction.generateTransactionId();
    await transaction.save();

    res.json({
      message: 'Withdrawal successful',
      account,
      transaction
    });
  } catch (error) {
    console.error('Withdrawal error:', error);
    if (error.message === 'Insufficient funds') {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    res.status(500).json({ message: 'Server error processing withdrawal' });
  }
});

module.exports = router;
