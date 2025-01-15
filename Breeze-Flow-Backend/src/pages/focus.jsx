import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Circle,
  Icon,
  HStack,
} from "@chakra-ui/react"
import { Play, Pause, RotateCcw } from "lucide-react"

export function Focus() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(25 * 60)
  }

  return (
    <Container maxW="container.xl" centerContent py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading size="lg">Focus Timer</Heading>
        <Text color="gray.600">Stay focused and productive</Text>
      </VStack>

      {/* Timer Display */}
      <VStack mt={12}>
        <Circle
          size="48"
          borderWidth="4px"
          borderColor="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="6xl" fontWeight="bold">
            {formatTime(time)}
          </Text>
        </Circle>

        {/* Timer Controls */}
        <HStack mt={8} spacing={4}>
          <Button
            size="lg"
            w={12}
            h={12}
            borderRadius="full"
            colorScheme="blue"
            onClick={toggleTimer}
            p={0}
          >
            <Icon as={isRunning ? Pause : Play} boxSize={6} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            w={12}
            h={12}
            borderRadius="full"
            onClick={resetTimer}
            p={0}
          >
            <Icon as={RotateCcw} boxSize={6} />
          </Button>
        </HStack>
      </VStack>

      {/* Session Info */}
      <Box mt={12} p={6} bg="white" borderRadius="lg" border="1px" borderColor="gray.200" w="full" maxW="md">
        <Heading size="md">Current Session</Heading>
        <VStack mt={4} align="stretch" spacing={2}>
          <Text color="gray.600" fontSize="sm">
            Focus Time: 00:00
          </Text>
          <Text color="gray.600" fontSize="sm">
            Sessions Completed: 0
          </Text>
        </VStack>
      </Box>

      {/* Quick Settings */}
      <HStack mt={8} spacing={4}>
        <Button variant="outline" onClick={() => setTime(25 * 60)}>
          25 min
        </Button>
        <Button variant="outline" onClick={() => setTime(15 * 60)}>
          15 min
        </Button>
        <Button variant="outline" onClick={() => setTime(5 * 60)}>
          5 min
        </Button>
      </HStack>
    </Container>
  )
} 