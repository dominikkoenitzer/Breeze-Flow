import { useState } from 'react';
import {
  Box,
  VStack,
  SimpleGrid,
  Text,
  Heading,
  useColorModeValue,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function Analytics() {
  const [timeRange, setTimeRange] = useState('week');
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

  // Sample data - replace with real data from your backend
  const focusData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 5.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 6 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 3.5 },
  ];

  const taskData = [
    { name: 'Completed', value: 65 },
    { name: 'In Progress', value: 25 },
    { name: 'Not Started', value: 10 },
  ];

  const productivityByTime = [
    { time: '6am', score: 65 },
    { time: '9am', score: 85 },
    { time: '12pm', score: 75 },
    { time: '3pm', score: 70 },
    { time: '6pm', score: 60 },
    { time: '9pm', score: 50 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="lg" mb={2}>
          Analytics
        </Heading>
        <Text color="gray.500">Track your productivity and progress</Text>
      </Box>

      <HStack>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          w="200px"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Focus Time</StatLabel>
            <StatNumber>28.5h</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23% vs last week
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Tasks Completed</StatLabel>
            <StatNumber>42</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              15% vs last week
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Stat>
            <StatLabel>Productivity Score</StatLabel>
            <StatNumber>85%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8% vs last week
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box
          p={6}
          bg={bg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          height="400px"
        >
          <Heading size="md" mb={4}>
            Focus Time by Day
          </Heading>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box
          p={6}
          bg={bg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          height="400px"
        >
          <Heading size="md" mb={4}>
            Productivity by Time of Day
          </Heading>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productivityByTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3182CE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box
          p={6}
          bg={bg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          height="400px"
        >
          <Heading size="md" mb={4}>
            Task Distribution
          </Heading>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box
          p={6}
          bg={bg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          height="400px"
        >
          <Heading size="md" mb={4}>
            Weekly Progress
          </Heading>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#3182CE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

export default Analytics; 