package com.breeze_flow.breeze_flow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "focus_sessions")
public class FocusSession {
    @Id
    private String id;
    private int duration; // in seconds
    private boolean isBreak;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // "completed" or "interrupted"

    public FocusSession() {
        this.startTime = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean isBreak() {
        return isBreak;
    }

    public void setBreak(boolean isBreak) {
        this.isBreak = isBreak;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
} 