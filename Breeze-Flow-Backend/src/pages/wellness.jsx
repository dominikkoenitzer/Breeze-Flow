import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react"
import { Heart, Droplets, Brain, Sun } from "lucide-react"

export function Wellness() {
  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="lg">Wellness Tracker</Heading>
          <Text color="gray.600">Track your daily well-being</Text>
        </Box>
      </Flex>

      {/* Mood Tracker */}
      <Box mt={8}>
        <Heading size="md">Today's Mood</Heading>
        <HStack mt={4} spacing={4}>
          <Button
            variant="outline"
            h={16}
            w={16}
            borderRadius="full"
            p={0}
            fontSize="2xl"
            _hover={{ bg: 'green.100', color: 'green.600' }}
          >
            😊
          </Button>
          <Button
            variant="outline"
            h={16}
            w={16}
            borderRadius="full"
            p={0}
            fontSize="2xl"
            _hover={{ bg: 'blue.100', color: 'blue.600' }}
          >
            😐
          </Button>
          <Button
            variant="outline"
            h={16}
            w={16}
            borderRadius="full"
            p={0}
            fontSize="2xl"
            _hover={{ bg: 'red.100', color: 'red.600' }}
          >
            😔
          </Button>
        </HStack>
      </Box>

      {/* Wellness Habits */}
      <Box mt={12}>
        <Heading size="md">Daily Habits</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mt={4}>
          {/* Water Intake */}
          <Box p={6} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <HStack spacing={2}>
              <Icon as={Droplets} boxSize={5} color="blue.500" />
              <Text fontWeight="medium">Water Intake</Text>
            </HStack>
            <Text mt={2} fontSize="2xl" fontWeight="bold">4/8 glasses</Text>
            <HStack mt={4} spacing={2}>
              <Button size="sm" variant="outline">-</Button>
              <Button size="sm" variant="outline">+</Button>
            </HStack>
          </Box>

          {/* Exercise */}
          <Box p={6} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <HStack spacing={2}>
              <Icon as={Heart} boxSize={5} color="red.500" />
              <Text fontWeight="medium">Exercise</Text>
            </HStack>
            <Text mt={2} fontSize="2xl" fontWeight="bold">30 mins</Text>
            <Button size="sm" variant="outline" mt={4}>
              Log Exercise
            </Button>
          </Box>

          {/* Mindfulness */}
          <Box p={6} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <HStack spacing={2}>
              <Icon as={Brain} boxSize={5} color="purple.500" />
              <Text fontWeight="medium">Mindfulness</Text>
            </HStack>
            <Text mt={2} fontSize="2xl" fontWeight="bold">10 mins</Text>
            <Button size="sm" variant="outline" mt={4}>
              Start Session
            </Button>
          </Box>

          {/* Sleep */}
          <Box p={6} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <HStack spacing={2}>
              <Icon as={Sun} boxSize={5} color="yellow.500" />
              <Text fontWeight="medium">Sleep</Text>
            </HStack>
            <Text mt={2} fontSize="2xl" fontWeight="bold">7.5 hrs</Text>
            <Button size="sm" variant="outline" mt={4}>
              Log Sleep
            </Button>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Journal Entry */}
      <Box mt={12}>
        <Heading size="md">Daily Journal</Heading>
        <Box mt={4}>
          <Textarea
            placeholder="How are you feeling today?"
            rows={4}
            bg="white"
            borderRadius="lg"
          />
          <Button mt={4} colorScheme="blue">Save Entry</Button>
        </Box>
      </Box>
    </Container>
  )
} 