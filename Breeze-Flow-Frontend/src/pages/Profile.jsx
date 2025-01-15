import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  useColorModeValue,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Progress,
  Divider,
  Badge,
  Container,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Card,
  CardBody,
  Stack,
  AvatarBadge,
  Icon,
} from '@chakra-ui/react';
import {
  FaClock,
  FaCheckCircle,
  FaCalendar,
  FaEdit,
  FaCog,
  FaMedal,
  FaTrophy,
  FaStar,
  FaChartLine,
  FaCamera,
} from 'react-icons/fa';

function Profile() {
  const [stats, setStats] = useState({
    totalFocusTime: '24h 30m',
    completedTasks: 48,
    upcomingEvents: 12,
    productivity: 85,
    tasksThisWeek: 15,
    focusSessionsToday: 4,
    streak: 7,
  });

  const [achievements, setAchievements] = useState([
    { icon: FaMedal, label: 'Focus Master', description: 'Completed 100 focus sessions', color: 'yellow' },
    { icon: FaTrophy, label: 'Task Champion', description: 'Finished 500 tasks', color: 'purple' },
    { icon: FaStar, label: 'Perfect Week', description: '7-day productivity streak', color: 'blue' },
  ]);

  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Card bg={bg} borderRadius="xl" overflow="hidden">
          <CardBody>
            <HStack spacing={8} align="start">
              <Box position="relative">
                <Avatar 
                  size="2xl" 
                  name="User Name" 
                  src="https://bit.ly/broken-link"
                >
                  <AvatarBadge
                    boxSize="1.25em"
                    bg="green.500"
                    borderColor={bg}
                  />
                </Avatar>
                <IconButton
                  icon={<FaCamera />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  position="absolute"
                  bottom="0"
                  right="0"
                  aria-label="Change photo"
                />
              </Box>
              <Stack spacing={4} flex={1}>
                <HStack justify="space-between" align="start">
                  <Box>
                    <Heading size="lg">User Name</Heading>
                    <Text color="gray.500">user@example.com</Text>
                  </Box>
                  <HStack>
                    <Tooltip label="Edit Profile">
                      <IconButton
                        icon={<FaEdit />}
                        variant="ghost"
                        aria-label="Edit profile"
                      />
                    </Tooltip>
                    <Tooltip label="Settings">
                      <IconButton
                        icon={<FaCog />}
                        variant="ghost"
                        aria-label="Settings"
                      />
                    </Tooltip>
                  </HStack>
                </HStack>
                <HStack wrap="wrap" spacing={2}>
                  <Badge colorScheme="green" fontSize="sm" px={3} py={1}>Pro User</Badge>
                  <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>Focus Master</Badge>
                  <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>Task Champion</Badge>
                  <Badge colorScheme="yellow" fontSize="sm" px={3} py={1}>{stats.streak} Day Streak</Badge>
                </HStack>
              </Stack>
            </HStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card bg={bg}>
            <CardBody>
              <Stat>
                <StatLabel fontSize="lg">Total Focus Time</StatLabel>
                <StatNumber fontSize="3xl">{stats.totalFocusTime}</StatNumber>
                <StatHelpText>
                  <HStack>
                    <FaClock />
                    <Text>Last 30 days</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={bg}>
            <CardBody>
              <Stat>
                <StatLabel fontSize="lg">Tasks Completed</StatLabel>
                <StatNumber fontSize="3xl">{stats.completedTasks}</StatNumber>
                <StatHelpText>
                  <HStack>
                    <FaCheckCircle />
                    <Text>This month</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={bg}>
            <CardBody>
              <Stat>
                <StatLabel fontSize="lg">Upcoming Events</StatLabel>
                <StatNumber fontSize="3xl">{stats.upcomingEvents}</StatNumber>
                <StatHelpText>
                  <HStack>
                    <FaCalendar />
                    <Text>Next 7 days</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card bg={bg}>
            <CardBody>
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="md">Productivity Score</Heading>
                  <Tooltip label="View detailed analytics">
                    <IconButton
                      icon={<FaChartLine />}
                      variant="ghost"
                      aria-label="View analytics"
                    />
                  </Tooltip>
                </HStack>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">Current Score</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      {stats.productivity}%
                    </Text>
                  </HStack>
                  <Progress
                    value={stats.productivity}
                    colorScheme="green"
                    borderRadius="full"
                    size="lg"
                  />
                  <Text mt={2} fontSize="sm" color="gray.500">
                    Your productivity is 15% higher than last month
                  </Text>
                </Box>
                <SimpleGrid columns={2} spacing={4}>
                  <Box p={4} bg={cardBg} borderRadius="md">
                    <Text fontSize="sm" color="gray.500">Tasks This Week</Text>
                    <Text fontSize="2xl" fontWeight="bold">{stats.tasksThisWeek}</Text>
                  </Box>
                  <Box p={4} bg={cardBg} borderRadius="md">
                    <Text fontSize="sm" color="gray.500">Focus Sessions Today</Text>
                    <Text fontSize="2xl" fontWeight="bold">{stats.focusSessionsToday}</Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={bg}>
            <CardBody>
              <VStack align="stretch" spacing={6}>
                <Heading size="md">Recent Achievements</Heading>
                <VStack align="stretch" spacing={4}>
                  {achievements.map((achievement, index) => (
                    <HStack
                      key={index}
                      p={4}
                      bg={cardBg}
                      borderRadius="md"
                      spacing={4}
                    >
                      <Icon
                        as={achievement.icon}
                        boxSize={6}
                        color={`${achievement.color}.500`}
                      />
                      <Box flex={1}>
                        <Text fontWeight="bold">{achievement.label}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {achievement.description}
                        </Text>
                      </Box>
                      <Badge colorScheme={achievement.color}>New</Badge>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card bg={bg}>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Weekly Goals</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm">Focus Time</Text>
                    <Text fontSize="sm" fontWeight="bold">15/20 hrs</Text>
                  </HStack>
                  <Progress value={75} size="sm" colorScheme="blue" borderRadius="full" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm">Task Completion</Text>
                    <Text fontSize="sm" fontWeight="bold">45/50 tasks</Text>
                  </HStack>
                  <Progress value={90} size="sm" colorScheme="green" borderRadius="full" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm">Event Attendance</Text>
                    <Text fontSize="sm" fontWeight="bold">6/10 events</Text>
                  </HStack>
                  <Progress value={60} size="sm" colorScheme="purple" borderRadius="full" />
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}

export default Profile; 