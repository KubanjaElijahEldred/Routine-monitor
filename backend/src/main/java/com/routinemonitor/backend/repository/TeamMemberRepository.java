package com.routinemonitor.backend.repository;

import com.routinemonitor.backend.model.TeamMember;
import com.routinemonitor.backend.model.TeamMember.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    
    List<TeamMember> findByStatus(MemberStatus status);
    
    List<TeamMember> findByRole(String role);
    
    List<TeamMember> findByNameContainingIgnoreCase(String name);
    
    List<TeamMember> findByEmailContainingIgnoreCase(String email);
}
