import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  useColorModeValue,
  Progress,
  IconButton,
  Select,
  useToast,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
} from '@chakra-ui/react';
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
} from 'react-icons/fa';
import { saveFocusSession, getFocusSessions } from '../services/api';

function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState(null);

  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const sessions = await getFocusSessions();
      const completedSessions = sessions.filter(session => session.status === 'completed');
      setSessionsCompleted(completedSessions.length);
      const totalTime = completedSessions.reduce((total, session) => total + session.duration, 0);
      setTotalFocusTime(totalTime);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error loading sessions',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        if (!isBreak) {
          setTotalFocusTime((time) => time + 1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const startNewSession = async () => {
    const session = {
      duration: workDuration * 60,
      isBreak: false,
      startTime: new Date().toISOString(),
      status: 'ongoing',
    };
    try {
      const savedSession = await saveFocusSession(session);
      setCurrentSession(savedSession);
    } catch (error) {
      toast({
        title: 'Error starting session',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const completeSession = async () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        endTime: new Date().toISOString(),
        status: 'completed',
      };
      try {
        await saveFocusSession(updatedSession);
        setCurrentSession(null);
        await loadSessions();
      } catch (error) {
        toast({
          title: 'Error completing session',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  const handleTimerComplete = async () => {
    setIsActive(false);
    if (!isBreak) {
      await completeSession();
      setSessionsCompleted((sessions) => sessions + 1);
      toast({
        title: 'Focus session completed!',
        description: 'Time for a break.',
        status: 'success',
        duration: 4000,
      });
      setIsBreak(true);
      setTimeLeft(breakDuration * 60);
    } else {
      toast({
        title: 'Break completed!',
        description: 'Ready for another focus session?',
        status: 'info',
        duration: 4000,
      });
      setIsBreak(false);
      setTimeLeft(workDuration * 60);
    }
  };

  const toggleTimer = async () => {
    if (!isActive && !currentSession) {
      await startNewSession();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
    setCurrentSession(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatHours = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const progress = (timeLeft / (isBreak ? breakDuration * 60 : workDuration * 60)) * 100;

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading focus timer...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="700px" mx="auto" mt={8} p={{ base: 2, md: 6 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>
            Focus Timer
          </Heading>
          <Text color="gray.500">Stay focused and productive with Pomodoro technique</Text>
        </Box>

        <Box p={8} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={6}>
            <Progress
              value={progress}
              size="lg"
              colorScheme={isBreak ? 'green' : 'blue'}
              borderRadius="full"
              w="100%"
            />

            <Text fontSize="6xl" fontWeight="bold">
              {formatTime(timeLeft)}
            </Text>

            <Text fontSize="xl" color="gray.500">
              {isBreak ? 'Break Time' : 'Focus Time'}
            </Text>

            <HStack spacing={4}>
              <IconButton
                icon={isActive ? <FaPause /> : <FaPlay />}
                onClick={toggleTimer}
                colorScheme={isActive ? 'red' : 'blue'}
                size="lg"
                isRound
              />
              <IconButton
                icon={<FaRedo />}
                onClick={resetTimer}
                size="lg"
                isRound
              />
            </HStack>

            <HStack spacing={4} pt={4} w="100%" justify="center">
              <Select
                value={workDuration}
                onChange={(e) => {
                  setWorkDuration(Number(e.target.value));
                  if (!isBreak) setTimeLeft(Number(e.target.value) * 60);
                }}
                w="150px"
              >
                <option value={25}>25 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
              </Select>
              <Select
                value={breakDuration}
                onChange={(e) => {
                  setBreakDuration(Number(e.target.value));
                  if (isBreak) setTimeLeft(Number(e.target.value) * 60);
                }}
                w="150px"
              >
                <option value={5}>5 min break</option>
                <option value={10}>10 min break</option>
                <option value={15}>15 min break</option>
              </Select>
            </HStack>
          </VStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel>Sessions Completed</StatLabel>
              <StatNumber>{sessionsCompleted}</StatNumber>
              <StatHelpText>
                <FaCheckCircle /> Today's Progress
              </StatHelpText>
            </Stat>
          </Box>

          <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel>Total Focus Time</StatLabel>
              <StatNumber>{formatHours(totalFocusTime)}</StatNumber>
              <StatHelpText>
                <FaClock /> Today's Total
              </StatHelpText>
            </Stat>
          </Box>

          <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel>Current Session</StatLabel>
              <StatNumber>{isBreak ? 'Break' : 'Focus'}</StatNumber>
              <StatHelpText>
                <FaHourglassHalf /> {formatTime(timeLeft)} Remaining
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default FocusTimer;