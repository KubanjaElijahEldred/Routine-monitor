package com.routinemonitor.backend.controller;

import com.routinemonitor.backend.model.Task;
import com.routinemonitor.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getUserTasks(@AuthenticationPrincipal UserDetails userDetails) {
        List<Task> tasks = taskService.getUserTasks(userDetails.getUsername());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request, 
                                          @AuthenticationPrincipal UserDetails userDetails) {
        Task task = taskService.createTask(
            request.getTitle(),
            request.getDescription(),
            request.getPriority(),
            request.getDueDate(),
            userDetails.getUsername()
        );
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, 
                                         @Valid @RequestBody TaskService.TaskRequest request,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        Task task = taskService.updateTask(id, request, userDetails.getUsername());
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long id,
                                                        @AuthenticationPrincipal UserDetails userDetails) {
        taskService.deleteTask(id, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id,
                                                @RequestBody Map<String, String> request,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        Task.TaskStatus status = Task.TaskStatus.valueOf(request.get("status").toUpperCase());
        Task task = taskService.updateTaskStatus(id, status, userDetails.getUsername());
        return ResponseEntity.ok(task);
    }

    // DTO
    public static class TaskRequest {
        private String title;
        private String description;
        private Task.TaskPriority priority;
        private String dueDate;

        // Getters and Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Task.TaskPriority getPriority() { return priority; }
        public void setPriority(Task.TaskPriority priority) { this.priority = priority; }

        public String getDueDate() { return dueDate; }
        public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    }
}
