package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.FocusSession;
import com.breeze_flow.breeze_flow.repository.FocusSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
     * MongoDB-Repository für Fokus-Sitzungen
     * Verwaltet die Persistenz der Sitzungsdaten
     */
    @Autowired
    private FocusSessionRepository focusSessionRepository;

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
    public ResponseEntity<FocusSession> createSession(@RequestBody FocusSession session) {
        FocusSession savedSession = focusSessionRepository.save(session);
        return ResponseEntity.ok(savedSession);
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
    public ResponseEntity<List<FocusSession>> getAllSessions() {
        List<FocusSession> sessions = focusSessionRepository.findAll();
        return ResponseEntity.ok(sessions);
    }

    /**
     * Ruft eine spezifische Fokus-Sitzung ab
     * 
     * GET /api/focus-sessions/{id}
     * 
     * @param id MongoDB-ID der Sitzung
     * @return ResponseEntity mit der gefundenen Sitzung oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<FocusSession> getSessionById(@PathVariable String id) {
        return focusSessionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
     * @param id MongoDB-ID der Sitzung
     * @param session Aktualisierte Sitzungsdaten
     * @return ResponseEntity mit der aktualisierten Sitzung oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<FocusSession> updateSession(@PathVariable String id, @RequestBody FocusSession session) {
        return focusSessionRepository.findById(id)
                .map(existingSession -> {
                    session.setId(id);
                    return ResponseEntity.ok(focusSessionRepository.save(session));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Löscht eine Fokus-Sitzung
     * 
     * DELETE /api/focus-sessions/{id}
     * 
     * @param id MongoDB-ID der Sitzung
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        return focusSessionRepository.findById(id)
                .map(session -> {
                    focusSessionRepository.delete(session);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 