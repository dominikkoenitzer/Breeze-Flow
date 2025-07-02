// --- Professional, robust, and fully commented localStorage-powered settings management ---

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Switch,
  Select,
  Avatar,
  IconButton,
  HStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  FormErrorMessage,
  Badge,
} from '@chakra-ui/react';
import {
  FaUser,
  FaBell,
  FaCog,
  FaCamera,
  FaLock,
  FaTrash,
  FaSignOutAlt,
} from 'react-icons/fa';
import { api } from '../../services/api';

const LOCAL_STORAGE_KEY = 'breezeFlowSettings';

const SettingsPage = () => {
  // --- State for all settings sections ---
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [preferences, setPreferences] = useState({
    theme: 'system', language: 'en', timeFormat: '24h', startPage: 'dashboard',
  });
  const [notifications, setNotifications] = useState({
    email: true, push: true, taskReminders: true, focusTimer: true, wellness: true,
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // --- Utility: Save all settings to localStorage ---
  const saveToLocalStorage = useCallback((p, pref, notif) => {
    const data = {
      profile: p ?? profile,
      preferences: pref ?? preferences,
      notifications: notif ?? notifications,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [profile, preferences, notifications]);

  // --- Utility: Load all settings from localStorage, fallback to API ---
  useEffect(() => {
    const localSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localSettings) {
      try {
        const data = JSON.parse(localSettings);
        setProfile(data.profile || profile);
        setPreferences(data.preferences || preferences);
        setNotifications(data.notifications || notifications);
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Corrupt data, clear it
        fetchSettings();
      }
    } else {
      fetchSettings();
    }
    // eslint-disable-next-line
  }, []);

  // --- API fetch: Only used if no localStorage ---
  const fetchSettings = async () => {
    try {
      const data = await api.getSettings();
      setProfile(data.profile);
      setPreferences(data.preferences);
      setNotifications(data.notifications);
      saveToLocalStorage(data.profile, data.preferences, data.notifications);
    } catch (error) {
      toast({
        title: 'Error loading settings',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  // --- Profile: Save to state and localStorage instantly ---
  const handleProfileField = (key) => (e) => {
    const updated = { ...profile, [key]: e.target.value };
    setProfile(updated);
    saveToLocalStorage(updated, null, null);
  };

  // --- Preferences: Save to state and localStorage instantly ---
  const handlePreferenceChange = (key) => (e) => {
    const updated = { ...preferences, [key]: e.target.value };
    setPreferences(updated);
    saveToLocalStorage(null, updated, null);
  };

  // --- Notifications: Save to state and localStorage instantly ---
  const handleNotificationToggle = (key) => (e) => {
    const updated = { ...notifications, [key]: e.target.checked };
    setNotifications(updated);
    saveToLocalStorage(null, null, updated);
  };

  // --- Profile form submit: Also syncs to API ---
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    setIsLoading(true);
    try {
      await api.updateProfile(profile);
      saveToLocalStorage(profile, null, null);
      toast({ title: 'Profile updated', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error updating profile', description: error.message, status: 'error', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Preferences save button: Also syncs to API ---
  const handlePreferencesUpdate = async () => {
    setIsLoading(true);
    try {
      await api.updateSettings({ preferences });
      saveToLocalStorage(null, preferences, null);
      toast({ title: 'Preferences updated', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error updating preferences', description: error.message, status: 'error', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Notifications save button: Also syncs to API ---
  const handleNotificationsUpdate = async () => {
    setIsLoading(true);
    try {
      await api.updateSettings({ notifications });
      saveToLocalStorage(null, null, notifications);
      toast({ title: 'Notification settings updated', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error updating notifications', description: error.message, status: 'error', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Profile validation ---
  const validateProfile = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Account deletion ---
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await api.deleteAccount();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        toast({
          title: 'Account deleted',
          description: 'Your account has been permanently deleted.',
          status: 'success',
          duration: 5000,
        });
        window.location.href = '/auth';
      } catch (error) {
        toast({ title: 'Error deleting account', description: error.message, status: 'error', duration: 5000 });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // --- Main render ---
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2}>Settings</Heading>
          <Text color="gray.500">Manage your account and preferences</Text>
        </Box>
        <Tabs variant="enclosed">
          <TabList>
            <Tab><HStack spacing={2}><FaUser /><Text>Profile</Text></HStack></Tab>
            <Tab><HStack spacing={2}><FaCog /><Text>Preferences</Text></HStack></Tab>
            <Tab><HStack spacing={2}><FaBell /><Text>Notifications</Text></HStack></Tab>
          </TabList>
          <TabPanels>
            {/* --- Profile Tab --- */}
            <TabPanel>
              <Box as="form" onSubmit={handleProfileUpdate} bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={6} align="stretch">
                  <HStack spacing={8} align="start">
                    <VStack>
                      <Avatar size="2xl" name={profile.name} src={profile.avatar} />
                      <IconButton aria-label="Change profile picture" icon={<FaCamera />} size="sm" colorScheme="brand" variant="ghost" />
                    </VStack>
                    <VStack spacing={4} flex={1}>
                      <FormControl isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input value={profile.name} onChange={handleProfileField('name')} placeholder="Your name" />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={profile.email} onChange={handleProfileField('email')} placeholder="Your email" />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </HStack>
                  <Divider />
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Button leftIcon={<FaLock />} variant="outline" onClick={() => { /* Handle password change */ }}>Change Password</Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" variant="ghost" onClick={handleDeleteAccount}>Delete Account</Button>
                  </SimpleGrid>
                  <Button type="submit" colorScheme="brand" size="lg" isLoading={isLoading}>Save Changes</Button>
                </VStack>
              </Box>
            </TabPanel>
            {/* --- Preferences Tab --- */}
            <TabPanel>
              <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <Select value={preferences.theme} onChange={handlePreferenceChange('theme')}>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Select value={preferences.language} onChange={handlePreferenceChange('language')}>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Time Format</FormLabel>
                    <Select value={preferences.timeFormat} onChange={handlePreferenceChange('timeFormat')}>
                      <option value="12h">12-hour</option>
                      <option value="24h">24-hour</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Page</FormLabel>
                    <Select value={preferences.startPage} onChange={handlePreferenceChange('startPage')}>
                      <option value="dashboard">Dashboard</option>
                      <option value="tasks">Quick Tasks</option>
                      <option value="planner">Daily Planner</option>
                      <option value="focus">Focus Timer</option>
                      <option value="wellness">Wellness</option>
                    </Select>
                  </FormControl>
                  <Button colorScheme="brand" size="lg" onClick={handlePreferencesUpdate} isLoading={isLoading}>Save Preferences</Button>
                </VStack>
              </Box>
            </TabPanel>
            {/* --- Notifications Tab --- */}
            <TabPanel>
              <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={6} align="stretch">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Email Notifications</FormLabel>
                    <Switch isChecked={notifications.email} onChange={handleNotificationToggle('email')} colorScheme="brand" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Push Notifications</FormLabel>
                    <Switch isChecked={notifications.push} onChange={handleNotificationToggle('push')} colorScheme="brand" />
                  </FormControl>
                  <Divider />
                  <Heading size="md" mb={4}>Notification Types</Heading>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Task Reminders</FormLabel>
                    <Switch isChecked={notifications.taskReminders} onChange={handleNotificationToggle('taskReminders')} colorScheme="brand" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Focus Timer Alerts</FormLabel>
                    <Switch isChecked={notifications.focusTimer} onChange={handleNotificationToggle('focusTimer')} colorScheme="brand" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Wellness Reminders</FormLabel>
                    <Switch isChecked={notifications.wellness} onChange={handleNotificationToggle('wellness')} colorScheme="brand" />
                  </FormControl>
                  <Button colorScheme="brand" size="lg" onClick={handleNotificationsUpdate} isLoading={isLoading}>Save Notification Settings</Button>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default SettingsPage;