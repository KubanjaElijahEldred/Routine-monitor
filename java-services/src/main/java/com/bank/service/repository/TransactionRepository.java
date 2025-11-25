package com.bank.service.repository;

import com.bank.service.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    
    Optional<Transaction> findByTransactionId(String transactionId);
    
    List<Transaction> findByFromAccount(String fromAccount);
    
    List<Transaction> findByToAccount(String toAccount);
    
    List<Transaction> findByFromAccountOrToAccount(String fromAccount, String toAccount);
    
    List<Transaction> findByStatus(String status);
    
    List<Transaction> findByType(String type);
    
    @Query("{ '$or': [ { 'fromAccount': ?0 }, { 'toAccount': ?0 } ] }")
    List<Transaction> findByAccountId(String accountId);
    
    @Query("{ '$or': [ { 'fromAccount': ?0 }, { 'toAccount': ?0 } ], 'status': ?1 }")
    List<Transaction> findByAccountIdAndStatus(String accountId, String status);
    
    @Query("{ 'createdAt': { '$gte': ?0, '$lte': ?1 } }")
    List<Transaction> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("{ '$or': [ { 'fromAccount': ?0 }, { 'toAccount': ?0 } ], 'createdAt': { '$gte': ?1, '$lte': ?2 } }")
    List<Transaction> findByAccountIdAndCreatedAtBetween(String accountId, LocalDateTime start, LocalDateTime end);
    
    List<Transaction> findByFromAccountAndStatusOrderByCreatedAtDesc(String fromAccount, String status);
    
    List<Transaction> findByToAccountAndStatusOrderByCreatedAtDesc(String toAccount, String status);
}
