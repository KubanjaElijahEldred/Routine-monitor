package com.routinemonitor.backend.util;

public class Constants {
    
    // JWT Constants
    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    public static final String JWT_HEADER_STRING = "Authorization";
    public static final long JWT_EXPIRATION_TIME = 86400000; // 24 hours
    
    // Error Messages
    public static final String USER_NOT_FOUND = "User not found";
    public static final String TASK_NOT_FOUND = "Task not found";
    public static final String TEAM_MEMBER_NOT_FOUND = "Team member not found";
    public static final String INVALID_CREDENTIALS = "Invalid email or password";
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists";
    
    // Success Messages
    public static final String USER_CREATED = "User created successfully";
    public static final String USER_UPDATED = "User updated successfully";
    public static final String USER_DELETED = "User deleted successfully";
    public static final String TASK_CREATED = "Task created successfully";
    public static final String TASK_UPDATED = "Task updated successfully";
    public static final String TASK_DELETED = "Task deleted successfully";
    
    // Validation Patterns
    public static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";
    public static final String PHONE_PATTERN = "^[+]?[1-9]\\d{1,14}$";
    
    // Default Values
    public static final String DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";
    public static final String DEFAULT_ROLE = "USER";
    
    private Constants() {
        // Private constructor to prevent instantiation
    }
}
