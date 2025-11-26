package com.routinemonitor.backend.service;

import com.routinemonitor.backend.model.TeamMember;
import com.routinemonitor.backend.repository.TeamMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamMemberRepository teamMemberRepository;

    public TeamService(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAll();
    }

    public TeamMember createTeamMember(String name, String email, String phone, String role) {
        TeamMember member = new TeamMember();
        member.setName(name);
        member.setEmail(email);
        member.setPhone(phone);
        member.setRole(role);
        member.setAvatar("https://randomuser.me/api/portraits/men/" + 
                         (int)(Math.random() * 100) + ".jpg");
        
        return teamMemberRepository.save(member);
    }

    public TeamMember updateTeamMember(Long id, TeamMemberRequest request) {
        Optional<TeamMember> memberOpt = teamMemberRepository.findById(id);
        if (memberOpt.isEmpty()) {
            throw new RuntimeException("Team member not found");
        }

        TeamMember member = memberOpt.get();
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setRole(request.getRole());

        return teamMemberRepository.save(member);
    }

    public void deleteTeamMember(Long id) {
        if (!teamMemberRepository.existsById(id)) {
            throw new RuntimeException("Team member not found");
        }
        teamMemberRepository.deleteById(id);
    }

    public List<TeamMember> searchTeamMembers(String query) {
        return teamMemberRepository.findByNameContainingIgnoreCase(query);
    }
    
    // DTO class for team member requests
    public static class TeamMemberRequest {
        private String name;
        private String email;
        private String phone;
        private String role;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}
