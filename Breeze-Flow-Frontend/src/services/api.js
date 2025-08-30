import axios from 'axios';
import { mockApiService } from './mockApi.js';
import { updateConnectionState } from '../utils/connectionStatus.js';

/**
 * API Service Konfiguration
 * ------------------------
 * Zentrale Konfiguration für alle Backend-API-Aufrufe
 * 
 * Technische Details:
 * - Verwendet Axios für HTTP-Anfragen
 * - Basis-URL dynamisch konfiguriert (dev/prod)
 * - Alle Anfragen gehen an /api/* Endpunkte
 * - Automatische JSON Serialisierung/Deserialisierung
 * - Fallback zu Mock-Daten wenn Backend nicht verfügbar
 * 
 * Fehlerbehandlung:
 * - Automatische Fehlerbehandlung durch Axios
 * - Netzwerkfehler werden als Exceptions geworfen
 * - HTTP-Statuscode >= 400 führt zu Fehlern
 * - Bei Netzwerkfehlern wird Mock-Service verwendet
 */

// Dynamic base URL configuration
const getBaseURL = () => {
  // In development, use Vite env variable or localhost
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production, use current origin + /api
  if (import.meta.env.PROD) {
    return `${window.location.origin}/api`;
  }
  
  // Development fallback
  return 'http://localhost:8080/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global flag to track if backend is available
let backendAvailable = true;

// Helper function to handle API calls with fallback to mock
const apiCall = async (apiFunction, mockFunction, ...args) => {
  // Force mock mode if environment variable is set
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    if (import.meta.env.VITE_DEBUG_API === 'true') {
      console.log('🔄 Using mock data (forced by environment)');
    }
    updateConnectionState(false, true);
    return await mockFunction(...args);
  }

  if (!backendAvailable) {
    if (import.meta.env.VITE_DEBUG_API === 'true') {
      console.log('🔄 Using mock data (backend unavailable)');
    }
    updateConnectionState(false, true);
    return await mockFunction(...args);
  }

  try {
    const result = await apiFunction(...args);
    // If this is the first successful call after being disconnected, update status
    if (!backendAvailable) {
      backendAvailable = true;
      updateConnectionState(true, false);
      if (import.meta.env.VITE_DEBUG_API === 'true') {
        console.log('✅ Backend connection restored');
      }
    }
    return result;
  } catch (error) {
    // If it's a network error, switch to mock mode
    if (error.code === 'ECONNREFUSED' || 
        error.code === 'ERR_NETWORK' || 
        error.code === 'ENOTFOUND' ||
        !error.response) {
      
      if (import.meta.env.VITE_DEBUG_API === 'true') {
        console.warn('⚠️ Backend unavailable, switching to mock data:', error.message);
      }
      
      backendAvailable = false;
      updateConnectionState(false, true);
      return await mockFunction(...args);
    }
    
    // Re-throw other errors (like 400, 401, etc.)
    if (import.meta.env.VITE_DEBUG_API === 'true') {
      console.error('❌ API Error:', error.response?.status, error.message);
    }
    throw error;
  }
};

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
  return apiCall(
    async () => {
      const response = await api.post('/tasks', task);
      return response.data;
    },
    mockApiService.createTask,
    task
  );
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
  return apiCall(
    async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
    mockApiService.getTasks
  );
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
  return apiCall(
    async () => {
      const response = await api.put(`/tasks/${taskId}`, task);
      return response.data;
    },
    mockApiService.updateTask,
    taskId,
    task
  );
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
  return apiCall(
    async () => {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    },
    mockApiService.deleteTask,
    taskId
  );
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
  return apiCall(
    async () => {
      const response = await api.post('/focus-sessions', session);
      return response.data;
    },
    mockApiService.saveFocusSession,
    session
  );
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
  return apiCall(
    async () => {
      const response = await api.get('/focus-sessions');
      return response.data;
    },
    mockApiService.getFocusSessions
  );
};

// ========================================
// Kalender-Verwaltung
// ========================================

/**
 * Termin erstellen
 */
export const createEvent = async (event) => {
  return apiCall(
    async () => {
      const response = await api.post('/events', event);
      return response.data;
    },
    mockApiService.createEvent,
    event
  );
};

/**
 * Termine abrufen
 */
export const getEvents = async () => {
  return apiCall(
    async () => {
      const response = await api.get('/events');
      return response.data;
    },
    mockApiService.getEvents
  );
};

/**
 * Termin aktualisieren
 */
export const updateEvent = async (eventId, event) => {
  return apiCall(
    async () => {
      const response = await api.put(`/events/${eventId}`, event);
      return response.data;
    },
    mockApiService.updateEvent,
    eventId,
    event
  );
};

/**
 * Termin löschen
 */
export const deleteEvent = async (eventId) => {
  return apiCall(
    async () => {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    },
    mockApiService.deleteEvent,
    eventId
  );
};

// ========================================
// Einstellungen-Verwaltung
// ========================================

/**
 * Einstellungen abrufen
 */
export const getSettings = async () => {
  return apiCall(
    async () => {
      const response = await api.get('/settings');
      return response.data;
    },
    mockApiService.getSettings
  );
};

/**
 * Einstellungen aktualisieren
 */
export const updateSettings = async (settings) => {
  return apiCall(
    async () => {
      const response = await api.put('/settings', settings);
      return response.data;
    },
    mockApiService.updateSettings,
    settings
  );
};

// ========================================
// Wellness Tracking
// ========================================

/**
 * Wellness-Statistiken abrufen
 */
export const getWellnessStats = async () => {
  return apiCall(
    async () => {
      const response = await api.get('/wellness/stats');
      return response.data;
    },
    mockApiService.getWellnessStats
  );
};

/**
 * Wellness Check-in erstellen
 */
export const createWellnessCheckin = async (checkin) => {
  return apiCall(
    async () => {
      const response = await api.post('/wellness/checkins', checkin);
      return response.data;
    },
    mockApiService.createWellnessCheckin,
    checkin
  );
};

// ========================================
// Support System
// ========================================

/**
 * Support-Ticket einreichen
 */
export const submitSupportTicket = async (ticket) => {
  return apiCall(
    async () => {
      const response = await api.post('/support/tickets', ticket);
      return response.data;
    },
    mockApiService.submitSupportTicket,
    ticket
  );
};

// ========================================
// Test System (Development)
// ========================================

/**
 * Alle Tests abrufen
 */
export const getAllTests = async () => {
  return apiCall(
    async () => {
      const response = await api.get('/tests');
      return response.data;
    },
    mockApiService.getAllTests
  );
};

/**
 * Test erstellen
 */
export const createTest = async (test) => {
  return apiCall(
    async () => {
      const response = await api.post('/tests', test);
      return response.data;
    },
    mockApiService.createTest,
    test
  );
};

/**
 * Test aktualisieren
 */
export const updateTest = async (id, test) => {
  return apiCall(
    async () => {
      const response = await api.put(`/tests/${id}`, test);
      return response.data;
    },
    mockApiService.updateTest,
    id,
    test
  );
};

/**
 * Test löschen
 */
export const deleteTest = async (id) => {
  return apiCall(
    async () => {
      const response = await api.delete(`/tests/${id}`);
      return response.data;
    },
    mockApiService.deleteTest,
    id
  );
};

// ========================================
// Profile & Account Management
// ========================================

/**
 * Profil aktualisieren
 */
export const updateProfile = async (profile) => {
  return apiCall(
    async () => {
      const response = await api.put('/profile', profile);
      return response.data;
    },
    mockApiService.updateProfile,
    profile
  );
};

/**
 * Account löschen
 */
export const deleteAccount = async () => {
  return apiCall(
    async () => {
      const response = await api.delete('/account');
      return response.data;
    },
    mockApiService.deleteAccount
  );
};

// ========================================
// Attach methods to api instance for direct usage
// ========================================

// Task methods
api.createTask = createTask;
api.getTasks = getTasks;
api.updateTask = updateTask;
api.deleteTask = deleteTask;

// Focus session methods
api.saveFocusSession = saveFocusSession;
api.getFocusSessions = getFocusSessions;

// Event methods
api.createEvent = createEvent;
api.getEvents = getEvents;
api.updateEvent = updateEvent;
api.deleteEvent = deleteEvent;

// Settings methods
api.getSettings = getSettings;
api.updateSettings = updateSettings;
api.updateProfile = updateProfile;
api.deleteAccount = deleteAccount;

// Wellness methods
api.getWellnessStats = getWellnessStats;
api.createWellnessCheckin = createWellnessCheckin;

// Support methods
api.submitSupportTicket = submitSupportTicket;

// Test methods
api.getAllTests = getAllTests;
api.createTest = createTest;
api.updateTest = updateTest;
api.deleteTest = deleteTest;

// Exportiert die API-Instanz für direkte Verwendung
export default api;