const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'payment', 'fee'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'JPY']
  },
  description: {
    type: String,
    trim: true
  },
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: function() {
      return this.type !== 'deposit';
    }
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: function() {
      return this.type === 'transfer';
    }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  category: {
    type: String,
    enum: ['salary', 'rent', 'groceries', 'utilities', 'entertainment', 'healthcare', 'education', 'transportation', 'shopping', 'other'],
    default: 'other'
  },
  referenceNumber: String,
  merchantName: String,
  location: {
    type: String,
    trim: true
  },
  tags: [String],
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  completedAt: Date,
  failedAt: Date,
  failureReason: String
});

transactionSchema.methods.generateTransactionId = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  this.transactionId = `TXN-${timestamp}-${random}`.toUpperCase();
};

transactionSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.generateTransactionId();
  }
  
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  if (this.status === 'failed' && !this.failedAt) {
    this.failedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
