// MongoDB initialization script
db = db.getSiblingDB('bank-system');

// Create collections
db.createCollection('users');
db.createCollection('accounts');
db.createCollection('transactions');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ ssn: 1 }, { unique: true });
db.accounts.createIndex({ accountNumber: 1 }, { unique: true });
db.accounts.createIndex({ owner: 1 });
db.transactions.createIndex({ transactionId: 1 }, { unique: true });
db.transactions.createIndex({ fromAccount: 1 });
db.transactions.createIndex({ toAccount: 1 });
db.transactions.createIndex({ createdAt: 1 });

// Insert sample data (optional - for development)
if (db.users.countDocuments() === 0) {
    // Create a sample user
    const sampleUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '$2a$10$rOzJqQ3Q3Q3Q3Q3Q3Q3Q3OzJqQ3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q',
        phone: '+1234567890',
        address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
        },
        dateOfBirth: new Date('1990-01-01'),
        ssn: '123-45-6789',
        role: 'customer',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const userResult = db.users.insertOne(sampleUser);
    const userId = userResult.insertedId;

    // Create sample accounts
    const checkingAccount = {
        accountNumber: '10000001',
        accountType: 'checking',
        balance: 5000.00,
        currency: 'USD',
        status: 'active',
        owner: userId,
        overdraftLimit: 1000.00,
        interestRate: 0.00,
        monthlyFee: 5.00,
        minimumBalance: 100.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActivity: new Date()
    };

    const savingsAccount = {
        accountNumber: '20000001',
        accountType: 'savings',
        balance: 10000.00,
        currency: 'USD',
        status: 'active',
        owner: userId,
        overdraftLimit: 0.00,
        interestRate: 2.5,
        monthlyFee: 0.00,
        minimumBalance: 500.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActivity: new Date()
    };

    const checkingResult = db.accounts.insertOne(checkingAccount);
    const savingsResult = db.accounts.insertOne(savingsAccount);

    // Create sample transactions
    const sampleTransactions = [
        {
            transactionId: 'TXN-INIT-001',
            type: 'deposit',
            amount: 5000.00,
            currency: 'USD',
            description: 'Initial deposit',
            fromAccount: null,
            toAccount: checkingResult.insertedId,
            status: 'completed',
            category: 'other',
            createdAt: new Date(),
            processedAt: new Date(),
            completedAt: new Date()
        },
        {
            transactionId: 'TXN-INIT-002',
            type: 'deposit',
            amount: 10000.00,
            currency: 'USD',
            description: 'Initial deposit',
            fromAccount: null,
            toAccount: savingsResult.insertedId,
            status: 'completed',
            category: 'other',
            createdAt: new Date(),
            processedAt: new Date(),
            completedAt: new Date()
        },
        {
            transactionId: 'TXN-INIT-003',
            type: 'transfer',
            amount: 500.00,
            currency: 'USD',
            description: 'Transfer to savings',
            fromAccount: checkingResult.insertedId,
            toAccount: savingsResult.insertedId,
            status: 'completed',
            category: 'other',
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            processedAt: new Date(Date.now() - 86400000),
            completedAt: new Date(Date.now() - 86400000)
        }
    ];

    db.transactions.insertMany(sampleTransactions);
}

print('Database initialization completed successfully!');
