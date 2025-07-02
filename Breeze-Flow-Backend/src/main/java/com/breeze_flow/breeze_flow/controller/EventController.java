package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private static final Map<String, Event> events = new HashMap<>();

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
        String id = UUID.randomUUID().toString();
        event.setId(id);
        events.put(id, event);
        return ResponseEntity.ok(event);
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
        return ResponseEntity.ok(new ArrayList<>(events.values()));
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
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        Event event = events.get(id);
        if (event == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(event);
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
     * @param updatedEvent Aktualisierte Eventdaten
     * @return ResponseEntity mit dem aktualisierten Event oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        if (!events.containsKey(id)) return ResponseEntity.notFound().build();
        updatedEvent.setId(id);
        events.put(id, updatedEvent);
        return ResponseEntity.ok(updatedEvent);
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
        events.remove(id);
        return ResponseEntity.noContent().build();
    }
}