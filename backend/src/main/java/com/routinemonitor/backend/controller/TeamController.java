package com.routinemonitor.backend.controller;

import com.routinemonitor.backend.model.TeamMember;
import com.routinemonitor.backend.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "http://localhost:5173")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<TeamMember>> getAllTeamMembers() {
        List<TeamMember> members = teamService.getAllTeamMembers();
        return ResponseEntity.ok(members);
    }

    @PostMapping
    public ResponseEntity<TeamMember> createTeamMember(@Valid @RequestBody TeamMemberRequest request) {
        TeamMember member = teamService.createTeamMember(
            request.getName(),
            request.getEmail(),
            request.getPhone(),
            request.getRole()
        );
        return ResponseEntity.ok(member);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamMember> updateTeamMember(@PathVariable Long id, 
                                                      @Valid @RequestBody TeamService.TeamMemberRequest request) {
        TeamMember member = teamService.updateTeamMember(id, request);
        return ResponseEntity.ok(member);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTeamMember(@PathVariable Long id) {
        teamService.deleteTeamMember(id);
        return ResponseEntity.ok(Map.of("message", "Team member deleted successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<TeamMember>> searchTeamMembers(@RequestParam String query) {
        List<TeamMember> members = teamService.searchTeamMembers(query);
        return ResponseEntity.ok(members);
    }

    // DTO
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
