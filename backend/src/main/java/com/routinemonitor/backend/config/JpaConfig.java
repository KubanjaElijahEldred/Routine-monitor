package com.routinemonitor.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.routinemonitor.backend.repository")
@EnableJpaAuditing
@EnableTransactionManagement
public class JpaConfig {
    
    // JPA configuration with auditing and transaction management
}
