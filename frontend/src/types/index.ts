export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth: string;
  role: 'customer' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen' | 'closed';
  owner: User;
  overdraftLimit: number;
  interestRate: number;
  monthlyFee: number;
  minimumBalance: number;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
}

export interface Transaction {
  id: string;
  transactionId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'fee';
  amount: number;
  currency: string;
  description: string;
  fromAccount?: Account;
  toAccount?: Account;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  category: 'salary' | 'rent' | 'groceries' | 'utilities' | 'entertainment' | 'healthcare' | 'education' | 'transportation' | 'shopping' | 'other';
  referenceNumber?: string;
  merchantName?: string;
  location?: string;
  tags: string[];
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
  failedAt?: string;
  failureReason?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

export interface UserSummary {
  totalBalance: number;
  accountSummary: {
    total: number;
    checking: number;
    savings: number;
    credit: number;
  };
  recentTransactions: Transaction[];
  accounts: Account[];
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
}

export interface DepositRequest {
  accountNumber: string;
  amount: number;
  description?: string;
}

export interface WithdrawalRequest {
  accountNumber: string;
  amount: number;
  description?: string;
}

export interface CreateAccountRequest {
  accountType: 'checking' | 'savings' | 'credit';
  initialDeposit?: number;
  currency?: string;
}
