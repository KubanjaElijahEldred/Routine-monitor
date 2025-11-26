import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/auth';
import { Link } from 'react-router-dom';

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
      <div className="glass rounded-2xl p-8 text-white">
        <div className="alert alert-error">
          Error loading dashboard data. Please try again.
        </div>
      </div>
    );
  }

  const totalBalance = summary?.data?.totalBalance || 0;
  const accountSummary = summary?.data?.accountSummary || { total: 0, checking: 0, savings: 0, credit: 0 };
  const recentTransactions = summary?.data?.recentTransactions || [];
  const accounts = summary?.data?.accounts || [];

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome back! 👋
        </h1>
        <p className="text-white/80 text-lg">
          Here's an overview of your accounts and recent activity.
        </p>
      </div>

      {/* Total Balance Card */}
      <div className="glass rounded-2xl p-8 border-gradient border-2 border-blue-500/30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Total Balance</h2>
            <p className="text-white/70 text-lg">Across all accounts</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {formatCurrency(totalBalance)}
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 border-gradient border-2 border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">{accountSummary.checking}</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Checking</h3>
          <p className="text-white/70 text-sm">Active accounts</p>
        </div>

        <div className="glass rounded-2xl p-6 border-gradient border-2 border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">{accountSummary.savings}</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Savings</h3>
          <p className="text-white/70 text-sm">Active accounts</p>
        </div>

        <div className="glass rounded-2xl p-6 border-gradient border-2 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">{accountSummary.credit}</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Credit</h3>
          <p className="text-white/70 text-sm">Active accounts</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/transfer" className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="block">Transfer</span>
          </Link>
          
          <button 
            onClick={() => alert('Pay Bills feature coming soon!')}
            className="btn bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="block">Pay Bills</span>
          </button>
          
          <Link to="/accounts" className="btn bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="block">Accounts</span>
          </Link>
          
          <Link to="/analytics" className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="block">Analytics</span>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
          <Link to="/transactions" className="text-blue-400 hover:text-blue-300 transition-colors">
            View All
          </Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction: any) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    transaction.type === 'deposit' ? 'bg-green-500/20' :
                    transaction.type === 'withdrawal' ? 'bg-red-500/20' :
                    transaction.type === 'transfer' ? 'bg-blue-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      transaction.type === 'deposit' ? 'text-green-400' :
                      transaction.type === 'withdrawal' ? 'text-red-400' :
                      transaction.type === 'transfer' ? 'text-blue-400' :
                      'text-purple-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {transaction.type === 'deposit' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      )}
                      {transaction.type === 'withdrawal' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      )}
                      {transaction.type === 'transfer' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      )}
                      {transaction.type === 'payment' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-white/70 text-sm">{formatDate(transaction.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.type === 'deposit' ? 'text-green-400' :
                    transaction.type === 'withdrawal' ? 'text-red-400' :
                    'text-blue-400'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-white/70 text-sm capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70">No recent transactions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
