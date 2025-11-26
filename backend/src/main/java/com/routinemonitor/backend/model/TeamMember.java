package com.routinemonitor.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "team_members")
public class TeamMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "name")
    private String name;
    
    @NotBlank
    @Email
    private String email;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "role")
    private String role;
    
    @Enumerated(EnumType.STRING)
    private MemberStatus status;
    
    @Column(name = "avatar")
    private String avatar;
    
    @Column(name = "join_date")
    private LocalDateTime joinDate;
    
    // Constructors
    public TeamMember() {
        this.status = MemberStatus.ACTIVE;
        this.joinDate = LocalDateTime.now();
    }
    
    public TeamMember(String name, String email, String role) {
        this();
        this.name = name;
        this.email = email;
        this.role = role;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public MemberStatus getStatus() { return status; }
    public void setStatus(MemberStatus status) { this.status = status; }
    
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    
    public LocalDateTime getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDateTime joinDate) { this.joinDate = joinDate; }
    
    // Enums
    public enum MemberStatus {
        ACTIVE, INACTIVE, ON_LEAVE
    }
}
