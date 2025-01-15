import axios from 'axios';

/**
 * API Service Konfiguration
 * ------------------------
 * Zentrale Konfiguration für alle Backend-API-Aufrufe
 * 
 * Technische Details:
 * - Verwendet Axios für HTTP-Anfragen
 * - Basis-URL zeigt auf Spring Boot Backend
 * - Alle Anfragen gehen an /api/* Endpunkte
 * - Automatische JSON Serialisierung/Deserialisierung
 * 
 * Fehlerbehandlung:
 * - Automatische Fehlerbehandlung durch Axios
 * - Netzwerkfehler werden als Exceptions geworfen
 * - HTTP-Statuscode >= 400 führt zu Fehlern
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// ========================================
// Aufgaben-Verwaltung (Tasks)
// ========================================

/**
 * Neue Aufgabe erstellen
 * 
 * Sendet POST-Anfrage an /api/tasks
 * Erwartet ein Aufgabenobjekt mit:
 * - title: Titel der Aufgabe (erforderlich)
 * - description: Beschreibung (optional)
 * - dueDate: Fälligkeitsdatum (optional, ISO-8601 Format)
 * - priority: Priorität (optional, "LOW", "MEDIUM", "HIGH")
 * - tags: Array von Tags (optional)
 * 
 * @param {Object} task - Aufgabenobjekt
 * @returns {Promise} Erstellte Aufgabe mit generierter ID
 * @throws {Error} Bei ungültigen Daten oder Netzwerkfehlern
 */
export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

/**
 * Alle Aufgaben abrufen
 * 
 * Sendet GET-Anfrage an /api/tasks
 * Ruft alle Aufgaben des aktuellen Benutzers ab
 * Optional können Filter übergeben werden:
 * - status: "OPEN", "COMPLETED"
 * - priority: "LOW", "MEDIUM", "HIGH"
 * - dueDate: Datum für fällige Aufgaben
 * 
 * @returns {Promise} Array mit allen Aufgaben
 * @throws {Error} Bei Netzwerkfehlern
 */
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

/**
 * Aufgabe aktualisieren
 * 
 * Sendet PUT-Anfrage an /api/tasks/{id}
 * Aktualisiert eine bestehende Aufgabe
 * Nur geänderte Felder müssen übergeben werden
 * 
 * @param {string} taskId - Aufgaben-ID
 * @param {Object} task - Aktualisierte Daten
 * @returns {Promise} Aktualisierte Aufgabe
 * @throws {Error} Bei ungültiger ID oder Netzwerkfehlern
 */
export const updateTask = async (taskId, task) => {
  const response = await api.put(`/tasks/${taskId}`, task);
  return response.data;
};

/**
 * Aufgabe löschen
 * 
 * Sendet DELETE-Anfrage an /api/tasks/{id}
 * Löscht eine Aufgabe permanent aus der Datenbank
 * Diese Aktion kann nicht rückgängig gemacht werden
 * 
 * @param {string} taskId - Aufgaben-ID
 * @returns {Promise} Löschbestätigung
 * @throws {Error} Bei ungültiger ID oder Netzwerkfehlern
 */
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// ========================================
// Fokus-Timer Funktionen
// ========================================

/**
 * Fokus-Sitzung speichern
 * 
 * Speichert eine abgeschlossene Pomodoro-Sitzung:
 * - duration: Dauer in Minuten (erforderlich)
 * - breaks: Anzahl der Pausen (erforderlich)
 * - completedTasks: Array von erledigten Aufgaben-IDs
 * - startTime: Startzeitpunkt (ISO-8601)
 * - endTime: Endzeitpunkt (ISO-8601)
 * - notes: Notizen zur Sitzung (optional)
 * 
 * @param {Object} session - Sitzungsdaten
 * @returns {Promise} Gespeicherte Sitzung
 * @throws {Error} Bei ungültigen Daten
 */
export const saveFocusSession = async (session) => {
  const response = await api.post('/focus-sessions', session);
  return response.data;
};

/**
 * Fokus-Sitzungen abrufen
 * 
 * Ruft alle Fokus-Sitzungen des Benutzers ab
 * Optional können Filter gesetzt werden:
 * - startDate: Beginn des Zeitraums
 * - endDate: Ende des Zeitraums
 * - minDuration: Mindestdauer in Minuten
 * 
 * @returns {Promise} Liste aller Sitzungen
 * @throws {Error} Bei Netzwerkfehlern
 */
export const getFocusSessions = async () => {
  const response = await api.get('/focus-sessions');
  return response.data;
};

// ========================================
// Kalender-Verwaltung
// ========================================

/**
 * Termin erstellen
 * 
 * Erstellt einen neuen Kalendereintrag mit:
 * - title: Titel des Termins (erforderlich)
 * - startDate: Startdatum und -zeit (erforderlich, ISO-8601)
 * - endDate: Enddatum und -zeit (erforderlich, ISO-8601)
 * - description: Beschreibung (optional)
 * - category: Kategorie (optional, z.B. "MEETING", "TASK")
 * - location: Ort des Termins (optional)
 * - participants: Array von Teilnehmern (optional)
 * - reminder: Erinnerungszeit in Minuten (optional)
 * 
 * @param {Object} event - Termindaten
 * @returns {Promise} Erstellter Termin
 * @throws {Error} Bei Validierungsfehlern
 */
export const createEvent = async (event) => {
  const response = await api.post('/events', event);
  return response.data;
};

/**
 * Termine abrufen
 * 
 * Ruft alle Termine im angegebenen Zeitraum ab
 * Filter-Optionen:
 * - startDate: Beginn des Zeitraums (ISO-8601)
 * - endDate: Ende des Zeitraums (ISO-8601)
 * - category: Filtert nach Kategorie
 * - status: "UPCOMING", "PAST", "CANCELLED"
 * 
 * Sortierung:
 * - Standardmäßig nach Startdatum aufsteigend
 * - Vergangene Termine werden nicht automatisch gelöscht
 * 
 * @returns {Promise} Liste aller Termine
 * @throws {Error} Bei ungültigen Filterkriterien
 */
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

/**
 * Termin aktualisieren
 * 
 * Aktualisiert einen bestehenden Termin
 * Nur geänderte Felder müssen übergeben werden
 * Validierung:
 * - Startzeit muss vor Endzeit liegen
 * - Titel darf nicht leer sein
 * 
 * @param {string} eventId - Termin-ID
 * @param {Object} event - Aktualisierte Daten
 * @returns {Promise} Aktualisierter Termin
 * @throws {Error} Bei Validierungs- oder Netzwerkfehlern
 */
export const updateEvent = async (eventId, event) => {
  const response = await api.put(`/events/${eventId}`, event);
  return response.data;
};

/**
 * Termin löschen
 * 
 * Löscht einen Termin permanent
 * Optionen:
 * - Einzelner Termin oder Serie
 * - Benachrichtigung an Teilnehmer optional
 * 
 * @param {string} eventId - Termin-ID
 * @returns {Promise} Löschbestätigung
 * @throws {Error} Bei ungültiger ID oder fehlenden Rechten
 */
export const deleteEvent = async (eventId) => {
  const response = await api.delete(`/events/${eventId}`);
  return response.data;
};

// ========================================
// Einstellungen-Verwaltung
// ========================================

/**
 * Einstellungen abrufen
 * 
 * Lädt die Benutzereinstellungen:
 * - theme: Design-Theme ("LIGHT", "DARK", "SYSTEM")
 * - notifications: Benachrichtigungseinstellungen
 *   - email: Boolean
 *   - push: Boolean
 *   - desktop: Boolean
 * - workHours: Arbeitszeiten
 *   - start: "HH:mm"
 *   - end: "HH:mm"
 *   - workDays: Array von Wochentagen
 * - focusSettings: Pomodoro-Einstellungen
 *   - workDuration: Minuten
 *   - breakDuration: Minuten
 *   - longBreakDuration: Minuten
 *   - sessionsUntilLongBreak: Anzahl
 * 
 * @returns {Promise} Aktuelle Benutzereinstellungen
 * @throws {Error} Bei Authentifizierungsfehlern
 */
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

/**
 * Einstellungen aktualisieren
 * 
 * Aktualisiert die Benutzereinstellungen
 * Alle Einstellungen sind optional und werden
 * mit den bestehenden Einstellungen zusammengeführt
 * 
 * Validierung:
 * - Arbeitsstunden müssen gültige Uhrzeiten sein
 * - Pomodoro-Dauern müssen > 0 sein
 * - Theme muss einen gültigen Wert haben
 * 
 * @param {Object} settings - Neue Einstellungen
 * @returns {Promise} Aktualisierte Einstellungen
 * @throws {Error} Bei Validierungsfehlern
 */
export const updateSettings = async (settings) => {
  const response = await api.put('/settings', settings);
  return response.data;
};

// Exportiert die API-Instanz für direkte Verwendung
export default api;