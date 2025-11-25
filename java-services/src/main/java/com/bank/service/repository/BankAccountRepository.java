package com.bank.service.repository;

import com.bank.service.model.BankAccount;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankAccountRepository extends MongoRepository<BankAccount, String> {
    
    Optional<BankAccount> findByAccountNumber(String accountNumber);
    
    List<BankAccount> findByCustomerId(String customerId);
    
    List<BankAccount> findByCustomerIdAndStatus(String customerId, String status);
    
    boolean existsByAccountNumber(String accountNumber);
    
    @Query("{ 'customerId': ?0, 'status': ?1 }")
    List<BankAccount> findByCustomerIdAndStatusCustom(String customerId, String status);
    
    @Query(value = "{ 'customerId': ?0 }", count = true)
    long countByCustomerId(String customerId);
}
