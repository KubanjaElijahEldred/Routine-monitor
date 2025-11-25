import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI, transactionAPI } from '../services/api';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    const transferData = {
      fromAccountNumber: formData.fromAccountNumber,
      toAccountNumber: formData.toAccountNumber,
      amount: parseFloat(formData.amount),
      description: formData.description,
    };

    transferMutation.mutate(transferData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transfer Money</h1>
        <p className="text-gray-600 mt-2">Transfer funds between your accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Transfer Details</h3>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-error mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fromAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  From Account
                </label>
                <select
                  id="fromAccountNumber"
                  name="fromAccountNumber"
                  value={formData.fromAccountNumber}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select account</option>
                  {accountsData?.data?.accounts?.map((account: any) => (
                    <option key={account.id} value={account.accountNumber}>
                      {account.accountType} - {account.accountNumber} ({account.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="toAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  To Account
                </label>
                <select
                  id="toAccountNumber"
                  name="toAccountNumber"
                  value={formData.toAccountNumber}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select account</option>
                  {accountsData?.data?.accounts?.map((account: any) => (
                    <option key={account.id} value={account.accountNumber}>
                      {account.accountType} - {account.accountNumber} ({account.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  className="input"
                  placeholder="Transfer description"
                />
              </div>

              <button
                type="submit"
                disabled={transferMutation.isPending}
                className="w-full btn btn-primary disabled:opacity-50"
              >
                {transferMutation.isPending ? 'Processing...' : 'Transfer Money'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Your Accounts</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {accountsData?.data?.accounts?.map((account: any) => (
                  <div key={account.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account
                      </p>
                      <p className="text-sm text-gray-500">{account.accountNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${account.balance.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{account.currency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Transfer Tips</h3>
            </div>
            <div className="card-body">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Transfers between your accounts are instant</li>
                <li>• Make sure you have sufficient funds in the source account</li>
                <li>• You can only transfer between accounts with the same currency</li>
                <li>• Transfer limits may apply based on your account type</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
