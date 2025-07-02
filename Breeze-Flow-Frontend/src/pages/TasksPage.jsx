import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  useColorModeValue,
  Input,
  IconButton,
  Button,
  List,
  ListItem,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useToast,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  Spinner,
  Collapse,
  Tooltip,
  Tag,
  TagLabel,
  TagLeftIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Divider,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  useBreakpointValue,
  SlideFade,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  FaEllipsisV,
  FaPlus,
  FaTrash,
  FaEdit,
  FaClock,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from 'react-icons/fa';
import { createTask, getTasks, updateTask, deleteTask } from '../services/api';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

// Define MotionListItem component
const MotionListItem = motion(ListItem);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      borderRadius="lg"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Something went wrong!
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb={4}>
        {error.message}
      </AlertDescription>
      <Button colorScheme="red" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Alert>
  );
}

function TasksPage() {
  // State hooks
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Disclosure hooks
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useCallback(ref => ref, []);

  // Theme hooks
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Memoized values
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const high = tasks.filter(t => t.priority === 'high').length;
    const progress = total ? (completed / total) * 100 : 0;
    
    return { total, completed, high, progress };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (selectedTab) {
      case 1:
        return filtered.filter(task => !task.completed);
      case 2:
        return filtered.filter(task => task.completed);
      default:
        return filtered;
    }
  }, [tasks, selectedTab, searchQuery]);

  // Callbacks
  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
      setIsLoading(false);
    }
  }, [toast]);

  const handleAddTask = useCallback(async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = {
        title: newTaskTitle,
        completed: false,
        priority: 'medium',
        dueDate: '',
        notes: '',
        createdAt: new Date().toISOString(),
      };
      const createdTask = await createTask(newTask);
      if (createdTask) {
        setTasks(prevTasks => [...prevTasks, createdTask]);
        setNewTaskTitle('');
        toast({
          title: 'Task added',
          status: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error adding task',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }, [newTaskTitle, toast]);

  const handleToggleTask = useCallback(async (taskId) => {
    if (!taskId) return;

    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      const result = await updateTask(taskId, updatedTask);
      
      if (result) {
        setTasks(prevTasks =>
          prevTasks.map((t) => t.id === taskId ? result : t)
        );
        toast({
          title: result.completed ? 'Task completed!' : 'Task reopened',
          status: 'success',
          duration: 1500,
        });
      }
    } catch (error) {
      toast({
        title: 'Error updating task',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }, [tasks, toast]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!taskToDelete?.id) return;

    try {
      await deleteTask(taskToDelete.id);
      setTasks(prevTasks => prevTasks.filter((task) => task.id !== taskToDelete.id));
      toast({
        title: 'Task deleted',
        status: 'success',
        duration: 2000,
      });
      onAlertClose();
      setTaskToDelete(null);
    } catch (error) {
      toast({
        title: 'Error deleting task',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }, [taskToDelete, toast, onAlertClose]);

  const handleEditTask = useCallback((task) => {
    if (!task) return;
    setEditingTask(task);
    onDrawerOpen();
  }, [onDrawerOpen]);

  const handleUpdateTask = useCallback(async () => {
    if (!editingTask?.id) return;

    try {
      const updatedTask = await updateTask(editingTask.id, editingTask);
      if (updatedTask) {
        setTasks(prevTasks =>
          prevTasks.map((task) =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
        onDrawerClose();
        toast({
          title: 'Task updated',
          status: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error updating task',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }, [editingTask, onDrawerClose, toast]);

  const handleExpandTask = useCallback((taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  }, [expandedTask]);

  // Effects
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getPriorityIcon = useCallback((priority) => {
    switch (priority) {
      case 'high':
        return FaExclamationCircle;
      case 'medium':
        return FaFlag;
      case 'low':
        return FaCheckCircle;
      default:
        return FaFlag;
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  }, []);

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading tasks...</Text>
      </Box>
    );
  }

  return (
    <>
      <Box maxW="900px" mx="auto" mt={8} p={{ base: 2, md: 6 }}>
        <Card boxShadow="xl" borderRadius="2xl" p={6}>
          <CardHeader>
            <Heading size="lg" mb={2}>Your Tasks</Heading>
            <Text color="gray.500" fontSize="md">Organize, prioritize, and track your tasks easily.</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={8} align="stretch">
              <Box>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Card bg={bg}>
                    <CardBody>
                      <Stat>
                        <StatLabel>Total Tasks</StatLabel>
                        <StatNumber>{taskStats.total}</StatNumber>
                        <StatHelpText>
                          {taskStats.completed} completed
                        </StatHelpText>
                        <Progress value={taskStats.progress} size="sm" colorScheme="green" mt={2} />
                      </Stat>
                    </CardBody>
                  </Card>
                  <Card bg={bg}>
                    <CardBody>
                      <Stat>
                        <StatLabel>Active Tasks</StatLabel>
                        <StatNumber>{taskStats.total - taskStats.completed}</StatNumber>
                        <StatHelpText>
                          {taskStats.high} high priority
                        </StatHelpText>
                        <Progress value={(taskStats.high / taskStats.total) * 100} size="sm" colorScheme="red" mt={2} />
                      </Stat>
                    </CardBody>
                  </Card>
                  <Card bg={bg}>
                    <CardBody>
                      <Stat>
                        <StatLabel>Completion Rate</StatLabel>
                        <StatNumber>{taskStats.progress.toFixed(1)}%</StatNumber>
                        <StatHelpText>
                          Overall progress
                        </StatHelpText>
                        <Progress value={taskStats.progress} size="sm" colorScheme="blue" mt={2} />
                      </Stat>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>

              <Box p={6} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={4}>
                  <HStack w="100%" spacing={4}>
                    <Input
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      flex={1}
                    />
                    <Input
                      placeholder="Add a new task..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTask();
                        }
                      }}
                      flex={2}
                    />
                    <IconButton
                      icon={<FaPlus />}
                      onClick={handleAddTask}
                      colorScheme="blue"
                      aria-label="Add task"
                    />
                  </HStack>

                  <Tabs w="100%" isFitted variant="enclosed" index={selectedTab} onChange={setSelectedTab}>
                    <TabList mb="1em">
                      <Tab>All ({tasks.length})</Tab>
                      <Tab>Active ({tasks.filter(t => !t.completed).length})</Tab>
                      <Tab>Completed ({tasks.filter(t => t.completed).length})</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel p={0}>
                        <List spacing={3} w="100%">
                          {filteredTasks.map((task) => (
                            <MotionListItem
                              key={task.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Card
                                bg={cardBg}
                                _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                              >
                                <CardBody>
                                  <VStack align="stretch" spacing={2}>
                                    <HStack justify="space-between">
                                      <HStack flex={1} spacing={4}>
                                        <Checkbox
                                          isChecked={task.completed}
                                          onChange={() => handleToggleTask(task.id)}
                                          size="lg"
                                        />
                                        <VStack align="start" spacing={1}>
                                          <HStack>
                                            <Text
                                              fontSize="lg"
                                              fontWeight="medium"
                                              textDecoration={
                                                task.completed ? 'line-through' : 'none'
                                              }
                                              color={task.completed ? mutedColor : textColor}
                                            >
                                              {task.title}
                                            </Text>
                                            <Tag
                                              size="sm"
                                              variant="subtle"
                                              colorScheme={getPriorityColor(task.priority)}
                                            >
                                              <TagLeftIcon as={getPriorityIcon(task.priority)} />
                                              <TagLabel>{task.priority}</TagLabel>
                                            </Tag>
                                          </HStack>
                                          {task.dueDate && (
                                            <HStack fontSize="sm" color={mutedColor}>
                                              <FaCalendarAlt />
                                              <Text>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
                                            </HStack>
                                          )}
                                        </VStack>
                                      </HStack>
                                      <HStack>
                                        <IconButton
                                          icon={expandedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleExpandTask(task.id)}
                                          aria-label="Toggle details"
                                        />
                                        <Menu>
                                          <MenuButton
                                            as={IconButton}
                                            icon={<FaEllipsisV />}
                                            variant="ghost"
                                            size="sm"
                                          />
                                          <MenuList>
                                            <MenuItem
                                              icon={<FaEdit />}
                                              onClick={() => handleEditTask(task)}
                                            >
                                              Edit
                                            </MenuItem>
                                            <MenuItem
                                              icon={<FaTrash />}
                                              onClick={() => {
                                                setTaskToDelete(task);
                                                onAlertOpen();
                                              }}
                                              color="red.500"
                                            >
                                              Delete
                                            </MenuItem>
                                          </MenuList>
                                        </Menu>
                                      </HStack>
                                    </HStack>

                                    <Collapse in={expandedTask === task.id}>
                                      <VStack align="stretch" mt={4} spacing={3}>
                                        <Divider />
                                        {task.notes && (
                                          <Text fontSize="sm" color={mutedColor}>
                                            {task.notes}
                                          </Text>
                                        )}
                                        <HStack fontSize="sm" color={mutedColor} spacing={4}>
                                          <HStack>
                                            <FaClock />
                                            <Text>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>
                                          </HStack>
                                          {task.completed && (
                                            <Tag colorScheme="green" size="sm">
                                              <TagLeftIcon as={FaCheckCircle} />
                                              <TagLabel>Completed</TagLabel>
                                            </Tag>
                                          )}
                                        </HStack>
                                      </VStack>
                                    </Collapse>
                                  </VStack>
                                </CardBody>
                              </Card>
                            </MotionListItem>
                          ))}
                        </List>
                      </TabPanel>
                      <TabPanel p={0}>
                        <List spacing={3} w="100%">
                          {filteredTasks.map((task) => (
                            <MotionListItem
                              key={task.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Card
                                bg={cardBg}
                                _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                              >
                                <CardBody>
                                  <VStack align="stretch" spacing={2}>
                                    <HStack justify="space-between">
                                      <HStack flex={1} spacing={4}>
                                        <Checkbox
                                          isChecked={task.completed}
                                          onChange={() => handleToggleTask(task.id)}
                                          size="lg"
                                        />
                                        <VStack align="start" spacing={1}>
                                          <HStack>
                                            <Text
                                              fontSize="lg"
                                              fontWeight="medium"
                                              textDecoration={
                                                task.completed ? 'line-through' : 'none'
                                              }
                                              color={task.completed ? mutedColor : textColor}
                                            >
                                              {task.title}
                                            </Text>
                                            <Tag
                                              size="sm"
                                              variant="subtle"
                                              colorScheme={getPriorityColor(task.priority)}
                                            >
                                              <TagLeftIcon as={getPriorityIcon(task.priority)} />
                                              <TagLabel>{task.priority}</TagLabel>
                                            </Tag>
                                          </HStack>
                                          {task.dueDate && (
                                            <HStack fontSize="sm" color={mutedColor}>
                                              <FaCalendarAlt />
                                              <Text>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
                                            </HStack>
                                          )}
                                        </VStack>
                                      </HStack>
                                      <HStack>
                                        <IconButton
                                          icon={expandedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleExpandTask(task.id)}
                                          aria-label="Toggle details"
                                        />
                                        <Menu>
                                          <MenuButton
                                            as={IconButton}
                                            icon={<FaEllipsisV />}
                                            variant="ghost"
                                            size="sm"
                                          />
                                          <MenuList>
                                            <MenuItem
                                              icon={<FaEdit />}
                                              onClick={() => handleEditTask(task)}
                                            >
                                              Edit
                                            </MenuItem>
                                            <MenuItem
                                              icon={<FaTrash />}
                                              onClick={() => {
                                                setTaskToDelete(task);
                                                onAlertOpen();
                                              }}
                                              color="red.500"
                                            >
                                              Delete
                                            </MenuItem>
                                          </MenuList>
                                        </Menu>
                                      </HStack>
                                    </HStack>

                                    <Collapse in={expandedTask === task.id}>
                                      <VStack align="stretch" mt={4} spacing={3}>
                                        <Divider />
                                        {task.notes && (
                                          <Text fontSize="sm" color={mutedColor}>
                                            {task.notes}
                                          </Text>
                                        )}
                                        <HStack fontSize="sm" color={mutedColor} spacing={4}>
                                          <HStack>
                                            <FaClock />
                                            <Text>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>
                                          </HStack>
                                          {task.completed && (
                                            <Tag colorScheme="green" size="sm">
                                              <TagLeftIcon as={FaCheckCircle} />
                                              <TagLabel>Completed</TagLabel>
                                            </Tag>
                                          )}
                                        </HStack>
                                      </VStack>
                                    </Collapse>
                                  </VStack>
                                </CardBody>
                              </Card>
                            </MotionListItem>
                          ))}
                        </List>
                      </TabPanel>
                      <TabPanel p={0}>
                        <List spacing={3} w="100%">
                          {filteredTasks.map((task) => (
                            <MotionListItem
                              key={task.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Card
                                bg={cardBg}
                                _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                              >
                                <CardBody>
                                  <VStack align="stretch" spacing={2}>
                                    <HStack justify="space-between">
                                      <HStack flex={1} spacing={4}>
                                        <Checkbox
                                          isChecked={task.completed}
                                          onChange={() => handleToggleTask(task.id)}
                                          size="lg"
                                        />
                                        <VStack align="start" spacing={1}>
                                          <HStack>
                                            <Text
                                              fontSize="lg"
                                              fontWeight="medium"
                                              textDecoration={
                                                task.completed ? 'line-through' : 'none'
                                              }
                                              color={task.completed ? mutedColor : textColor}
                                            >
                                              {task.title}
                                            </Text>
                                            <Tag
                                              size="sm"
                                              variant="subtle"
                                              colorScheme={getPriorityColor(task.priority)}
                                            >
                                              <TagLeftIcon as={getPriorityIcon(task.priority)} />
                                              <TagLabel>{task.priority}</TagLabel>
                                            </Tag>
                                          </HStack>
                                          {task.dueDate && (
                                            <HStack fontSize="sm" color={mutedColor}>
                                              <FaCalendarAlt />
                                              <Text>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
                                            </HStack>
                                          )}
                                        </VStack>
                                      </HStack>
                                      <HStack>
                                        <IconButton
                                          icon={expandedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleExpandTask(task.id)}
                                          aria-label="Toggle details"
                                        />
                                        <Menu>
                                          <MenuButton
                                            as={IconButton}
                                            icon={<FaEllipsisV />}
                                            variant="ghost"
                                            size="sm"
                                          />
                                          <MenuList>
                                            <MenuItem
                                              icon={<FaEdit />}
                                              onClick={() => handleEditTask(task)}
                                            >
                                              Edit
                                            </MenuItem>
                                            <MenuItem
                                              icon={<FaTrash />}
                                              onClick={() => {
                                                setTaskToDelete(task);
                                                onAlertOpen();
                                              }}
                                              color="red.500"
                                            >
                                              Delete
                                            </MenuItem>
                                          </MenuList>
                                        </Menu>
                                      </HStack>
                                    </HStack>

                                    <Collapse in={expandedTask === task.id}>
                                      <VStack align="stretch" mt={4} spacing={3}>
                                        <Divider />
                                        {task.notes && (
                                          <Text fontSize="sm" color={mutedColor}>
                                            {task.notes}
                                          </Text>
                                        )}
                                        <HStack fontSize="sm" color={mutedColor} spacing={4}>
                                          <HStack>
                                            <FaClock />
                                            <Text>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>
                                          </HStack>
                                          {task.completed && (
                                            <Tag colorScheme="green" size="sm">
                                              <TagLeftIcon as={FaCheckCircle} />
                                              <TagLabel>Completed</TagLabel>
                                            </Tag>
                                          )}
                                        </HStack>
                                      </VStack>
                                    </Collapse>
                                  </VStack>
                                </CardBody>
                              </Card>
                            </MotionListItem>
                          ))}
                        </List>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
          <CardFooter>
            <Text fontSize="sm" color="gray.500">Tip: Use filters and tags to stay productive!</Text>
          </CardFooter>
        </Card>
      </Box>

      <Drawer
        isOpen={isDrawerOpen}
        placement={isMobile ? "bottom" : "right"}
        onClose={onDrawerClose}
        size={isMobile ? "full" : "md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <FaEdit />
              <Text>Edit Task</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={editingTask?.title || ''}
                  onChange={(e) =>
                    setEditingTask(prev => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Task title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={editingTask?.priority || 'medium'}
                  onChange={(e) =>
                    setEditingTask(prev => ({ ...prev, priority: e.target.value }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={editingTask?.dueDate || ''}
                  onChange={(e) =>
                    setEditingTask(prev => ({ ...prev, dueDate: e.target.value }))
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={editingTask?.notes || ''}
                  onChange={(e) =>
                    setEditingTask(prev => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Add any additional notes here..."
                  rows={4}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                onClick={handleUpdateTask}
                w="100%"
                leftIcon={<FaEdit />}
              >
                Update Task
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default function TasksPageWithErrorBoundary() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state here
        window.location.reload();
      }}
    >
      <TasksPage />
    </ErrorBoundary>
  );
}