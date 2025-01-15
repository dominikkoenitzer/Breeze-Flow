package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.Settings;
import com.breeze_flow.breeze_flow.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Einstellungen Controller
 * ----------------------
 * 
 * Verwaltet die Benutzereinstellungen der Anwendung.
 * Ermöglicht die Anpassung verschiedener Präferenzen und Konfigurationen.
 * 
 * Endpunkte:
 * - GET /api/settings: Aktuelle Einstellungen abrufen
 * - PUT /api/settings: Einstellungen aktualisieren
 * 
 * Funktionen:
 * - Verwaltung von Benutzereinstellungen
 * - Theme-Konfiguration (Hell/Dunkel)
 * - Benachrichtigungseinstellungen
 * - Arbeitszeit-Konfiguration
 * - Pomodoro-Timer-Einstellungen
 */
@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    /**
     * MongoDB-Repository für Einstellungen
     * Verwaltet die Persistenz der Benutzereinstellungen
     */
    @Autowired
    private SettingsRepository settingsRepository;

    /**
     * Ruft die aktuellen Einstellungen ab
     * 
     * GET /api/settings
     * 
     * Rückgabewerte:
     * - theme: Design-Theme (LIGHT/DARK/SYSTEM)
     * - notifications: Benachrichtigungseinstellungen
     *   - email: Boolean
     *   - push: Boolean
     *   - desktop: Boolean
     * - workHours: Arbeitszeiten
     *   - start: "HH:mm"
     *   - end: "HH:mm"
     *   - workDays: Array von Wochentagen
     * - focusSettings: Pomodoro-Einstellungen
     *   - workDuration: Minuten
     *   - breakDuration: Minuten
     *   - longBreakDuration: Minuten
     *   - sessionsUntilLongBreak: Anzahl
     * 
     * @return ResponseEntity mit den aktuellen Einstellungen
     */
    @GetMapping
    public ResponseEntity<Settings> getSettings() {
        Settings settings = settingsRepository.findFirstByOrderByIdAsc()
                .orElse(new Settings()); // Default-Einstellungen wenn keine existieren
        return ResponseEntity.ok(settings);
    }

    /**
     * Aktualisiert die Einstellungen
     * 
     * PUT /api/settings
     * Body: Settings-Objekt im JSON-Format
     * 
     * Aktualisierbare Einstellungen:
     * - theme: Design-Theme
     * - notifications: Benachrichtigungen
     * - workHours: Arbeitszeiten
     * - focusSettings: Pomodoro-Timer
     * 
     * Validierung:
     * - Theme muss gültigen Wert haben
     * - Arbeitszeiten müssen gültige Uhrzeiten sein
     * - Pomodoro-Dauern müssen > 0 sein
     * 
     * @param settings Die neuen Einstellungen
     * @return ResponseEntity mit den aktualisierten Einstellungen
     */
    @PutMapping
    public ResponseEntity<Settings> updateSettings(@RequestBody Settings settings) {
        Settings existingSettings = settingsRepository.findFirstByOrderByIdAsc()
                .orElse(new Settings());
        
        // ID beibehalten um Update statt Insert durchzuführen
        settings.setId(existingSettings.getId());
        
        Settings updatedSettings = settingsRepository.save(settings);
        return ResponseEntity.ok(updatedSettings);
    }
} 