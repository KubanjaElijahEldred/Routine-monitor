package com.routinemonitor.backend.service;

import com.routinemonitor.backend.dto.UserDto;

import java.util.List;

public interface UserService {
    
    UserDto createUser(UserDto userDto);
    
    UserDto getUserById(Long userId);
    
    UserDto getUserByEmail(String email);
    
    List<UserDto> getAllUsers();
    
    UserDto updateUser(Long userId, UserDto userDto);
    
    void deleteUser(Long userId);
    
    boolean existsByEmail(String email);
}
