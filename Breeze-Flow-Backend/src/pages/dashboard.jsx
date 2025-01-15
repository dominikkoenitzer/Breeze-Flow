import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react"

export function Dashboard() {
  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Welcome to Breeze Flow</Heading>
        <Button colorScheme="blue">Add New Task</Button>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
        {/* Quick Stats */}
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
          <Text color="gray.600" fontWeight="semibold">Tasks Today</Text>
          <Text mt={2} fontSize="3xl" fontWeight="bold">5</Text>
        </Box>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
          <Text color="gray.600" fontWeight="semibold">Focus Time</Text>
          <Text mt={2} fontSize="3xl" fontWeight="bold">2h 30m</Text>
        </Box>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
          <Text color="gray.600" fontWeight="semibold">Mood Today</Text>
          <Text mt={2} fontSize="3xl" fontWeight="bold">😊</Text>
        </Box>
      </SimpleGrid>
      
      {/* Recent Tasks */}
      <Box mt={8}>
        <Heading size="md">Recent Tasks</Heading>
        <VStack spacing={4} mt={4} align="stretch">
          {/* Placeholder tasks */}
          <Box p={4} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium">Complete Project Proposal</Text>
                <Text fontSize="sm" color="gray.600">Due today at 5:00 PM</Text>
              </Box>
              <Button variant="outline" size="sm">Mark Complete</Button>
            </Flex>
          </Box>
          
          <Box p={4} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium">Team Meeting</Text>
                <Text fontSize="sm" color="gray.600">Tomorrow at 10:00 AM</Text>
              </Box>
              <Button variant="outline" size="sm">Mark Complete</Button>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
} 