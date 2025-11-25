package com.bank.service.controller;

import com.bank.service.model.BankAccount;
import com.bank.service.model.Transaction;
import com.bank.service.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/banking")
public class BankingController {

    @Autowired
    private BankingService bankingService;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccount(@RequestBody BankAccount account) {
        try {
            BankAccount createdAccount = bankingService.createAccount(account);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/accounts/{accountNumber}")
    public ResponseEntity<?> getAccount(@PathVariable String accountNumber) {
        try {
            Optional<BankAccount> account = bankingService.getAccountByNumber(accountNumber);
            if (account.isPresent()) {
                return ResponseEntity.ok(account.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/customers/{customerId}/accounts")
    public ResponseEntity<?> getCustomerAccounts(@PathVariable String customerId) {
        try {
            List<BankAccount> accounts = bankingService.getAccountsByCustomerId(customerId);
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/accounts/{accountNumber}/deposit")
    public ResponseEntity<?> deposit(@PathVariable String accountNumber, 
                                     @RequestBody Map<String, Object> request) {
        try {
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            String description = (String) request.get("description");
            
            Transaction transaction = bankingService.processDeposit(accountNumber, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/accounts/{accountNumber}/withdraw")
    public ResponseEntity<?> withdraw(@PathVariable String accountNumber, 
                                     @RequestBody Map<String, Object> request) {
        try {
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            String description = (String) request.get("description");
            
            Transaction transaction = bankingService.processWithdrawal(accountNumber, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody Map<String, Object> request) {
        try {
            String fromAccountNumber = (String) request.get("fromAccountNumber");
            String toAccountNumber = (String) request.get("toAccountNumber");
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            String description = (String) request.get("description");
            
            Transaction transaction = bankingService.processTransfer(fromAccountNumber, toAccountNumber, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/accounts/{accountNumber}/transactions")
    public ResponseEntity<?> getAccountTransactions(@PathVariable String accountNumber) {
        try {
            List<Transaction> transactions = bankingService.getAccountTransactions(accountNumber);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/transactions/status/{status}")
    public ResponseEntity<?> getTransactionsByStatus(@PathVariable String status) {
        try {
            List<Transaction> transactions = bankingService.getTransactionsByStatus(status);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "bank-services",
            "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}
