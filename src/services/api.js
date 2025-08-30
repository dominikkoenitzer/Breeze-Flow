// Mock API service for local-only operation
import { localStorageService } from './localStorage.js';

/**
 * Local API Service
 * ----------------
 * Replaces backend API calls with localStorage operations
 * All data is stored locally and persists across browser sessions
 */

export class LocalApiService {
  // Tasks API
  async getTasks() {
    return Promise.resolve(localStorageService.getTasks());
  }

  async createTask(task) {
    const newTask = localStorageService.addTask(task);
    return Promise.resolve(newTask);
  }

  async updateTask(taskId, updates) {
    const updatedTask = localStorageService.updateTask(taskId, updates);
    return Promise.resolve(updatedTask);
  }

  async deleteTask(taskId) {
    localStorageService.deleteTask(taskId);
    return Promise.resolve({ success: true });
  }

  // Focus sessions API
  async getFocusSessions() {
    return Promise.resolve(localStorageService.getFocusSessions());
  }

  async createFocusSession(session) {
    const success = localStorageService.saveFocusSession(session);
    return Promise.resolve({ success });
  }

  // Settings API
  async getSettings() {
    return Promise.resolve(localStorageService.getSettings());
  }

  async updateSettings(settings) {
    const success = localStorageService.saveSettings(settings);
    return Promise.resolve({ success });
  }

  // Wellness data API
  async getWellnessData() {
    return Promise.resolve(localStorageService.getWellnessData());
  }

  async updateWellnessData(data) {
    const success = localStorageService.saveWellnessData(data);
    return Promise.resolve({ success });
  }

  // Calendar events API
  async getCalendarEvents() {
    return Promise.resolve(localStorageService.getCalendarEvents());
  }

  async createCalendarEvent(event) {
    const events = localStorageService.getCalendarEvents();
    const newEvent = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...event
    };
    events.push(newEvent);
    const success = localStorageService.saveCalendarEvents(events);
    return Promise.resolve({ success, event: newEvent });
  }

  async updateCalendarEvent(eventId, updates) {
    const events = localStorageService.getCalendarEvents();
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...updates, updatedAt: new Date().toISOString() };
      const success = localStorageService.saveCalendarEvents(events);
      return Promise.resolve({ success, event: events[eventIndex] });
    }
    return Promise.resolve({ success: false, error: 'Event not found' });
  }

  async deleteCalendarEvent(eventId) {
    const events = localStorageService.getCalendarEvents();
    const filteredEvents = events.filter(event => event.id !== eventId);
    const success = localStorageService.saveCalendarEvents(filteredEvents);
    return Promise.resolve({ success });
  }

  // Analytics API
  async getAnalytics() {
    const focusSessions = localStorageService.getFocusSessions();
    const tasks = localStorageService.getTasks();
    
    // Calculate analytics from local data
    const completedTasks = tasks.filter(task => task.completed);
    const totalFocusTime = focusSessions.reduce((total, session) => 
      total + (session.duration || 0), 0
    );
    
    return Promise.resolve({
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      totalFocusTime: Math.floor(totalFocusTime / 60), // in minutes
      focusSessions: focusSessions.length,
      averageSessionLength: focusSessions.length > 0 ? 
        Math.floor(totalFocusTime / focusSessions.length / 60) : 0
    });
  }

  // Health check
  async healthCheck() {
    return Promise.resolve({ 
      status: 'ok', 
      message: 'Local storage is available',
      timestamp: new Date().toISOString()
    });
  }
}

export const api = new LocalApiService();
export default api;