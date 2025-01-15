package com.breeze_flow.breeze_flow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * TestModel - Beispielmodell für MongoDB-Integration
 * 
 * Diese Klasse demonstriert die grundlegende Struktur eines MongoDB-Dokuments
 * und dient als Vorlage für weitere Modellklassen.
 * 
 * Technische Details:
 * - Verwendet Spring Data MongoDB Annotationen
 * - Wird in der Collection "tests" gespeichert
 * - Automatische ID-Generierung durch MongoDB
 * 
 * Datenstruktur:
 * {
 *   "_id": "automatisch generierte ID",
 *   "name": "Name des Tests"
 * }
 */
@Document(collection = "tests") // Definiert die MongoDB-Collection
public class TestModel {
    
    /**
     * Eindeutige ID des Dokuments
     * - Wird automatisch von MongoDB generiert
     * - Verwendet das ObjectId-Format
     * - Wird als String gespeichert
     */
    @Id // Markiert das Feld als Primärschlüssel
    private String id;
    
    /**
     * Name des Tests
     * - Pflichtfeld
     * - Wird für Beispielzwecke verwendet
     * - Keine speziellen Einschränkungen
     */
    private String name;
    
    /**
     * Standardkonstruktor
     * Wird von MongoDB für die Objekterstellung benötigt
     */
    public TestModel() {}
    
    /**
     * Konstruktor mit Name
     * Ermöglicht die einfache Erstellung von Testobjekten
     * 
     * @param name Der Name des Tests
     */
    public TestModel(String name) {
        this.name = name;
    }
    
    /**
     * Gibt die ID des Dokuments zurück
     * 
     * @return Die MongoDB-generierte ID
     */
    public String getId() {
        return id;
    }
    
    /**
     * Setzt die ID des Dokuments
     * Wird normalerweise nur von MongoDB verwendet
     * 
     * @param id Die zu setzende ID
     */
    public void setId(String id) {
        this.id = id;
    }
    
    /**
     * Gibt den Namen des Tests zurück
     * 
     * @return Der gespeicherte Name
     */
    public String getName() {
        return name;
    }
    
    /**
     * Setzt den Namen des Tests
     * 
     * @param name Der neue Name
     */
    public void setName(String name) {
        this.name = name;
    }
} 