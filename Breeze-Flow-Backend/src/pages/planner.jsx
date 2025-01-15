import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  IconButton,
} from "@chakra-ui/react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

const events = [
  {
    id: 1,
    title: "Team Meeting",
    start: "10:00",
    end: "11:00",
    type: "work",
  },
  {
    id: 2,
    title: "Lunch Break",
    start: "12:00",
    end: "13:00",
    type: "break",
  },
  {
    id: 3,
    title: "Project Review",
    start: "14:00",
    end: "15:30",
    type: "work",
  },
]

export function Planner() {
  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="lg">Daily Planner</Heading>
          <Text color="gray.600">Plan your day effectively</Text>
        </Box>
        <Button leftIcon={<Icon as={Plus} />} colorScheme="blue">
          Add Event
        </Button>
      </Flex>

      {/* Date Navigation */}
      <Flex mt={6} align="center" justify="space-between">
        <HStack spacing={4}>
          <IconButton
            variant="outline"
            icon={<Icon as={ChevronLeft} boxSize={4} />}
            aria-label="Previous day"
          />
          <Heading size="md">January 8, 2024</Heading>
          <IconButton
            variant="outline"
            icon={<Icon as={ChevronRight} boxSize={4} />}
            aria-label="Next day"
          />
        </HStack>
      </Flex>

      {/* Timeline */}
      <Flex mt={8}>
        {/* Time slots */}
        <Box w="20" flexShrink={0}>
          {timeSlots.map((time) => (
            <Box key={time} h="20" position="relative">
              <Text
                position="absolute"
                top="-3"
                fontSize="sm"
                color="gray.600"
              >
                {time}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Events grid */}
        <Box flex="1" borderLeft="1px" borderColor="gray.200">
          {timeSlots.map((time) => (
            <Box
              key={time}
              h="20"
              borderBottom="1px"
              borderStyle="dashed"
              borderColor="gray.200"
              position="relative"
            >
              {events.map((event) => {
                if (event.start === time) {
                  return (
                    <Box
                      key={event.id}
                      position="absolute"
                      left={2}
                      right={2}
                      p={2}
                      bg="white"
                      borderRadius="lg"
                      border="1px"
                      borderColor="gray.200"
                      boxShadow="sm"
                      height={`${
                        (parseInt(event.end) - parseInt(event.start)) * 80
                      }px`}
                    >
                      <Text fontWeight="medium">{event.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {event.start} - {event.end}
                      </Text>
                    </Box>
                  )
                }
                return null
              })}
            </Box>
          ))}
        </Box>
      </Flex>
    </Container>
  )
} 