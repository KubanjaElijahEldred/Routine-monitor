import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { transactionAPI } from '../services/api';
import { formatCurrency, formatDate, getTransactionTypeColor, getTransactionStatusColor } from '../utils/auth';

interface Transaction {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
}

const Transactions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  const { data: transactionsData, isLoading, error } = useQuery({
    queryKey: ['transactions', page, filter],
    queryFn: () => transactionAPI.getTransactions({ page, limit: 10, type: filter }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading transactions. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input"
          >
            <option value="">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="transfer">Transfers</option>
            <option value="payment">Payments</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {transactionsData?.data?.data && transactionsData.data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.data.data.map((transaction: any) => (
                    <tr key={transaction.id}>
                      <td className="font-mono text-sm">{transaction.transactionId}</td>
                      <td>
                        <span className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td>{transaction.description}</td>
                      <td className="font-medium">
                        <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found.</p>
            </div>
          )}

          {transactionsData?.data?.pagination && (
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {transactionsData?.data?.pagination?.current} of {transactionsData?.data?.pagination?.pages} pages
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === transactionsData?.data?.pagination?.pages}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
