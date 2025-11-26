package com.routinemonitor.backend.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponse {
    
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> validationErrors;
    
    // Builder pattern
    public static class Builder {
        private ErrorResponse errorResponse = new ErrorResponse();
        
        public Builder timestamp(LocalDateTime timestamp) {
            errorResponse.timestamp = timestamp;
            return this;
        }
        
        public Builder status(int status) {
            errorResponse.status = status;
            return this;
        }
        
        public Builder error(String error) {
            errorResponse.error = error;
            return this;
        }
        
        public Builder message(String message) {
            errorResponse.message = message;
            return this;
        }
        
        public Builder path(String path) {
            errorResponse.path = path;
            return this;
        }
        
        public Builder validationErrors(Map<String, String> validationErrors) {
            errorResponse.validationErrors = validationErrors;
            return this;
        }
        
        public ErrorResponse build() {
            return errorResponse;
        }
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    // Getters and Setters
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
    
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    
    public Map<String, String> getValidationErrors() { return validationErrors; }
    public void setValidationErrors(Map<String, String> validationErrors) { this.validationErrors = validationErrors; }
}
