import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const todayBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBg = useColorModeValue('green.50', 'green.900');

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

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => getDateKey(new Date(event.date)) === getDateKey(date));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() && selectedDate) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: newEvent.title,
          description: newEvent.description,
          date: selectedDate,
        },
      ]);
      setNewEvent({ title: '', description: '' });
      onClose();
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = getDateKey(date) === getDateKey(today);
      const isSelected = selectedDate && getDateKey(date) === getDateKey(selectedDate);
      const dayEvents = getEventsForDate(date);

      days.push(
        <GridItem
          key={day}
          p={2}
          bg={isToday ? todayBg : isSelected ? selectedBg : bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          cursor="pointer"
          onClick={() => handleDateClick(date)}
          _hover={{ bg: 'gray.100' }}
          position="relative"
          minH="100px"
        >
          <Text fontWeight={isToday ? 'bold' : 'normal'}>{day}</Text>
          <VStack align="stretch" spacing={1} mt={2}>
            {dayEvents.map(event => (
              <Box
                key={event.id}
                p={1}
                bg="blue.100"
                borderRadius="md"
                fontSize="sm"
              >
                <HStack justify="space-between">
                  <Text noOfLines={1}>{event.title}</Text>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="ghost"
                      size="xs"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FaTrash />}
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem icon={<FaEdit />}>Edit</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Box>
            ))}
          </VStack>
        </GridItem>
      );
    }

    return days;
  };

  return (
    <VStack spacing={6} w="100%" p={4}>
      <HStack w="100%" justify="space-between" p={4}>
        <IconButton
          icon={<FaChevronLeft />}
          onClick={handlePrevMonth}
          variant="ghost"
        />
        <Text fontSize="xl" fontWeight="bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <IconButton
          icon={<FaChevronRight />}
          onClick={handleNextMonth}
          variant="ghost"
        />
      </HStack>

      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={1}
        w="100%"
        bg={bgColor}
        p={4}
        borderRadius="lg"
        shadow="md"
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <GridItem key={day} textAlign="center" fontWeight="bold" p={2}>
            {day}
          </GridItem>
        ))}
        {renderCalendarDays()}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add Event - {selectedDate?.toLocaleDateString()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
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

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Enter event description"
                />
              </FormControl>

              <Button colorScheme="blue" onClick={handleAddEvent} w="100%">
                Add Event
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Calendar; 