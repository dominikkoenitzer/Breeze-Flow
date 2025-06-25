package com.breeze_flow.breeze_flow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Kalender-Events Controller
 * -----------------------
 * 
 * Verwaltet die Kalenderereignisse der Anwendung.
 * Ermöglicht die Planung und Organisation von Terminen.
 * 
 * Endpunkte:
 * - POST /api/events: Neues Event erstellen
 * - GET /api/events: Alle Events abrufen
 * - GET /api/events/{id}: Einzelnes Event abrufen
 * - PUT /api/events/{id}: Event aktualisieren
 * - DELETE /api/events/{id}: Event löschen
 * 
 * Funktionen:
 * - Terminplanung und -verwaltung
 * - Kategorisierung von Events
 * - Erinnerungsfunktion
 * - Teilnehmerverwaltung
 */
@RestController
@RequestMapping("/api/events")
public class EventController {

    /**
     * Erstellt ein neues Event
     * 
     * POST /api/events
     * Body: Event-Objekt im JSON-Format
     * 
     * Erforderliche Felder:
     * - title: Titel des Events
     * - startDate: Startdatum und -zeit (ISO-8601)
     * - endDate: Enddatum und -zeit (ISO-8601)
     * 
     * Optionale Felder:
     * - description: Beschreibung
     * - location: Ort des Events
     * - category: Kategorie
     * - participants: Teilnehmer
     * - reminder: Erinnerungszeit
     * 
     * @param event Das zu erstellende Event
     * @return ResponseEntity mit dem erstellten Event
     */
    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody String event) {
        // Event creation logic here (e.g., save to database)
        return ResponseEntity.ok("Event created: " + event);
    }

    /**
     * Ruft alle Events ab
     * 
     * GET /api/events
     * Optional: Filterparameter für Zeitraum, Kategorie, etc.
     * 
     * @return Liste aller Events
     */
    @GetMapping
    public ResponseEntity<List<String>> getAllEvents() {
        // Logic to retrieve all events (e.g., from database)
        return ResponseEntity.ok(List.of("Event 1", "Event 2"));
    }

    /**
     * Ruft ein spezifisches Event ab
     * 
     * GET /api/events/{id}
     * 
     * @param id ID des Events
     * @return ResponseEntity mit dem gefundenen Event oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<String> getEventById(@PathVariable String id) {
        // Logic to retrieve an event by ID
        return ResponseEntity.ok("Event details for ID: " + id);
    }

    /**
     * Aktualisiert ein Event
     * 
     * PUT /api/events/{id}
     * Body: Aktualisiertes Event-Objekt
     * 
     * Aktualisierbare Felder:
     * - title: Neuer Titel
     * - startDate: Neues Startdatum
     * - endDate: Neues Enddatum
     * - description: Neue Beschreibung
     * - location: Neuer Ort
     * - category: Neue Kategorie
     * - participants: Neue Teilnehmerliste
     * - reminder: Neue Erinnerungszeit
     * 
     * @param id ID des Events
     * @param event Aktualisierte Eventdaten
     * @return ResponseEntity mit dem aktualisierten Event oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable String id, @RequestBody String event) {
        // Event update logic here
        return ResponseEntity.ok("Event updated: " + event);
    }

    /**
     * Löscht ein Event
     * 
     * DELETE /api/events/{id}
     * 
     * @param id ID des Events
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        // Event deletion logic here
        return ResponseEntity.ok().build();
    }
}