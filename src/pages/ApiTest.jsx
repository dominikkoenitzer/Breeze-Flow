import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  Badge,
  Spinner,
  useToast,
  HStack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { getTasks, createTask } from '../services/api';

const ApiTestPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [apiStatus, setApiStatus] = useState('Testing...');
  const toast = useToast();

  const testApi = async () => {
    setLoading(true);
    setApiStatus('Testing API connection...');
    
    try {
      // Test fetching tasks
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setApiStatus('✅ API Working - Using Mock Data');
      
      toast({
        title: 'API Test Successful',
        description: `Loaded ${fetchedTasks.length} tasks`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      setApiStatus('❌ API Error');
      toast({
        title: 'API Test Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    setLoading(true);
    try {
      const newTask = await createTask({
        title: newTaskTitle,
        description: 'Test task created from API test page',
        priority: 'MEDIUM',
      });
      
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
      
      toast({
        title: 'Task Created',
        description: 'New task added successfully',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Create Task Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="xl" mb={2}>
            API Connection Test
          </Heading>
          <Text color="gray.500">
            Testing the API connection and mock data functionality
          </Text>
        </Box>

        <Alert status={apiStatus.includes('✅') ? 'success' : apiStatus.includes('❌') ? 'error' : 'info'}>
          <AlertIcon />
          <AlertTitle>Status:</AlertTitle>
          <AlertDescription>{apiStatus}</AlertDescription>
        </Alert>

        <Box>
          <HStack spacing={4} mb={4}>
            <Button 
              onClick={testApi} 
              isLoading={loading}
              colorScheme="blue"
            >
              Test API Connection
            </Button>
            <Badge colorScheme="green" p={2}>
              Mock Data Mode Active
            </Badge>
          </HStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Add New Task</Heading>
          <HStack spacing={4}>
            <FormControl flex={1}>
              <Input
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
            </FormControl>
            <Button 
              onClick={addTask}
              isLoading={loading}
              colorScheme="green"
              disabled={!newTaskTitle.trim()}
            >
              Add Task
            </Button>
          </HStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Tasks ({tasks.length})
          </Heading>
          
          {loading && (
            <HStack justify="center" py={4}>
              <Spinner />
              <Text>Loading tasks...</Text>
            </HStack>
          )}
          
          {!loading && tasks.length === 0 && (
            <Text color="gray.500" textAlign="center" py={4}>
              No tasks found. Try adding one above!
            </Text>
          )}
          
          {!loading && tasks.length > 0 && (
            <List spacing={3}>
              {tasks.map((task, index) => (
                <ListItem 
                  key={task.id || index}
                  p={4}
                  bg="white"
                  shadow="sm"
                  borderRadius="md"
                  borderWidth="1px"
                >
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" width="100%">
                      <Text fontWeight="bold">{task.title}</Text>
                      <Badge colorScheme={task.completed ? 'green' : 'orange'}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </Badge>
                    </HStack>
                    {task.description && (
                      <Text fontSize="sm" color="gray.600">
                        {task.description}
                      </Text>
                    )}
                    {task.priority && (
                      <Badge colorScheme={
                        task.priority === 'HIGH' ? 'red' :
                        task.priority === 'MEDIUM' ? 'orange' : 'green'
                      }>
                        {task.priority} Priority
                      </Badge>
                    )}
                  </VStack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Development Mode</AlertTitle>
          <AlertDescription>
            This app is currently running in development mode with mock data. 
            All changes are temporary and will reset when you refresh the page.
            To use real data, start the backend server.
          </AlertDescription>
        </Alert>
      </VStack>
    </Container>
  );
};

export default ApiTestPage;
