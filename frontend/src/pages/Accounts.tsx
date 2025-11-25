import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '../services/api';
import { formatCurrency, getAccountStatusColor } from '../utils/auth';

const Accounts: React.FC = () => {
  const { data: accountsData, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: accountAPI.getAccounts,
  });

  const createAccountMutation = useMutation({
    mutationFn: accountAPI.createAccount,
    onSuccess: () => {
      // Refetch accounts after creation
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading accounts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading accounts. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Your Accounts</h1>
        <button className="btn btn-primary">
          Create New Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountsData?.data?.accounts?.map((account: any) => (
          <div key={account.id} className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">
                {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAccountStatusColor(account.status)}`}>
                {account.status}
              </span>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">{account.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Currency</p>
                  <p className="font-medium">{account.currency}</p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="flex space-x-2">
                <button className="btn btn-secondary flex-1">
                  Deposit
                </button>
                <button className="btn btn-secondary flex-1">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!accountsData?.data?.accounts || accountsData.data.accounts.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any accounts yet.</p>
          <button className="btn btn-primary">
            Create Your First Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Accounts;
