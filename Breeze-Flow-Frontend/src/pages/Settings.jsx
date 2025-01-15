import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  useColorModeValue,
  FormControl,
  FormLabel,
  Switch,
  Select,
  SimpleGrid,
  Button,
  Divider,
  useToast,
  HStack,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import {
  FaBell,
  FaClock,
  FaPalette,
  FaVolumeUp,
  FaLanguage,
  FaSave,
} from 'react-icons/fa';
import { getSettings, updateSettings } from '../services/api';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    language: 'en',
    theme: 'system',
    focusMode: false,
    pomodoroLength: '25',
    breakLength: '5',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error loading settings',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettings(settings);
      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading settings...</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="lg" mb={2}>Settings</Heading>
        <Text color="gray.500">Customize your Breeze Flow experience</Text>
      </Box>

      <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <VStack spacing={6} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Notifications Section */}
            <Box>
              <HStack mb={4}>
                <IconButton
                  icon={<FaBell />}
                  variant="ghost"
                  aria-label="Notifications"
                />
                <Heading size="sm">Notifications</Heading>
              </HStack>
              <VStack align="stretch" spacing={4}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Enable Notifications
                  </FormLabel>
                  <Switch
                    isChecked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Sound Effects
                  </FormLabel>
                  <Switch
                    isChecked={settings.soundEnabled}
                    onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  />
                </FormControl>
              </VStack>
            </Box>

            {/* Timer Settings */}
            <Box>
              <HStack mb={4}>
                <IconButton
                  icon={<FaClock />}
                  variant="ghost"
                  aria-label="Timer Settings"
                />
                <Heading size="sm">Timer Settings</Heading>
              </HStack>
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel>Pomodoro Length (minutes)</FormLabel>
                  <Select
                    value={settings.pomodoroLength}
                    onChange={(e) => handleSettingChange('pomodoroLength', e.target.value)}
                  >
                    <option value="25">25 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Break Length (minutes)</FormLabel>
                  <Select
                    value={settings.breakLength}
                    onChange={(e) => handleSettingChange('breakLength', e.target.value)}
                  >
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                  </Select>
                </FormControl>
              </VStack>
            </Box>
          </SimpleGrid>

          <Divider />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Appearance */}
            <Box>
              <HStack mb={4}>
                <IconButton
                  icon={<FaPalette />}
                  variant="ghost"
                  aria-label="Appearance"
                />
                <Heading size="sm">Appearance</Heading>
              </HStack>
              <FormControl>
                <FormLabel>Theme</FormLabel>
                <Select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Select>
              </FormControl>
            </Box>

            {/* Language */}
            <Box>
              <HStack mb={4}>
                <IconButton
                  icon={<FaLanguage />}
                  variant="ghost"
                  aria-label="Language"
                />
                <Heading size="sm">Language</Heading>
              </HStack>
              <FormControl>
                <FormLabel>Display Language</FormLabel>
                <Select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </Select>
              </FormControl>
            </Box>
          </SimpleGrid>

          <Divider />

          <Box>
            <Button
              leftIcon={<FaSave />}
              colorScheme="blue"
              onClick={saveSettings}
              size="lg"
              width={{ base: "100%", md: "auto" }}
              isLoading={isSaving}
              loadingText="Saving..."
            >
              Save Settings
            </Button>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}

export default Settings; 