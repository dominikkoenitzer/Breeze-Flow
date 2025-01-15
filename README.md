# Breeze Flow - Produktivitäts- und Fokus-Management-System

## Projektidee (Elevator Pitch)
Breeze Flow ist deine All-in-One-Lösung für produktives Arbeiten und effektives Zeitmanagement. Stell dir vor, du hättest einen persönlichen Assistenten, der dir hilft, deine Aufgaben zu organisieren, deine Fokuszeiten zu optimieren und deine Produktivität zu steigern. Mit unserem Pomodoro-Timer, intelligenter Aufgabenverwaltung und einem übersichtlichen Kalendersystem behältst du spielend leicht den Überblick über deine täglichen Herausforderungen.

## Kernanforderungen (Anforderungskatalog)
1. **Fokus-Timer**
   - Anpassbare Pomodoro-Sitzungen (25/5 Minuten Standard)
   - Pausenmanagement
   - Fortschrittsanzeige und Statistiken

2. **Aufgabenverwaltung**
   - Erstellen, Bearbeiten und Löschen von Aufgaben
   - Prioritätensetzung
   - Kategorisierung und Tagging

3. **Kalender**
   - Ereignisverwaltung
   - Terminplanung
   - Erinnerungsfunktion

4. **Produktivitäts-Tracking**
   - Persönliche Statistiken
   - Fortschrittsübersicht
   - Erreichungsgrade von Zielen

## Klassendiagramm
```
[Frontend-Komponenten]
- App
  ├── Dashboard
  ├── FocusTimer
  │   ├── Timer
  │   └── TimerControls
  ├── TasksPage
  │   ├── TaskList
  │   └── TaskItem
  ├── Calendar
  │   ├── CalendarView
  │   └── EventForm
  └── Profile
      ├── Stats
      └── Achievements

[Backend-Modelle]
- FocusSession
  ├── id: String
  ├── duration: Integer
  ├── startTime: DateTime
  ├── endTime: DateTime
  └── status: String

- Task
  ├── id: String
  ├── title: String
  ├── description: String
  ├── priority: String
  └── status: String

- Event
  ├── id: String
  ├── title: String
  ├── date: DateTime
  ├── description: String
  └── status: String
```

## REST-Schnittstellen
### Focus Sessions
- GET /api/focus-sessions - Alle Fokus-Sitzungen abrufen
- POST /api/focus-sessions - Neue Fokus-Sitzung erstellen
- PUT /api/focus-sessions/{id} - Fokus-Sitzung aktualisieren
- DELETE /api/focus-sessions/{id} - Fokus-Sitzung löschen

### Tasks
- GET /api/tasks - Alle Aufgaben abrufen
- POST /api/tasks - Neue Aufgabe erstellen
- PUT /api/tasks/{id} - Aufgabe aktualisieren
- DELETE /api/tasks/{id} - Aufgabe löschen

### Events
- GET /api/events - Alle Ereignisse abrufen
- POST /api/events - Neues Ereignis erstellen
- PUT /api/events/{id} - Ereignis aktualisieren
- DELETE /api/events/{id} - Ereignis löschen

## Testplan
1. **Fokus-Timer Test**
   - Timer startet korrekt
   - Pause funktioniert
   - Benachrichtigung bei Timer-Ende
   - Statistiken werden aktualisiert

2. **Aufgabenverwaltung Test**
   - Aufgabe erstellen
   - Aufgabe als erledigt markieren
   - Priorität ändern
   - Aufgabe löschen

3. **Kalender Test**
   - Ereignis erstellen
   - Ereignisdetails anzeigen
   - Ereignis bearbeiten
   - Ereignis löschen

4. **Profil Test**
   - Statistiken werden korrekt angezeigt
   - Achievements werden freigeschaltet
   - Profilbild ändern
   - Einstellungen speichern

5. **Allgemeine Tests**
   - Dark/Light Mode Umschaltung
   - Responsive Design
   - Fehlermeldungen
   - Datenpersistenz

## Installationsanleitung

### Backend starten
1. MongoDB installieren und starten
2. Im Terminal ausführen:
```bash
cd Breeze-Flow-Backend
./mvnw spring-boot:run
```

### Frontend starten
1. Node.js installieren
2. Im Terminal ausführen:
```bash
cd Breeze-Flow-Frontend
npm install
npm run dev
```

Die Anwendung ist dann unter http://localhost:5173 erreichbar.

## Hilfeleistungen
- Chakra UI Dokumentation für Komponenten-Design
- MongoDB Dokumentation für Datenbankintegration
- Spring Boot Guides für Backend-Entwicklung
- React Router Dokumentation für Frontend-Routing
- Stack Overflow für spezifische Implementierungsfragen
- GitHub Discussions für Best Practices