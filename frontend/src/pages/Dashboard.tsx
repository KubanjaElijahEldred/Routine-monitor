import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/auth';

const Dashboard: React.FC = () => {
  const { data: summary, isLoading, error } = useQuery({
    queryKey: ['userSummary'],
    queryFn: userAPI.getSummary,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-white/80">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {summary?.data?.accounts?.[0]?.owner?.firstName}! 👋
        </h1>
        <p className="text-white/80 text-lg">
          Here's an overview of your accounts and recent activity.
        </p>
      </div>

      {/* Total Balance Card */}
      <div className="balance-card card-hover">
        <div className="balance-card-inner">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Total Balance</h2>
              <p className="text-gray-600">Across all accounts</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatCurrency(summary?.data?.totalBalance || 0)}
          </p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+12.5% from last month</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card card-hover">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{summary?.data?.accountSummary?.total || 0}</p>
            <p className="text-sm text-gray-600">Accounts</p>
          </div>
        </div>

        <div className="card card-hover">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Checking</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{summary?.data?.accountSummary?.checking || 0}</p>
            <p className="text-sm text-gray-600">Accounts</p>
          </div>
        </div>

        <div className="card card-hover">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Savings</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{summary?.data?.accountSummary?.savings || 0}</p>
            <p className="text-sm text-gray-600">Accounts</p>
          </div>
        </div>

        <div className="card card-hover">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Credit</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{summary?.data?.accountSummary?.credit || 0}</p>
            <p className="text-sm text-gray-600">Accounts</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {summary?.data?.recentTransactions?.slice(0, 5).map((transaction: any) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'deposit' ? 'bg-green-100' : 
                        transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        ) : transaction.type === 'withdrawal' ? (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <span className={`status-badge ${
                        transaction.status === 'completed' ? 'status-active' : 'status-pending'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
                {(!summary?.data?.recentTransactions || summary.data.recentTransactions.length === 0) && (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">No recent transactions</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="card-body space-y-3">
              <button className="w-full btn btn-primary flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>Transfer Money</span>
              </button>
              <button className="w-full btn btn-secondary flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>View All Accounts</span>
              </button>
              <button className="w-full btn btn-secondary flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Transaction History</span>
              </button>
            </div>
          </div>

          {/* Spending Chart Placeholder */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Spending</h3>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Chart coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Overview */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Your Accounts</h3>
            <button className="btn btn-primary text-sm">
              Add New Account
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summary?.data?.accounts?.map((account: any) => (
              <div key={account.id} className="card card-hover">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {account.accountType} Account
                      </h4>
                      <p className="text-sm text-gray-500">{account.accountNumber}</p>
                    </div>
                    <span className={`status-badge ${
                      account.status === 'active' ? 'status-active' : 'status-inactive'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Balance</span>
                      <span className="text-xl font-bold text-gray-800">
                        {formatCurrency(account.balance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Currency</span>
                      <span className="font-medium text-gray-700">{account.currency}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                    <button className="flex-1 btn btn-secondary text-sm">
                      Deposit
                    </button>
                    <button className="flex-1 btn btn-secondary text-sm">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!summary?.data?.accounts || summary.data.accounts.length === 0) && (
              <div className="col-span-full text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-gray-500 mb-4">No accounts found</p>
                <button className="btn btn-primary">
                  Create Your First Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
