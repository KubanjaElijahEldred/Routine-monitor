import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { userAPI, transactionAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/auth';
import { Link } from 'react-router-dom';

const Analytics: React.FC = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['userSummary'],
    queryFn: userAPI.getSummary,
  });

  const { data: transactionsData } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionAPI.getTransactions({ limit: 100 }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-white/80">Loading analytics...</div>
      </div>
    );
  }

  const transactions = transactionsData?.data?.data || [];
  const accounts = summary?.data?.accounts || [];

  // Calculate analytics data
  const totalSpent = transactions
    .filter(t => t.type === 'withdrawal' || t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReceived = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    if (t.type === 'deposit') acc[month].income += t.amount;
    else acc[month].expenses += t.amount;
    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  const categoryData = transactions.reduce((acc, t) => {
    if (!t.category) return acc;
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

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
              Analytics
            </h1>
            <p className="text-white/80 text-lg">
              Track your financial performance and insights
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-2xl p-6 border-gradient border-2 border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <span className="text-green-400 text-sm">+12.5%</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Total Income</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {formatCurrency(totalReceived)}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border-gradient border-2 border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
            <span className="text-red-400 text-sm">-8.3%</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Total Expenses</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            {formatCurrency(totalSpent)}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border-gradient border-2 border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-blue-400 text-sm">+5.7%</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Net Balance</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {formatCurrency(totalReceived - totalSpent)}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border-gradient border-2 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-purple-400 text-sm">Active</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Accounts</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {accounts.length}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Monthly Trends</h2>
          <div className="space-y-4">
            {Object.entries(monthlyData).slice(-6).map(([month, data]) => (
              <div key={month} className="space-y-2">
                <div className="flex justify-between text-white">
                  <span className="text-sm">{month}</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(data.income - data.expenses)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((data.income / (data.income + data.expenses)) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((data.expenses / (data.income + data.expenses)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Income: {formatCurrency(data.income)}</span>
                  <span>Expenses: {formatCurrency(data.expenses)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending by Category */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Spending by Category</h2>
          <div className="space-y-4">
            {Object.entries(categoryData).map(([category, amount]) => {
              const percentage = (amount / totalSpent) * 100;
              const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'yellow'];
              const color = colors[Object.keys(categoryData).indexOf(category) % colors.length];
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span className="text-sm capitalize">{category}</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-${color}-500 h-2 rounded-full`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions Summary */}
      <div className="glass rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Transaction Summary</h2>
          <Link to="/transactions" className="text-blue-400 hover:text-blue-300 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-500/20 p-4 rounded-xl mb-4">
              <svg className="w-8 h-8 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-green-400 mb-2">
              {transactions.filter(t => t.type === 'deposit').length}
            </p>
            <p className="text-white/70">Deposits</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-500/20 p-4 rounded-xl mb-4">
              <svg className="w-8 h-8 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-red-400 mb-2">
              {transactions.filter(t => t.type === 'withdrawal').length}
            </p>
            <p className="text-white/70">Withdrawals</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-500/20 p-4 rounded-xl mb-4">
              <svg className="w-8 h-8 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-blue-400 mb-2">
              {transactions.filter(t => t.type === 'transfer').length}
            </p>
            <p className="text-white/70">Transfers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
