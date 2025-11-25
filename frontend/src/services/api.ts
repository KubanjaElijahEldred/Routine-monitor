import axios from 'axios';
import { AuthResponse, User, Account, Transaction, UserSummary, TransferRequest, DepositRequest, WithdrawalRequest, CreateAccountRequest, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData: any) => api.post<AuthResponse>('/auth/register', userData),
  login: (credentials: { email: string; password: string }) => 
    api.post<AuthResponse>('/auth/login', credentials),
  getProfile: () => api.get<{ user: User }>('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export const accountAPI = {
  getAccounts: () => api.get<{ accounts: Account[] }>('/accounts'),
  getAccount: (accountNumber: string) => 
    api.get<{ account: Account }>(`/accounts/${accountNumber}`),
  createAccount: (accountData: CreateAccountRequest) => 
    api.post<{ account: Account }>('/accounts', accountData),
  deposit: (accountNumber: string, depositData: DepositRequest) => 
    api.post(`/accounts/${accountNumber}/deposit`, depositData),
  withdraw: (accountNumber: string, withdrawalData: WithdrawalRequest) => 
    api.post(`/accounts/${accountNumber}/withdraw`, withdrawalData),
};

export const transactionAPI = {
  getTransactions: (params?: { page?: number; limit?: number; type?: string; status?: string; category?: string }) =>
    api.get<PaginatedResponse<Transaction>>('/transactions', { params }),
  getAccountTransactions: (accountNumber: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Transaction>>(`/transactions/account/${accountNumber}`, { params }),
  getTransaction: (transactionId: string) => 
    api.get<{ transaction: Transaction }>(`/transactions/${transactionId}`),
  transfer: (transferData: TransferRequest) => 
    api.post<{ transaction: Transaction; fromAccount: Account; toAccount: Account }>('/transactions/transfer', transferData),
};

export const userAPI = {
  updateProfile: (profileData: Partial<User>) => 
    api.put<{ user: User }>('/users/profile', profileData),
  getSummary: () => api.get<UserSummary>('/users/summary'),
};

export default api;
