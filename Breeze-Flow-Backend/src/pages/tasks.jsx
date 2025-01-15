import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Checkbox,
  Icon,
} from "@chakra-ui/react"
import { CheckSquare, Plus, Calendar, Clock } from "lucide-react"

export function Tasks() {
  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="lg">Tasks</Heading>
          <Text color="gray.600">Manage your tasks and stay organized</Text>
        </Box>
        <Button leftIcon={<Icon as={Plus} />} colorScheme="blue">
          New Task
        </Button>
      </Flex>

      {/* Task Filters */}
      <HStack spacing={4} mt={6}>
        <Button leftIcon={<Icon as={CheckSquare} />} variant="outline">
          All Tasks
        </Button>
        <Button leftIcon={<Icon as={Calendar} />} variant="outline">
          Today
        </Button>
        <Button leftIcon={<Icon as={Clock} />} variant="outline">
          Upcoming
        </Button>
      </HStack>

      {/* Task List */}
      <VStack spacing={4} mt={8} align="stretch">
        {/* Task Item */}
        <Box p={4} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
          <Flex gap={4}>
            <Checkbox size="lg" colorScheme="blue" />
            <Box flex="1">
              <Text fontWeight="medium">Complete Project Documentation</Text>
              <Text fontSize="sm" color="gray.600">
                Write and format the technical documentation for the new feature
              </Text>
              <HStack mt={2} spacing={4}>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={Calendar} boxSize={4} />
                  <Text>Due Jan 15, 2024</Text>
                </HStack>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={Clock} boxSize={4} />
                  <Text>2 hours</Text>
                </HStack>
              </HStack>
            </Box>
            <Button variant="ghost" size="sm">Edit</Button>
          </Flex>
        </Box>

        {/* Another Task Item */}
        <Box p={4} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
          <Flex gap={4}>
            <Checkbox size="lg" colorScheme="blue" />
            <Box flex="1">
              <Text fontWeight="medium">Review Pull Requests</Text>
              <Text fontSize="sm" color="gray.600">
                Review and provide feedback on team's code submissions
              </Text>
              <HStack mt={2} spacing={4}>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={Calendar} boxSize={4} />
                  <Text>Due Jan 12, 2024</Text>
                </HStack>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={Clock} boxSize={4} />
                  <Text>1 hour</Text>
                </HStack>
              </HStack>
            </Box>
            <Button variant="ghost" size="sm">Edit</Button>
          </Flex>
        </Box>
      </VStack>
    </Container>
  )
} 