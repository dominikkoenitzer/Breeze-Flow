import {
  Box,
  VStack,
  Text,
  Heading,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Button,
  SimpleGrid,
  Icon,
  HStack,
  Container,
  Badge,
  Tooltip,
  Card,
  CardBody,
  Stack,
} from '@chakra-ui/react';
import {
  FaQuestionCircle,
  FaBook,
  FaLightbulb,
  FaVideo,
  FaCheckCircle,
  FaExclamationCircle,
  FaCog,
  FaClock,
  FaCalendarAlt,
  FaTasks,
  FaRocket,
  FaStar,
} from 'react-icons/fa';

function Help() {
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.800');

  const features = [
    {
      icon: FaClock,
      title: "Focus Timer",
      description: "Stay productive with customizable Pomodoro sessions",
      badge: "Popular"
    },
    {
      icon: FaTasks,
      title: "Task Management",
      description: "Organize and prioritize your tasks effectively",
      badge: "Essential"
    },
    {
      icon: FaCalendarAlt,
      title: "Calendar",
      description: "Schedule and manage your events seamlessly",
      badge: "New"
    },
    {
      icon: FaCog,
      title: "Settings",
      description: "Customize the app to match your preferences",
      badge: "Updated"
    }
  ];

  const faqs = [
    {
      question: "How do I start a focus session?",
      answer: "Navigate to the Focus Timer page, select your desired session duration, and click the play button to begin. You can pause or reset the timer at any time. The timer will notify you when your session is complete."
    },
    {
      question: "How do I create a new task?",
      answer: "Go to the Tasks page, enter your task in the input field at the top, and press Enter or click the add button. You can set priority levels, due dates, and add detailed notes to your tasks. Tasks can be organized into categories and marked as complete when finished."
    },
    {
      question: "How do I add events to the calendar?",
      answer: "In the Calendar page, click on any date to open the event creation modal. Enter the event details including title, time, and any additional notes. You can also set reminders and recurring events. Click Save to add it to your calendar."
    },
    {
      question: "Can I customize the notification settings?",
      answer: "Yes! Go to Settings and under the Notifications section, you can enable/disable notifications and sound effects for various events. You can customize notifications for focus sessions, task deadlines, and calendar events."
    },
    {
      question: "How do I track my productivity?",
      answer: "Visit your Profile page to view detailed statistics about your focus sessions, completed tasks, and overall productivity score. You can view daily, weekly, and monthly trends, and set personal goals to improve your productivity."
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" py={10}>
          <Heading size="xl" mb={4}>Help Center</Heading>
          <Text color="gray.500" fontSize="lg">
            Find answers and learn how to make the most of Breeze Flow
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {features.map((feature, index) => (
            <Card
              key={index}
              bg={cardBg}
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
              transition="all 0.3s"
            >
              <CardBody>
                <Stack spacing={4}>
                  <HStack justify="space-between">
                    <Icon as={feature.icon} boxSize={6} color="blue.500" />
                    <Badge colorScheme="blue" variant="subtle">
                      {feature.badge}
                    </Badge>
                  </HStack>
                  <Heading size="md">{feature.title}</Heading>
                  <Text color="gray.500">{feature.description}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Box bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor} overflow="hidden">
          <Box p={6} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Heading size="lg" mb={2}>Frequently Asked Questions</Heading>
            <Text color="gray.500">Find quick answers to common questions</Text>
          </Box>
          <Accordion allowMultiple>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} border="0">
                <AccordionButton py={4} px={6} _hover={{ bg: hoverBg }}>
                  <HStack flex="1" textAlign="left" spacing={4}>
                    <Icon as={FaQuestionCircle} color="blue.500" />
                    <Text fontWeight="semibold">{faq.question}</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} px={6} bg={cardBg}>
                  <Text color="gray.600">{faq.answer}</Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box p={6} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <VStack align="start" spacing={4}>
              <HStack>
                <Icon as={FaRocket} color="purple.500" boxSize={6} />
                <Heading size="md">Quick Start Guide</Heading>
              </HStack>
              <List spacing={4}>
                {[
                  "Set up your profile and customize preferences",
                  "Create your first task with priority levels",
                  "Start a focus session for distraction-free work",
                  "Schedule important events in the Calendar",
                  "Track your progress in the Profile dashboard"
                ].map((step, index) => (
                  <ListItem key={index}>
                    <HStack spacing={3}>
                      <Badge colorScheme="purple" fontSize="sm">
                        {index + 1}
                      </Badge>
                      <Text>{step}</Text>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>

          <Box p={6} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={6} align="stretch">
              <HStack>
                <Icon as={FaStar} color="yellow.500" boxSize={6} />
                <Heading size="md">Need More Help?</Heading>
              </HStack>
              <Text color="gray.500">
                Can't find what you're looking for? Our support team is here to help you get the most out of Breeze Flow.
              </Text>
              <SimpleGrid columns={2} spacing={4}>
                <Tooltip label="View detailed documentation">
                  <Button
                    leftIcon={<FaBook />}
                    colorScheme="blue"
                    variant="outline"
                    size="lg"
                    w="100%"
                  >
                    Documentation
                  </Button>
                </Tooltip>
                <Tooltip label="Get in touch with our support team">
                  <Button
                    leftIcon={<FaExclamationCircle />}
                    colorScheme="blue"
                    size="lg"
                    w="100%"
                  >
                    Contact Support
                  </Button>
                </Tooltip>
              </SimpleGrid>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default Help; 