package com.breeze_flow.breeze_flow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Fokus-Sitzungen Controller
 * ------------------------
 * 
 * Verwaltet die Pomodoro-Fokus-Sitzungen der Anwendung.
 * Ermöglicht das Tracking von Arbeitszeiten und Pausen.
 * 
 * Endpunkte:
 * - POST /api/focus-sessions: Neue Sitzung speichern
 * - GET /api/focus-sessions: Alle Sitzungen abrufen
 * - GET /api/focus-sessions/{id}: Einzelne Sitzung abrufen
 * - PUT /api/focus-sessions/{id}: Sitzung aktualisieren
 * - DELETE /api/focus-sessions/{id}: Sitzung löschen
 * 
 * Funktionen:
 * - Zeitmessung von Arbeitsphasen
 * - Pausenverwaltung
 * - Statistiken und Auswertungen
 * - Verknüpfung mit erledigten Aufgaben
 */
@RestController
@RequestMapping("/api/focus-sessions")
public class FocusSessionController {

    /**
     * Speichert eine neue Fokus-Sitzung
     * 
     * POST /api/focus-sessions
     * Body: FocusSession-Objekt im JSON-Format
     * 
     * Erforderliche Felder:
     * - startTime: Startzeitpunkt (ISO-8601)
     * - duration: Dauer in Minuten
     * - breaks: Anzahl der Pausen
     * 
     * Optionale Felder:
     * - completedTasks: Liste der erledigten Aufgaben
     * - notes: Notizen zur Sitzung
     * 
     * @param session Die zu speichernde Sitzung
     * @return ResponseEntity mit der gespeicherten Sitzung
     */
    @PostMapping
    public ResponseEntity<String> createSession(@RequestBody String session) {
        // Logik zum Speichern der Sitzung (z.B. in einer Datenbank)
        return ResponseEntity.ok("Session saved: " + session);
    }

    /**
     * Ruft alle Fokus-Sitzungen ab
     * 
     * GET /api/focus-sessions
     * Optional: Filterparameter für Zeitraum, Dauer, etc.
     * 
     * @return Liste aller Fokus-Sitzungen
     */
    @GetMapping
    public ResponseEntity<List<String>> getAllSessions() {
        // Logik zum Abrufen aller Sitzungen
        return ResponseEntity.ok(List.of("Session1", "Session2"));
    }

    /**
     * Ruft eine spezifische Fokus-Sitzung ab
     * 
     * GET /api/focus-sessions/{id}
     * 
     * @param id ID der Sitzung
     * @return ResponseEntity mit der gefundenen Sitzung oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<String> getSessionById(@PathVariable String id) {
        // Logik zum Abrufen einer Sitzung nach ID
        return ResponseEntity.ok("Session found: " + id);
    }

    /**
     * Aktualisiert eine Fokus-Sitzung
     * 
     * PUT /api/focus-sessions/{id}
     * Body: Aktualisiertes FocusSession-Objekt
     * 
     * Aktualisierbare Felder:
     * - duration: Neue Gesamtdauer
     * - breaks: Neue Anzahl Pausen
     * - completedTasks: Neue Liste erledigter Aufgaben
     * - notes: Neue Notizen
     * 
     * @param id ID der Sitzung
     * @param session Aktualisierte Sitzungsdaten
     * @return ResponseEntity mit der aktualisierten Sitzung oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<String> updateSession(@PathVariable String id, @RequestBody String session) {
        // Logik zum Aktualisieren einer Sitzung
        return ResponseEntity.ok("Session updated: " + id);
    }

    /**
     * Löscht eine Fokus-Sitzung
     * 
     * DELETE /api/focus-sessions/{id}
     * 
     * @param id ID der Sitzung
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        // Logik zum Löschen einer Sitzung
        return ResponseEntity.ok().build();
    }
}