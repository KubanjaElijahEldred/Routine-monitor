import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/auth';
import { Link } from 'react-router-dom';

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
        <div className="text-lg text-white/80">Loading accounts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-white">
        <div className="alert alert-error">
          Error loading accounts. Please try again.
        </div>
      </div>
    );
  }

  const accounts = accountsData?.data || [];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Accounts
            </h1>
            <p className="text-white/80 text-lg">
              Manage your bank accounts and balances
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Account
          </button>
        </div>
      </div>

      {/* Account Cards */}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account: any) => (
            <div key={account.id} className="glass rounded-2xl p-6 border-gradient border-2 border-blue-500/30 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white capitalize mb-1">
                    {account.accountType} Account
                  </h3>
                  <p className="text-white/70 text-sm">{account.accountNumber}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  account.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {account.status}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white/70 text-sm mb-1">Current Balance</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {formatCurrency(account.balance)}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Currency</span>
                  <span className="text-white font-medium">{account.currency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Account Type</span>
                  <span className="text-white font-medium capitalize">{account.accountType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Opened</span>
                  <span className="text-white font-medium">{formatDate(account.createdAt)}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link to={`/transfer?from=${account.id}`} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Transfer
                </Link>
                <button className="flex-1 bg-white/20 text-white py-2 px-4 rounded-xl text-center hover:bg-white/30 transition-all duration-300">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No Accounts Yet</h2>
            <p className="text-white/70 mb-8">
              Create your first bank account to start managing your finances with our modern banking system.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              Create Your First Account
            </button>
          </div>
        </div>
      )}

      {/* Account Summary */}
      {accounts.length > 0 && (
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Total Accounts</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {accounts.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Total Balance</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {formatCurrency(accounts.reduce((sum: number, acc: any) => sum + acc.balance, 0))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Active Accounts</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {accounts.filter((acc: any) => acc.status === 'active').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Account Types</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {[...new Set(accounts.map((acc: any) => acc.accountType))].length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
