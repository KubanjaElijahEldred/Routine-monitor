package com.routinemonitor.backend.util;

import java.util.regex.Pattern;

public class ValidationUtil {
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile(Constants.EMAIL_PATTERN);
    private static final Pattern PHONE_PATTERN = Pattern.compile(Constants.PHONE_PATTERN);
    
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }
    
    public static boolean isValidPhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return true; // Phone is optional
        }
        return PHONE_PATTERN.matcher(phone).matches();
    }
    
    public static boolean isValidPassword(String password) {
        if (password == null || password.length() < 6) {
            return false;
        }
        // Add more password validation rules as needed
        return password.length() >= 6 && password.length() <= 20;
    }
    
    public static boolean isValidName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }
        return name.length() >= 2 && name.length() <= 50;
    }
    
    public static String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        return input.trim().replaceAll("[<>]", "");
    }
    
    private ValidationUtil() {
        // Private constructor to prevent instantiation
    }
}
