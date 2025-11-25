package com.bank.service.service;

import com.bank.service.model.BankAccount;
import com.bank.service.model.Transaction;
import com.bank.service.repository.BankAccountRepository;
import com.bank.service.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class BankingService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public BankAccount createAccount(BankAccount account) {
        account.setAccountNumber(generateAccountNumber(account.getAccountType()));
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        account.setLastActivity(LocalDateTime.now());
        return bankAccountRepository.save(account);
    }

    public Optional<BankAccount> getAccountByNumber(String accountNumber) {
        return bankAccountRepository.findByAccountNumber(accountNumber);
    }

    public List<BankAccount> getAccountsByCustomerId(String customerId) {
        return bankAccountRepository.findByCustomerId(customerId);
    }

    public Transaction processDeposit(String accountNumber, BigDecimal amount, String description) {
        Optional<BankAccount> accountOpt = bankAccountRepository.findByAccountNumber(accountNumber);
        if (!accountOpt.isPresent()) {
            throw new RuntimeException("Account not found: " + accountNumber);
        }

        BankAccount account = accountOpt.get();
        if (!"ACTIVE".equals(account.getStatus())) {
            throw new RuntimeException("Account is not active: " + accountNumber);
        }

        account.setBalance(account.getBalance().add(amount));
        account.setLastActivity(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        bankAccountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setType("DEPOSIT");
        transaction.setAmount(amount);
        transaction.setCurrency(account.getCurrency());
        transaction.setDescription(description != null ? description : "Deposit");
        transaction.setToAccount(account.getId());
        transaction.setStatus("COMPLETED");
        transaction.setProcessedAt(LocalDateTime.now());
        transaction.setCompletedAt(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    public Transaction processWithdrawal(String accountNumber, BigDecimal amount, String description) {
        Optional<BankAccount> accountOpt = bankAccountRepository.findByAccountNumber(accountNumber);
        if (!accountOpt.isPresent()) {
            throw new RuntimeException("Account not found: " + accountNumber);
        }

        BankAccount account = accountOpt.get();
        if (!"ACTIVE".equals(account.getStatus())) {
            throw new RuntimeException("Account is not active: " + accountNumber);
        }

        BigDecimal newBalance = account.getBalance().subtract(amount);
        BigDecimal overdraftLimit = account.getOverdraftLimit() != null ? account.getOverdraftLimit() : BigDecimal.ZERO;
        
        if (newBalance.compareTo(overdraftLimit.negate()) < 0) {
            throw new RuntimeException("Insufficient funds for withdrawal");
        }

        account.setBalance(newBalance);
        account.setLastActivity(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        bankAccountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setType("WITHDRAWAL");
        transaction.setAmount(amount);
        transaction.setCurrency(account.getCurrency());
        transaction.setDescription(description != null ? description : "Withdrawal");
        transaction.setFromAccount(account.getId());
        transaction.setStatus("COMPLETED");
        transaction.setProcessedAt(LocalDateTime.now());
        transaction.setCompletedAt(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    public Transaction processTransfer(String fromAccountNumber, String toAccountNumber, BigDecimal amount, String description) {
        Optional<BankAccount> fromAccountOpt = bankAccountRepository.findByAccountNumber(fromAccountNumber);
        Optional<BankAccount> toAccountOpt = bankAccountRepository.findByAccountNumber(toAccountNumber);

        if (!fromAccountOpt.isPresent()) {
            throw new RuntimeException("Source account not found: " + fromAccountNumber);
        }
        if (!toAccountOpt.isPresent()) {
            throw new RuntimeException("Destination account not found: " + toAccountNumber);
        }

        BankAccount fromAccount = fromAccountOpt.get();
        BankAccount toAccount = toAccountOpt.get();

        if (!"ACTIVE".equals(fromAccount.getStatus())) {
            throw new RuntimeException("Source account is not active: " + fromAccountNumber);
        }
        if (!"ACTIVE".equals(toAccount.getStatus())) {
            throw new RuntimeException("Destination account is not active: " + toAccountNumber);
        }

        if (!fromAccount.getCurrency().equals(toAccount.getCurrency())) {
            throw new RuntimeException("Currency mismatch between accounts");
        }

        BigDecimal newFromBalance = fromAccount.getBalance().subtract(amount);
        BigDecimal overdraftLimit = fromAccount.getOverdraftLimit() != null ? fromAccount.getOverdraftLimit() : BigDecimal.ZERO;
        
        if (newFromBalance.compareTo(overdraftLimit.negate()) < 0) {
            throw new RuntimeException("Insufficient funds for transfer");
        }

        fromAccount.setBalance(newFromBalance);
        toAccount.setBalance(toAccount.getBalance().add(amount));

        LocalDateTime now = LocalDateTime.now();
        fromAccount.setLastActivity(now);
        fromAccount.setUpdatedAt(now);
        toAccount.setLastActivity(now);
        toAccount.setUpdatedAt(now);

        bankAccountRepository.save(fromAccount);
        bankAccountRepository.save(toAccount);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setType("TRANSFER");
        transaction.setAmount(amount);
        transaction.setCurrency(fromAccount.getCurrency());
        transaction.setDescription(description != null ? description : "Transfer to " + toAccountNumber);
        transaction.setFromAccount(fromAccount.getId());
        transaction.setToAccount(toAccount.getId());
        transaction.setStatus("COMPLETED");
        transaction.setProcessedAt(now);
        transaction.setCompletedAt(now);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAccountTransactions(String accountNumber) {
        Optional<BankAccount> accountOpt = bankAccountRepository.findByAccountNumber(accountNumber);
        if (!accountOpt.isPresent()) {
            throw new RuntimeException("Account not found: " + accountNumber);
        }

        return transactionRepository.findByAccountId(accountOpt.get().getId());
    }

    public List<Transaction> getTransactionsByStatus(String status) {
        return transactionRepository.findByStatus(status);
    }

    private String generateAccountNumber(String accountType) {
        String prefix = "CHECKING".equals(accountType) ? "1" : 
                        "SAVINGS".equals(accountType) ? "2" : "3";
        String randomDigits = String.format("%07d", (int)(Math.random() * 10000000));
        return prefix + randomDigits;
    }

    private String generateTransactionId() {
        String timestamp = Long.toString(System.currentTimeMillis(), 36);
        String random = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "TXN-" + timestamp + "-" + random;
    }
}
