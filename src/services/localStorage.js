// localStorage service for data persistence
const STORAGE_KEYS = {
  TIMER_STATE: 'breeze_flow_timer_state',
  TASKS: 'breeze_flow_tasks',
  FOCUS_SESSIONS: 'breeze_flow_focus_sessions',
  SETTINGS: 'breeze_flow_settings',
  WELLNESS: 'breeze_flow_wellness',
  CALENDAR_EVENTS: 'breeze_flow_calendar_events',
};

class LocalStorageService {
  // Timer state management
  saveTimerState(state) {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify({
        ...state,
        lastSaved: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save timer state:', error);
      return false;
    }
  }

  getTimerState() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
      if (!data) return null;
      
      const state = JSON.parse(data);
      // Calculate time elapsed since last save if timer was running
      if (state.isRunning && state.lastSaved) {
        const timeElapsed = Math.floor((Date.now() - state.lastSaved) / 1000);
        state.timeLeft = Math.max(0, state.timeLeft - timeElapsed);
      }
      return state;
    } catch (error) {
      console.error('Failed to get timer state:', error);
      return null;
    }
  }

  clearTimerState() {
    try {
      localStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
      return true;
    } catch (error) {
      console.error('Failed to clear timer state:', error);
      return false;
    }
  }

  // Tasks management
  saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify({
        tasks,
        lastUpdated: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save tasks:', error);
      return false;
    }
  }

  getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return parsed.tasks || [];
    } catch (error) {
      console.error('Failed to get tasks:', error);
      return [];
    }
  }

  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      ...task
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  updateTask(taskId, updates) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates, updatedAt: new Date().toISOString() };
      this.saveTasks(tasks);
      return tasks[taskIndex];
    }
    return null;
  }

  deleteTask(taskId) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(filteredTasks);
  }

  // Focus sessions tracking
  saveFocusSession(session) {
    try {
      const existingSessions = this.getFocusSessions();
      const updatedSessions = [...existingSessions, {
        ...session,
        id: Date.now().toString(),
        date: new Date().toISOString()
      }];
      
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(updatedSessions));
      return true;
    } catch (error) {
      console.error('Failed to save focus session:', error);
      return false;
    }
  }

  getFocusSessions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
      if (!data) return [];
      
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get focus sessions:', error);
      return [];
    }
  }

  // Settings management
  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
        ...settings,
        lastUpdated: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        soundEnabled: true,
        notificationsEnabled: true,
        theme: 'system'
      };
      
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get settings:', error);
      return {};
    }
  }

  // Wellness data management
  saveWellnessData(data) {
    try {
      const existing = this.getWellnessData();
      const updated = { ...existing, ...data, lastUpdated: Date.now() };
      localStorage.setItem(STORAGE_KEYS.WELLNESS, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save wellness data:', error);
      return false;
    }
  }

  getWellnessData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WELLNESS);
      if (!data) return {};
      
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get wellness data:', error);
      return {};
    }
  }

  // Calendar events management
  saveCalendarEvents(events) {
    try {
      localStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify({
        events,
        lastUpdated: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save calendar events:', error);
      return false;
    }
  }

  getCalendarEvents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return parsed.events || [];
    } catch (error) {
      console.error('Failed to get calendar events:', error);
      return [];
    }
  }

  // Clear all data
  clearAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Failed to clear all data:', error);
      return false;
    }
  }

  // Get storage usage information
  getStorageInfo() {
    try {
      const info = {};
      let totalSize = 0;
      
      Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
        const data = localStorage.getItem(key);
        const size = data ? new Blob([data]).size : 0;
        info[name] = {
          size,
          hasData: !!data
        };
        totalSize += size;
      });
      
      return {
        ...info,
        totalSize,
        totalSizeFormatted: this.formatBytes(totalSize)
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {};
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const localStorageService = new LocalStorageService();
export default localStorageService;
