/**
 * Connection Status Utility
 * =========================
 * Provides utilities for showing users when the app is using mock data
 * vs real backend data, and handling connection issues gracefully.
 */

import { useState, useEffect } from 'react';

// Global connection state
let globalConnectionState = {
  isConnected: true,
  isUsingMockData: false,
  lastConnectionCheck: null,
  listeners: new Set(),
};

// Notify all listeners of connection state changes
const notifyListeners = () => {
  globalConnectionState.listeners.forEach(listener => listener(globalConnectionState));
};

// Update connection state
export const updateConnectionState = (isConnected, isUsingMockData = false) => {
  const hasChanged = 
    globalConnectionState.isConnected !== isConnected ||
    globalConnectionState.isUsingMockData !== isUsingMockData;

  if (hasChanged) {
    globalConnectionState = {
      ...globalConnectionState,
      isConnected,
      isUsingMockData,
      lastConnectionCheck: new Date(),
    };
    notifyListeners();
  }
};

// Hook to use connection state in components
export const useConnectionState = () => {
  const [state, setState] = useState(globalConnectionState);

  useEffect(() => {
    const listener = (newState) => setState(newState);
    globalConnectionState.listeners.add(listener);

    return () => {
      globalConnectionState.listeners.delete(listener);
    };
  }, []);

  return state;
};

// Get current connection state (synchronous)
export const getConnectionState = () => globalConnectionState;

// Connection status messages
export const getConnectionMessage = () => {
  if (globalConnectionState.isUsingMockData) {
    return {
      type: 'warning',
      title: 'Using Demo Data',
      message: 'Backend server not available. Your changes will not be saved.',
    };
  }

  if (!globalConnectionState.isConnected) {
    return {
      type: 'error',
      title: 'Connection Lost',
      message: 'Unable to connect to server. Please check your connection.',
    };
  }

  return {
    type: 'success',
    title: 'Connected',
    message: 'All systems operational.',
  };
};

export default {
  updateConnectionState,
  useConnectionState,
  getConnectionState,
  getConnectionMessage,
};
