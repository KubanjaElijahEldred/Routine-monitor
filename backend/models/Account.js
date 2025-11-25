const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  accountType: {
    type: String,
    enum: ['checking', 'savings', 'credit'],
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'JPY']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'frozen', 'closed'],
    default: 'active'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  overdraftLimit: {
    type: Number,
    default: 0,
    min: 0
  },
  interestRate: {
    type: Number,
    default: 0,
    min: 0
  },
  monthlyFee: {
    type: Number,
    default: 0,
    min: 0
  },
  minimumBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

accountSchema.methods.updateBalance = async function(amount, transactionType) {
  if (transactionType === 'credit') {
    this.balance += amount;
  } else if (transactionType === 'debit') {
    if (this.balance - amount < -this.overdraftLimit) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }
  
  this.lastActivity = new Date();
  this.updatedAt = new Date();
  return await this.save();
};

accountSchema.methods.generateAccountNumber = function() {
  const prefix = this.accountType === 'checking' ? '1' : 
                 this.accountType === 'savings' ? '2' : '3';
  const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  this.accountNumber = prefix + randomDigits;
};

module.exports = mongoose.model('Account', accountSchema);
