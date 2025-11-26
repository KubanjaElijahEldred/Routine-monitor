import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI, transactionAPI } from '../services/api';
import { formatCurrency } from '../utils/auth';
import { Link } from 'react-router-dom';

const Transfer: React.FC = () => {
  const [formData, setFormData] = useState({
    fromAccountNumber: '',
    toAccountNumber: '',
    amount: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: accountsData } = useQuery({
    queryKey: ['accounts'],
    queryFn: accountAPI.getAccounts,
  });

  const transferMutation = useMutation({
    mutationFn: transactionAPI.transfer,
    onSuccess: (response: any) => {
      setSuccess('Transfer completed successfully!');
      setError('');
      setFormData({
        fromAccountNumber: '',
        toAccountNumber: '',
        amount: '',
        description: '',
      });
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Transfer failed');
      setSuccess('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.fromAccountNumber || !formData.toAccountNumber || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.fromAccountNumber === formData.toAccountNumber) {
      setError('Cannot transfer to the same account');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    transferMutation.mutate({
      fromAccountNumber: formData.fromAccountNumber,
      toAccountNumber: formData.toAccountNumber,
      amount,
      description: formData.description,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const accounts = accountsData?.data || [];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transfer Money
            </h1>
            <p className="text-white/80 text-lg">
              Move money between your accounts instantly
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transfer Form */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Transfer Details</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* From Account */}
              <div>
                <label className="block text-white font-medium mb-2">From Account</label>
                <select
                  name="fromAccountNumber"
                  value={formData.fromAccountNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-colors"
                  required
                >
                  <option value="" className="bg-gray-800">Select account</option>
                  {accounts.map((account: any) => (
                    <option key={account.id} value={account.accountNumber} className="bg-gray-800">
                      {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account ({account.accountNumber}) - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label className="block text-white font-medium mb-2">To Account</label>
                <select
                  name="toAccountNumber"
                  value={formData.toAccountNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-colors"
                  required
                >
                  <option value="" className="bg-gray-800">Select account</option>
                  {accounts.map((account: any) => (
                    <option key={account.id} value={account.accountNumber} className="bg-gray-800">
                      {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account ({account.accountNumber}) - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-white font-medium mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">$</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What's this transfer for?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={transferMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {transferMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Transfer Money'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions & Account Info */}
        <div className="space-y-6">
          {/* Quick Transfer */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Quick Transfer</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white">
                <div className="flex justify-between items-center">
                  <span>Checking to Savings</span>
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white">
                <div className="flex justify-between items-center">
                  <span>Savings to Checking</span>
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Account Summary */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Accounts</h3>
            <div className="space-y-3">
              {accounts.map((account: any) => (
                <div key={account.id} className="p-3 bg-white/10 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium capitalize">{account.accountType}</p>
                      <p className="text-white/70 text-sm">{account.accountNumber}</p>
                    </div>
                    <p className="text-white font-bold">{formatCurrency(account.balance)}</p>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <p className="text-white/70 text-center py-4">No accounts available</p>
              )}
            </div>
          </div>

          {/* Transfer Tips */}
          <div className="glass rounded-2xl p-6 border-gradient border-2 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Transfer Tips</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Transfers between your accounts are instant
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                No fees for internal transfers
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Minimum transfer amount is $0.01
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                You can't transfer to the same account
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
