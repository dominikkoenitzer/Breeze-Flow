import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  useToast,
  useColorModeValue,
  SimpleGrid,
  Progress,
  Heading,
  Textarea,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
} from '@chakra-ui/react';
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaTint,
  FaWalking,
  FaBed,
  FaPlus,
  FaChartLine,
} from 'react-icons/fa';
import { api } from '../../services/api';

const WellnessTracker = () => {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(5);
  const [journal, setJournal] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(7);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('lightMode.card', 'darkMode.card');
  const borderColor = useColorModeValue('lightMode.border', 'darkMode.border');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.getWellnessStats();
      setStats(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error fetching wellness stats',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleCheckin = async () => {
    try {
      const checkin = {
        mood,
        energy,
        journal,
        waterIntake,
        sleepHours,
        date: new Date().toISOString(),
      };

      await api.createWellnessCheckin(checkin);
      toast({
        title: 'Wellness check-in recorded',
        status: 'success',
        duration: 2000,
      });
      onClose();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error saving check-in',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const getMoodIcon = (value) => {
    if (value <= 2) return FaFrown;
    if (value <= 3) return FaMeh;
    return FaSmile;
  };

  const getMoodColor = (value) => {
    if (value <= 2) return 'red';
    if (value <= 3) return 'yellow';
    return 'green';
  };

  return (
    <VStack spacing={6} width="100%" align="stretch">
      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Average Mood</StatLabel>
            <StatNumber>
              {stats?.averageMood?.toFixed(1) || '-'}
              <Box as={getMoodIcon(stats?.averageMood || 3)} display="inline" ml={2} />
            </StatNumber>
            <Progress
              value={((stats?.averageMood || 0) / 5) * 100}
              size="sm"
              colorScheme={getMoodColor(stats?.averageMood || 3)}
              mt={2}
            />
          </Stat>
        </Box>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Water Intake</StatLabel>
            <StatNumber>{stats?.averageWaterIntake?.toFixed(1) || '-'} glasses</StatNumber>
            <StatHelpText>Daily average</StatHelpText>
          </Stat>
        </Box>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Sleep</StatLabel>
            <StatNumber>{stats?.averageSleep?.toFixed(1) || '-'} hours</StatNumber>
            <StatHelpText>Daily average</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Quick Actions */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <Button
          leftIcon={<FaTint />}
          onClick={() => setWaterIntake(prev => prev + 1)}
          size="lg"
          variant="outline"
        >
          Log Water
        </Button>
        <Button
          leftIcon={<FaWalking />}
          onClick={() => {
            toast({
              title: 'Time for a break!',
              description: 'Stand up and stretch for a minute.',
              status: 'info',
              duration: null,
              isClosable: true,
            });
          }}
          size="lg"
          variant="outline"
        >
          Take a Break
        </Button>
        <Button
          leftIcon={<FaBed />}
          onClick={onOpen}
          size="lg"
          variant="outline"
        >
          Sleep Log
        </Button>
        <Button
          leftIcon={<FaPlus />}
          onClick={onOpen}
          size="lg"
          colorScheme="brand"
        >
          Check In
        </Button>
      </SimpleGrid>

      {/* Check-in Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wellness Check-in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box width="100%">
                <Text mb={2}>How are you feeling?</Text>
                <Slider
                  value={mood}
                  min={1}
                  max={5}
                  step={1}
                  onChange={setMood}
                  mb={8}
                >
                  <SliderMark value={1} mt={4}>
                    <FaFrown />
                  </SliderMark>
                  <SliderMark value={3} mt={4}>
                    <FaMeh />
                  </SliderMark>
                  <SliderMark value={5} mt={4}>
                    <FaSmile />
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </Box>

              <Box width="100%">
                <Text mb={2}>Energy Level</Text>
                <Slider
                  value={energy}
                  min={1}
                  max={10}
                  onChange={setEnergy}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </Box>

              <Box width="100%">
                <Text mb={2}>Water Intake (glasses)</Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaTint />}
                    onClick={() => setWaterIntake(prev => Math.max(0, prev - 1))}
                  />
                  <Text fontSize="xl" fontWeight="bold">{waterIntake}</Text>
                  <IconButton
                    icon={<FaTint />}
                    onClick={() => setWaterIntake(prev => prev + 1)}
                  />
                </HStack>
              </Box>

              <Box width="100%">
                <Text mb={2}>Sleep Hours</Text>
                <Select
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                >
                  {Array.from({ length: 13 }, (_, i) => i + 4).map(hours => (
                    <option key={hours} value={hours}>{hours} hours</option>
                  ))}
                </Select>
              </Box>

              <Box width="100%">
                <Text mb={2}>Journal Entry</Text>
                <Textarea
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="How was your day? Any thoughts you'd like to share?"
                  rows={4}
                />
              </Box>

              <Button
                colorScheme="brand"
                width="100%"
                onClick={handleCheckin}
              >
                Save Check-in
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default WellnessTracker; 