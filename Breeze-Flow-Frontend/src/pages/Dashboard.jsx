import { useState } from 'react';
import {
  Box,
  VStack,
  SimpleGrid,
  Text,
  Heading,
  useColorModeValue,
  Progress,
  HStack,
  Button,
  List,
  ListItem,
  IconButton,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
  FaClock,
  FaCalendar,
  FaChevronRight,
  FaPlay,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function Dashboard() {
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Sample data - replace with real data from your backend
  const stats = {
    focusTime: '4h 30m',
    tasksCompleted: 8,
    upcomingEvents: 3,
    focusProgress: 75,
    taskProgress: 60,
  };

  const recentTasks = [
    { id: 1, title: 'Complete project proposal', status: 'completed' },
    { id: 2, title: 'Review documentation', status: 'in-progress' },
    { id: 3, title: 'Team meeting preparation', status: 'pending' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Sync', time: '2:00 PM', date: 'Today' },
    { id: 2, title: 'Project Review', time: '10:00 AM', date: 'Tomorrow' },
    { id: 3, title: 'Client Meeting', time: '3:30 PM', date: 'Tomorrow' },
  ];

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="lg" mb={2}>
          Welcome Back!
        </Heading>
        <Text color="gray.500">Here's an overview of your productivity</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Focus Time Today</StatLabel>
            <StatNumber>{stats.focusTime}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              20% vs. yesterday
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Tasks Completed</StatLabel>
            <StatNumber>{stats.tasksCompleted}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              15% this week
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Upcoming Events</StatLabel>
            <StatNumber>{stats.upcomingEvents}</StatNumber>
            <StatHelpText>
              Next event in 2 hours
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={6} align="start">
        <Box flex={2} w="100%">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="md">Today's Progress</Heading>
                  <RouterLink to="/focus">
                    <Button
                      rightIcon={<FaPlay />}
                      colorScheme="blue"
                      size="sm"
                    >
                      Start Focus Session
                    </Button>
                  </RouterLink>
                </HStack>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text>Daily Focus Goal</Text>
                    <Text>{stats.focusProgress}%</Text>
                  </HStack>
                  <Progress
                    value={stats.focusProgress}
                    colorScheme="blue"
                    borderRadius="full"
                  />
                </Box>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text>Task Completion</Text>
                    <Text>{stats.taskProgress}%</Text>
                  </HStack>
                  <Progress
                    value={stats.taskProgress}
                    colorScheme="green"
                    borderRadius="full"
                  />
                </Box>
              </VStack>
            </Box>

            <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="md">Recent Tasks</Heading>
                  <RouterLink to="/tasks">
                    <Button
                      rightIcon={<FaChevronRight />}
                      variant="ghost"
                      size="sm"
                    >
                      View All
                    </Button>
                  </RouterLink>
                </HStack>

                <List spacing={3}>
                  {recentTasks.map((task) => (
                    <ListItem
                      key={task.id}
                      p={3}
                      bg={useColorModeValue('gray.50', 'gray.600')}
                      borderRadius="md"
                    >
                      <HStack justify="space-between">
                        <HStack>
                          <FaCheckCircle
                            color={
                              task.status === 'completed'
                                ? '#48BB78'
                                : task.status === 'in-progress'
                                ? '#3182CE'
                                : '#718096'
                            }
                          />
                          <Text>{task.title}</Text>
                        </HStack>
                        <Badge
                          colorScheme={
                            task.status === 'completed'
                              ? 'green'
                              : task.status === 'in-progress'
                              ? 'blue'
                              : 'gray'
                          }
                        >
                          {task.status}
                        </Badge>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </Box>

            <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="md">Upcoming Events</Heading>
                  <RouterLink to="/calendar">
                    <Button
                      rightIcon={<FaChevronRight />}
                      variant="ghost"
                      size="sm"
                    >
                      View Calendar
                    </Button>
                  </RouterLink>
                </HStack>

                <List spacing={3}>
                  {upcomingEvents.map((event) => (
                    <ListItem
                      key={event.id}
                      p={3}
                      bg={useColorModeValue('gray.50', 'gray.600')}
                      borderRadius="md"
                    >
                      <HStack justify="space-between">
                        <HStack spacing={4}>
                          <FaCalendar />
                          <Box>
                            <Text fontWeight="medium">{event.title}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {event.date} at {event.time}
                            </Text>
                          </Box>
                        </HStack>
                        <IconButton
                          icon={<FaClock />}
                          variant="ghost"
                          size="sm"
                          aria-label="Set reminder"
                        />
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </VStack>
  );
}

export default Dashboard;