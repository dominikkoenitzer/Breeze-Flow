// localStorage service for data persistence
const STORAGE_KEYS = {
  TIMER_STATE: 'breeze_flow_timer_state',
  TASKS: 'breeze_flow_tasks',
  FOCUS_SESSIONS: 'breeze_flow_focus_sessions',
  SETTINGS: 'breeze_flow_settings',
};

class LocalStorageService {
  // Timer state management
  saveTimerState(state) {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify({
        ...state,
        lastSaved: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save timer state:', error);
    }
  }

  getTimerState() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
      if (!data) return null;
      
      const state = JSON.parse(data);
      // Calculate time elapsed since last save if timer was running
      if (state.isActive && state.lastSaved) {
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
    } catch (error) {
      console.error('Failed to clear timer state:', error);
    }
  }

  // Tasks management
  saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }

  getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
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

  // Focus sessions management
  saveFocusSession(session) {
    const sessions = this.getFocusSessions();
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...session
    };
    sessions.push(newSession);
    this.saveFocusSessions(sessions);
    return newSession;
  }

  getFocusSessions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get focus sessions:', error);
      return [];
    }
  }

  saveFocusSessions(sessions) {
    try {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save focus sessions:', error);
    }
  }

  // Settings management
  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        soundEnabled: true,
        notificationsEnabled: true,
        theme: 'system'
      };
    } catch (error) {
      console.error('Failed to get settings:', error);
      return {};
    }
  }

  // Utility methods
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  getStorageSize() {
    let total = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length;
      }
    });
    return total;
  }
}

export default new LocalStorageService();
