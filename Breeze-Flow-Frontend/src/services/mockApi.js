/**
 * Mock API Service for Development
 * ================================
 * This service provides mock data and responses for all API endpoints
 * when the backend is not available. Useful for frontend development.
 */

// Mock data stores
let mockTasks = [
  {
    id: '1',
    title: 'Complete project setup',
    description: 'Set up the initial project structure and dependencies',
    completed: false,
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    tags: ['work', 'setup'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review design mockups',
    description: 'Go through the latest design updates from the team',
    completed: true,
    priority: 'MEDIUM',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    tags: ['design', 'review'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

let mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    startDate: new Date(Date.now() + 3600000).toISOString(),
    endDate: new Date(Date.now() + 7200000).toISOString(),
    description: 'Weekly team sync meeting',
    category: 'MEETING',
    location: 'Conference Room A',
  },
];

let mockFocusSessions = [
  {
    id: '1',
    duration: 25,
    breaks: 1,
    completedTasks: ['1'],
    startTime: new Date(Date.now() - 1800000).toISOString(),
    endTime: new Date(Date.now() - 300000).toISOString(),
    notes: 'Good focus session, completed setup tasks',
  },
];

let mockWellnessData = {
  averageMood: 4.2,
  averageWaterIntake: 6.5,
  averageSleep: 7.8,
};

let mockWellnessCheckins = [];

let mockTests = [
  { _id: '1', name: 'Sample Test 1' },
  { _id: '2', name: 'Sample Test 2' },
];

let mockSettings = {
  profile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
  },
  preferences: {
    theme: 'system',
    language: 'en',
    timeFormat: '24h',
    startPage: 'dashboard',
  },
  notifications: {
    email: true,
    push: true,
    taskReminders: true,
    focusTimer: true,
    wellness: true,
  },
};

// Utility function to simulate network delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

/**
 * Mock API implementations
 */
export const mockApiService = {
  // Tasks
  async getTasks() {
    await delay();
    return mockTasks;
  },

  async createTask(task) {
    await delay();
    const newTask = {
      ...task,
      id: generateId(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id, updates) {
    await delay();
    const index = mockTasks.findIndex(task => task.id === id);
    if (index === -1) throw new Error('Task not found');
    mockTasks[index] = { ...mockTasks[index], ...updates };
    return mockTasks[index];
  },

  async deleteTask(id) {
    await delay();
    const index = mockTasks.findIndex(task => task.id === id);
    if (index === -1) throw new Error('Task not found');
    const deleted = mockTasks.splice(index, 1)[0];
    return { message: 'Task deleted successfully', task: deleted };
  },

  // Events
  async getEvents() {
    await delay();
    return mockEvents;
  },

  async createEvent(event) {
    await delay();
    const newEvent = {
      ...event,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockEvents.push(newEvent);
    return newEvent;
  },

  async updateEvent(id, updates) {
    await delay();
    const index = mockEvents.findIndex(event => event.id === id);
    if (index === -1) throw new Error('Event not found');
    mockEvents[index] = { ...mockEvents[index], ...updates };
    return mockEvents[index];
  },

  async deleteEvent(id) {
    await delay();
    const index = mockEvents.findIndex(event => event.id === id);
    if (index === -1) throw new Error('Event not found');
    const deleted = mockEvents.splice(index, 1)[0];
    return { message: 'Event deleted successfully', event: deleted };
  },

  // Focus Sessions
  async getFocusSessions() {
    await delay();
    return mockFocusSessions;
  },

  async saveFocusSession(session) {
    await delay();
    const newSession = {
      ...session,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockFocusSessions.push(newSession);
    return newSession;
  },

  // Wellness
  async getWellnessStats() {
    await delay();
    return mockWellnessData;
  },

  async createWellnessCheckin(checkin) {
    await delay();
    const newCheckin = {
      ...checkin,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    mockWellnessCheckins.push(newCheckin);
    
    // Update stats based on new checkin
    const recentCheckins = mockWellnessCheckins.slice(-7); // Last 7 days
    if (recentCheckins.length > 0) {
      mockWellnessData.averageMood = recentCheckins.reduce((sum, c) => sum + c.mood, 0) / recentCheckins.length;
      mockWellnessData.averageWaterIntake = recentCheckins.reduce((sum, c) => sum + c.waterIntake, 0) / recentCheckins.length;
      mockWellnessData.averageSleep = recentCheckins.reduce((sum, c) => sum + c.sleepHours, 0) / recentCheckins.length;
    }
    
    return newCheckin;
  },

  // Settings
  async getSettings() {
    await delay();
    return mockSettings;
  },

  async updateSettings(updates) {
    await delay();
    mockSettings = { ...mockSettings, ...updates };
    return mockSettings;
  },

  async updateProfile(profile) {
    await delay();
    mockSettings.profile = { ...mockSettings.profile, ...profile };
    return mockSettings.profile;
  },

  async deleteAccount() {
    await delay();
    // Reset all data
    mockTasks = [];
    mockEvents = [];
    mockFocusSessions = [];
    mockWellnessCheckins = [];
    mockSettings = {
      profile: { name: '', email: '', avatar: '' },
      preferences: { theme: 'system', language: 'en', timeFormat: '24h', startPage: 'dashboard' },
      notifications: { email: true, push: true, taskReminders: true, focusTimer: true, wellness: true },
    };
    return { message: 'Account deleted successfully' };
  },

  // Support
  async submitSupportTicket(ticket) {
    await delay();
    const newTicket = {
      ...ticket,
      id: generateId(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    return newTicket;
  },

  // Tests
  async getAllTests() {
    await delay();
    return mockTests;
  },

  async createTest(test) {
    await delay();
    const newTest = {
      ...test,
      _id: generateId(),
    };
    mockTests.push(newTest);
    return newTest;
  },

  async updateTest(id, updates) {
    await delay();
    const index = mockTests.findIndex(test => test._id === id);
    if (index === -1) throw new Error('Test not found');
    mockTests[index] = { ...mockTests[index], ...updates };
    return mockTests[index];
  },

  async deleteTest(id) {
    await delay();
    const index = mockTests.findIndex(test => test._id === id);
    if (index === -1) throw new Error('Test not found');
    const deleted = mockTests.splice(index, 1)[0];
    return { message: 'Test deleted successfully', test: deleted };
  },
};

export default mockApiService;
