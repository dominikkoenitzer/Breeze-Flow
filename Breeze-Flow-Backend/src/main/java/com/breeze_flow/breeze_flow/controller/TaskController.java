package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.Task;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Aufgaben-Controller (Task Controller)
 * ----------------------------------
 * 
 * Verwaltet alle REST-Endpunkte für die Aufgabenverwaltung.
 * Ermöglicht CRUD-Operationen für Aufgaben (Tasks) in der MongoDB.
 * 
 * Endpunkte:
 * - POST /api/tasks: Neue Aufgabe erstellen
 * - GET /api/tasks: Alle Aufgaben abrufen
 * - GET /api/tasks/{id}: Einzelne Aufgabe abrufen
 * - PUT /api/tasks/{id}: Aufgabe aktualisieren
 * - DELETE /api/tasks/{id}: Aufgabe löschen
 * 
 * Funktionen:
 * - Vollständige Aufgabenverwaltung
 * - Statusverfolgung von Aufgaben
 * - Priorisierung von Aufgaben
 * - Kategorisierung durch Tags
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    /**
     * Erstellt eine neue Aufgabe
     * 
     * POST /api/tasks
     * Body: Task-Objekt im JSON-Format
     * 
     * Erforderliche Felder:
     * - title: Titel der Aufgabe
     * - description: Beschreibung (optional)
     * - dueDate: Fälligkeitsdatum (optional)
     * - priority: Priorität (optional)
     * - tags: Tags zur Kategorisierung (optional)
     * 
     * @param task Die zu erstellende Aufgabe
     * @return ResponseEntity mit der erstellten Aufgabe
     */
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(task);
    }

    /**
     * Ruft alle Aufgaben ab
     * 
     * GET /api/tasks
     * Optional: Filterparameter für Status, Priorität, etc.
     * 
     * @return Liste aller Aufgaben
     */
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(List.of());
    }

    /**
     * Ruft eine spezifische Aufgabe ab
     * 
     * GET /api/tasks/{id}
     * 
     * @param id ID der Aufgabe
     * @return ResponseEntity mit der gefundenen Aufgabe oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return ResponseEntity.notFound().build();
    }

    /**
     * Aktualisiert eine Aufgabe
     * 
     * PUT /api/tasks/{id}
     * Body: Aktualisiertes Task-Objekt
     * 
     * Aktualisierbare Felder:
     * - title: Neuer Titel
     * - description: Neue Beschreibung
     * - status: Neuer Status
     * - dueDate: Neues Fälligkeitsdatum
     * - priority: Neue Priorität
     * - tags: Neue Tags
     * 
     * @param id ID der Aufgabe
     * @param task Aktualisierte Aufgabendaten
     * @return ResponseEntity mit der aktualisierten Aufgabe oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        return ResponseEntity.notFound().build();
    }

    /**
     * Löscht eine Aufgabe
     * 
     * DELETE /api/tasks/{id}
     * 
     * @param id ID der Aufgabe
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        return ResponseEntity.notFound().build();
    }
}