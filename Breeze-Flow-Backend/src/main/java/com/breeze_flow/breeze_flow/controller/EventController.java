package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.Event;
import com.breeze_flow.breeze_flow.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
     * MongoDB-Repository für Events
     * Verwaltet die Persistenz der Kalenderdaten
     */
    @Autowired
    private EventRepository eventRepository;

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
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
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
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    /**
     * Ruft ein spezifisches Event ab
     * 
     * GET /api/events/{id}
     * 
     * @param id MongoDB-ID des Events
     * @return ResponseEntity mit dem gefundenen Event oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
     * @param id MongoDB-ID des Events
     * @param event Aktualisierte Eventdaten
     * @return ResponseEntity mit dem aktualisierten Event oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event event) {
        return eventRepository.findById(id)
                .map(existingEvent -> {
                    event.setId(id);
                    return ResponseEntity.ok(eventRepository.save(event));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Löscht ein Event
     * 
     * DELETE /api/events/{id}
     * 
     * @param id MongoDB-ID des Events
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        return eventRepository.findById(id)
                .map(event -> {
                    eventRepository.delete(event);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 