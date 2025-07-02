import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Badge,
  Spinner,
  useToast,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../services/api';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });
  const toast = useToast();

  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const todayBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBg = useColorModeValue('gray.100', 'gray.600');

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const data = await getEvents();
      setEvents(data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error fetching events',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.time && selectedDate) {
      try {
        const eventDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDate
        );
        const eventToCreate = {
          ...newEvent,
          date: eventDate.toISOString(),
          status: 'upcoming',
        };
        const createdEvent = await createEvent(eventToCreate);
        setEvents([...events, createdEvent]);
        setNewEvent({ title: '', time: '' });
        onClose();
        toast({
          title: 'Event added',
          status: 'success',
          duration: 2000,
        });
      } catch (error) {
        toast({
          title: 'Error adding event',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
      toast({
        title: 'Event deleted',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error deleting event',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      const dayEvents = getEventsForDate(day);

      days.push(
        <GridItem
          key={day}
          p={2}
          bg={isToday ? todayBg : bg}
          borderWidth="1px"
          borderColor={borderColor}
          cursor="pointer"
          onClick={() => handleDateClick(day)}
          _hover={{ bg: selectedBg }}
        >
          <Text fontWeight={isToday ? 'bold' : 'normal'}>{day}</Text>
          {dayEvents.map((event) => (
            <Badge
              key={event.id}
              colorScheme="blue"
              mt={1}
              display="block"
              fontSize="xs"
              isTruncated
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEvent(event.id);
              }}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              {event.time} {event.title}
            </Badge>
          ))}
        </GridItem>
      );
    }

    return days;
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading calendar...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="900px" mx="auto" mt={8} p={{ base: 2, md: 6 }}>
      <Card boxShadow="xl" borderRadius="2xl" p={6}>
        <CardHeader>
          <HStack justify="space-between" mb={4}>
            <IconButton
              icon={<FaChevronLeft />}
              aria-label="Previous Month"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              variant="ghost"
              size="lg"
            />
            <Heading size="lg" textAlign="center">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Heading>
            <IconButton
              icon={<FaChevronRight />}
              aria-label="Next Month"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              variant="ghost"
              size="lg"
            />
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen} size="md">
              Add Event
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={6}>
            <Grid templateColumns="repeat(7, 1fr)" gap={1} w="100%">
              {dayNames.map((day) => (
                <GridItem key={day} textAlign="center" fontWeight="bold">
                  <Text>{day}</Text>
                </GridItem>
              ))}
              {renderCalendarDays()}
            </Grid>
          </VStack>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">Click a day to view or add events.</Text>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add Event for {monthNames[currentDate.getMonth()]} {selectedDate}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Title</FormLabel>
              <Input
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Enter event title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </FormControl>

            <Button
              colorScheme="blue"
              mr={3}
              mt={6}
              onClick={handleAddEvent}
              leftIcon={<FaPlus />}
            >
              Add Event
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Calendar;