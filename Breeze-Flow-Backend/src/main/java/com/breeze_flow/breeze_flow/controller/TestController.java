package com.breeze_flow.breeze_flow.controller;

import com.breeze_flow.breeze_flow.model.TestModel;
import com.breeze_flow.breeze_flow.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Test-Controller für MongoDB-Integration
 * -------------------------------------
 * 
 * Dieser Controller demonstriert die grundlegende CRUD-Funktionalität
 * mit MongoDB und dient als Beispiel für weitere Controller.
 * 
 * Endpunkte:
 * - POST /api/test: Erstellt einen neuen Test
 * - GET /api/test: Ruft alle Tests ab
 * - GET /api/test/{id}: Ruft einen spezifischen Test ab
 * - PUT /api/test/{id}: Aktualisiert einen Test
 * - DELETE /api/test/{id}: Löscht einen Test
 * 
 * Technische Details:
 * - Verwendet Spring WebMVC für REST-Endpoints
 * - Nutzt MongoDB-Repository für Datenbankzugriffe
 * - Implementiert grundlegende Fehlerbehandlung
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    /**
     * MongoDB-Repository für Testobjekte
     * Wird automatisch von Spring injiziert
     */
    @Autowired
    private TestRepository testRepository;

    /**
     * Erstellt einen neuen Test
     * 
     * POST /api/test
     * Body: TestModel-Objekt im JSON-Format
     * 
     * @param test Das zu speichernde TestModel
     * @return ResponseEntity mit dem gespeicherten Test
     */
    @PostMapping
    public ResponseEntity<TestModel> createTest(@RequestBody TestModel test) {
        TestModel savedTest = testRepository.save(test);
        return ResponseEntity.ok(savedTest);
    }

    /**
     * Ruft alle Tests ab
     * 
     * GET /api/test
     * Keine Parameter erforderlich
     * 
     * @return Liste aller TestModel-Objekte
     */
    @GetMapping
    public ResponseEntity<List<TestModel>> getAllTests() {
        List<TestModel> tests = testRepository.findAll();
        return ResponseEntity.ok(tests);
    }

    /**
     * Ruft einen spezifischen Test ab
     * 
     * GET /api/test/{id}
     * 
     * @param id MongoDB-ID des Tests
     * @return ResponseEntity mit dem gefundenen Test oder 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<TestModel> getTestById(@PathVariable String id) {
        return testRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Aktualisiert einen Test
     * 
     * PUT /api/test/{id}
     * Body: Aktualisiertes TestModel-Objekt
     * 
     * @param id MongoDB-ID des Tests
     * @param test Aktualisierte Testdaten
     * @return ResponseEntity mit dem aktualisierten Test oder 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<TestModel> updateTest(@PathVariable String id, @RequestBody TestModel test) {
        return testRepository.findById(id)
                .map(existingTest -> {
                    test.setId(id);
                    return ResponseEntity.ok(testRepository.save(test));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Löscht einen Test
     * 
     * DELETE /api/test/{id}
     * 
     * @param id MongoDB-ID des Tests
     * @return ResponseEntity mit Statuscode 200 oder 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable String id) {
        return testRepository.findById(id)
                .map(test -> {
                    testRepository.delete(test);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 