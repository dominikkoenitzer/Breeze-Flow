import React, { useState, useEffect, useCallback } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Progress,
  useToast,
  IconButton,
  Heading,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { FaPlay, FaPause, FaStop, FaCog } from 'react-icons/fa';

const DEFAULT_WORK_TIME = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const DEFAULT_LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [longBreakTime, setLongBreakTime] = useState(DEFAULT_LONG_BREAK_TIME);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = useCallback(() => {
    const isWorkComplete = !isBreak;
    if (isWorkComplete) {
      setPomodorosCompleted(prev => prev + 1);
      setIsBreak(true);
      setTimeLeft(pomodorosCompleted % 4 === 3 ? longBreakTime : breakTime);
      toast({
        title: 'Work session complete!',
        description: 'Time for a break.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else {
      setIsBreak(false);
      setTimeLeft(workTime);
      toast({
        title: 'Break complete!',
        description: 'Ready to focus again?',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [isBreak, pomodorosCompleted, breakTime, longBreakTime, workTime, toast]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakTime : workTime);
  };

  const progress = ((isBreak ? breakTime : workTime) - timeLeft) / (isBreak ? breakTime : workTime) * 100;

  return (
    <VStack spacing={6} w="100%" maxW="600px" mx="auto" p={6}>
      <Box
        w="100%"
        p={6}
        borderRadius="lg"
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        shadow="md"
      >
        <VStack spacing={4}>
          <Heading size="lg">{isBreak ? 'Break Time' : 'Focus Time'}</Heading>
          <Text fontSize="6xl" fontWeight="bold" fontFamily="mono">
            {formatTime(timeLeft)}
          </Text>
          <Progress
            value={progress}
            w="100%"
            size="lg"
            colorScheme={isBreak ? 'green' : 'blue'}
            borderRadius="full"
          />
          <HStack spacing={4}>
            <IconButton
              icon={isRunning ? <FaPause /> : <FaPlay />}
              onClick={toggleTimer}
              colorScheme={isRunning ? 'orange' : 'blue'}
              size="lg"
              isRound
            />
            <IconButton
              icon={<FaStop />}
              onClick={resetTimer}
              colorScheme="red"
              size="lg"
              isRound
            />
            <IconButton
              icon={<FaCog />}
              onClick={onOpen}
              variant="ghost"
              size="lg"
              isRound
            />
          </HStack>
        </VStack>
      </Box>

      <StatGroup
        w="100%"
        p={4}
        borderRadius="lg"
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        shadow="md"
      >
        <Stat>
          <StatLabel>Pomodoros</StatLabel>
          <StatNumber>{pomodorosCompleted}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Focus Time</StatLabel>
          <StatNumber>{Math.floor(pomodorosCompleted * workTime / 60)} min</StatNumber>
        </Stat>
      </StatGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Timer Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Work Duration (minutes)</FormLabel>
                <NumberInput
                  min={1}
                  max={60}
                  value={workTime / 60}
                  onChange={(value) => setWorkTime(value * 60)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Break Duration (minutes)</FormLabel>
                <NumberInput
                  min={1}
                  max={30}
                  value={breakTime / 60}
                  onChange={(value) => setBreakTime(value * 60)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Long Break Duration (minutes)</FormLabel>
                <NumberInput
                  min={1}
                  max={45}
                  value={longBreakTime / 60}
                  onChange={(value) => setLongBreakTime(value * 60)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PomodoroTimer; 