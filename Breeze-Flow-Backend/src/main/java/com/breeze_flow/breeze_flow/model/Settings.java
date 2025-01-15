package com.breeze_flow.breeze_flow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "settings")
public class Settings {
    @Id
    private String id;
    private boolean notifications;
    private boolean soundEnabled;
    private String language;
    private String theme;
    private boolean focusMode;
    private String pomodoroLength;
    private String breakLength;

    public Settings() {
        // Default constructor
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isNotifications() {
        return notifications;
    }

    public void setNotifications(boolean notifications) {
        this.notifications = notifications;
    }

    public boolean isSoundEnabled() {
        return soundEnabled;
    }

    public void setSoundEnabled(boolean soundEnabled) {
        this.soundEnabled = soundEnabled;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public boolean isFocusMode() {
        return focusMode;
    }

    public void setFocusMode(boolean focusMode) {
        this.focusMode = focusMode;
    }

    public String getPomodoroLength() {
        return pomodoroLength;
    }

    public void setPomodoroLength(String pomodoroLength) {
        this.pomodoroLength = pomodoroLength;
    }

    public String getBreakLength() {
        return breakLength;
    }

    public void setBreakLength(String breakLength) {
        this.breakLength = breakLength;
    }
} 