package com.breeze_flow.breeze_flow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Hauptanwendungsklasse für Breeze Flow
 * ------------------------------------
 * 
 * Diese Klasse ist der Einstiegspunkt der Spring Boot Anwendung.
 * Sie initialisiert den gesamten Anwendungskontext und startet
 * alle notwendigen Komponenten.
 * 
 * Funktionen:
 * - Startet den Spring Boot ApplicationContext
 * - Aktiviert Component-Scanning für alle Unterpackages
 * - Lädt die Konfiguration aus application.properties
 * - Initialisiert die MongoDB-Verbindung
 * - Startet den eingebetteten Tomcat-Server
 * 
 * Technische Details:
 * - @SpringBootApplication kombiniert:
 *   - @Configuration: Markiert die Klasse als Konfigurationsquelle
 *   - @EnableAutoConfiguration: Aktiviert Spring Boot's Auto-Konfiguration
 *   - @ComponentScan: Sucht nach Spring-Komponenten im Basis-Package
 */
@SpringBootApplication
public class BreezeFlowApplication {

	/**
	 * Hauptmethode der Anwendung
	 * 
	 * Startet die Spring Boot Anwendung und initialisiert:
	 * - Spring Context
	 * - Datenbank-Verbindung
	 * - REST Controller
	 * - Weitere Komponenten
	 * 
	 * @param args Kommandozeilenargumente (werden an Spring weitergegeben)
	 */
	public static void main(String[] args) {
		SpringApplication.run(BreezeFlowApplication.class, args);
	}

}
