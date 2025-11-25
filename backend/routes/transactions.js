const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/transfer', auth, [
  body('fromAccountNumber').notEmpty().withMessage('From account number is required'),
  body('toAccountNumber').notEmpty().withMessage('To account number is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fromAccountNumber, toAccountNumber, amount, description } = req.body;

    if (fromAccountNumber === toAccountNumber) {
      return res.status(400).json({ message: 'Cannot transfer to the same account' });
    }

    const fromAccount = await Account.findOne({ 
      accountNumber: fromAccountNumber,
      owner: req.user._id 
    });

    if (!fromAccount) {
      return res.status(404).json({ message: 'Source account not found' });
    }

    if (fromAccount.status !== 'active') {
      return res.status(400).json({ message: 'Source account is not active' });
    }

    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });

    if (!toAccount) {
      return res.status(404).json({ message: 'Destination account not found' });
    }

    if (toAccount.status !== 'active') {
      return res.status(400).json({ message: 'Destination account is not active' });
    }

    if (fromAccount.currency !== toAccount.currency) {
      return res.status(400).json({ message: 'Currency mismatch between accounts' });
    }

    await fromAccount.updateBalance(amount, 'debit');
    await toAccount.updateBalance(amount, 'credit');

    const transaction = new Transaction({
      type: 'transfer',
      amount,
      currency: fromAccount.currency,
      description: description || `Transfer to ${toAccountNumber}`,
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      status: 'completed'
    });

    transaction.generateTransactionId();
    await transaction.save();

    res.json({
      message: 'Transfer successful',
      transaction,
      fromAccount,
      toAccount: {
        accountNumber: toAccount.accountNumber,
        accountType: toAccount.accountType
      }
    });
  } catch (error) {
    console.error('Transfer error:', error);
    if (error.message === 'Insufficient funds') {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    res.status(500).json({ message: 'Server error processing transfer' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, category } = req.query;
    const skip = (page - 1) * limit;

    const userAccounts = await Account.find({ owner: req.user._id }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id);

    const query = {
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    };

    if (type) query.type = type;
    if (status) query.status = status;
    if (category) query.category = category;

    const transactions = await Transaction.find(query)
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error fetching transactions' });
  }
});

router.get('/account/:accountNumber', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const account = await Account.findOne({ 
      accountNumber: req.params.accountNumber,
      owner: req.user._id 
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const query = {
      $or: [
        { fromAccount: account._id },
        { toAccount: account._id }
      ]
    };

    const transactions = await Transaction.find(query)
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      account,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get account transactions error:', error);
    res.status(500).json({ message: 'Server error fetching account transactions' });
  }
});

router.get('/:transactionId', auth, async (req, res) => {
  try {
    const userAccounts = await Account.find({ owner: req.user._id }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id);

    const transaction = await Transaction.findOne({
      transactionId: req.params.transactionId,
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    })
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Server error fetching transaction' });
  }
});

module.exports = router;
